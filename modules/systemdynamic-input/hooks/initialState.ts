
type ParameterType = {
  name: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  baseline: number;
  value: number;
  description: string;
  descriptionOpen: boolean;
};

type InitialParameterValueType = {
  initial_time: ParameterType;
  final_time: ParameterType;
  mps_assumption: ParameterType;
  time_to_change_mps_assumption: ParameterType;
  laju_pertumbuhan_populasi_asumsi: ParameterType;
  time_to_change_laju_pertumbuhan_populasi_asumsi: ParameterType;
  laju_perubahan_lahan_terbangun_per_kapita_asumsi: ParameterType;
  time_to_change_laju_perubahan_lahan_terbangun_per_kapita: ParameterType;
  elastisitas_lpe_thd_perubahan_teknologi_target: ParameterType;
  time_to_change_elastisitas_lpe_thd_perubahan_teknologi: ParameterType;
  std_kebutuhan_air_per_kapita_sk_146_2023_target: ParameterType,
  waktu_pengubahan_standar_kebutuhan_air_per_kapita: ParameterType,
  debit_per_detik_pertanian_dasar_sk_146_2023_skenario: ParameterType,
  waktu_perubahan_std_debit_per_detik_pertanian: ParameterType,
  lahan_pangan_per_kapita_skenario: ParameterType,
  waktu_perubahan_lahan_pangan_per_kapita: ParameterType,
  lahan_built_up_per_kapita_skenario: ParameterType,
  waktu_perubahan_lahan_built_up_per_kapita: ParameterType
};

type ParameterPulau = {
  sumatera: InitialParameterValueType;
  jawa: InitialParameterValueType;
  kalimantan: InitialParameterValueType;
  sulawesi: InitialParameterValueType;
  balinusra: InitialParameterValueType;
  maluku: InitialParameterValueType;
  papua: InitialParameterValueType;
}

export const initialParameterValue: ParameterPulau = {
  sumatera: {
    initial_time: {
      name: "initial time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2016,
      value: 2016,
      description: "Tahun Mula",
      descriptionOpen: false
    },
    final_time: {
      name: "final time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Tahun Akhir",
      descriptionOpen: false
    },
    mps_assumption: {
      name: "Asumsi Rata-rata Proporsi Tabungan dari Pendapatan",
      unit: "",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan 
        <strong>[Produk Domestik Regional Bruto/PDRB]</strong> pada lembaga keuangan, 
        dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan 
        aktivitas ekonomi wilayah.
    </p>
    <br>

    <p><strong>Rangenya antara 0,2 - 0,7</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "Waktu perubahan Rerata Proposi Tabungan",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan asumsi Rerata proporsi tabungan",
      descriptionOpen: false
    },
    laju_pertumbuhan_populasi_asumsi: {
      name: "Laju Pertumbuhan Popupasi",
      unit: "%/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.25,
      value: 1.25,
      description: `<p>
        Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 
        sekira <strong>1,5%/tahun [Riau]</strong> dan terendah <strong>0,58%/tahun {DIY}</strong> 
        dan rata-rata nasional sekira <strong>1,3% per tahun</strong>.
    </p>
    <br>

    <p><strong>Range nya sekira 0,5% s.d 3% per tahun</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "Laju Perubahan Lahan Terbangun Per Kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi: {
      name: "Laju Perubahan Lahan Terbangun Per Kapita",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: `<p>Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah <strong>100 m²/kapita</strong>, maka kenaikan <strong>1%</strong> akan meningkatkan kebutuhan lahan per kapita menjadi <strong>101 m²/kapita</strong>. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun.</p>
<br>
<p>Dikaitkan dengan <strong>goal 11.3.1 SDGs</strong> tentang <em>Ratio of land consumption rate to population growth rate</em>, dan beberapa studi oleh <strong>Angel, S., Parent, J., & Civco, D. L. (2011)</strong>. <em>The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050</em> dan <strong>Liu, Y., Wang, X., Li, Y., & Peng, J. (2020)</strong>. <em>Measuring urban land use efficiency in China: A multi-scalar analysis.</em> <strong>Sustainable Cities and Society</strong></p>
<br>
<p>Kebutuhan lahan per kapita bisa berubah dikarenakan:</p>
<br>
<ul>
  <li>1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi.</li>
  <li>2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yang lebih besar.</li>
</ul>
<br>
<p><strong>Angka 1%/tahun pada skenario merupakan asumsi.</strong></p>
`,
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "Waktu pengubahan Laju Perubahan Lahan Terbangun Per Kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target: {
      name: "Elastisitas Pertumbuhan Ekonomi terhadap Pertumbuhan Teknologi",
      unit: "",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Menggambarkan laju Teknologi/Total Factor Productivity yang dipicu dari pertumbuhan ekonomi.
        Variabel ini didasarkan dari <strong>Fungsi Produksi Cobb-Douglas</strong>:
    </p>
    <br>

    <p>
        <strong>Y = A ⋅ K<sup>α</sup> ⋅ L<sup>β</sup></strong> (alpha dan beta nya ganti pangkat ya), di mana:
    </p>
    <br>

    <ul>
        <li><strong>Y:</strong> Output total (misalnya, PDB atau PDRB).</li>
        <li><strong>A:</strong> Konstanta teknologi atau <em>total factor productivity</em> (TFP), yang mencerminkan efisiensi teknologi dan inovasi dalam proses produksi.</li>
        <li><strong>K:</strong> Input modal (misalnya, mesin, infrastruktur, dll.).</li>
        <li><strong>L:</strong> Input tenaga kerja (jumlah pekerja atau jam kerja).</li>
    </ul>
    <br>
    <p>
        Artinya, peningkatan <strong>A</strong> dalam fungsi tersebut akan memicu peningkatan <strong>Y</strong> secara total.
        Namun, dalam kerangka waktu dinamis, peningkatan <strong>Y</strong> juga bisa memicu peningkatan <strong>A</strong>
        yang memicu pertumbuhan endogen 
        (<em>Lucas, R.E 1988, Romer, 1986; Solow, 1956</em>), 
        <em>Inovasi Teknologi</em> yang mendorong ekonomi 
        (<em>Hall, R. E., & Jones, C. I., 1999; Jones, C.I, 1995, Aghion, P., & Howitt, P., 1992</em>), 
        atau juga terkait dengan peran infrastruktur dan SDM 
        (<em>Barro, R. J., & Sala-i-Martin, X. 2004; Mankiw, N. G., Romer, D., & Weil, D. N. 1992</em>).
    </p>
    <br>

    <p>
        Dengan demikian dapat didekati bahwa <strong>1% pertumbuhan ekonomi</strong> juga bisa memicu 
        <strong>x% pertumbuhan teknologi</strong> yang direpresentasikan melalui peningkatan produktivitas dan efisiensi. 
        Angka <strong>x%</strong> tersebut ditentukan oleh tingkat elastisitas yang direpresentasikan dalam variabel ini. 
        Misalkan angka <strong>0,35</strong> artinya tiap <strong>1% kenaikan PDRB</strong> akan memicu 
        pertumbuhan teknologi/produktivitas produksi sekira <strong>0,35%</strong>.
    </p>`,
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "Waktu pengubahan Elastisitas LPE terhadap pertumbuhan teknologi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan Elastisitas LPE terhadap pertumbuhan teknologi dalam bentuk produtivitas produksi barang dan jasa",
      descriptionOpen: false
    },
    std_kebutuhan_air_per_kapita_sk_146_2023_target: {
      name: "Standard kebutuhan air per kapita asumsi",
      unit: "m3/kapita/Tahun",
      min: 10.0,
      max: 80.0,
      step: 0.1,
      baseline: 42.3,
      value: 42.3,
      description: "Standar kebutuhan air per kapita yang didasarkan pada SK 146/2023 dengan angka sekira 42.3 m3/kapita/tahun",
      descriptionOpen: false
    },
    waktu_pengubahan_standar_kebutuhan_air_per_kapita: {
      name: "Waktu pengubahan standard air per kapita per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar kebutuhan air per kapita",
      descriptionOpen: false
    },
    debit_per_detik_pertanian_dasar_sk_146_2023_skenario: {
      name: "Debit per detik air pertanian",
      unit: "L/detik/ha",
      min: 0.5,
      max: 5.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "Standar debit air pertanian yang didasarkan pada SK 146/2023 dengan angka sekira 1 L/detik/ha",
      descriptionOpen: false
    },
    waktu_perubahan_std_debit_per_detik_pertanian: {
      name: "Waktu pengubahan standard debit air per detik pertanian",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    },
    lahan_pangan_per_kapita_skenario: {
      name: "Lahan Pangan Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 0,
      max: 10000,
      step: 1,
      baseline: 880,
      value: 880,
      description: "Lahan Pangan Per Kapita Pulau yang diturunkan dari data produktvitas, produksi, lahan, dan jumlah penduduk pada perhitungan indeks kemampuan pemanfaatan Lahan, dengan angka 880 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_pangan_per_kapita: {
      name: "Waktu perubahan lahan pangan per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar lahan pangan per kapita",
      descriptionOpen: false
    },
    lahan_built_up_per_kapita_skenario: {
      name: "Lahan terbangun Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 20,
      value: 20,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita: {
      name: "Waktu perubahan lahan terbangun per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    }
  },
  jawa: {
    initial_time: {
      name: "initial time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2016,
      value: 2016,
      description: "Tahun Mula",
      descriptionOpen: false
    },
    final_time: {
      name: "final time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Tahun Akhir",
      descriptionOpen: false
    },
    mps_assumption: {
      name: "Asumsi Rata-rata Proporsi Tabungan dari Pendapatan",
      unit: "",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan 
        <strong>[Produk Domestik Regional Bruto/PDRB]</strong> pada lembaga keuangan, 
        dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan 
        aktivitas ekonomi wilayah.
    </p>
    <br>

    <p><strong>Rangenya antara 0,2 - 0,7</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "Waktu perubahan Rerata Proposi Tabungan",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan asumsi Rerata proporsi tabungan",
      descriptionOpen: false
    },
    laju_pertumbuhan_populasi_asumsi: {
      name: "Laju Pertumbuhan Popupasi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.16,
      value: 1.16,
      description: `<p>
        Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 
        sekira <strong>1,5%/tahun [Riau]</strong> dan terendah <strong>0,58%/tahun {DIY}</strong> 
        dan rata-rata nasional sekira <strong>1,3% per tahun</strong>.
    </p>
    <br>

    <p><strong>Range nya sekira 0,5% s.d 3% per tahun</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi: {
      name: "Laju Perubahan Lahan Terbangun Per Kapita",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: `<p>Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah <strong>100 m²/kapita</strong>, maka kenaikan <strong>1%</strong> akan meningkatkan kebutuhan lahan per kapita menjadi <strong>101 m²/kapita</strong>. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun.</p>
<br>
<p>Dikaitkan dengan <strong>goal 11.3.1 SDGs</strong> tentang <em>Ratio of land consumption rate to population growth rate</em>, dan beberapa studi oleh <strong>Angel, S., Parent, J., & Civco, D. L. (2011)</strong>. <em>The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050</em> dan <strong>Liu, Y., Wang, X., Li, Y., & Peng, J. (2020)</strong>. <em>Measuring urban land use efficiency in China: A multi-scalar analysis.</em> <strong>Sustainable Cities and Society</strong></p>
<br>
<p>Kebutuhan lahan per kapita bisa berubah dikarenakan:</p>
<br>
<ul>
  <li>1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi.</li>
  <li>2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yang lebih besar.</li>
</ul>
<br>

<p><strong>Angka 1%/tahun pada skenario merupakan asumsi.</strong></p>
`,
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target: {
      name: "Elastisitas Pertumbuhan Ekonomi terhadap Pertumbuhan Teknologi ",
      unit: "",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Menggambarkan laju Teknologi/Total Factor Productivity yang dipicu dari pertumbuhan ekonomi.
        Variabel ini didasarkan dari <strong>Fungsi Produksi Cobb-Douglas</strong>:
    </p>
    <br>

    <p>
        <strong>Y = A ⋅ K<sup>α</sup> ⋅ L<sup>β</sup></strong> (alpha dan beta nya ganti pangkat ya), di mana:
    </p>
    <br>

    <ul>
        <li><strong>Y:</strong> Output total (misalnya, PDB atau PDRB).</li>
        <li><strong>A:</strong> Konstanta teknologi atau <em>total factor productivity</em> (TFP), yang mencerminkan efisiensi teknologi dan inovasi dalam proses produksi.</li>
        <li><strong>K:</strong> Input modal (misalnya, mesin, infrastruktur, dll.).</li>
        <li><strong>L:</strong> Input tenaga kerja (jumlah pekerja atau jam kerja).</li>
    </ul>
    <br>

    <p>
        Artinya, peningkatan <strong>A</strong> dalam fungsi tersebut akan memicu peningkatan <strong>Y</strong> secara total.
        Namun, dalam kerangka waktu dinamis, peningkatan <strong>Y</strong> juga bisa memicu peningkatan <strong>A</strong>
        yang memicu pertumbuhan endogen 
        (<em>Lucas, R.E 1988, Romer, 1986; Solow, 1956</em>), 
        <em>Inovasi Teknologi</em> yang mendorong ekonomi 
        (<em>Hall, R. E., & Jones, C. I., 1999; Jones, C.I, 1995, Aghion, P., & Howitt, P., 1992</em>), 
        atau juga terkait dengan peran infrastruktur dan SDM 
        (<em>Barro, R. J., & Sala-i-Martin, X. 2004; Mankiw, N. G., Romer, D., & Weil, D. N. 1992</em>).
    </p>
    <br>

    <p>
        Dengan demikian dapat didekati bahwa <strong>1% pertumbuhan ekonomi</strong> juga bisa memicu 
        <strong>x% pertumbuhan teknologi</strong> yang direpresentasikan melalui peningkatan produktivitas dan efisiensi. 
        Angka <strong>x%</strong> tersebut ditentukan oleh tingkat elastisitas yang direpresentasikan dalam variabel ini. 
        Misalkan angka <strong>0,35</strong> artinya tiap <strong>1% kenaikan PDRB</strong> akan memicu 
        pertumbuhan teknologi/produktivitas produksi sekira <strong>0,35%</strong>.
    </p>`,
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "Waktu pengubahan Elastisitas LPE terhadap pertumbuhan teknologi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan Elastisitas LPE terhadap pertumbuhan teknologi dalam bentuk produtivitas produksi barang dan jasa",
      descriptionOpen: false
    },
    std_kebutuhan_air_per_kapita_sk_146_2023_target: {
      name: "Standard kebutuhan air per kapita asumsi",
      unit: "m3/kapita/Tahun",
      min: 10.0,
      max: 80.0,
      step: 0.1,
      baseline: 42.3,
      value: 42.3,
      description: "Standar kebutuhan air per kapita yang didasarkan pada SK 146/2023 dengan angka sekira 42.3 m3/kapita/tahun",
      descriptionOpen: false
    },
    waktu_pengubahan_standar_kebutuhan_air_per_kapita: {
      name: "Waktu pengubahan standard air per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar kebutuhan air per kapita",
      descriptionOpen: false
    },
    debit_per_detik_pertanian_dasar_sk_146_2023_skenario: {
      name: "Debit per detik air pertanian",
      unit: "L/detik/ha",
      min: 0.5,
      max: 5.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "Standar debit air pertanian yang didasarkan pada SK 146/2023 dengan angka sekira 1 L/detik/ha",
      descriptionOpen: false
    },
    waktu_perubahan_std_debit_per_detik_pertanian: {
      name: "Waktu pengubahan standard debit air per detik pertanian",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    },
    lahan_pangan_per_kapita_skenario: {
      name: "Lahan Pangan Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 0,
      max: 10000,
      step: 1,
      baseline: 1070,
      value: 1070,
      description: "Lahan Pangan Per Kapita Pulau yang diturunkan dari data produktvitas, produksi, lahan, dan jumlah penduduk pada perhitungan indeks kemampuan pemanfaatan Lahan, dengan angka 880 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_pangan_per_kapita: {
      name: "Waktu perubahan lahan pangan per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar lahan pangan per kapita",
      descriptionOpen: false
    },
    lahan_built_up_per_kapita_skenario: {
      name: "Lahan terbangun Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 20,
      value: 20,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita: {
      name: "Waktu perubahan lahan terbangun per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    }
  },
  kalimantan: {
    initial_time: {
      name: "initial time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2016,
      value: 2016,
      description: "Tahun Mula",
      descriptionOpen: false
    },
    final_time: {
      name: "final time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Tahun Akhir",
      descriptionOpen: false
    },
    mps_assumption: {
      name: "Asumsi Rata-rata Proporsi Tabungan dari Pendapatan",
      unit: "",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan 
        <strong>[Produk Domestik Regional Bruto/PDRB]</strong> pada lembaga keuangan, 
        dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan 
        aktivitas ekonomi wilayah.
    </p>
    <br>

    <p><strong>Rangenya antara 0,2 - 0,7</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "Waktu perubahan Rerata Proposi Tabungan",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan asumsi Rerata proporsi tabungan",
      descriptionOpen: false
    },
    laju_pertumbuhan_populasi_asumsi: {
      name: "Laju Pertumbuhan Popupasi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.32,
      value: 1.32,
      description: `<p>
        Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 
        sekira <strong>1,5%/tahun [Riau]</strong> dan terendah <strong>0,58%/tahun {DIY}</strong> 
        dan rata-rata nasional sekira <strong>1,3% per tahun</strong>.
    </p>
    <br>

    <p><strong>Range nya sekira 0,5% s.d 3% per tahun</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi: {
      name: "Laju Perubahan Lahan Terbangun Per Kapita",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: `<p>Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah <strong>100 m²/kapita</strong>, maka kenaikan <strong>1%</strong> akan meningkatkan kebutuhan lahan per kapita menjadi <strong>101 m²/kapita</strong>. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun.</p>
<br>
<p>Dikaitkan dengan <strong>goal 11.3.1 SDGs</strong> tentang <em>Ratio of land consumption rate to population growth rate</em>, dan beberapa studi oleh <strong>Angel, S., Parent, J., & Civco, D. L. (2011)</strong>. <em>The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050</em> dan <strong>Liu, Y., Wang, X., Li, Y., & Peng, J. (2020)</strong>. <em>Measuring urban land use efficiency in China: A multi-scalar analysis.</em> <strong>Sustainable Cities and Society</strong></p>
<br>
<p>Kebutuhan lahan per kapita bisa berubah dikarenakan:</p>
<br>
<ul>
  <li>1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi.</li>
  <li>2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yang lebih besar.</li>
</ul>
<br>

<p><strong>Angka 1%/tahun pada skenario merupakan asumsi.</strong></p>
`,
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target: {
      name: "Elastisitas Pertumbuhan Ekonomi terhadap Pertumbuhan Teknologi ",
      unit: "",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Menggambarkan laju Teknologi/Total Factor Productivity yang dipicu dari pertumbuhan ekonomi.
        Variabel ini didasarkan dari <strong>Fungsi Produksi Cobb-Douglas</strong>:
    </p>
    <br>

    <p>
        <strong>Y = A ⋅ K<sup>α</sup> ⋅ L<sup>β</sup></strong> (alpha dan beta nya ganti pangkat ya), di mana:
    </p>
    <br>

    <ul>
        <li><strong>Y:</strong> Output total (misalnya, PDB atau PDRB).</li>
        <li><strong>A:</strong> Konstanta teknologi atau <em>total factor productivity</em> (TFP), yang mencerminkan efisiensi teknologi dan inovasi dalam proses produksi.</li>
        <li><strong>K:</strong> Input modal (misalnya, mesin, infrastruktur, dll.).</li>
        <li><strong>L:</strong> Input tenaga kerja (jumlah pekerja atau jam kerja).</li>
    </ul>
    <br>

    <p>
        Artinya, peningkatan <strong>A</strong> dalam fungsi tersebut akan memicu peningkatan <strong>Y</strong> secara total.
        Namun, dalam kerangka waktu dinamis, peningkatan <strong>Y</strong> juga bisa memicu peningkatan <strong>A</strong>
        yang memicu pertumbuhan endogen 
        (<em>Lucas, R.E 1988, Romer, 1986; Solow, 1956</em>), 
        <em>Inovasi Teknologi</em> yang mendorong ekonomi 
        (<em>Hall, R. E., & Jones, C. I., 1999; Jones, C.I, 1995, Aghion, P., & Howitt, P., 1992</em>), 
        atau juga terkait dengan peran infrastruktur dan SDM 
        (<em>Barro, R. J., & Sala-i-Martin, X. 2004; Mankiw, N. G., Romer, D., & Weil, D. N. 1992</em>).
    </p>
    <br>

    <p>
        Dengan demikian dapat didekati bahwa <strong>1% pertumbuhan ekonomi</strong> juga bisa memicu 
        <strong>x% pertumbuhan teknologi</strong> yang direpresentasikan melalui peningkatan produktivitas dan efisiensi. 
        Angka <strong>x%</strong> tersebut ditentukan oleh tingkat elastisitas yang direpresentasikan dalam variabel ini. 
        Misalkan angka <strong>0,35</strong> artinya tiap <strong>1% kenaikan PDRB</strong> akan memicu 
        pertumbuhan teknologi/produktivitas produksi sekira <strong>0,35%</strong>.
    </p>`,
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "Waktu pengubahan Elastisitas LPE terhadap pertumbuhan teknologi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan Elastisitas LPE terhadap pertumbuhan teknologi dalam bentuk produtivitas produksi barang dan jasa",
      descriptionOpen: false
    },
    std_kebutuhan_air_per_kapita_sk_146_2023_target: {
      name: "Standard kebutuhan air per kapita asumsi",
      unit: "m3/kapita/Tahun",
      min: 10.0,
      max: 80.0,
      step: 0.1,
      baseline: 42.3,
      value: 42.3,
      description: "Standar kebutuhan air per kapita yang didasarkan pada SK 146/2023 dengan angka sekira 42.3 m3/kapita/tahun",
      descriptionOpen: false
    },
    waktu_pengubahan_standar_kebutuhan_air_per_kapita: {
      name: "Waktu pengubahan standard air per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar kebutuhan air per kapita",
      descriptionOpen: false
    },
    debit_per_detik_pertanian_dasar_sk_146_2023_skenario: {
      name: "Debit per detik air pertanian",
      unit: "L/detik/ha",
      min: 0.5,
      max: 5.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "Standar debit air pertanian yang didasarkan pada SK 146/2023 dengan angka sekira 1 L/detik/ha",
      descriptionOpen: false
    },
    waktu_perubahan_std_debit_per_detik_pertanian: {
      name: "Waktu pengubahan standard debit air per detik pertanian",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    },
    lahan_pangan_per_kapita_skenario: {
      name: "Lahan Pangan Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 0,
      max: 10000,
      step: 1,
      baseline: 2120,
      value: 2120,
      description: "Lahan Pangan Per Kapita Pulau yang diturunkan dari data produktvitas, produksi, lahan, dan jumlah penduduk pada perhitungan indeks kemampuan pemanfaatan Lahan, dengan angka 880 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_pangan_per_kapita: {
      name: "Waktu perubahan lahan pangan per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar lahan pangan per kapita",
      descriptionOpen: false
    },
    lahan_built_up_per_kapita_skenario: {
      name: "Lahan terbangun Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 20,
      value: 20,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita: {
      name: "Waktu perubahan lahan terbangun per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    }
  },
  sulawesi: {
    initial_time: {
      name: "initial time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2016,
      value: 2016,
      description: "Tahun Mula",
      descriptionOpen: false
    },
    final_time: {
      name: "final time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Tahun Akhir",
      descriptionOpen: false
    },
    mps_assumption: {
      name: "Asumsi Rata-rata Proporsi Tabungan dari Pendapatan",
      unit: "",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan 
        <strong>[Produk Domestik Regional Bruto/PDRB]</strong> pada lembaga keuangan, 
        dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan 
        aktivitas ekonomi wilayah.
    </p>
    <br>

    <p><strong>Rangenya antara 0,2 - 0,7</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "Waktu perubahan Rerata Proposi Tabungan",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan asumsi Rerata proporsi tabungan",
      descriptionOpen: false
    },
    laju_pertumbuhan_populasi_asumsi: {
      name: "Laju Pertumbuhan Popupasi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.5,
      value: 1.5,
      description: `<p>
        Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 
        sekira <strong>1,5%/tahun [Riau]</strong> dan terendah <strong>0,58%/tahun {DIY}</strong> 
        dan rata-rata nasional sekira <strong>1,3% per tahun</strong>.
    </p>
    <br>

    <p><strong>Range nya sekira 0,5% s.d 3% per tahun</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi: {
      name: "Laju Perubahan Lahan Terbangun Per Kapita",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 3.0,
      value: 3.0,
      description: `<p>Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah <strong>100 m²/kapita</strong>, maka kenaikan <strong>1%</strong> akan meningkatkan kebutuhan lahan per kapita menjadi <strong>101 m²/kapita</strong>. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun.</p>
<br>
<p>Dikaitkan dengan <strong>goal 11.3.1 SDGs</strong> tentang <em>Ratio of land consumption rate to population growth rate</em>, dan beberapa studi oleh <strong>Angel, S., Parent, J., & Civco, D. L. (2011)</strong>. <em>The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050</em> dan <strong>Liu, Y., Wang, X., Li, Y., & Peng, J. (2020)</strong>. <em>Measuring urban land use efficiency in China: A multi-scalar analysis.</em> <strong>Sustainable Cities and Society</strong></p>
<br>
<p>Kebutuhan lahan per kapita bisa berubah dikarenakan:</p>
<br>
<ul>
  <li>1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi.</li>
  <li>2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yang lebih besar.</li>
</ul>
<br>

<p><strong>Angka 1%/tahun pada skenario merupakan asumsi.</strong></p>
`,
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target: {
      name: "Elastisitas Pertumbuhan Ekonomi terhadap Pertumbuhan Teknologi ",
      unit: "",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Menggambarkan laju Teknologi/Total Factor Productivity yang dipicu dari pertumbuhan ekonomi.
        Variabel ini didasarkan dari <strong>Fungsi Produksi Cobb-Douglas</strong>:
    </p>
    <br>

    <p>
        <strong>Y = A ⋅ K<sup>α</sup> ⋅ L<sup>β</sup></strong> (alpha dan beta nya ganti pangkat ya), di mana:
    </p>
    <br>

    <ul>
        <li><strong>Y:</strong> Output total (misalnya, PDB atau PDRB).</li>
        <li><strong>A:</strong> Konstanta teknologi atau <em>total factor productivity</em> (TFP), yang mencerminkan efisiensi teknologi dan inovasi dalam proses produksi.</li>
        <li><strong>K:</strong> Input modal (misalnya, mesin, infrastruktur, dll.).</li>
        <li><strong>L:</strong> Input tenaga kerja (jumlah pekerja atau jam kerja).</li>
    </ul>
    <br>

    <p>
        Artinya, peningkatan <strong>A</strong> dalam fungsi tersebut akan memicu peningkatan <strong>Y</strong> secara total.
        Namun, dalam kerangka waktu dinamis, peningkatan <strong>Y</strong> juga bisa memicu peningkatan <strong>A</strong>
        yang memicu pertumbuhan endogen 
        (<em>Lucas, R.E 1988, Romer, 1986; Solow, 1956</em>), 
        <em>Inovasi Teknologi</em> yang mendorong ekonomi 
        (<em>Hall, R. E., & Jones, C. I., 1999; Jones, C.I, 1995, Aghion, P., & Howitt, P., 1992</em>), 
        atau juga terkait dengan peran infrastruktur dan SDM 
        (<em>Barro, R. J., & Sala-i-Martin, X. 2004; Mankiw, N. G., Romer, D., & Weil, D. N. 1992</em>).
    </p>
    <br>

    <p>
        Dengan demikian dapat didekati bahwa <strong>1% pertumbuhan ekonomi</strong> juga bisa memicu 
        <strong>x% pertumbuhan teknologi</strong> yang direpresentasikan melalui peningkatan produktivitas dan efisiensi. 
        Angka <strong>x%</strong> tersebut ditentukan oleh tingkat elastisitas yang direpresentasikan dalam variabel ini. 
        Misalkan angka <strong>0,35</strong> artinya tiap <strong>1% kenaikan PDRB</strong> akan memicu 
        pertumbuhan teknologi/produktivitas produksi sekira <strong>0,35%</strong>.
    </p>`,
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "Waktu pengubahan Elastisitas LPE terhadap pertumbuhan teknologi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan Elastisitas LPE terhadap pertumbuhan teknologi dalam bentuk produtivitas produksi barang dan jasa",
      descriptionOpen: false
    },
    std_kebutuhan_air_per_kapita_sk_146_2023_target: {
      name: "Standard kebutuhan air per kapita asumsi",
      unit: "m3/kapita/Tahun",
      min: 10.0,
      max: 80.0,
      step: 0.1,
      baseline: 42.3,
      value: 42.3,
      description: "Standar kebutuhan air per kapita yang didasarkan pada SK 146/2023 dengan angka sekira 42.3 m3/kapita/tahun",
      descriptionOpen: false
    },
    waktu_pengubahan_standar_kebutuhan_air_per_kapita: {
      name: "Waktu pengubahan standard air per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar kebutuhan air per kapita",
      descriptionOpen: false
    },
    debit_per_detik_pertanian_dasar_sk_146_2023_skenario: {
      name: "Debit per detik air pertanian",
      unit: "L/detik/ha",
      min: 0.5,
      max: 5.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "Standar debit air pertanian yang didasarkan pada SK 146/2023 dengan angka sekira 1 L/detik/ha",
      descriptionOpen: false
    },
    waktu_perubahan_std_debit_per_detik_pertanian: {
      name: "Waktu pengubahan standard debit air per detik pertanian",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    },
    lahan_pangan_per_kapita_skenario: {
      name: "Lahan Pangan Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 0,
      max: 10000,
      step: 1,
      baseline: 830,
      value: 830,
      description: "Lahan Pangan Per Kapita Pulau yang diturunkan dari data produktvitas, produksi, lahan, dan jumlah penduduk pada perhitungan indeks kemampuan pemanfaatan Lahan, dengan angka 880 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_pangan_per_kapita: {
      name: "Waktu perubahan lahan pangan per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar lahan pangan per kapita",
      descriptionOpen: false
    },
    lahan_built_up_per_kapita_skenario: {
      name: "Lahan terbangun Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 25,
      value: 25,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita: {
      name: "Waktu perubahan lahan terbangun per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    }
  },
  balinusra: {
    initial_time: {
      name: "initial time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2016,
      value: 2016,
      description: "Tahun Mula",
      descriptionOpen: false
    },
    final_time: {
      name: "final time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Tahun Akhir",
      descriptionOpen: false
    },
    mps_assumption: {
      name: "Asumsi Rata-rata Proporsi Tabungan dari Pendapatan",
      unit: "",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan 
        <strong>[Produk Domestik Regional Bruto/PDRB]</strong> pada lembaga keuangan, 
        dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan 
        aktivitas ekonomi wilayah.
    </p>
    <br>

    <p><strong>Rangenya antara 0,2 - 0,7</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "Waktu perubahan Rerata Proposi Tabungan",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan asumsi Rerata proporsi tabungan",
      descriptionOpen: false
    },
    laju_pertumbuhan_populasi_asumsi: {
      name: "Laju Pertumbuhan Popupasi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.16,
      value: 1.16,
      description: `<p>
        Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 
        sekira <strong>1,5%/tahun [Riau]</strong> dan terendah <strong>0,58%/tahun {DIY}</strong> 
        dan rata-rata nasional sekira <strong>1,3% per tahun</strong>.
    </p>
    <br>

    <p><strong>Range nya sekira 0,5% s.d 3% per tahun</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi: {
      name: "Laju Perubahan Lahan Terbangun Per Kapita",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 3.0,
      value: 3.0,
      description: `<p>Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah <strong>100 m²/kapita</strong>, maka kenaikan <strong>1%</strong> akan meningkatkan kebutuhan lahan per kapita menjadi <strong>101 m²/kapita</strong>. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun.</p>
<br>
<p>Dikaitkan dengan <strong>goal 11.3.1 SDGs</strong> tentang <em>Ratio of land consumption rate to population growth rate</em>, dan beberapa studi oleh <strong>Angel, S., Parent, J., & Civco, D. L. (2011)</strong>. <em>The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050</em> dan <strong>Liu, Y., Wang, X., Li, Y., & Peng, J. (2020)</strong>. <em>Measuring urban land use efficiency in China: A multi-scalar analysis.</em> <strong>Sustainable Cities and Society</strong></p>
<br>
<p>Kebutuhan lahan per kapita bisa berubah dikarenakan:</p>
<br>
<ul>
  <li>1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi.</li>
  <li>2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yang lebih besar.</li>
</ul>
<br>
<p><strong>Angka 1%/tahun pada skenario merupakan asumsi.</strong></p>
`,
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target: {
      name: "Elastisitas Pertumbuhan Ekonomi terhadap Pertumbuhan Teknologi ",
      unit: "",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Menggambarkan laju Teknologi/Total Factor Productivity yang dipicu dari pertumbuhan ekonomi.
        Variabel ini didasarkan dari <strong>Fungsi Produksi Cobb-Douglas</strong>:
    </p>
    <br>

    <p>
        <strong>Y = A ⋅ K<sup>α</sup> ⋅ L<sup>β</sup></strong> (alpha dan beta nya ganti pangkat ya), di mana:
    </p>
    <br>

    <ul>
        <li><strong>Y:</strong> Output total (misalnya, PDB atau PDRB).</li>
        <li><strong>A:</strong> Konstanta teknologi atau <em>total factor productivity</em> (TFP), yang mencerminkan efisiensi teknologi dan inovasi dalam proses produksi.</li>
        <li><strong>K:</strong> Input modal (misalnya, mesin, infrastruktur, dll.).</li>
        <li><strong>L:</strong> Input tenaga kerja (jumlah pekerja atau jam kerja).</li>
    </ul>
    <br>
    <p>
        Artinya, peningkatan <strong>A</strong> dalam fungsi tersebut akan memicu peningkatan <strong>Y</strong> secara total.
        Namun, dalam kerangka waktu dinamis, peningkatan <strong>Y</strong> juga bisa memicu peningkatan <strong>A</strong>
        yang memicu pertumbuhan endogen 
        (<em>Lucas, R.E 1988, Romer, 1986; Solow, 1956</em>), 
        <em>Inovasi Teknologi</em> yang mendorong ekonomi 
        (<em>Hall, R. E., & Jones, C. I., 1999; Jones, C.I, 1995, Aghion, P., & Howitt, P., 1992</em>), 
        atau juga terkait dengan peran infrastruktur dan SDM 
        (<em>Barro, R. J., & Sala-i-Martin, X. 2004; Mankiw, N. G., Romer, D., & Weil, D. N. 1992</em>).
    </p>
    <br>

    <p>
        Dengan demikian dapat didekati bahwa <strong>1% pertumbuhan ekonomi</strong> juga bisa memicu 
        <strong>x% pertumbuhan teknologi</strong> yang direpresentasikan melalui peningkatan produktivitas dan efisiensi. 
        Angka <strong>x%</strong> tersebut ditentukan oleh tingkat elastisitas yang direpresentasikan dalam variabel ini. 
        Misalkan angka <strong>0,35</strong> artinya tiap <strong>1% kenaikan PDRB</strong> akan memicu 
        pertumbuhan teknologi/produktivitas produksi sekira <strong>0,35%</strong>.
    </p>`,
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "Waktu pengubahan Elastisitas LPE terhadap pertumbuhan teknologi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan Elastisitas LPE terhadap pertumbuhan teknologi dalam bentuk produtivitas produksi barang dan jasa",
      descriptionOpen: false
    },
    std_kebutuhan_air_per_kapita_sk_146_2023_target: {
      name: "Standard kebutuhan air per kapita asumsi",
      unit: "m3/kapita/Tahun",
      min: 10.0,
      max: 80.0,
      step: 0.1,
      baseline: 42.3,
      value: 42.3,
      description: "Standar kebutuhan air per kapita yang didasarkan pada SK 146/2023 dengan angka sekira 42.3 m3/kapita/tahun",
      descriptionOpen: false
    },
    waktu_pengubahan_standar_kebutuhan_air_per_kapita: {
      name: "Waktu pengubahan standard air per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar kebutuhan air per kapita",
      descriptionOpen: false
    },
    debit_per_detik_pertanian_dasar_sk_146_2023_skenario: {
      name: "Debit per detik air pertanian",
      unit: "L/detik/ha",
      min: 0.5,
      max: 5.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "Standar debit air pertanian yang didasarkan pada SK 146/2023 dengan angka sekira 1 L/detik/ha",
      descriptionOpen: false
    },
    waktu_perubahan_std_debit_per_detik_pertanian: {
      name: "Waktu pengubahan standard debit air per detik pertanian",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    },
    lahan_pangan_per_kapita_skenario: {
      name: "Lahan Pangan Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 0,
      max: 10000,
      step: 1,
      baseline: 740,
      value: 740,
      description: "Lahan Pangan Per Kapita Pulau yang diturunkan dari data produktvitas, produksi, lahan, dan jumlah penduduk pada perhitungan indeks kemampuan pemanfaatan Lahan, dengan angka 880 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_pangan_per_kapita: {
      name: "Waktu perubahan lahan pangan per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar lahan pangan per kapita",
      descriptionOpen: false
    },
    lahan_built_up_per_kapita_skenario: {
      name: "Lahan terbangun Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 20,
      value: 20,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita: {
      name: "Waktu perubahan lahan terbangun per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    }
  },
  maluku: {
    initial_time: {
      name: "initial time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2016,
      value: 2016,
      description: "Tahun Mula",
      descriptionOpen: false
    },
    final_time: {
      name: "final time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Tahun Akhir",
      descriptionOpen: false
    },
    mps_assumption: {
      name: "Asumsi Rata-rata Proporsi Tabungan dari Pendapatan",
      unit: "",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.37,
      value: 0.37,
      description: `<p>
        Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan 
        <strong>[Produk Domestik Regional Bruto/PDRB]</strong> pada lembaga keuangan, 
        dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan 
        aktivitas ekonomi wilayah.
    </p>
    <br>

    <p><strong>Rangenya antara 0,2 - 0,7</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "Waktu perubahan Rerata Proposi Tabungan",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan asumsi Rerata proporsi tabungan",
      descriptionOpen: false
    },
    laju_pertumbuhan_populasi_asumsi: {
      name: "Laju Pertumbuhan Popupasi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.96,
      value: 1.96,
      description: `<p>
        Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 
        sekira <strong>1,5%/tahun [Riau]</strong> dan terendah <strong>0,58%/tahun {DIY}</strong> 
        dan rata-rata nasional sekira <strong>1,3% per tahun</strong>.
    </p>
    <br>

    <p><strong>Range nya sekira 0,5% s.d 3% per tahun</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi: {
      name: "Laju Perubahan Lahan Terbangun Per Kapita",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "",
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target: {
      name: "Elastisitas Pertumbuhan Ekonomi terhadap Pertumbuhan Teknologi ",
      unit: "",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.37,
      value: 0.37,
      description: `<p>
        Menggambarkan laju Teknologi/Total Factor Productivity yang dipicu dari pertumbuhan ekonomi.
        Variabel ini didasarkan dari <strong>Fungsi Produksi Cobb-Douglas</strong>:
    </p>
    <br>

    <p>
        <strong>Y = A ⋅ K<sup>α</sup> ⋅ L<sup>β</sup></strong> (alpha dan beta nya ganti pangkat ya), di mana:
    </p>
    <br>

    <ul>
        <li><strong>Y:</strong> Output total (misalnya, PDB atau PDRB).</li>
        <li><strong>A:</strong> Konstanta teknologi atau <em>total factor productivity</em> (TFP), yang mencerminkan efisiensi teknologi dan inovasi dalam proses produksi.</li>
        <li><strong>K:</strong> Input modal (misalnya, mesin, infrastruktur, dll.).</li>
        <li><strong>L:</strong> Input tenaga kerja (jumlah pekerja atau jam kerja).</li>
    </ul>
    <br>

    <p>
        Artinya, peningkatan <strong>A</strong> dalam fungsi tersebut akan memicu peningkatan <strong>Y</strong> secara total.
        Namun, dalam kerangka waktu dinamis, peningkatan <strong>Y</strong> juga bisa memicu peningkatan <strong>A</strong>
        yang memicu pertumbuhan endogen 
        (<em>Lucas, R.E 1988, Romer, 1986; Solow, 1956</em>), 
        <em>Inovasi Teknologi</em> yang mendorong ekonomi 
        (<em>Hall, R. E., & Jones, C. I., 1999; Jones, C.I, 1995, Aghion, P., & Howitt, P., 1992</em>), 
        atau juga terkait dengan peran infrastruktur dan SDM 
        (<em>Barro, R. J., & Sala-i-Martin, X. 2004; Mankiw, N. G., Romer, D., & Weil, D. N. 1992</em>).
    </p>
    <br>

    <p>
        Dengan demikian dapat didekati bahwa <strong>1% pertumbuhan ekonomi</strong> juga bisa memicu 
        <strong>x% pertumbuhan teknologi</strong> yang direpresentasikan melalui peningkatan produktivitas dan efisiensi. 
        Angka <strong>x%</strong> tersebut ditentukan oleh tingkat elastisitas yang direpresentasikan dalam variabel ini. 
        Misalkan angka <strong>0,35</strong> artinya tiap <strong>1% kenaikan PDRB</strong> akan memicu 
        pertumbuhan teknologi/produktivitas produksi sekira <strong>0,35%</strong>.
    </p>`,
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "Waktu pengubahan Elastisitas LPE terhadap pertumbuhan teknologi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan Elastisitas LPE terhadap pertumbuhan teknologi dalam bentuk produtivitas produksi barang dan jasa",
      descriptionOpen: false
    },
    std_kebutuhan_air_per_kapita_sk_146_2023_target: {
      name: "Standard kebutuhan air per kapita asumsi",
      unit: "m3/kapita/Tahun",
      min: 10.0,
      max: 80.0,
      step: 0.1,
      baseline: 42.3,
      value: 42.3,
      description: "Standar kebutuhan air per kapita yang didasarkan pada SK 146/2023 dengan angka sekira 42.3 m3/kapita/tahun",
      descriptionOpen: false
    },
    waktu_pengubahan_standar_kebutuhan_air_per_kapita: {
      name: "Waktu pengubahan standard air per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar kebutuhan air per kapita",
      descriptionOpen: false
    },
    debit_per_detik_pertanian_dasar_sk_146_2023_skenario: {
      name: "Debit per detik air pertanian",
      unit: "L/detik/ha",
      min: 0.5,
      max: 5.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "Standar debit air pertanian yang didasarkan pada SK 146/2023 dengan angka sekira 1 L/detik/ha",
      descriptionOpen: false
    },
    waktu_perubahan_std_debit_per_detik_pertanian: {
      name: "Waktu pengubahan standard debit air per detik pertanian",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    },
    lahan_pangan_per_kapita_skenario: {
      name: "Lahan Pangan Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 0,
      max: 10000,
      step: 1,
      baseline: 810,
      value: 810,
      description: "Lahan Pangan Per Kapita Pulau yang diturunkan dari data produktvitas, produksi, lahan, dan jumlah penduduk pada perhitungan indeks kemampuan pemanfaatan Lahan, dengan angka 880 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_pangan_per_kapita: {
      name: "Waktu perubahan lahan pangan per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar lahan pangan per kapita",
      descriptionOpen: false
    },
    lahan_built_up_per_kapita_skenario: {
      name: "Lahan terbangun Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 25,
      value: 25,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita: {
      name: "Waktu perubahan lahan terbangun per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    }
  },
  papua: {
    initial_time: {
      name: "initial time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2016,
      value: 2016,
      description: "Tahun Mula",
      descriptionOpen: false
    },
    final_time: {
      name: "final time",
      unit: "Tahun",
      min: 2016,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Tahun Akhir",
      descriptionOpen: false
    },
    mps_assumption: {
      name: "Asumsi Rata-rata Proporsi Tabungan dari Pendapatan",
      unit: "",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan 
        <strong>[Produk Domestik Regional Bruto/PDRB]</strong> pada lembaga keuangan, 
        dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan 
        aktivitas ekonomi wilayah.
    </p>
    <br>

    <p><strong>Rangenya antara 0,2 - 0,7</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "Waktu perubahan Rerata Proposi Tabungan",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan asumsi Rerata proporsi tabungan",
      descriptionOpen: false
    },
    laju_pertumbuhan_populasi_asumsi: {
      name: "Laju Pertumbuhan Popupasi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 3.0,
      value: 3.0,
      description: `<p>
        Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 
        sekira <strong>1,5%/tahun [Riau]</strong> dan terendah <strong>0,58%/tahun {DIY}</strong> 
        dan rata-rata nasional sekira <strong>1,3% per tahun</strong>.
    </p>
    <br>

    <p><strong>Range nya sekira 0,5% s.d 3% per tahun</strong></p>`,
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi: {
      name: "Laju Perubahan Lahan Terbangun Per Kapita",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 5.0,
      value: 5.0,
      description: `<p>Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah <strong>100 m²/kapita</strong>, maka kenaikan <strong>1%</strong> akan meningkatkan kebutuhan lahan per kapita menjadi <strong>101 m²/kapita</strong>. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun.</p>
<br>
<p>Dikaitkan dengan <strong>goal 11.3.1 SDGs</strong> tentang <em>Ratio of land consumption rate to population growth rate</em>, dan beberapa studi oleh <strong>Angel, S., Parent, J., & Civco, D. L. (2011)</strong>. <em>The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050</em> dan <strong>Liu, Y., Wang, X., Li, Y., & Peng, J. (2020)</strong>. <em>Measuring urban land use efficiency in China: A multi-scalar analysis.</em> <strong>Sustainable Cities and Society</strong></p>
<br>
<p>Kebutuhan lahan per kapita bisa berubah dikarenakan:</p>
<br>
<ul>
  <li>1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi.</li>
  <li>2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yang lebih besar.</li>
</ul>
<br>

<p><strong>Angka 1%/tahun pada skenario merupakan asumsi.</strong></p>
`,
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "Waktu pengubahan Laju Pertumbuhan Penduduk",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target: {
      name: "Elastisitas Pertumbuhan Ekonomi terhadap Pertumbuhan Teknologi ",
      unit: "",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: `<p>
        Menggambarkan laju Teknologi/Total Factor Productivity yang dipicu dari pertumbuhan ekonomi.
        Variabel ini didasarkan dari <strong>Fungsi Produksi Cobb-Douglas</strong>:
    </p>
    <br>

    <p>
        <strong>Y = A ⋅ K<sup>α</sup> ⋅ L<sup>β</sup></strong> (alpha dan beta nya ganti pangkat ya), di mana:
    </p>
    <br>

    <ul>
        <li><strong>Y:</strong> Output total (misalnya, PDB atau PDRB).</li>
        <li><strong>A:</strong> Konstanta teknologi atau <em>total factor productivity</em> (TFP), yang mencerminkan efisiensi teknologi dan inovasi dalam proses produksi.</li>
        <li><strong>K:</strong> Input modal (misalnya, mesin, infrastruktur, dll.).</li>
        <li><strong>L:</strong> Input tenaga kerja (jumlah pekerja atau jam kerja).</li>
    </ul>
    <br>

    <p>
        Artinya, peningkatan <strong>A</strong> dalam fungsi tersebut akan memicu peningkatan <strong>Y</strong> secara total.
        Namun, dalam kerangka waktu dinamis, peningkatan <strong>Y</strong> juga bisa memicu peningkatan <strong>A</strong>
        yang memicu pertumbuhan endogen 
        (<em>Lucas, R.E 1988, Romer, 1986; Solow, 1956</em>), 
        <em>Inovasi Teknologi</em> yang mendorong ekonomi 
        (<em>Hall, R. E., & Jones, C. I., 1999; Jones, C.I, 1995, Aghion, P., & Howitt, P., 1992</em>), 
        atau juga terkait dengan peran infrastruktur dan SDM 
        (<em>Barro, R. J., & Sala-i-Martin, X. 2004; Mankiw, N. G., Romer, D., & Weil, D. N. 1992</em>).
    </p>
    <br>

    <p>
        Dengan demikian dapat didekati bahwa <strong>1% pertumbuhan ekonomi</strong> juga bisa memicu 
        <strong>x% pertumbuhan teknologi</strong> yang direpresentasikan melalui peningkatan produktivitas dan efisiensi. 
        Angka <strong>x%</strong> tersebut ditentukan oleh tingkat elastisitas yang direpresentasikan dalam variabel ini. 
        Misalkan angka <strong>0,35</strong> artinya tiap <strong>1% kenaikan PDRB</strong> akan memicu 
        pertumbuhan teknologi/produktivitas produksi sekira <strong>0,35%</strong>.
    </p>`,
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "Waktu pengubahan Elastisitas LPE terhadap pertumbuhan teknologi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan Elastisitas LPE terhadap pertumbuhan teknologi dalam bentuk produtivitas produksi barang dan jasa",
      descriptionOpen: false
    },
    std_kebutuhan_air_per_kapita_sk_146_2023_target: {
      name: "Standard kebutuhan air per kapita asumsi",
      unit: "m3/kapita/Tahun",
      min: 10.0,
      max: 80.0,
      step: 0.1,
      baseline: 42.3,
      value: 42.3,
      description: "Standar kebutuhan air per kapita yang didasarkan pada SK 146/2023 dengan angka sekira 42.3 m3/kapita/tahun",
      descriptionOpen: false
    },
    waktu_pengubahan_standar_kebutuhan_air_per_kapita: {
      name: "Waktu pengubahan standard air per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar kebutuhan air per kapita",
      descriptionOpen: false
    },
    debit_per_detik_pertanian_dasar_sk_146_2023_skenario: {
      name: "Debit per detik air pertanian",
      unit: "L/detik/ha",
      min: 0.5,
      max: 5.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "Standar debit air pertanian yang didasarkan pada SK 146/2023 dengan angka sekira 1 L/detik/ha",
      descriptionOpen: false
    },
    waktu_perubahan_std_debit_per_detik_pertanian: {
      name: "Waktu pengubahan standard debit air per detik pertanian",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    },
    lahan_pangan_per_kapita_skenario: {
      name: "Lahan Pangan Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 0,
      max: 10000,
      step: 1,
      baseline: 1320,
      value: 1320,
      description: "Lahan Pangan Per Kapita Pulau yang diturunkan dari data produktvitas, produksi, lahan, dan jumlah penduduk pada perhitungan indeks kemampuan pemanfaatan Lahan, dengan angka 880 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_pangan_per_kapita: {
      name: "Waktu perubahan lahan pangan per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar lahan pangan per kapita",
      descriptionOpen: false
    },
    lahan_built_up_per_kapita_skenario: {
      name: "Lahan terbangun Per Kapita Skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 20,
      value: 20,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita: {
      name: "Waktu perubahan lahan terbangun per kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu pengubahan standar debit air per detik pertanian",
      descriptionOpen: false
    }
  },
}