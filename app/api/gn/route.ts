import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const url = `${process.env.NEXT_PUBLIC_GEONODE}/api/v2/?format=json`;

  try {
    // Make the request to GeoNode API to get API metadata
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    // Return the API metadata as JSON
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching API metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch API metadata' }, { status: 500 });
  }
}
