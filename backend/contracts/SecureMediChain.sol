// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SecureMediChain
 * @dev Store patient prescription data. They can be managed depending on different roles (doctor or pharmacist).
 */
contract SecureMediChain is Ownable {

    struct PrescriptionData {
        bytes32 prescriptionHash;
        uint256 deliveryDate;
        bool hasBeenProcessed;
        bool prescriptionExist;
    }

    /* Mapping between patient address and his prescription data */
    mapping (address => PrescriptionData) public prescriptions;

    mapping (address => bool) public doctors;

    mapping (address => bool) public pharmacists;

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() Ownable(msg.sender) {
    }

    /**
     * @dev Modifier to make a function callable only by doctors.
     */
    modifier onlyDoctors() {
        require(doctors[msg.sender], "You're not a doctor");
        _;
    }

    /**
     * @dev Modifier to make a function callable only by pharmacists.
     */
    modifier onlyPharmacists() {
        require(pharmacists[msg.sender], "You're not a pharmacist");
        _;
    }

    /**
     * @dev Modifier to make a function callable only by doctors or pharmacists.
     */
    modifier onlyDoctorsOrPharmacists() {
        require(doctors[msg.sender] || pharmacists[msg.sender], "You're neither a doctor nor a pharmacist");
        _;
    }

    event RegisteredAsDoctor(address _doctorAddress);
    event RegisteredAsPharmacist(address _pharmacistAddress);
    event RemovedFromDoctorList(address _doctorAddress);
    event RemovedFromPharmacistList(address _pharmacistAddress);

    /**
     * @notice Add a doctor to the whitelist.
     * @dev Can only be called by the contract owner.
     * @param _doctorAddress Address of the doctor to add.
     */
    function addDoctor(address _doctorAddress) external onlyOwner {
        doctors[_doctorAddress] = true;
        emit RegisteredAsDoctor(_doctorAddress);
    }

    /**
     * @notice Remove a doctor from the whitelist.
     * @dev Can only be called by the contract owner.
     * @param _doctorAddress Address of the doctor to remove.
     */
    function removeDoctor(address _doctorAddress) external onlyOwner {
        doctors[_doctorAddress] = false;
        emit RemovedFromDoctorList(_doctorAddress);
    }

    /**
     * @notice Add a pharmacist to the whitelist.
     * @dev Can only be called by the contract owner.
     * @param _pharmacistAddress Address of the pharmacist to add.
     */
    function addPharmacist(address _pharmacistAddress) external onlyOwner {
        pharmacists[_pharmacistAddress] = true;
        emit RegisteredAsPharmacist(_pharmacistAddress);
    }

    /**
     * @notice Remove a pharmacist from the whitelist.
     * @dev Can only be called by the contract owner.
     * @param _pharmacistAddress Address of the pharmacist to remove.
     */
    function removePharmacist(address _pharmacistAddress) external onlyOwner {
        pharmacists[_pharmacistAddress] = false;
        emit RemovedFromPharmacistList(_pharmacistAddress);
    }

    /**
     * @notice Check if a doctor is in the whitelist.
     * @param _doctorAddress Address of the doctor to check.
     * @return bool True if the doctor is in the whitelist, false otherwise.
     */
    function checkDoctorWhitelist(address _doctorAddress) external view returns (bool) {
        return doctors[_doctorAddress];
    }

    /**
     * @notice Check if a pharmacist is in the whitelist.
     * @param _pharmacistAddress Address of the pharmacist to check.
     * @return bool True if the pharmacist is in the whitelist, false otherwise.
     */
    function checkPharmacistWhitelist(address _pharmacistAddress) external view returns (bool) {
        return pharmacists[_pharmacistAddress];
    }

    /**
     * @notice Create a new prescription data for a patient.
     * @dev Can only be called by doctors.
     * @param _patientAddress Address of the patient associated to these medical data.
     * @param _prescriptionHash Hash of the prescription.
     * @param _deliveryDate The date when doctor emited the prescription.
     */
    function createNewPrescriptionData(address _patientAddress, bytes32 _prescriptionHash, uint256 _deliveryDate) external onlyDoctors {
        PrescriptionData memory prescriptionData;
        prescriptionData.prescriptionHash = _prescriptionHash;
        prescriptionData.deliveryDate = _deliveryDate;
        prescriptionData.hasBeenProcessed = false;
        prescriptionData.prescriptionExist = true;
        prescriptions[_patientAddress] = prescriptionData;
    }

    /**
     * @notice Get prescription data for a patient.
     * @dev Can only be called by doctors or pharmacists.
     * @param _patientAddress Address of the patient.
     * @return PrescriptionData The prescription data of the patient.
     */
    function getPrescriptionData(address _patientAddress) external onlyDoctorsOrPharmacists view returns (PrescriptionData memory) {
        require(prescriptions[_patientAddress].prescriptionExist, "This prescription does not exist");
        return prescriptions[_patientAddress];
    }

    /**
     * @notice Set a prescription as processed for a patient.
     * @dev Can only be called by pharmacists.
     * @param _patientAddress Address of the patient for whom the prescription has been delivered.
     */
    function setPrescriptionAsProcessed(address _patientAddress) external onlyPharmacists {
        require(prescriptions[_patientAddress].prescriptionExist, "This prescription does not exist");
        require(!prescriptions[_patientAddress].hasBeenProcessed, "This prescription has already been processed");
        prescriptions[_patientAddress].hasBeenProcessed = true;
    }
}
