import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map({todos, getlang, getlat}) {
    const defaultProps = {
        center: {
            lat: 18.5204,
            lng: 73.8567
        },
        zoom: 11
      };
      

      // useEffect(() => {
      //     getlang(lang)
      //     getlat(lat)
      //     return () => {
      //       console.log("This will be logged on unmount");
      //     }
      //   }, [getlang, getlat]);


  return (
    <div className='bg-slate-900 h-[15rem] rounded-[12px] text-center'>
         <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBqgeC-Uw3oHZgQD6-n3CX47BZ5p4xaX-8"}}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={ev => {
        console.log("latitide = ", ev.lat);
        getlang(ev.lng)
        getlat(ev.lat)
        console.log("longitude = ", ev.lng);
        }}
      >
      {todos.map(val => (
      <Marker
    lat={val.lat}
    lng={val.lang}
    text="My Marker"
    color="blue"
    id={val.id}
  />
))}
      </GoogleMapReact>
    </div>
  )
}
