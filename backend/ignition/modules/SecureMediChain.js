const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SecureMediChain", (m) => {
  const securemedichain = m.contract("SecureMediChain");
  return { securemedichain };
});
