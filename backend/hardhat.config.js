require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");

const INFURA_PROJECT_ID = '04fbac3771a742b8a64409c30fb5fa29';
const PRIVATE_KEY = '645c21005498e188f633cfaf1ddccf7ada1944aa2afa3b5bf503f3d19a6d59b7';
const ETHERSCAN_API_KEY = '5BW12TR782BVK49BRAFRST4VZDV4F1PK88';

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
};
