import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrderLocation } from '../../actions/orders'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import './forms.css'

class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = { address: this.props.address };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          address: address
        })
        this.props.updateOrderLocation(this.props.orderId, address, latLng.lat, latLng.lng)
      })
      .catch(error => console.error('Error', error));
  };

  truncateString = (string) => {
    if (string.length > 40) {
      return string.substring(0, 40) + '...'
    } else {
      return string
    }
  }

  renderFlash = () => {
    if (this.props.flash) {
      return (<div className="suggestion-item" style={{color: 'red', padding: '0 0 0 20px', margin: '5px 0 0 0', border: '0px solid blue', height: '10px', lineHeight: '10px'}}>{this.props.flash}</div>)
    }
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Enter a tailgate location...',
                className: 'location-search-input',
                spellCheck: false
              })}
            />
            <div className="autocomplete-dropdown-container">
              {this.renderFlash()}
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                if (i < 3) {
                  const className = suggestion.active
                    ? 'suggestion-item-active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                      })}
                    >
                      <img src={require('../../images/location_icon2.png')} style={{margin: '0 5px 0 0'}}/><span>{this.truncateString(suggestion.description)}</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default connect(null, { updateOrderLocation })(LocationSearchInput)
