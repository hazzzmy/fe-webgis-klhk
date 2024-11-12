import {SystemDynamic } from "@/types";


export const initialSystemDynamicList:SystemDynamic[] = [
    {
        uuid:"e5b3a50b-4948-40e3-992d-ea549e31a298",
        type:"single",
        name:"PDRB Bruto Pulau",
        parameter:["PDRB Pulau"],
        active:false,
    },
    {
        uuid:"c1837ed8-1bcb-4f22-843f-5d5f7874b0a8",
        type:"single",
        name:"LPE Pulau",
        parameter:["LPE Pulau"],
        active:false,
    },
    {
        uuid:"c8052c90-6a72-4be7-b0bb-f983fdd40f76",
        type:"single",
        name:"Populasi Pulau",
        parameter:["Populasi Pulau"],
        active:false,
    },
    {
        uuid:"f4e5dd4f-67bf-4cf9-88c8-fdfe06b1ac1d",
        type:"single",
        name:"Tenaga Kerja",
        parameter:["Tenaga Kerja"],
        active:false,
    },
    {
        uuid:"c7b37d9d-2de7-4aa3-8cea-de784c853c1b",
        type:"single",
        name:"Tk Pengangguran",
        parameter:["Tk Pengangguran"],
        active:false,
    },
    {
        uuid:"32c4371f-66d1-49ce-812f-f284d0edf54d",
        type:"single",
        name:"Rasio kecukupan air SK 146",
        parameter:["Rasio kecukupan air SK 146"],
        active:false,
    },
    {
        uuid:"99dda67e-557f-46a6-b665-8720a403c094",
        type:"single",
        name:"Rasio Kecukupan lahan tempat tinggal",
        parameter:["Rasio Kecukupan lahan tempat tinggal"],
        active:false,
    },
    {
        uuid:"fed3e965-3f02-46b6-9f33-10f0f5dbed03",
        type:"multiple",
        name:"Ambang Batas Pangan dan Tempat Tinggal Penduduk",
        parameter:["Ambang Batas Penduduk Pangan","Ambang Batas penduduk tempat tinggal","Populasi Pulau"],
        active:false,
    }
]
