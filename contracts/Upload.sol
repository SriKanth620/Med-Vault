// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
contract Upload {
  
  struct Access{
     address user; 
     bool access; //true or false
  }
  mapping(address=>string[]) value;
  mapping(address=>mapping(address=>bool)) ownership;
  mapping(address=>Access[]) accessList;
  mapping(address=>mapping(address=>bool)) previousData;
  mapping(address=>address[]) requestList;

  function add(address _user,string memory url) public {
      require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
       value[_user].push(url);
  }
  function allow(address user) public  {//def
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
    require(msg.sender != _patient && ownership[_patient][msg.sender]==false, "Permission Already Granted");
    requestList[_patient].push(msg.sender);
  }
  function displayRequestList() public view returns(address[] memory){
    return requestList[msg.sender];
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


}
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