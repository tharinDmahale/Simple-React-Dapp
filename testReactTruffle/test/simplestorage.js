const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", accounts => {
  
  let instance;

  beforeEach("should setup the contract instance", async () => {

    instance = await SimpleStorage.deployed();
  });
});
