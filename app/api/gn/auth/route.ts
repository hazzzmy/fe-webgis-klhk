import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  console.log(code);

  if (!code) {
    return NextResponse.json({ error: 'Authorization code not found in the URL' });
  }

  try {
    // Step 2: Exchange the authorization code for an access token
    const tokenResponse = await fetch('https://geonode.geoportal.co.id/o/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: 'ffRFcGzorpEncfGEwh945SRJmHnLN2YdpAxfqwNd', // Your client ID
        client_secret: 'qQxWdqABIJdJuKB4T2cdwHUkcAl4jQYVLtROIHtfBtnBY37NdvD2HVjaqZgeYEa648s3Kq1vQTzAUcqkLbVD6kUltj3bgUApQI6L2BkXHIlsC4co5yx6XI8gf9AnOYcT', // Your client secret
        redirect_uri: 'http://172.20.10.9:3000/api/gn/auth', // Your redirect URI
        scope:'openid write'
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch the access token');
    }

    const tokenData = await tokenResponse.json();
    console.log("🚀 ~ GET ~ tokenData:", tokenData.access_token);

    // Set access_token and refresh_token cookies
    const accessTokenCookie = serialize('access_token', tokenData.access_token, { path: '/' });
    const refreshTokenCookie = serialize('refresh_token', tokenData.refresh_token, { path: '/' });

    // Simulating the login by setting sessionid cookie (if GeoNode uses this method)
    // const sessionidCookie = serialize('sessionid', 'your_generated_sessionid_here', { path: '/' }); // Replace with actual session ID

    // Return a redirect response and set the cookies in the header
    const response = NextResponse.redirect('https://geonode.geoportal.co.id/#/');
    response.headers.set('Set-Cookie', accessTokenCookie);
    response.headers.set('Set-Cookie', refreshTokenCookie);
    // response.headers.set('Set-Cookie', sessionidCookie); // Set sessionid cookie

    console.log('Set-Cookie:', accessTokenCookie);
    console.log('Set-Cookie:', refreshTokenCookie);
    // console.log('Set-Cookie:', sessionidCookie);

    return response;

  } catch (error) {
    console.error('Error during OAuth token exchange:', error);
    return NextResponse.json({ error: 'An error occurred during the token exchange' }, { status: 500 });
  }
}
