// components/LoginButton.tsx
import React from 'react';
// import { redirectToGeoNodeAuth } from '../utils/oauth';
import { redirectToGeoNodeAuth } from '@/lib/oauth';

const GeonodeLoginButton: React.FC = () => {
  const handleLogin = () => {
    redirectToGeoNodeAuth();
  };

  return (
    <button
      onClick={handleLogin}
      className="m-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Login with GeoNode
    </button>
  );
};

export default GeonodeLoginButton;
