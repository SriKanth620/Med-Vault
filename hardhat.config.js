require("@nomicfoundation/hardhat-toolbox");
const PRIVATE_KEY =
  "438d61dd3179812cf9047f816347c78e9a68ff068255cb5b0a0a8d109fd856da";
// 0xbbd70e509752d78a0d963ad8b975d6103739ed95cefd16073ab9247c1c8bd458
// 438d61dd3179812cf9047f816347c78e9a68ff068255cb5b0a0a8d109fd856da
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
