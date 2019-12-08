import React from "react";
import s from './index.module.css';
import Geolocation from 'react-geolocation';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class Console extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    address:'',
    latLng: [],
    data:[],
    lat: 0,
    lng: 0,
  };
}


handleSelect = address => {
  geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => this.props.updateLatLng(latLng))
    .catch(error => console.error('Error', error));
};

handleChange = address => {
  this.setState({ address });
};

  render() {
    return (
      <div style={{padding: "20px 0px 0px 0px", margin: "0px 0px 20px 0px"}} className="block-heading">
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="input-group">
              <input className="form-control" type="text"
                {...getInputProps({
                  placeholder: 'Znajdź miasto ... ',
                })}
              />
              <div className ={s.searchBlock}>
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  const style = suggestion.active
                    ? { backgroundColor: '#edc60f', cursor: 'pointer', color: 'white' }
                    : { backgroundColor: '#090100',opacity: '.7',color:'white', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}

                    >
                      <span
                        onClick={()=>{this.setState({address:suggestion.description})}}
                        className={s.suggestion}>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
              <div className="input-group-append">
                <button className="btn btn-primary" type="button" style={{backgroundColor: '#edc60f'}} onClick={this.props.searchButton}>Szukaj!</button>
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}

export default Console;
