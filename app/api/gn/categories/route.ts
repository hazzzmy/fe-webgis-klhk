import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    // Extract query parameters from the request
    const page = searchParams.get('page') || 1;
    const page_size = searchParams.get('page_size') || 20;
    const search = searchParams.get('search') || '';
    const ordering = searchParams.get('ordering');

    // Base URL for GeoNode categories API
    let url = `${process.env.NEXT_PUBLIC_GEONODE}api/v2/categories?format=json&page=${page}&page_size=${page_size}`;

    // Append search filters if provided
    if (search) {
        url += `&search=${search}`;
    }

    // Append ordering if provided
    if (ordering) {
        url += `&ordering=${ordering}`;
        
    }
    
    // console.log("🚀 ~ GET ~ url:", url)


    try {
        // Make the Axios request to the GeoNode API
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
            },
        });
        
        return NextResponse.json(response.data);

        // const { links, total, page, page_size } = response.data;

        // const filteredCategories = response.data.categories.map((category: any) => ({
        //     id: category.id,
        //     identifier: category.identifier,
        //     name: category.name,
        //     description: category.description,
        //     slug: category.slug,
        //     created_at: category.created_at,
        //     updated_at: category.updated_at,
        // }));

        // return NextResponse.json({
        //     links: {
        //         "next": links.next,
        //         "previous": links.previous
        //     },
        //     total,
        //     page,
        //     page_size,
        //     categories: filteredCategories,
        // });

    } catch (error) {
        console.error('Error fetching GeoNode categories:', error);
        return NextResponse.json({ error: 'Failed to fetch GeoNode categories' }, { status: 500 });
    }
}
