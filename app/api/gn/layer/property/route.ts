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
        
        const geometryTypes = [
            "Point", "LineString", "Polygon", "MultiPoint", 
            "MultiLineString", "MultiPolygon", "GeometryCollection"
        ];


        const geometryProperty = response.data.featureTypes[0].properties.find((feature:any) =>
            geometryTypes.includes(feature.localType)
        );
        
        const geometry = {
            name:geometryProperty.name,
            geomType:geometryProperty.localType
        }


        let attributeList = response.data.featureTypes[0].properties.map((property:any) => property.name);
        attributeList = attributeList.filter((attributeList:any) => attributeList !== geometryProperty.name);
        
        const result = {
            featureTypes: response.data.featureTypes[0].properties,
            geometry: geometry,
            attributeList: attributeList
        }
        
        return NextResponse.json(result);        

    } catch (error) {
        console.error('Error fetching GeoNode resources:', error);
        return NextResponse.json({ error: 'Failed to fetch GeoNode resources' }, { status: 500 });
    }
}
