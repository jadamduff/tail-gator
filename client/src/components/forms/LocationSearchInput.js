import React, { Component } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import './forms.css'

export default class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
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
        console.log('Success', latLng)
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
                placeholder: 'Enter tailgate location...',
                className: 'location-search-input',
                spellCheck: false
              })}
            />
            <div className="autocomplete-dropdown-container">
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
                      <img src={require('../../images/location_icon2.png')} style={{margin: '0 5px 0 0'}}/>'<span style={{overflow: 'hidden', textOverflow: 'hidden'}}>{this.truncateString(suggestion.description)}</span>
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
