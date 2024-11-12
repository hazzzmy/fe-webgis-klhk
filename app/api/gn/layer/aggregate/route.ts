import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { feature } from '@turf/turf';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const layer = searchParams.get('layer');
    const attribute = searchParams.get('attribute');
    const type = searchParams.get('type');

    const xmlBody = `<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
        <ows:Identifier>gs:Aggregate</ows:Identifier>
        <wps:DataInputs>
            <wps:Input>
            <ows:Identifier>features</ows:Identifier>
            <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
                <wps:Body>
                <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:sf="http://www.openplans.org/spearfish">
                    <wfs:Query typeName="${layer}"/>
                </wfs:GetFeature>
                </wps:Body>
            </wps:Reference>
            </wps:Input>
            <wps:Input>
            <ows:Identifier>aggregationAttribute</ows:Identifier>
            <wps:Data>
                <wps:LiteralData>${attribute}</wps:LiteralData>
            </wps:Data>
            </wps:Input>
            <wps:Input>
            <ows:Identifier>function</ows:Identifier>
            <wps:Data>
                <wps:LiteralData>Count</wps:LiteralData>
            </wps:Data>
            </wps:Input>
            <wps:Input>
            <ows:Identifier>function</ows:Identifier>
            <wps:Data>
                <wps:LiteralData>Average</wps:LiteralData>
            </wps:Data>
            </wps:Input>
            <wps:Input>
            <ows:Identifier>function</ows:Identifier>
            <wps:Data>
                <wps:LiteralData>Sum</wps:LiteralData>
            </wps:Data>
            </wps:Input>
            <wps:Input>
            <ows:Identifier>function</ows:Identifier>
            <wps:Data>
                <wps:LiteralData>Min</wps:LiteralData>
            </wps:Data>
            </wps:Input>
            <wps:Input>
            <ows:Identifier>function</ows:Identifier>
            <wps:Data>
                <wps:LiteralData>Median</wps:LiteralData>
            </wps:Data>
            </wps:Input>
            <wps:Input>
            <ows:Identifier>function</ows:Identifier>
            <wps:Data>
                <wps:LiteralData>Max</wps:LiteralData>
            </wps:Data>
            </wps:Input>
            <wps:Input>
            <ows:Identifier>singlePass</ows:Identifier>
            <wps:Data>
                <wps:LiteralData>false</wps:LiteralData>
            </wps:Data>
            </wps:Input>
        </wps:DataInputs>
        <wps:ResponseForm>
            <wps:RawDataOutput mimeType="application/json">
            <ows:Identifier>result</ows:Identifier>
            </wps:RawDataOutput>
        </wps:ResponseForm>
        </wps:Execute>`

        let formattedData = []

        try {
            if(type=="string"){
            let url = `${process.env.NEXT_PUBLIC_GEONODE}/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typenames=${layer}&propertyName=${attribute}&count=6&outputFormat=application/json`
            const response = await axios.get(url, {
                headers: {
                    'Accept': 'application/json',
                },
                
            });

            // const acc:any = {}
            // response.data.features.map((feature: any, index: number) => {
            //     acc[`Sample${index}`] = feature.properties[`${attribute}`]
            // });

            const acc: any = {};
            response.data.features.forEach((feature: any, index: number) => {
                acc[`Sample${index}`] = feature.properties[`${attribute}`];
            });

            formattedData = acc

        }else{
            const url = `${process.env.NEXT_PUBLIC_GEONODE}/geoserver/ows?strict=true`;
            const response = await axios.post(url, xmlBody, {
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept': 'application/json',
                },
            });
    
            formattedData = response.data.AggregationFunctions.reduce((acc:any, func:any, index:number) => {
                acc[func.toLowerCase()] = response.data.AggregationResults[0][index];
                return acc;
            }, {});
              
        }
        
        const result = { 
            attribute:attribute,
            data: [formattedData] 
        };
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error fetching GeoNode resources:', error);
        return NextResponse.json({ error: 'Failed to fetch GeoNode resources' }, { status: 500 });
    }
}
