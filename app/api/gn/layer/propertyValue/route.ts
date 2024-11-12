import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import xml2js from 'xml2js';


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const layer = searchParams.get('layer');
    const property = searchParams.get('property');

    const bbox = searchParams.get('bbox');
    const cql_filter = searchParams.get('cql_filter');

    let url = `${process.env.NEXT_PUBLIC_GEONODE}/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typenames=${layer}&outputFormat=application/json`

    let urlGetAttributeList = `${process.env.NEXT_PUBLIC_GEONODE}/geoserver/ows?service=wfs&version=2.0.0&typeNames=${layer}&request=DescribeFeatureType&outputFormat=application/json`
    
    const getAttributeList = await axios.get(urlGetAttributeList, {
        headers: {
            'Accept': 'application/json',
        },
    });

    const geometryTypes = [
        "Point", "LineString", "Polygon", "MultiPoint", 
        "MultiLineString", "MultiPolygon", "GeometryCollection"
    ];


    const geometryProperty = getAttributeList.data.featureTypes[0].properties.find((feature:any) =>
        geometryTypes.includes(feature.localType)
    );
    
    console.log(property)
    if (!property) {
        let attributeList = getAttributeList.data.featureTypes[0].properties.map((property:any) => property.name);
        attributeList = attributeList.filter((attributeList:any) => attributeList !== geometryProperty.name);
        
        url += `&propertyName=${attributeList.join(',')}`
    }else{
        url += `&propertyName=${property}`
    }

    const params = {
        cql_filter : '',
    }

    if (cql_filter && bbox) {
        params.cql_filter = `${cql_filter} AND BBOX(${geometryProperty.name}, ${bbox},'EPSG:4326')`;
    } else if (cql_filter) {
        params.cql_filter = `${cql_filter}`;
    } else if (bbox) {
        params.cql_filter = `BBOX(${geometryProperty.name}, ${bbox}, 'EPSG:4326')`;
    }
    
    
    const queryString = new URLSearchParams(params).toString();
    url = `${url}&${queryString}`;

    console.log(url)

    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
            },
        });
        const propertiesArray = response.data.features.map((feature:any) => feature.properties);

        return NextResponse.json(propertiesArray);

    } catch (error) {
        console.error('Error fetching GeoNode resources:', error);
        return NextResponse.json({ error: 'Failed to fetch GeoNode resources' }, { status: 500 });
    }
}