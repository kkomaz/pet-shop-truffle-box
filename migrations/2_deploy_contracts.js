var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Adoption = artifacts.require("./Adoption.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Adoption);
};
