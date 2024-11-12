import { NextResponse } from "next/server";

export async function GET(req: Request, res:NextResponse) {
    // const body = await req.json();
    const { searchParams } = new URL(req.url);
    const initial_time = searchParams.get('initial_time');
    const final_time = searchParams.get('final_time');
    const mps_assumption = searchParams.get('mps_assumption');
    const time_to_change_mps_assumption = searchParams.get('time_to_change_mps_assumption');
    const laju_pertumbuhan_populasi_asumsi = searchParams.get('laju_pertumbuhan_populasi_asumsi');
    const time_to_change_laju_pertumbuhan_populasi_asumsi = searchParams.get('time_to_change_laju_pertumbuhan_populasi_asumsi');
    const laju_perubahan_lahan_terbangun_per_kapita_asumsi = searchParams.get('laju_perubahan_lahan_terbangun_per_kapita_asumsi');
    const time_to_change_laju_perubahan_lahan_terbangun_per_kapita = searchParams.get('time_to_change_laju_perubahan_lahan_terbangun_per_kapita');   


    const params = {
        simulation: "simulation",
        parameter: [
          "PDRB Pulau", "LPE Pulau", "Populasi Pulau", "Tenaga Kerja", "Pengangguran", 
          "Tk Pengangguran", "Rasio kecukupan air SK 146", "Rasio kecukupan pangan", 
          "Rasio Kecukupan lahan tempat tinggal", "Ambang Batas Penduduk Pangan", 
          "Ambang Batas penduduk tempat tinggal"
        ],
        initial_time: initial_time || 2016,
        final_time: final_time || 2055,
        mps_assumption: mps_assumption || 0.36,
        time_to_change_mps_assumption: time_to_change_mps_assumption || 2055,
        laju_pertumbuhan_populasi_asumsi: laju_pertumbuhan_populasi_asumsi || 0.0116116,
        time_to_change_laju_pertumbuhan_populasi_asumsi: time_to_change_laju_pertumbuhan_populasi_asumsi || 2055,
        laju_perubahan_lahan_terbangun_per_kapita_asumsi:laju_perubahan_lahan_terbangun_per_kapita_asumsi || 0.03,
        time_to_change_laju_perubahan_lahan_terbangun_per_kapita:time_to_change_laju_perubahan_lahan_terbangun_per_kapita || 2055
    }
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/postSystemDynamic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();

        return new NextResponse(JSON.stringify(data));
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}

export async function POST(req: Request, res:NextResponse) {
    const body = await req.json();
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/postSystemDynamic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return new NextResponse(JSON.stringify(data));
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}