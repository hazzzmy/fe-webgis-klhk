"use client"

import SkeletonWrapper from '@/components/SkeletonWrapper';
import React from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatExecTime, substringText } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { QueryObserverResult } from '@tanstack/react-query';
import { Meta, ResourceParams } from '@/types';

interface MapAddLayerProps {
    params: ResourceParams;
    dataQuery: QueryObserverResult<any>;
    meta: Meta;
    onMetaChange: (x: Partial<Meta>) => void;
    onParamsChange: (x: Partial<ResourceParams>) => void;
    onAddLayer: (x: any) => void;
}


export const MapAddLayer: React.FC<MapAddLayerProps> = (props) => {
    const {
        meta,
        params,
        dataQuery,
        onMetaChange,
        onParamsChange,
        onAddLayer,
    } = props;

    if (dataQuery.error) {
        return <div>Error: {dataQuery.error.message}</div>;
    }

    const totalRecords = dataQuery.data?.total || meta.total; // Get the total count
    const totalPages = Math.ceil(totalRecords / meta.pageSize); // Calculate total pages

    return (
        <div className='w-full h-full'>
            <div className='flex flex-row w-full h-full'>
                <div className='flex flex-col gap-2 justify-start items-start w-4/12 p-4'>
                    <div className='flex flex-row gap-2 w-full items-center'>
                        <h3 className="text-gray-700 text-sm w-2/12">Type</h3>
                        <Tabs defaultValue={params.type} className='w-10/12'>
                            <TabsList>
                                <TabsTrigger value="all" onClick={() => onParamsChange({ type: 'all' })}>All</TabsTrigger>
                                <TabsTrigger value="dataset" onClick={() => onParamsChange({ type: 'dataset' })}>Dataset</TabsTrigger>
                                <TabsTrigger value="map"
                                    onClick={() => {
                                        onParamsChange({ type: 'map' });
                                        onParamsChange({ subType: 'all' }); // Automatically set subtype to 'all' when 'map' is selected
                                    }}>Map
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className='flex flex-row gap-2 w-full items-center'>
                        <h3 className="text-gray-700 text-sm w-2/12">Subtype</h3>
                        <Tabs defaultValue={params.subType} className='w-10/12'>
                            <TabsList>
                                <TabsTrigger
                                    value="all"
                                    onClick={() => onParamsChange({ subType: 'all' })}
                                    disabled={params.type === 'map'} // Ensure 'all' is always selected for 'map'
                                >All</TabsTrigger>

                                <TabsTrigger
                                    value="raster"
                                    onClick={() => onParamsChange({ subType: 'raster' })}
                                    disabled={params.type === 'map'} // Disable these when 'map' is selected
                                >Raster</TabsTrigger>

                                <TabsTrigger
                                    value="vector"
                                    onClick={() => onParamsChange({ subType: 'vector' })}
                                    disabled={params.type === 'map'}
                                >Vector</TabsTrigger>

                                <TabsTrigger
                                    value="vector-time"
                                    onClick={() => onParamsChange({ subType: 'vector-time' })}
                                    disabled={params.type === 'map'}
                                >Vector Time</TabsTrigger>

                                <TabsTrigger
                                    value="remote"
                                    onClick={() => onParamsChange({ subType: 'remote' })}
                                    disabled={params.type === 'map'}
                                >Remote</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div className="flex flex-row items-center w-full gap-2">
                        <h3 className="text-gray-700 text-sm w-2/12">Search</h3>
                        <Input
                            className="text-gray-700 text-sm w-10/12 focus:border-transparent focus:ring-0"
                            placeholder="Search layer..."
                            value={params.search}
                            onChange={(e) => onParamsChange({ search: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onParamsChange({ search: e.currentTarget.value });
                                }
                            }}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-4 justify-start items-start w-8/12 p-2 h-full'>
                    <div className='grid grid-cols-4 gap-2 w-full h-full'>
                        {dataQuery.isLoading ? (
                            // Show skeleton cards while data is loading
                            Array.from({ length: 8 }).map((_, index) => (
                                <SkeletonWrapper key={index} isLoading={true}>
                                    <Card className='w-full h-[30vh] shadow p-0' />
                                </SkeletonWrapper>
                            ))
                        ) : (dataQuery.data.resources.length > 0 ?
                            dataQuery.data.resources.map((item: any) => (
                                <SkeletonWrapper key={item.pk} isLoading={false}>
                                    <Card className='w-full h-[30vh] shadow p-0'>
                                        <div className='w-full h-3/6'>
                                            {item.thumbnail_url ? (
                                                <Image
                                                    src={item.thumbnail_url}
                                                    alt={item.title}
                                                    width="0"
                                                    height="0"
                                                    sizes="100vw"
                                                    className="w-full h-full"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "/image/placeholder.jpg";
                                                    }}
                                                    onAbort={(e) => {
                                                        e.currentTarget.src = "/image/placeholder.jpg";
                                                    }}
                                                />
                                            ) : (
                                                <Image
                                                    src={"/image/placeholder.jpg"}
                                                    alt={item.title}
                                                    width="0"
                                                    height="0"
                                                    sizes="100vw"
                                                    className="w-full h-full"
                                                />
                                            )}
                                        </div>
                                        <CardContent className='h-3/6 p-2 flex flex-col justify-between items-start w-full'>
                                            <CardTitle className='text-md'>{substringText(item.title.split("_").join(" "), 20)}</CardTitle>
                                            <div className='flex flex-row justify-between items-end w-full'>
                                                <div className='flex flex-col justify-between items-start gap-1'>
                                                    <div className='flex flex-row gap-1 items-center'>
                                                        {item.owner.avatar && (
                                                            <Image
                                                                src={item.owner.avatar}
                                                                alt="avatar"
                                                                width={15}
                                                                height={15}
                                                                className='rounded-lg'
                                                            />
                                                        )}
                                                        <Badge variant="outline">{item.resource_type}</Badge>
                                                        {item.resource_type !== "map" && <Badge variant="outline">{item.subtype}</Badge>}
                                                    </div>
                                                    <p className='text-xs'>{formatExecTime(item.created)}</p>
                                                </div>
                                                <Button variant="outline" onClick={() => onAddLayer(item)}>Add</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </SkeletonWrapper>
                            )) : <Card className='w-full shadow p-2'>No Data Available</Card>
                        )}
                    </div>
                    <div className='flex flex-row justify-between items-center w-full gap-2'>
                        <div className='w-2/12'>Total: {totalRecords}</div>
                        <Pagination className="w-10/12 flex justify-end items-center">
                            <PaginationContent className="flex items-end">
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={() => onMetaChange({ page: meta.page - 1 })}
                                    />
                                </PaginationItem>

                                {/* Show first page */}
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        onClick={() => onMetaChange({ page: 1 })}
                                        className={meta.page === 1 ? 'bg-primary text-white' : ''}
                                    >
                                        1
                                    </PaginationLink>
                                </PaginationItem>

                                {/* Show ellipsis if meta.page is greater than 3 */}
                                {meta.page > 3 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                {/* Show two pages before and after the current page */}
                                {Array.from({ length: 3 }).map((_, index) => {
                                    const pageNumber = meta.page - 1 + index;
                                    if (pageNumber > 1 && pageNumber < totalPages) {
                                        return (
                                            <PaginationItem key={index}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={() => onMetaChange({ page: pageNumber })}
                                                    className={meta.page === pageNumber ? 'bg-primary text-white' : ''}
                                                >
                                                    {pageNumber}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    }
                                    return null;
                                })}

                                {/* Show ellipsis if there are pages between the last displayed and the last page */}
                                {meta.page < totalPages - 2 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                {/* Show the last page */}
                                {totalPages > 1 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            onClick={() => onMetaChange({ page: totalPages })}
                                            className={meta.page === totalPages ? 'bg-primary text-white' : ''}
                                        >
                                            {totalPages}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={() => onMetaChange({ page: meta.page + 1 })}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}