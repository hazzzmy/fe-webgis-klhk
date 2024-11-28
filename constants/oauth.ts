// constants/oauth.ts
export const OAUTH_CONFIG = {
    CLIENT_ID: 'ffRFcGzorpEncfGEwh945SRJmHnLN2YdpAxfqwNd', // Replace with your GeoNode client ID
    CLIENT_SECRET: 'qQxWdqABIJdJuKB4T2cdwHUkcAl4jQYVLtROIHtfBtnBY37NdvD2HVjaqZgeYEa648s3Kq1vQTzAUcqkLbVD6kUltj3bgUApQI6L2BkXHIlsC4co5yx6XI8gf9AnOYcT', // Replace with your GeoNode client secret
    AUTH_URL: 'https://geonode.geoportal.co.id/o/authorize/',
    TOKEN_URL: 'https://geonode.geoportal.co.id/o/token/',
    REDIRECT_URI: 'http://172.20.10.9:3000/api/gn/auth', // Change to your deployed app URL
    SCOPE: 'openid write', // Adjust scope based on your needs
};  