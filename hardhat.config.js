require("@nomicfoundation/hardhat-toolbox");
const PRIVATE_KEY="private key";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
 
  networks: {
    // hardhat: {
    //   chainId: 1337,
    // },
    localhost: {
      url: "http://localhost:7545",
      accounts: [PRIVATE_KEY],
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
// hardhat: {
//   chainId: 1337,
// },0x5FbDB2315678afecb367f032d93F642f64180aa3
