// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Upload2 {
    address public admin;
    // uint public accountIndex=0;
    uint16 public patientAccountIndex=0;
    uint16 public doctorAccountIndex=0;
    uint16 public hospitalAccountIndex=0;

    struct Access {
        address user;
        bool access;
    }

    struct User {
        string name;
        string mobile;
        address account;
    }

    struct Doctor {
        string name;
        string mobile;
        address account;
        string designation;
        address hospital;
    }

    struct User1 {
        string name;
        string mobile;
        address account;
    }

    struct Emergency {
        string doctorName;
        address doctorAddress;
        string doctorMobile;
        string patientName;
        address patientAddress;
        uint date;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can access");
        _;
    }

    mapping(address => string[]) private value;
    mapping(address => mapping(address => bool)) private ownership;
    mapping(address => Access[]) private accessList;
    mapping(address => mapping(address => bool)) private previousData;
    mapping(address => address[]) private requestList;
    // mapping(uint => address) public Accounts;
    mapping(uint => address) public doctorAccounts;
    mapping(uint => address) public patientAccounts;
    mapping(uint => address) public hospitalAccounts;
    // mapping(address => User) public AccountsInfo;
    mapping(address => User) public patientInfo;
    mapping(address => Doctor) public doctorInfo;
    mapping(address => User1) public hospitalInfo;
    mapping(uint => Emergency) public emergencyTable;
    mapping(address => User1[]) public emergencyNotify;

    constructor() {
        admin = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    }

    

    function requestToPatient(address _patient) public {
        checkDoctor(msg.sender);
        checkPatient(_patient);
        require(msg.sender != _patient && !ownership[_patient][msg.sender], "Permission Already Granted");
        requestList[_patient].push(msg.sender);
    }

    function displayRequestList(address _patient) public view returns (address[] memory) {
        return requestList[_patient];
    }

   

    // function registerUser(string memory _name, string memory _mobile, address _user, string memory _role) public onlyAdmin {
    //     require(admin != _user, "Admin can't be registered as a user");
    //     Accounts[accountIndex] = _user;
    //     accountIndex++;
    //     AccountsInfo[_user] = User(_name, _mobile, _user, _role);
    // }

    function registerPatient(string memory _name, string memory _mobile, address _user) public onlyAdmin {
        require(admin != _user, "Admin can't be registered as a user");
        // registerUser(_name, _mobile, _user, _role);
        patientInfo[_user] = User(_name, _mobile, _user);
        patientAccounts[patientAccountIndex] = _user;
        patientAccountIndex++;
    }

    function registerDoctor(string memory _name, string memory _mobile, address _user, string memory _designation, address _hosAddress) public onlyAdmin {
        require(admin != _user, "Admin can't be registered as a user");
        // registerUser(_name, _mobile, _user, _role);
        doctorInfo[_user] = Doctor(_name, _mobile, _user, _designation, _hosAddress);
        doctorAccounts[doctorAccountIndex] = _user;
        doctorAccountIndex++;
    }

    function registerHospital(string memory _name, string memory _mobile, address _user) public onlyAdmin {
        require(admin != _user, "Admin can't be registered as a user");
        // registerUser(_name, _mobile, _user, _role);
        hospitalInfo[_user] = User1(_name, _mobile, _user);
        hospitalAccounts[hospitalAccountIndex] = _user;
        hospitalAccountIndex++;
    }

    function checkPatient(address _user) public view {
            bool found=false;
    for(uint i=0; i<patientAccountIndex; i++){
        if(patientAccounts[i]==_user){
            found=true;
            break;
        }
    }
    require(found==true, "Dont have an patient account");
    }

    function checkDoctor(address _user) public view {
            bool found=false;
    for(uint i=0; i<doctorAccountIndex; i++){
        if(doctorAccounts[i]==_user){
            found=true;
            break;
        }
    }
    require(found==true, "Dont have an patient account");
    }

    function checkHospital(address _user) public view {
            bool found=false;
    for(uint i=0; i<hospitalAccountIndex; i++){
        if(hospitalAccounts[i]==_user){
            found=true;
            break;
        }
    }
    require(found==true, "Dont have an patient account");
    }

  

    function displayDoctors() public view returns (Doctor[] memory) {
        checkHospital(msg.sender);
        Doctor[] memory doctors = new Doctor[](doctorAccountIndex);
        uint count = 0;
        for (uint i = 0; i < doctorAccountIndex; i++) {
            if (doctorInfo[doctorAccounts[i]].hospital == msg.sender) {
                doctors[count] = doctorInfo[doctorAccounts[i]];
                count++;
            }
        }
        require(count > 0, "No doctors found");
        return doctors;
    }

    function displayHospital() public view returns (User1[] memory) {
        require(msg.sender == admin, "only admin can access");
        User1[] memory hospitals = new User1[](hospitalAccountIndex);
        for (uint i = 0; i < hospitalAccountIndex; i++) {
            hospitals[i] = hospitalInfo[hospitalAccounts[i]];
        }
        require(hospitalAccountIndex > 0, "No hospitals found");
        return hospitals;
    }

    function displayPatient() public view returns (User[] memory) {
        checkDoctor(msg.sender);
        User[] memory patients = new User[](patientAccountIndex);
        for (uint i = 0; i < patientAccountIndex; i++) {
            patients[i] = patientInfo[patientAccounts[i]];
        }
        require(patientAccountIndex > 0, "No patients found");
        return patients;
    }

    uint public emergencyCount;

    function emergencyAccessToPatient(address _user) external returns (string[] memory) {
        uint time = block.timestamp;
        emergencyTable[emergencyCount] = Emergency(doctorInfo[msg.sender].name, msg.sender, doctorInfo[msg.sender].mobile, patientInfo[_user].name, _user, time);
        emergencyNotify[_user].push(User1(doctorInfo[msg.sender].name, doctorInfo[msg.sender].mobile, msg.sender));
        emergencyCount++;
        return value[_user];
    }

    function displayEmergencyNotify(address _patient) public view returns (User1[] memory) {
        return emergencyNotify[_patient];
    }

    function ignoreEmergencyAccess(address _doctor) public {
     for(uint i = 0; i < emergencyNotify[msg.sender].length; i++){
        if(emergencyNotify[msg.sender][i].account == _doctor){
            for (uint j = i; j < emergencyNotify[msg.sender].length - 1; j++) {
                emergencyNotify[msg.sender][j] = emergencyNotify[msg.sender][j + 1];
            }
            emergencyNotify[msg.sender].pop();
            break;
        }
     }
}
    function getAllEmergencies() public view returns (Emergency[] memory) {
        Emergency[] memory emergencies = new Emergency[](emergencyCount);
        for (uint i = 0; i < emergencyCount; i++) {
           emergencies[i] = emergencyTable[i];
         }
     return emergencies;
}

    function removeRequest(address _patient, address _doctor) private {
        for (uint i = 0; i < requestList[_patient].length; i++) {
            if (requestList[_patient][i] == _doctor) {
                for (uint j = i; j < requestList[_patient].length - 1; j++) {
                    requestList[_patient][j] = requestList[_patient][j + 1];
                }
                requestList[_patient].pop();
                break;
            }
        }
    }
}