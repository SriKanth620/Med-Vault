// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract Upload {
  address public admin=0x646067f99aE7D0b8754bDE5559652BDB54675900;
  uint public accountIndex=0;
  uint public patientAccountIndex=0;
  uint public doctorAccountIndex=0;
  uint public hospitalAccountIndex=0;
  struct Access{
     address user; 
     bool access; //true or false
  }
  struct User{
    string name;
    uint mobile;
    address account;
    string role;
  }
  struct Doctor{
    string name;
    uint mobile;
    address account;
    string designation;
    address hospital;
  }
  struct Hospital{
    string name;
    uint mobile;
    address account;

  }
  modifier onlyAdmin{
    require(msg.sender==admin, "Only admin can access");
    _;
  }

  mapping(address=>string[]) value;
  mapping(address=>mapping(address=>bool)) ownership;
  mapping(address=>Access[]) accessList;
  mapping(address=>mapping(address=>bool)) previousData;
  mapping(address=>address[]) requestList;
  mapping(uint=>address) public Accounts;
  mapping(uint=>address) public doctorAccounts;
  mapping(uint=>address) public patientAccounts;
  mapping(uint=>address) public hospitalAccounts;
  mapping(address=>User) public AccountsInfo;
  mapping(address=>User) public patientInfo;
  mapping(address=>Doctor) public doctorInfo;
  mapping(address=>Hospital) public hospitalInfo;



  function add(address _user,string memory url) public {
      require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
       value[_user].push(url);
  }
  function allow(address user) public  {//de
    checkPatient(msg.sender);
      ownership[msg.sender][user]=true; 
      if(previousData[msg.sender][user]){
         for(uint i=0;i<accessList[msg.sender].length;i++){
             if(accessList[msg.sender][i].user==user){
                  accessList[msg.sender][i].access=true; 
             }
         }
      }else{
          accessList[msg.sender].push(Access(user,true));  
          previousData[msg.sender][user]=true;  
      }
    
  }
  function disallow(address user) public{
    checkPatient(msg.sender);
      ownership[msg.sender][user]=false;
      for(uint i=0;i<accessList[msg.sender].length;i++){
          if(accessList[msg.sender][i].user==user){ 
              accessList[msg.sender][i].access=false;  
          }
      }
  }

  function display(address _user) external view returns(string[] memory){
      require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
      return value[_user];
  }

  function shareAccess() public view returns(Access[] memory){
      return accessList[msg.sender];
  }

  function requestToPatient(address _patient)public{
    checkDoctor(msg.sender);
    checkPatient(_patient);
    require(msg.sender != _patient && ownership[_patient][msg.sender]==false, "Permission Already Granted");
    requestList[_patient].push(msg.sender);
  }
  function displayRequestList(address _patient) public view returns(address[] memory){
    return requestList[_patient];
  }
  function requestAccept( address _doctor)public{
    for(uint i=0; i<requestList[msg.sender].length; i++){
        if(requestList[msg.sender][i]==_doctor){
            // delete requestList[msg.sender][i];
            for(uint j=i; j<requestList[msg.sender].length - 1; j++){
                requestList[msg.sender][j] = requestList[msg.sender][j+1];
            }
            // delete requestList[msg.sender][i];
            // delete requestList[msg.sender][requestList[msg.sender].length - 1];
            requestList[msg.sender].pop();
        }
    }
    allow(_doctor);
  }
  function requestReject( address _doctor)public{
    for(uint i=0; i<requestList[msg.sender].length; i++){
        if(requestList[msg.sender][i]==_doctor){
            // delete requestList[msg.sender][i];
            for(uint j=i; j<requestList[msg.sender].length - 1; j++){
                requestList[msg.sender][j] = requestList[msg.sender][j+1];
            }
            // delete requestList[msg.sender][i];
            // delete requestList[msg.sender][requestList[msg.sender].length - 1];
            requestList[msg.sender].pop();
        }
    }
    disallow(_doctor);
  }

  function registerUser(string memory _name, uint _mobile, address _user, string memory _role) public onlyAdmin{
    for(uint i=0; i<accountIndex; i++){
        require(Accounts[i]!=_user, "Account already exist");
    }
    require(admin!=_user, "Admin cant be registered as a user");
    Accounts[accountIndex]= _user;
    accountIndex++;
    AccountsInfo[_user]=User(_name, _mobile, _user, _role);
  }
  function registerPatient(string memory _name, uint _mobile, address _user, string memory _role) public onlyAdmin{
    registerUser(_name, _mobile, _user, _role);
    patientInfo[_user]=User(_name, _mobile, _user, _role);
    patientAccounts[patientAccountIndex]= _user;
    patientAccountIndex++;
    
  }
  function registerDoctor(string memory _name, uint _mobile, address _user, string memory _role, string memory _designation, address _hosAddress) public onlyAdmin{
    registerUser(_name, _mobile, _user, _role);
    doctorInfo[_user]=Doctor(_name, _mobile, _user, _designation, _hosAddress);
    doctorAccounts[doctorAccountIndex]= _user;
    doctorAccountIndex++;
    
  }
  function registerHospital(string memory _name, uint _mobile, address _user, string memory _role) public onlyAdmin{
    registerUser(_name, _mobile, _user, _role);
    hospitalInfo[_user]=Hospital(_name, _mobile, _user);
    hospitalAccounts[hospitalAccountIndex]= _user;
    hospitalAccountIndex++;
    
  }
  function checkPatient(address _user)public view{
    bool found=false;
    for(uint i=0; i<patientAccountIndex; i++){
        if(patientAccounts[i]==_user){
            found=true;
            break;
        }
    }
    require(found==true, "Dont have an patient account");
  }
  function checkDoctor(address _user)public view{
    bool found=false;
    for(uint i=0; i<doctorAccountIndex; i++){
        if(doctorAccounts[i]==_user){
            found=true;
            break;
        }
    }
    require(found==true, "You dont have an doctor account");
  }
  function checkHospital(address _user)public view{
    bool found=false;
    for(uint i=0; i<hospitalAccountIndex; i++){
        if(hospitalAccounts[i]==_user){
            found=true;
            break;
        }
    }
    require(found==true, "You dont have an hospital account");
  }
  function addRecords(address _user,string memory url) public {
    checkPatient(_user);
    add(_user,url);
  }
  function addPatientRecords(address _user,string memory url) public {
    checkDoctor(msg.sender);
    checkPatient(_user);
    add(_user,url);
  }
  function displayDoctors() public view returns (Doctor[] memory) {
    checkHospital(msg.sender);

    uint count = 0;
    // Count the number of doctors belonging to the specified hospital
    for (uint i = 0; i < doctorAccountIndex; i++) {
        if (doctorInfo[doctorAccounts[i]].hospital == msg.sender) {
            count++;
        }
    }

    // Create an array to store doctor information
    Doctor[] memory doctors = new Doctor[](count);

    uint index = 0;
    // Populate the array with doctor information
    for (uint i = 0; i < doctorAccountIndex; i++) {
        if (doctorInfo[doctorAccounts[i]].hospital ==msg.sender) {
            doctors[index] = doctorInfo[doctorAccounts[i]];
            index++;
        }
    }

    require(count > 0, "No doctors found");
    return doctors;
}
  function displayHospital()public view returns(Hospital[] memory){
    require(msg.sender==admin, "only admin can access");
    Hospital[] memory hospitals = new Hospital[](hospitalAccountIndex);

    uint index = 0;
    // Populate the array with doctor information
    for (uint i = 0; i < hospitalAccountIndex; i++) {
            hospitals[index] = hospitalInfo[hospitalAccounts[i]];
             index++;
    }
    require(hospitalAccountIndex > 0, "No hospitals found");
    return hospitals;
  }
  function displayPatient()public view returns(User[] memory){
    checkDoctor(msg.sender);
    User[] memory patients = new User[](patientAccountIndex);

    uint index = 0;
    // Populate the array with doctor information
    for (uint i = 0; i < patientAccountIndex; i++) {
            patients[index] = patientInfo[patientAccounts[i]];
             index++;
    }
    require(patientAccountIndex > 0, "No patient found");
    return patients;
  }

}
// contract Upload {
//   address public admin=0x646067f99aE7D0b8754bDE5559652BDB54675900;
//   uint public accountIndex=0;
//   uint public patientAccountIndex=0;
//   uint public doctorAccountIndex=0;
//   struct Access{
//      address user; 
//      bool access; //true or false
//   }
//   struct User{
//     string name;
//     uint mobile;
//     address account;
//     string role;
//   }
//   modifier onlyAdmin{
//     require(msg.sender==admin, "Only admin can access");
//     _;
//   }

//   mapping(address=>string[]) value;
//   mapping(address=>mapping(address=>bool)) ownership;
//   mapping(address=>Access[]) accessList;
//   mapping(address=>mapping(address=>bool)) previousData;
//   mapping(address=>address[]) requestList;
//   mapping(uint=>address) public Accounts;
//   mapping(uint=>address) public doctorAccounts;
//   mapping(uint=>address) public patientAccounts;
//   mapping(address=>User) public AccountsInfo;



//   function add(address _user,string memory url) public {
//       require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
//        value[_user].push(url);
//   }
//   function allow(address user) public  {//de
//     checkPatient(msg.sender);
//       ownership[msg.sender][user]=true; 
//       if(previousData[msg.sender][user]){
//          for(uint i=0;i<accessList[msg.sender].length;i++){
//              if(accessList[msg.sender][i].user==user){
//                   accessList[msg.sender][i].access=true; 
//              }
//          }
//       }else{
//           accessList[msg.sender].push(Access(user,true));  
//           previousData[msg.sender][user]=true;  
//       }
    
//   }
//   function disallow(address user) public{
//     checkPatient(msg.sender);
//       ownership[msg.sender][user]=false;
//       for(uint i=0;i<accessList[msg.sender].length;i++){
//           if(accessList[msg.sender][i].user==user){ 
//               accessList[msg.sender][i].access=false;  
//           }
//       }
//   }

//   function display(address _user) external view returns(string[] memory){
//       require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
//       return value[_user];
//   }

//   function shareAccess() public view returns(Access[] memory){
//       return accessList[msg.sender];
//   }

//   function requestToPatient(address _patient)public{
//     checkDoctor(msg.sender);
//     require(msg.sender != _patient && ownership[_patient][msg.sender]==false, "Permission Already Granted");
//     requestList[_patient].push(msg.sender);
//   }
//   function displayRequestList(address _patient) public view returns(address[] memory){
//     return requestList[_patient];
//   }
//   function requestAccept( address _doctor)public{
//     for(uint i=0; i<requestList[msg.sender].length; i++){
//         if(requestList[msg.sender][i]==_doctor){
//             // delete requestList[msg.sender][i];
//             for(uint j=i; j<requestList[msg.sender].length - 1; j++){
//                 requestList[msg.sender][j] = requestList[msg.sender][j+1];
//             }
//             // delete requestList[msg.sender][i];
//             // delete requestList[msg.sender][requestList[msg.sender].length - 1];
//             requestList[msg.sender].pop();
//         }
//     }
//     allow(_doctor);
//   }
//     function requestReject( address _doctor)public{
//     for(uint i=0; i<requestList[msg.sender].length; i++){
//         if(requestList[msg.sender][i]==_doctor){
//             // delete requestList[msg.sender][i];
//             for(uint j=i; j<requestList[msg.sender].length - 1; j++){
//                 requestList[msg.sender][j] = requestList[msg.sender][j+1];
//             }
//             // delete requestList[msg.sender][i];
//             // delete requestList[msg.sender][requestList[msg.sender].length - 1];
//             requestList[msg.sender].pop();
//         }
//     }
//     disallow(_doctor);
//   }

//   function registerUser(string memory _name, uint _mobile, address _user, string memory _role) public onlyAdmin{
//     for(uint i=0; i<accountIndex; i++){
//         require(Accounts[i]!=_user, "Account already exist");
//     }
//     require(admin!=_user, "Admin cant be registered as a user");
//     Accounts[accountIndex]= _user;
//     accountIndex++;
//     AccountsInfo[_user]=User(_name, _mobile, _user, _role);
//     if(keccak256(abi.encodePacked(_role))== keccak256(abi.encodePacked("doctor"))){
//         doctorAccounts[doctorAccountIndex]= _user;
//         doctorAccountIndex++;
//     }
//     if(keccak256(abi.encodePacked(_role))== keccak256(abi.encodePacked("patient"))){
//         patientAccounts[patientAccountIndex]= _user;
//         patientAccountIndex++;
//     }
//   }
//   function checkPatient(address _user)public view{
//     bool found=false;
//     for(uint i=0; i<patientAccountIndex; i++){
//         if(patientAccounts[i]==_user){
//             found=true;
//             break;
//         }
//     }
//     require(found==true, "You dont have an patient account");
//   }
//   function checkDoctor(address _user)public view{
//     bool found=false;
//     for(uint i=0; i<doctorAccountIndex; i++){
//         if(doctorAccounts[i]==_user){
//             found=true;
//             break;
//         }
//     }
//     require(found==true, "You dont have an doctor account");
//   }
//   function addRecords(address _user,string memory url) public {
//     checkPatient(_user);
//     add(_user,url);
//   }
//   function addPatientRecords(address _user,string memory url) public {
//     checkDoctor(msg.sender);
//     add(_user,url);
//   }

// }
// contract Upload {
  
//   struct Access{
//      address user; 
//      bool access; //true or false
//   }
//   mapping(address=>string[]) value;
//   mapping(address=>mapping(address=>bool)) ownership;
//   mapping(address=>Access[]) accessList;
//   mapping(address=>mapping(address=>bool)) previousData;
//   mapping(address=>address[]) requestList;

//   function add(address _user,string memory url) public {
//       require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
//        value[_user].push(url);
//   }
//   function allow(address user) public  {//def
//       ownership[msg.sender][user]=true; 
//       if(previousData[msg.sender][user]){
//          for(uint i=0;i<accessList[msg.sender].length;i++){
//              if(accessList[msg.sender][i].user==user){
//                   accessList[msg.sender][i].access=true; 
//              }
//          }
//       }else{
//           accessList[msg.sender].push(Access(user,true));  
//           previousData[msg.sender][user]=true;  
//       }
    
//   }
//   function disallow(address user) public{
//       ownership[msg.sender][user]=false;
//       for(uint i=0;i<accessList[msg.sender].length;i++){
//           if(accessList[msg.sender][i].user==user){ 
//               accessList[msg.sender][i].access=false;  
//           }
//       }
//   }

//   function display(address _user) external view returns(string[] memory){
//       require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
//       return value[_user];
//   }

//   function shareAccess() public view returns(Access[] memory){
//       return accessList[msg.sender];
//   }

//   function requestToPatient(address _patient)public{
//     require(msg.sender != _patient && ownership[_patient][msg.sender]==false, "Permission Already Granted");
//     requestList[_patient].push(msg.sender);
//   }
//   function displayRequestList() public view returns(address[] memory){
//     return requestList[msg.sender];
//   }
//   function requestAccept( address _doctor)public{
//     for(uint i=0; i<requestList[msg.sender].length; i++){
//         if(requestList[msg.sender][i]==_doctor){
//             // delete requestList[msg.sender][i];
//             for(uint j=i; j<requestList[msg.sender].length - 1; j++){
//                 requestList[msg.sender][j] = requestList[msg.sender][j+1];
//             }
//             // delete requestList[msg.sender][i];
//             // delete requestList[msg.sender][requestList[msg.sender].length - 1];
//             requestList[msg.sender].pop();
//         }
//     }
//     allow(_doctor);
//   }
//     function requestReject( address _doctor)public{
//     for(uint i=0; i<requestList[msg.sender].length; i++){
//         if(requestList[msg.sender][i]==_doctor){
//             // delete requestList[msg.sender][i];
//             for(uint j=i; j<requestList[msg.sender].length - 1; j++){
//                 requestList[msg.sender][j] = requestList[msg.sender][j+1];
//             }
//             // delete requestList[msg.sender][i];
//             // delete requestList[msg.sender][requestList[msg.sender].length - 1];
//             requestList[msg.sender].pop();
//         }
//     }
//     disallow(_doctor);
//   }


// }
// contract Upload {
  
//   struct Access{
//      address user; 
//      bool access; //true or false
//   }
//   mapping(address=>string[]) value;
//   mapping(address=>mapping(address=>bool)) ownership;
//   mapping(address=>Access[]) accessList;
//   mapping(address=>mapping(address=>bool)) previousData;

//   function add(address _user,string memory url) public {
//       require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
//        value[_user].push(url);
//   }
//   function allow(address user) external {//def
//       ownership[msg.sender][user]=true; 
//       if(previousData[msg.sender][user]){
//          for(uint i=0;i<accessList[msg.sender].length;i++){
//              if(accessList[msg.sender][i].user==user){
//                   accessList[msg.sender][i].access=true; 
//              }
//          }
//       }else{
//           accessList[msg.sender].push(Access(user,true));  
//           previousData[msg.sender][user]=true;  
//       }
    
//   }
//   function disallow(address user) public{
//       ownership[msg.sender][user]=false;
//       for(uint i=0;i<accessList[msg.sender].length;i++){
//           if(accessList[msg.sender][i].user==user){ 
//               accessList[msg.sender][i].access=false;  
//           }
//       }
//   }

//   function display(address _user) external view returns(string[] memory){
//       require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
//       return value[_user];
//   }

//   function shareAccess() public view returns(Access[] memory){
//       return accessList[msg.sender];
//   }
// }