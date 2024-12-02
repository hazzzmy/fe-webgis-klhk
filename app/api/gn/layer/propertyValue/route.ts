import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import xml2js from 'xml2js';

const handlePropertyMapping = (propertiesArray: any[], property: string[]) => {
    // Map the object keys based on the provided property, excluding 'ogc_fid'
    return propertiesArray.map((item: any) => {
        // Filter out 'ogc_fid' and map the object keys based on the property array
        const filteredItem = Object.keys(item)
            .filter((key) => !key.includes('ogc_fid'))  // Exclude 'ogc_fid'
            .reduce((acc, key) => {
                acc[key] = item[key];
                return acc;
            }, {} as any);

        // Now, reorder the object based on the 'property' array if it's provided
        const sortedItem = property.reduce((acc, header) => {
            if (filteredItem.hasOwnProperty(header)) {
                acc[header] = filteredItem[header];  // Add the property in the sorted order
            }
            return acc;
        }, {} as any);

        return sortedItem;
    });
}


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const layer = searchParams.get('layer');
    console.log("🚀 ~ GET ~ layer:", layer)
    
    const property = searchParams.get('property');
    const bbox = searchParams.get('bbox');
    const cql_filter = searchParams.get('cql_filter');
    const agg = searchParams.get('agg');
    const metric = searchParams.get('metric');

    let url = `${process.env.NEXT_PUBLIC_GEONODE}/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typenames=${layer}&outputFormat=application/json`

    let urlGetAttributeList = `${process.env.NEXT_PUBLIC_GEONODE}/geoserver/ows?service=wfs&version=2.0.0&typeNames=${layer}&request=DescribeFeatureType&outputFormat=application/json`
    
    
    
    const getAttributeList = await axios.get(urlGetAttributeList, {
        headers: {
            'Accept': 'application/json',
        },
    });
    console.log("🚀 ~ GET ~ urlGetAttributeList:", urlGetAttributeList)

    const geometryTypes = [
        "Point", "LineString", "Polygon", "MultiPoint",
        "MultiLineString", "MultiPolygon", "GeometryCollection"
    ];


    const geometryProperty = getAttributeList.data.featureTypes[0].properties.find((feature: any) =>
        geometryTypes.includes(feature.localType)
    );

    if (!property) {
        let attributeList = getAttributeList.data.featureTypes[0].properties.map((property: any) => property.name);
        attributeList = attributeList.filter((attributeList: any) => attributeList !== geometryProperty.name);

        url += `&propertyName=${attributeList.join(',')}`
    } else {
        url += `&propertyName=${property}`
    }

    const params = {
        cql_filter: '',
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

    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
            },
        });

        let propertiesArray = response.data.features.map((feature: any) => feature.properties);

        if (property && !property.includes('ogc_fid')) {
            propertiesArray = handlePropertyMapping(propertiesArray, property.split(','))
        }

        if (property && agg) {
            const aggregations = agg.split(',');
            const params = property.split(',');

            const groupByParams = ({ data, params, aggregations }: any) => {
                const groupedData = new Map();

                const createInitialObject = () => {
                    const initialObject: any = {};
                    aggregations.forEach((aggr: any, index: number) => {
                        const paramName = params[index];

                        if (aggr == "sum"){
                            initialObject[`total_${paramName}`] = 0;
                        }else{
                            initialObject[`${aggr}_${paramName}`] = 0;
                        }
                    });
                    return initialObject;
                };

                data.forEach((row: any) => {
                    const key = row[params[0]]


                    if (!groupedData.has(key)) {
                        groupedData.set(key, createInitialObject());
                    }

                    const group = groupedData.get(key);

                    params.forEach((param: any, index:any) => {
                        const aggType = aggregations[index];
                        const value = parseFloat(row[param]) || 0;

                        if (aggType === 'count') {
                            group[`count_${params[index]}`] += 1;
                        } else if (aggType === 'sum') {
                            group[`total_${params[index]}`] += value;
                        }
                    });
                });

                return Array.from(groupedData.entries()).map(([key, group]) => {
                    return { [params[0]]: key, ...group };
                });
            }

            let result:any = groupByParams({ data: propertiesArray, params, aggregations})
            
            if (metric) {
                if (aggregations[0] === 'sum') {
                    const metricResult = {
                        label: `Total ${params[0]}`,
                        value: result.reduce((sum:any, item:any) => sum + (item[`total_${params[0]}`] || 0), 0) // Handle missing or undefined properties
                    };
                    result = metricResult
                } else if (aggregations[0] === 'count') {
                    const metricResult = {
                        label: `Count ${params[0]}`,
                        value: result.reduce((count:any, item:any) => count + 1, 0) // Handle missing or undefined properties
                    };
                    result = metricResult
                }
            }
            propertiesArray = result
        }


        return NextResponse.json(propertiesArray);

    } catch (error) {
        console.error('Error fetching GeoNode resources:', error);
        return NextResponse.json({ error: 'Failed to fetch GeoNode resources' }, { status: 500 });
    }

}