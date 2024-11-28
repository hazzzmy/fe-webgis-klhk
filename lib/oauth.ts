// utils/oauth.ts
import { OAUTH_CONFIG } from '../constants/oauth';

export const redirectToGeoNodeAuth = () => {
  const { CLIENT_ID, AUTH_URL, REDIRECT_URI, SCOPE } = OAUTH_CONFIG;

  const authUrl = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${SCOPE}`;

  window.location.href = authUrl; // Redirects the user to GeoNode for login
};
