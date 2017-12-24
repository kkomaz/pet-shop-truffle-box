import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dogImageMap from '../dogImageMap';
import isAdopted from '../utils/isAdopted';

class Pet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pending: false,
    }
  }

  render() {
    const {
      pet,
      adopter,
      index,
    } = this.props;

    return (
      <div className="panel-body">
        <img alt="140x140" data-src="holder.js/140x140" className="img-rounded img-center" style={{ width: '100%' }} src={dogImageMap(pet.picture)} data-holder-rendered="true" />
        <strong>Breed</strong>: <span className="pet-breed">{pet.breed}</span><br/>
        <strong>Age</strong>: <span className="pet-age">{pet.age}</span><br/>
        <strong>Location</strong>: <span className="pet-location">{pet.location}</span><br/><br/>
        <button
          className="btn btn-default btn-adopt"
          type="button"
          disabled={isAdopted(adopter)}
          onClick={() => this.props.adoptPet(index)}
        >
          {
            isAdopted(adopter) ? 'Success' : 'Adopt'
          }
        </button>
        <br />
        <strong>Owner: {(adopter)}</strong>
      </div>
    );
  }
}

Pet.propTypes = {
  pet: PropTypes.object,
  adopters: PropTypes.string,
  index: PropTypes.number.isRequired,
  adoptPet: PropTypes.func.isRequired,
}

export default Pet;
