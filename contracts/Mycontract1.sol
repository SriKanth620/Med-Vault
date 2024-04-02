// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract Mycontract1 {

    struct Access {
        address user;
        bool access;
    }

    mapping(address => string[]) public value;
    mapping(address => mapping(address => bool)) private ownership;
    mapping(address => Access[]) private accessList;
    mapping(address => mapping(address => bool)) private previousData;
    mapping(address => address[]) private requestList;

    function add(address _user, string memory url) public {
        require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access");
        value[_user].push(url);
    }

    function allow(address user) public {
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory) {
        require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access");
        return value[_user];
    }
    function displayForEmergency(address _user) public view returns (string[] memory) {
        
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    function requestToPatient(address _patient) public {
        require(msg.sender != _patient && !ownership[_patient][msg.sender], "Permission Already Granted");
        requestList[_patient].push(msg.sender);
    }

    function displayRequestList(address _patient) public view returns (address[] memory) {
        return requestList[_patient];
    }

    function requestAccept(address _doctor) public {
        removeRequest(msg.sender, _doctor);
        allow(_doctor);
    }

    function requestReject(address _doctor) public {
        removeRequest(msg.sender, _doctor);
        disallow(_doctor);
    }

    function addRecords(address _user, string memory url) public {
        add(_user, url);
    }

    function addPatientRecords(address _user, string memory url) public {
        add(_user, url);
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
