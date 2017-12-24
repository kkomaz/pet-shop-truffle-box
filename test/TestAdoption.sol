pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
  Adoption adoption = Adoption(DeployedAddresses.Adoption());

  // Testing the adopt() function
  function testUserCanAdoptPet() {
    uint returnedId = adoption.adopt(8);
    uint expected = 8;

    Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
  }

  // Testing a retrieval of a single pet's owner.
  function testGetAdopterAddressByPetId() {
    // Since the TestAdoption contract will be sending the transaction, we set the expected value to this,
    // a contract-wide variable that gets the current contract's address.
    address expected = this;

    address adopter = adoption.adopters(8);
    Assert.equal(adopter, expected, "Owner of pet ID 8 should be recorded.");
  }

  function testGetAdopterAddressByPetIdInArray() {
    address expected = this;
    address[16] memory adopters = adoption.getAdopters();

    Assert.equal(adopters[8], expected, "Owner of pet ID 8 should be recorded");
  }
}
