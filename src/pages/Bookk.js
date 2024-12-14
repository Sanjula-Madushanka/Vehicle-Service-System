import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Bookk() {
  const location = useLocation();
  const { package: pkg } = location.state; // Retrieve the passed package data

  return (
    <div>
      <h1>Book Package: {pkg.packageName}</h1>

    </div>
  );
}
