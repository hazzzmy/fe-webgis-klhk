import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const layer = searchParams.get('layer');
    const simplify = searchParams.get('simplify') || 'false';
    const geometryOnly = searchParams.get('geometryOnly') || 'true';

    // XML body construction
    const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
    <wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
        <ows:Identifier>gs:Simplify</ows:Identifier>
        <wps:DataInputs>
            <wps:Input>
                <ows:Identifier>features</ows:Identifier>
                <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
                    <wps:Body>
                        <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:geonode="http://www.geonode.org/">
                            <wfs:Query typeName="${layer}">
                                ${geometryOnly === 'true' && '<wfs:PropertyName>geometry</wfs:PropertyName>'}
                            </wfs:Query>
                        </wfs:GetFeature>
                    </wps:Body>
                </wps:Reference>
            </wps:Input>
            ${simplify === 'true' && '<wps:Input><ows:Identifier>distance</ows:Identifier><wps:Data><wps:LiteralData>0.001</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>preserveTopology</ows:Identifier><wps:Data><wps:LiteralData>True</wps:LiteralData></wps:Data></wps:Input>'}
        </wps:DataInputs>
        <wps:ResponseForm>
            <wps:RawDataOutput mimeType="application/json">
                <ows:Identifier>result</ows:Identifier>
            </wps:RawDataOutput>
        </wps:ResponseForm>
    </wps:Execute>`;

    const url = `${process.env.NEXT_PUBLIC_GEONODE}/geoserver/ows?strict=true`;
    // const url = "https://stable.demo.geonode.org/geoserver/ows?strict=true"
    try {
        const response = await axios.post(url, xmlBody, {
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/json',
            },
        });

        return NextResponse.json(response.data);

    } catch (error) {
        console.error('Error fetching GeoNode resources:', error);
        return NextResponse.json({ error: 'Failed to fetch GeoNode resources' }, { status: 500 });
    }
}
