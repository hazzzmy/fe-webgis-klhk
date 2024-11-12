"use client";

import { SiteData } from '@/types';
import React, { useEffect, useState } from 'react'
import {useInView} from 'react-intersection-observer'
import Spinner from './ui/spinner';
import { fetchSiteList } from '@/actions/fetchSiteList';
import SiteListCard from './SiteListCard';

const LoadMore = (searchParams :{searchParams?:string}) => {
    const [sites, setSites] = useState<SiteData[]>([]);
    const [page, setPage] = useState(1);
    
    const {ref, inView} = useInView()

    useEffect(() => {
        if (searchParams.searchParams !== undefined) {
            setSites([]);
            setPage(1);
        }
    }, [searchParams]);
    
    
    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
    

    
    const loadMoreSites = async (search:string) => {
        
        await delay(100);
        const nextPage = (page % 7) + 1;
        const result = await fetchSiteList({ page: nextPage, perPage: 8 });
    
        // Check if result is null or undefined, then assign an empty object as a fallback
        const { data, count } = result ?? { data: [], count: 0 };
        // const {data, count} = (await fetchSiteList({page:nextPage,perPage:8})) ?? [];
        const newProducts = data
        const productsArray = Array.isArray(newProducts) ? newProducts : [];
        setSites((prevProducts: SiteData[]) => [...prevProducts, ...productsArray]);
        setPage(nextPage);

    };

    useEffect(() => {
        if (inView) {
          loadMoreSites(searchParams as string);
          
        }
      }, [inView]);

    return (
    <>
        <SiteListCard siteList={sites} />
        <div className='flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4' ref={ref}><Spinner height={10} width={10}/></div>
    </>
  )
}

export default LoadMore