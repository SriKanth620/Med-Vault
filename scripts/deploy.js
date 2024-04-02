const hre = require("hardhat");

async function main() {
  const Mycontract1 = await hre.ethers.getContractFactory("Mycontract1");
  const mycontract1 = await Mycontract1.deploy();

  await mycontract1.deployed();

  const Mycontract2 = await hre.ethers.getContractFactory("Mycontract2");
  const mycontract2 = await Mycontract2.deploy(mycontract1.address);

  await mycontract2.deployed();

  console.log("Library1 deployed to:", mycontract1.address);
  console.log("Library2 deployed to:", mycontract2.address);
  console.log("MyContract1 Address in MyContract2:", await mycontract2.myContract1Address());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
