const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SecureMediChain", function () {
  let dataMediChain;
  let owner;
  let doctor;
  let pharmacist;
  let patient;

  beforeEach(async function () {
    [owner, doctor, pharmacist, patient] = await ethers.getSigners();
    dataMediChain = await ethers.deployContract("SecureMediChain");
  });

  describe("Doctor management", function () {
    it("Owner should be able to add and remove doctors", async function () {
      await expect(dataMediChain.addDoctor(doctor.address))
        .to.emit(dataMediChain, "RegisteredAsDoctor")
        .withArgs(doctor.address);

      expect(await dataMediChain.doctors(doctor.address)).to.be.true;

      await expect(dataMediChain.removeDoctor(doctor.address))
        .to.emit(dataMediChain, "RemovedFromDoctorList")
        .withArgs(doctor.address);

      expect(await dataMediChain.doctors(doctor.address)).to.be.false;
    });

    it("Non-owner should not be able to add or remove doctors", async function () {
      await expect(
        dataMediChain.connect(doctor).addDoctor(doctor.address)
      ).to.be.revertedWithCustomError(dataMediChain, "OwnableUnauthorizedAccount");

      await dataMediChain.addDoctor(doctor.address);

      await expect(
        dataMediChain.connect(doctor).removeDoctor(doctor.address)
      ).to.be.revertedWithCustomError(dataMediChain, "OwnableUnauthorizedAccount");
    });

    it("Should be able to check if a doctor is in the whitelist", async function () {
      await dataMediChain.addDoctor(doctor.address);
      expect(await dataMediChain.checkDoctorWhitelist(doctor.address)).to.be.true;
      await dataMediChain.removeDoctor(doctor.address);
      expect(await dataMediChain.checkDoctorWhitelist(doctor.address)).to.be.false;
    });
  });

  describe("Pharmacist management", function () {
    it("Owner should be able to add and remove pharmacists", async function () {
      await expect(dataMediChain.addPharmacist(pharmacist.address))
        .to.emit(dataMediChain, "RegisteredAsPharmacist")
        .withArgs(pharmacist.address);

      expect(await dataMediChain.pharmacists(pharmacist.address)).to.be.true;

      await expect(dataMediChain.removePharmacist(pharmacist.address))
        .to.emit(dataMediChain, "RemovedFromPharmacistList")
        .withArgs(pharmacist.address);

      expect(await dataMediChain.pharmacists(pharmacist.address)).to.be.false;
    });

    it("Non-owner should not be able to add or remove pharmacists", async function () {
      await expect(
        dataMediChain.connect(pharmacist).addPharmacist(pharmacist.address)
      ).to.be.revertedWithCustomError(dataMediChain, "OwnableUnauthorizedAccount");

      await dataMediChain.addPharmacist(pharmacist.address);

      await expect(
        dataMediChain.connect(pharmacist).removePharmacist(pharmacist.address)
      ).to.be.revertedWithCustomError(dataMediChain, "OwnableUnauthorizedAccount");
    });

    it("Should be able to check if a pharmacist is in the whitelist", async function () {
      await dataMediChain.addPharmacist(pharmacist.address);
      expect(await dataMediChain.checkPharmacistWhitelist(pharmacist.address)).to.be.true;
      await dataMediChain.removePharmacist(pharmacist.address);
      expect(await dataMediChain.checkPharmacistWhitelist(pharmacist.address)).to.be.false;
    });
  });

  describe("Prescription management", function () {
    beforeEach(async function () {
      await dataMediChain.addDoctor(doctor.address);
      await dataMediChain.addPharmacist(pharmacist.address);
    });

    it("Doctor should be able to create a new prescription", async function () {
      const prescriptionHash = ethers.encodeBytes32String("prescriptionHash");
      const deliveryDate = Math.floor(Date.now() / 1000);

      await dataMediChain.connect(doctor).createNewPrescriptionData(patient.address, prescriptionHash, deliveryDate);

      const prescriptionData = await dataMediChain.prescriptions(patient.address);
      expect(prescriptionData.prescriptionHash).to.equal(prescriptionHash);
      expect(prescriptionData.deliveryDate).to.equal(deliveryDate);
      expect(prescriptionData.hasBeenProcessed).to.be.false;
      expect(prescriptionData.prescriptionExist).to.be.true;
    });

    it("Pharmacist should be able to mark a prescription as processed", async function () {
      const prescriptionHash = ethers.encodeBytes32String("prescriptionHash");
      const deliveryDate = Math.floor(Date.now() / 1000);

      await dataMediChain.connect(doctor).createNewPrescriptionData(patient.address, prescriptionHash, deliveryDate);

      await dataMediChain.connect(pharmacist).setPrescriptionAsProcessed(patient.address);

      const prescriptionData = await dataMediChain.connect(pharmacist).getPrescriptionData(patient.address);
      expect(prescriptionData.prescriptionExist).to.be.true;
      expect(prescriptionData.hasBeenProcessed).to.be.true;
    });

    it("Non-doctor should not be able to create a new prescription", async function () {
      const prescriptionHash = ethers.encodeBytes32String("prescriptionHash");
      const deliveryDate = Math.floor(Date.now() / 1000);

      await expect(
        dataMediChain.connect(pharmacist).createNewPrescriptionData(patient.address, prescriptionHash, deliveryDate)
      ).to.be.revertedWith("You're not a doctor");
    });

    it("Non-pharmacist should not be able to mark a prescription as processed", async function () {
      const prescriptionHash = ethers.encodeBytes32String("prescriptionHash");
      const deliveryDate = Math.floor(Date.now() / 1000);

      await dataMediChain.connect(doctor).createNewPrescriptionData(patient.address, prescriptionHash, deliveryDate);

      await expect(
        dataMediChain.connect(doctor).setPrescriptionAsProcessed(patient.address)
      ).to.be.revertedWith("You're not a pharmacist");
    });

    it("Doctor and pharmacist should be able to view a new prescription", async function () {
      const prescriptionHash = ethers.encodeBytes32String("prescriptionHash");
      const deliveryDate = Math.floor(Date.now() / 1000);

      await dataMediChain.connect(doctor).createNewPrescriptionData(patient.address, prescriptionHash, deliveryDate);

      const prescriptionDataDoctor = await dataMediChain.connect(doctor).getPrescriptionData(patient.address);
      expect(prescriptionDataDoctor.prescriptionHash).to.equal(prescriptionHash);
      expect(prescriptionDataDoctor.deliveryDate).to.equal(deliveryDate);
      expect(prescriptionDataDoctor.hasBeenProcessed).to.be.false;

      const prescriptionDataPharmacist = await dataMediChain.connect(pharmacist).getPrescriptionData(patient.address);
      expect(prescriptionDataPharmacist.prescriptionHash).to.equal(prescriptionHash);
      expect(prescriptionDataPharmacist.deliveryDate).to.equal(deliveryDate);
      expect(prescriptionDataPharmacist.hasBeenProcessed).to.be.false;
    });

    it("Doctor and pharmacist should be able to view a prescription marked as processed", async function () {
      const prescriptionHash = ethers.encodeBytes32String("prescriptionHash");
      const deliveryDate = Math.floor(Date.now() / 1000);

      await dataMediChain.connect(doctor).createNewPrescriptionData(patient.address, prescriptionHash, deliveryDate);
      await dataMediChain.connect(pharmacist).setPrescriptionAsProcessed(patient.address);

      const prescriptionDataDoctor = await dataMediChain.connect(doctor).getPrescriptionData(patient.address);
      expect(prescriptionDataDoctor.prescriptionHash).to.equal(prescriptionHash);
      expect(prescriptionDataDoctor.deliveryDate).to.equal(deliveryDate);
      expect(prescriptionDataDoctor.hasBeenProcessed).to.be.true;

      const prescriptionDataPharmacist = await dataMediChain.connect(pharmacist).getPrescriptionData(patient.address);
      expect(prescriptionDataPharmacist.prescriptionHash).to.equal(prescriptionHash);
      expect(prescriptionDataPharmacist.deliveryDate).to.equal(deliveryDate);
      expect(prescriptionDataPharmacist.hasBeenProcessed).to.be.true;
    });

    it("Non-doctor and non-pharmacist should not be able to view a prescription", async function () {
      const prescriptionHash = ethers.encodeBytes32String("prescriptionHash");
      const deliveryDate = Math.floor(Date.now() / 1000);

      await dataMediChain.connect(doctor).createNewPrescriptionData(patient.address, prescriptionHash, deliveryDate);

      await expect(
        dataMediChain.connect(patient).getPrescriptionData(patient.address)
      ).to.be.revertedWith("You're neither a doctor nor a pharmacist");
    });

    it("Doctor should be able to replace a prescription by a new one", async function () {
      const prescriptionHash = ethers.encodeBytes32String("prescriptionHash");
      const deliveryDate = Math.floor(Date.now() / 1000);

      await dataMediChain.connect(doctor).createNewPrescriptionData(patient.address, prescriptionHash, deliveryDate);

      const newPrescriptionHash = ethers.encodeBytes32String("newPrescriptionHash");
      const newDeliveryDate = Math.floor(Date.now() / 1000);

      await dataMediChain.connect(doctor).createNewPrescriptionData(patient.address, newPrescriptionHash, newDeliveryDate);

      const prescriptionData = await dataMediChain.connect(doctor).getPrescriptionData(patient.address);
      expect(prescriptionData.prescriptionHash).to.equal(newPrescriptionHash);
      expect(prescriptionData.deliveryDate).to.equal(newDeliveryDate);
    });

    it("Pharmacist should not be able to mark a non-existent prescription as processed", async function () {
      await expect(
        dataMediChain.connect(pharmacist).setPrescriptionAsProcessed(patient.address)
      ).to.be.revertedWith("This prescription does not exist");
    });

    it("Pharmacist should not mark an already processed prescription as processed again", async function () {
      const prescriptionHash = ethers.encodeBytes32String("prescriptionHash");
      const deliveryDate = Math.floor(Date.now() / 1000);

      await dataMediChain.connect(doctor).createNewPrescriptionData(patient.address, prescriptionHash, deliveryDate);

      await dataMediChain.connect(pharmacist).setPrescriptionAsProcessed(patient.address);

      await expect(
        dataMediChain.connect(pharmacist).setPrescriptionAsProcessed(patient.address)
      ).to.be.revertedWith("This prescription has already been processed");
    });
  });
});
