import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateOrderStatus } from '../../actions/orders'

import GoogleMapReact from 'google-map-react';

import '../products/products.css'

class PaidOrderDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: this.props.order.lat,
        lng: this.props.order.lng
      },
      zoom: 17
    }
  }

  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: this.state.center,
      map,
      title: 'Hello World!'
    });
  }

  handleConfirm = () => {
    this.props.updateOrderStatus(this.props.order.id, 'Complete')
  }

  render() {
    return (
      <div className="screen-container fade-in-fast">
        <div className="screen"></div>
        <div className="paid-order-details-container">
          <div className="paid-order-details-header">
            You have been charged {this.props.order.display_total} and your order is headed to:
          </div>
          <div className="paid-order-details-map-container">
            <div className="paid-order-details-map-container-address">
              <img src={require('../../images/location_icon2.png')}  style={{padding: '0 5px 0 0', margin: '0 0 -1px 0'}}/>{this.props.order.address}
            </div>
            <div id="order-details-map">
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDWROpJSOG7_HNTs9NOcrQJLhalwFxlvS0' }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
                onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
              >
              </GoogleMapReact>
            </div>
          </div>
          <div>
            <div className="blue-round-button" onClick={this.handleConfirm}>Confirm Delivery</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order.order
  }
}

export default connect(mapStateToProps, { updateOrderStatus })(PaidOrderDetailsContainer);
