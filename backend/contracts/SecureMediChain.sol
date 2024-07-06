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

    /* mapping between keccack 256 hash of the patient private key, and his prescription data */
    mapping (bytes32 => PrescriptionData) public prescriptions;

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

    function createNewPrescriptionData(bytes32 _patientKeyHash, string memory _prescriptionSignature, bytes32 _prescriptionHash) external onlyDoctors {
        PrescriptionData memory prescriptionData;
        prescriptionData.prescriptionHash = _prescriptionHash;
        prescriptionData.prescriptionSignature = _prescriptionSignature;
        prescriptionData.hasBeenProcessed = false;
        prescriptionData.prescriptionExist = true;
        prescriptions[_patientKeyHash] = prescriptionData;
    }

    function getPrescriptionData(bytes32 _patientKeyHash) external onlyDoctorsOrPharmacists view returns (PrescriptionData memory) {
        require(prescriptions[_patientKeyHash].prescriptionExist, "This prescription does not exist");
        return prescriptions[_patientKeyHash];
    }

    function setPrescriptionAsProcessed(bytes32 _patientKeyHash) external onlyPharmacists {
        require(prescriptions[_patientKeyHash].prescriptionExist, "This prescription does not exist");
        require(!prescriptions[_patientKeyHash].hasBeenProcessed, "This prescription has already been processed");
        prescriptions[_patientKeyHash].hasBeenProcessed = true;
    }
}

/* TODO : data accessibility ? private ? */
/* TODO : manage multiple prescriptions for a given patient ? array of prescriptions ? */
/* TODO : timeout of prescription validity ? */