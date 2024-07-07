// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SecureMediChain
 * @dev Store patient prescription data. They can be managed depending on different roles (doctor or pharamacist).
 */
contract DataMediChain is Ownable {

    struct PrescriptionData {
        bytes32 prescriptionHash;
        string prescriptionSignature;
        bool hasBeenProcessed;
        bool prescriptionExist;
    }

    /* mapping between patient address and his prescription data */
    mapping (address => PrescriptionData) public prescriptions;

    mapping (address => bool) public doctors;

    mapping (address => bool) public pharmacists;

    constructor() Ownable(msg.sender) {
    }

    modifier onlyDoctors() {
        require(doctors[msg.sender], "You're not a doctor");
        _;
    }

    modifier onlyPharmacists() {
        require(pharmacists[msg.sender], "You're not a pharmacist");
        _;
    }

    modifier onlyDoctorsOrPharmacists() {
        require(doctors[msg.sender] || pharmacists[msg.sender], "You're neither a doctor nor a pharmacist");
        _;
    }

    function addDoctor(address _doctorAddress) external onlyOwner {
        doctors[_doctorAddress] = true;
    }

    function removeDoctor(address _doctorAddress) external onlyOwner {
        doctors[_doctorAddress] = false;
    }

    function addPharmacist(address _pharmacistAddress) external onlyOwner {
        pharmacists[_pharmacistAddress] = true;
    }

    function removePharmacist(address _pharmacistAddress) external onlyOwner {
        pharmacists[_pharmacistAddress] = false;
    }

    function createNewPrescriptionData(address _patientAddress, string memory _prescriptionSignature, bytes32 _prescriptionHash) external onlyDoctors {
        PrescriptionData memory prescriptionData;
        prescriptionData.prescriptionHash = _prescriptionHash;
        prescriptionData.prescriptionSignature = _prescriptionSignature;
        prescriptionData.hasBeenProcessed = false;
        prescriptionData.prescriptionExist = true;
        prescriptions[_patientAddress] = prescriptionData;
    }

    function getPrescriptionData(address _patientAddress) external onlyDoctorsOrPharmacists view returns (PrescriptionData memory) {
        require(prescriptions[_patientAddress].prescriptionExist, "This prescription does not exist");
        return prescriptions[_patientAddress];
    }

    function setPrescriptionAsProcessed(address _patientAddress) external onlyPharmacists {
        require(prescriptions[_patientAddress].prescriptionExist, "This prescription does not exist");
        require(!prescriptions[_patientAddress].hasBeenProcessed, "This prescription has already been processed");
        prescriptions[_patientAddress].hasBeenProcessed = true;
    }
}

/* TODO : data accessibility ? private ? */
/* TODO : manage multiple prescriptions for a given patient ? array of prescriptions ? */
/* TODO : timeout of prescription validity ? */