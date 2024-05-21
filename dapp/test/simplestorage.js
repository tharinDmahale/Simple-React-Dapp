const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", accounts => {
  
  let instance;

  beforeEach("should setup the contract instance", async () => {

    instance = await SimpleStorage.deployed();
  });

  it("should get the value cookies", async () => {

    const cookiesVar = await instance.get();
    
    assert.equal(cookiesVar, "cookies");
  });

  it("should set the value candy", async () => {

    await instance.set("candy");
    const candyVar = await instance.get();
    
    assert.equal(candyVar, "candy");
  });
});
