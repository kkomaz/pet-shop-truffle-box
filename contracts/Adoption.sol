pragma solidity ^0.4.4;

contract Adoption {
  /*[0x00, 0x00, .... 16 items]*/
  address[16] public adopters;

  // Adopting a pet.
  function adopt(uint petId) public returns (uint) {
    require(petId >= 0 && petId <= 15);

    adopters[petId] = msg.sender;
    return petId;
  }

  // Retrieve the adopters
  function getAdopters() public returns (address[16]) {
    return adopters;
  }
}
