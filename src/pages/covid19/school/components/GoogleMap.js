import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { getBCSchoolsCOVID19GoogleMapSummary } from '../services/schoolsDashBoard';
import { message, Badge, Tag } from 'antd';

// InfoWindow component
const InfoWindow = (props) => {
  const { place } = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 130,
    left: '-45px',
    width: 280,
    backgroundColor: 'rgba(255,255,255,0.85)',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>{place.schoolName}</div>
      <div style={{ fontSize: 14 }}>
        <Tag
          style={{
            textAlign: 'right',
            minWidth: '50px',
            border: 'none',
            backgroundColor: 'rgba(255,255,255,1)',
          }}
        >
          total:
        </Tag>
        {place.count}
      </div>
      <div style={{ fontSize: 14 }}>
        <Tag
          style={{
            textAlign: 'right',
            minWidth: '50px',
            border: 'none',
            backgroundColor: 'rgba(255,255,255,1)',
          }}
        >
          grade:
        </Tag>
        {place.gradeRange}
      </div>
      <div style={{ fontSize: 14 }}>
        <Tag
          style={{
            textAlign: 'right',
            minWidth: '50px',
            border: 'none',
            backgroundColor: 'rgba(255,255,255,1)',
          }}
        >
          total:
        </Tag>
        {place.enrolmentTotal} (enrolment total)
      </div>
      {/* <div style={{fontSize: 14}}> */}
      {/*  <span style={{color: 'grey'}}> */}
      {/*    {place.rating} */}
      {/*    {' '} */}
      {/*  </span> */}
      {/*  <span style={{color: 'orange'}}> */}
      {/*    {String.fromCharCode(9733).repeat(Math.floor(place.rating))} */}
      {/*  </span> */}
      {/*  <span style={{color: 'lightgrey'}}> */}
      {/*    {String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))} */}
      {/*  </span> */}
      {/* </div> */}
    </div>
  );
};

// Marker component
const Marker = ({ show, place }) => {
  const markerStyle = {
    // fontSize: 12,
    // color: show ? 'green' : 'red',
    // border: '1px red',
    // borderRadius: '50%',
    // height: 20,
    // width: 20,
    // backgroundColor: show ? 'red' : 'blue',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <>
      <div style={markerStyle}>
        <a href={place.webSite} target={'blank'}>
          <Badge count={place.count} dot={false} size={'default'} title={''} />
        </a>
      </div>
      {show && <InfoWindow place={place} />}
    </>
  );
};

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    getBCSchoolsCOVID19GoogleMapSummary()
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getBCSchoolsCOVID19GoogleMapSummary - ${response.status}`);
          throw new Error(`Error: getBCSchoolsCOVID19GoogleMapSummary - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        // setBCSchoolsCOVID19(data.content);
        // setTotal(data.totalElements);
        data.forEach((result) => {
          result.show = false; // eslint-disable-line no-param-reassign
        });
        this.setState({ places: data });
      })
      .catch((e) => {
        console.log(`getBCSchoolsCOVID19GoogleMapSummary - ${e}`);
        message.error(`getBCSchoolsCOVID19GoogleMapSummary!${e}`).then(() => {});
      });
  }

  // onChildClick callback can take two arguments: key and childProps
  onChildEnterCallback = (key) => {
    this.setState((state) => {
      const index = state.places.findIndex((e) => {
        return e.schoolCode === key;
      });
      state.places[index].show = true; // eslint-disable-line no-param-reassign
      return { places: state.places };
    });
  };

  // onChildClick callback can take two arguments: key and childProps
  onChildLeaveCallback = (key) => {
    this.setState((state) => {
      const index = state.places.findIndex((e) => {
        return e.schoolCode === key;
      });
      state.places[index].show = false; // eslint-disable-line no-param-reassign
      return { places: state.places };
    });
  };

  render() {
    const { places } = this.state;

    return (
      <>
        <GoogleMapReact
          resetBoundsOnResize={true}
          defaultZoom={11}
          defaultCenter={[49.2, -122.9]}
          bootstrapURLKeys={{ key: 'AIzaSyC3LSbHlnYCZSlG5aWQE3hBJYFt8E9KgxowJ8' }}
          onChildMouseEnter={this.onChildEnterCallback}
          onChildMouseLeave={this.onChildLeaveCallback}
        >
          {places.map((place) => {
            return (
              <Marker
                key={place.schoolCode}
                lat={place.latitude}
                lng={place.longitude}
                show={place.show}
                place={place}
              />
            );
          })}
        </GoogleMapReact>
      </>
    );
  }
}

// InfoWindow.propTypes = {
//   place: PropTypes.shape({
//     name: PropTypes.string,
//     formatted_address: PropTypes.string,
//     rating: PropTypes.number,
//     types: PropTypes.arrayOf(PropTypes.string),
//     price_level: PropTypes.number,
//     opening_hours: PropTypes.shape({open_now: PropTypes.bool,}),
//   }).isRequired,
// };
//
// Marker.propTypes = {
//   show: PropTypes.bool.isRequired,
//   place: PropTypes.shape({
//     name: PropTypes.string,
//     formatted_address: PropTypes.string,
//     rating: PropTypes.number,
//     types: PropTypes.arrayOf(PropTypes.string),
//     price_level: PropTypes.number,
//     opening_hours: PropTypes.shape({open_now: PropTypes.bool,}),
//   }).isRequired,
// };

export default GoogleMap;
