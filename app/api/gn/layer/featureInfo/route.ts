import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const layer = searchParams.get('layer');
    const x = searchParams.get('x');
    const y = searchParams.get('y');
    const h = searchParams.get('h');
    const w = searchParams.get('w');
    const bbox = searchParams.get('bbox');
    
    let url = `${process.env.NEXT_PUBLIC_GEONODE}/geoserver/ows?service=WMS&version=1.1.1&request=GetFeatureInfo&layers=${layer}&query_layers=${layer}&bbox=${bbox}&height=${h}&width=${w}&x=${x}&y=${y}&info_format=application/json`
    
    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
            },
        });
        // console.log(response)
        return NextResponse.json(response.data);

    } catch (error) {
        console.error('Error fetching GeoNode resources:', error);
        return NextResponse.json({ error: 'Failed to fetch GeoNode resources' }, { status: 500 });
    }
}
