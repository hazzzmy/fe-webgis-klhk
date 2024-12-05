import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { objectToUrl, urlToObject } from '@/lib/utils';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    // Extract query parameters from the request
    const page = searchParams.get('page') || 1;
    const page_size = searchParams.get('page_size') || 10;
    const search = searchParams.get('search') || '';
    const subtype = searchParams.get('subtype') || 'all';
    const favorite = searchParams.get('favorite');
    const featured = searchParams.get('featured');
    const isPublished = searchParams.get('is_published');
    const isApproved = searchParams.get('is_approved');
    const category = searchParams.get('category');
    // const keywords = searchParams.get('keywords');
    const regions = searchParams.get('regions');
    const owner = searchParams.get('owner');
    const extent = searchParams.get('extent');
    const resource_type = searchParams.get('type') || 'all';
    const island = searchParams.get('island');
    const year = searchParams.get('year');
    
    let url = `${process.env.NEXT_PUBLIC_GEONODE}/api/v2/resources?page=${page}&page_size=${page_size}`;
    
    if (search) {
        url += `&search=${search}&search_fields=title&search_fields=abstract`;
    }

    let keywords:string[]= []
    
    if (island != 'all'){
        keywords.push(island as string)
    }
    if (year != 'all'){
        keywords.push(year as string)
    }


    let defaultResourceTypes = ['map', 'dataset'];
    if(resource_type != 'all'){
        defaultResourceTypes = [resource_type as string];
    }else{
        defaultResourceTypes = ['map', 'dataset'];
    }
    defaultResourceTypes.forEach((type:string)=>{
        url += `&filter{resource_type.in}=${type}`
    })
    
    let defaultSubType = ['raster', 'vector','vector-time','remote'];
    if(subtype != 'all'){
        defaultSubType = [subtype as string];
    }else{
        defaultSubType = ['raster', 'vector','vector-time','remote'];
    }

    if (resource_type != 'map'){
        defaultSubType.forEach((type:string)=>{
            url += `&filter{subtype.in}=${type}`
        })
    }

    if (keywords.length>0){
        keywords.forEach((keyword:string)=>{
            url += `&filter{keywords.name.in}=${keyword}`
        })
    }
    
    if (favorite) url += `&favorite=${favorite}`;
    if (featured) url += `&filter{featured}=${featured}`;
    if (isPublished) url += `&filter{is_published}=${isPublished}`;
    if (isApproved) url += `&filter{is_approved}=${isApproved}`;
    if (category) url += `&filter{category.identifier}=${category}`;
    if (regions) url += `&filter{regions.name}=${regions}`;
    if (owner) url += `&filter{owner.username}=${owner}`;
    if (extent) url += `&extent=${extent}`;

    console.log(url)

    try {
        // Make the Axios request to the GeoNode API
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
            },
        });

        const { links, total, page, page_size } = response.data;

        const filteredResources = response.data.resources.map((resource: any) => {
            
            let metadataUrl = null;
            let legendUrl = null;
            let wmsUrl = null;
            let wmsLayerName = null;
            let bbox = null;

            if (resource_type != 'map'){

                const resourceLinks = resource.links.reduce((acc: { [key: string]: any }, link: any) => {
                    const term = ["PNG", "ISO", "Legend"].find(term => link.name.includes(term));
                
                    if (term) {
                        acc[term] = link.url;
                    }
                
                    return acc;
                }, {});

                
                metadataUrl = resourceLinks.ISO
                legendUrl = resourceLinks.Legend
                wmsUrl = resourceLinks.PNG
    
                const wmsUrlObj = urlToObject(wmsUrl)
                wmsLayerName = wmsUrlObj.params['layers']
                 
                wmsUrlObj.params['srs'] = 'EPSG:3857';
                // wmsUrlObj.params['width'] = '256';
                // wmsUrlObj.params['height'] = '256';
                wmsUrlObj.params['transparent'] = 'true';
    
                delete wmsUrlObj.params['bbox'];
    
                wmsUrl = objectToUrl(wmsUrlObj.baseUrl,wmsUrlObj.params);
                wmsUrl += "&bbox={bbox-epsg-3857}";
    
                const urlObj = urlToObject(wmsUrl);
                bbox = urlObj.params['bbox'];
            }

            return {
            pk: resource.pk,
            uuid: resource.uuid,
            resource_type: resource.resource_type,
            owner: {
                username: resource.owner.username,
                avatar: resource.owner.avatar,
                email: resource.owner.email,
            },
            // poc: resource.poc.map((poc: any) => ({
            //     username: poc.username,
            //     avatar: poc.avatar,
            //     email: poc.email,
            // })),
            // metadata_author: resource.metadata_author.map((author: any) => ({
            //     username: author.username,
            //     avatar: author.avatar,
            //     email: author.email,
            // })),
            keywords: resource.keywords.map((keyword: any) => ({
                name: keyword.name,
                slug: keyword.slug
            })),
            regions: resource.regions,
            category: resource.category,
            title: resource.title,
            abstract: resource.abstract,
            attribution: resource.attribution,
            bbox_polygon: resource.bbox_polygon,
            srid: resource.srid,
            date: resource.date,
            date_type: resource.date_type,
            group: resource.group,
            featured: resource.featured,
            advertised: resource.advertised,
            is_published: resource.is_published,
            is_approved: resource.is_approved,
            created: resource.created,
            last_updated: resource.last_updated,
            state: resource.state,
            subtype: resource.subtype,
            sourcetype: resource.sourcetype,
            extent: resource.extent,
            favorite: resource.favorite,
            thumbnail_url: resource.thumbnail_url,
            metadata_url: metadataUrl,
            wms_url: wmsUrl,
            wms_layer_name : wmsLayerName,
            legend_url : legendUrl,
            bbox: bbox,
            }
        });

        return NextResponse.json({
            links: {
                "next":links.next,
                "previous":links.previous
            },
            total,
            page,
            page_size,
            resources: filteredResources,
        });

    } catch (error) {
        console.error('Error fetching GeoNode resources:', error);
        return NextResponse.json({ error: 'Failed to fetch GeoNode resources' }, { status: 500 });
    }
}
