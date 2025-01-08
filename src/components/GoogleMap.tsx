import React from 'react';
import { GoogleMap as GoogleMapComponent, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 55.676098, // Copenhagen coordinates
  lng: 12.568337
};

export function GoogleMap() {
  return (
    <iframe
      title="map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2249.8887850391297!2d12.5614!3d55.6761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652531704a2b9cd%3A0x536b2b7c81dd9502!2sMagistervej%2054%2C%202400%20K%C3%B8benhavn!5e0!3m2!1sen!2sdk!4v1635959562000!5m2!1sen!2sdk"
      className="w-full h-full rounded-lg"
      loading="lazy"
    />
  );
}
