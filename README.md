The goal is to prevent prescription fraud and to authenticate the various actors involved, all while respecting the confidentiality of medical secrets. To achieve this, I propose a digital prescription format, secured through blockchain and cryptographic tools.

What do we want to avoid/ensure?

1. We want to ensure that the person who creates and issues the prescription is indeed a doctor (authenticity).
2. We want to prevent the patient from modifying their prescription (integrity).
3. We want to prevent patient A from taking patient B’s prescription and being able to collect patient B’s medications. Similarly, we want to prevent identity theft: a patient B posing as patient A at the doctor’s office and then collecting medications as if they were patient A at the pharmacy.
4. We want to prevent the patient from collecting their medications multiple times with the same prescription (if it is only valid once).
5. We want the prescription to only be valid 1 year (according to the current french law).
6. We want to ensure medical confidentiality.

For this project, I attempted to provide a solution to each of the previously mentioned requirements :

1. The administrator (the account which deployed the contract), for instance a government health authority, is the only one able to add doctor and pharmacist addresses to the blockchain. Then, when a doctor address is connected, he has access to the doctor reserved actions.
2. The doctor calculates the hash of the prescription and stores it on the blockchain. The pharmacist then recalculates the hash on their side with the prescription brought by the patient and compares this hash with the one stored on the blockchain.
3. The doctor stores the patient’s public key, to whom they issue the prescription, on the blockchain. To verify it, the pharmacist sends a challenge (random number) to the patient to sign with their private key. The pharmacist verifies this signature using the patient’s public key. This validates that the patient indeed possesses the private key associated with the public key (associated with the address) stored by the doctor, thus authenticating the patient. We do not address the case here of a “complicit” patient who deliberately discloses their private key to another person.
4. Once the medications are dispensed, the pharmacist marks the prescription as dispensed on the blockchain. They first verify that the prescription presented by the patient has not already been used.
5. The doctor stores on the blockchain the date when the prescription has been delivered. The pharamacist then computes the elapsed time since the prescription was delivered.
6. The prescription is never stored on the blockchain. It is transmitted to the patient, and only the patient is responsible for the disclosure of the data it contains. Additionally, none of the data stored on the blockchain are critical (neither private keys nor medical data in plaintext).
   
   connection page :
   
<img width="959" alt="main_page_SMC" src="https://github.com/user-attachments/assets/1d7f753e-ed27-43e8-8613-b6f47a4e227f">

   admin actions :
   
<img width="956" alt="admin_page" src="https://github.com/user-attachments/assets/fc1be5af-c197-4980-a4d8-df7ef9535a85">

   doctor actions :
   
<img width="958" alt="doctor_bottom_page" src="https://github.com/user-attachments/assets/d5ea6eb0-1c68-47f1-8fcf-92536e9fa42e">

   pharmacist actions :
   
<img width="959" alt="pharmacist_bottom_page" src="https://github.com/user-attachments/assets/5eeba804-80f5-4557-a005-7eb0c2dd3f11">
