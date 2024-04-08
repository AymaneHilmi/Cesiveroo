import React, { useState } from 'react';
import { MapContainer, TileLayer, Rectangle } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const center = [51.505, -0.09]; // Centre de la carte

function MapScreen() {
  const [rectangleBounds, setRectangleBounds] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction pour effectuer une recherche
  const handleSearch = async (query) => {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query });
    if (results.length > 0) {
      const { x, y } = results[0];
      // Définir le rectangle aux coordonnées du résultat de la recherche
      setRectangleBounds([[y - 0.01, x - 0.01], [y + 0.01, x + 0.01]]);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(searchQuery);
          }
        }}
      />

      {/* Carte */}
      <MapContainer center={center} zoom={13} style={{ height: '80%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Rectangle */}
        {rectangleBounds && <Rectangle bounds={rectangleBounds} color="red" />}

      </MapContainer>
    </div>
  );
}

export default MapScreen;
