import React, { Component } from 'react'
import _ from 'lodash';
import AdoptionContract from '../build/contracts/Adoption.json'
import { petsArray } from './pets.js';
import getWeb3 from './utils/getWeb3'
import Pet from './components/Pet';
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: {},
      adoptionContract: null,
      pets: [],
      adopters: [],
      blockNumber: null,
    }

    this.adoptPet = this.adoptPet.bind(this);
    this.getBlockNumber = this.getBlockNumber.bind(this);
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      }, () => {
        this.getBlockNumber()
        this.instantiateContract()
        this.fetchPets();
      });
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  getBlockNumber() {
    this.state.web3.eth.getBlockNumber((error, block) => {
      this.setState({ blockNumber: block });
    });
  }

  fetchPets() {
    this.setState({ pets: petsArray });
  }

  adoptPet(item) {
    const { adoptionContract } = this.state;
    const newAdopters = this.state.adopters;

    this.state.web3.eth.getAccounts((error, accounts) => {
      adoptionContract.deployed().then((instance) => {
        return instance.adopt(item, { from: accounts[0]})
          .then((result) => {
            this.state.web3.eth.getTransactionReceiptMined(result.tx)
              .then((newResult) => {
                newAdopters[item] = accounts[0];
                this.setState({
                  blockNumber: newResult.blockNumber,
                  adopters: newAdopters
                })
              });
          })
          .catch((err) => {
            console.log(err.message);
          })
      });
    });
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const adoption = contract(AdoptionContract);
    adoption.setProvider(this.state.web3.currentProvider)

    adoption.deployed().then((instance) => {
      return instance.getAdopters.call().then((result) => {
        this.setState({
          adopters: result,
          adoptionContract: adoption
        });
      });
    });
  }

  render() {
    const {
      pets,
      adopters
    } = this.state

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-sm-push-2">
              <h1 className="text-center">Pete's Pet Shop</h1>
              <hr/>
              <br/>
            </div>
          </div>

          <div id="petsRow" className="row">
            {
              _.map(pets, (pet, index) => {
                return (
                  <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
                    <div className="panel panel-default panel-pet">
                      <div className="panel-heading">
                        <h3 className="panel-title">{pet.name}</h3>
                      </div>
                    </div>
                    <Pet
                      pet={pet}
                      adopter={adopters[index]}
                      index={index}
                      adoptPet={this.adoptPet}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App
