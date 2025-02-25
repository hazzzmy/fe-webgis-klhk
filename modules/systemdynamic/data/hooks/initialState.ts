import {SystemDynamic } from "@/types";


export const initialSystemDynamicList:SystemDynamic[] = [
    {
        uuid:"fed3e965-3f02-46b6-9f33-10f0f5dbed03",
        type:"multiple",
        name:"Ambang Batas Populasi Air dan Lahan [jiwa]",
        parameter:["Ambang Batas Populasi Air", "Ambang Batas populasi dari Lahan","Populasi Pulau"],
        active:true,
    },
    {
        uuid:"99dda67e-557f-46a6-b665-8720a403c094",
        type:"single",
        name:"Indeks Kemampuan Pemanfaatan Air",
        parameter:["Indeks D3T Air"],
        active:true,
    },
    {
        uuid:"e5aa3d00-3125-4205-b33b-7d8877fef85d",
        type:"single",
        name:"Indeks Kemampuan Pemanfaatan Lahan",
        parameter:["Indeks D3T Lahan"],
        active:true,
    },
    {
        uuid:"e5b3a50b-4948-40e3-992d-ea549e31a298",
        type:"single",
        name:"Produk Domestik Regional Bruto Pulau [JutaRp/tahun]",
        parameter:["PDRB Pulau"],
        active:true,
    },
    {
        uuid:"c1837ed8-1bcb-4f22-843f-5d5f7874b0a8",
        type:"single",
        name:"Laju Pertumbuhan Ekonomi Pulau [%/tahun]",
        parameter:["LPE Pulau"],
        active:true,
    },
    {
        uuid:"c8052c90-6a72-4be7-b0bb-f983fdd40f76",
        type:"single",
        name:"Populasi [Jiwa]",
        parameter:["Populasi Pulau"],
        active:true,
    },
    {
        uuid:"f4e5dd4f-67bf-4cf9-88c8-fdfe06b1ac1d",
        type:"single",
        name:"Tenaga Kerja [Jiwa]",
        parameter:["Tenaga Kerja"],
        active:true,
    },
    {
        uuid:"c7b37d9d-2de7-4aa3-8cea-de784c853c1b",
        type:"single",
        name:"Tingkat Pengangguran [%]",
        parameter:["Tk Pengangguran"],
        active:true,
    }
]
