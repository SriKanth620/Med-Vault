const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  await upload.deployed();

  const Upload2 = await hre.ethers.getContractFactory("Upload2");
  const upload2 = await Upload2.deploy();

  await upload2.deployed();

  console.log("Library1 deployed to:", upload.address);
  console.log("Library2 deployed to:", upload2.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
