import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const layer = searchParams.get('layer');
    
    let url = `${process.env.NEXT_PUBLIC_GEONODE}/geoserver/ows?service=wfs&version=2.0.0&typeNames=${layer}&request=DescribeFeatureType&outputFormat=application/json`
    
    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
            },
        });

        return NextResponse.json(response.data);

    } catch (error) {
        console.error('Error fetching GeoNode resources:', error);
        return NextResponse.json({ error: 'Failed to fetch GeoNode resources' }, { status: 500 });
    }
}
