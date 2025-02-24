
type ParameterType = {
  name: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  baseline: number;
  value: number;
  description:string;
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
  sumatera:{
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
      name: "mps asumption",
      unit: "-",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: "Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan [Produk Domestik Regional Bruto/PDRB] pada lembaga keuangan, dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan aktivitas ekonomi wilayah. Rangenya antara 0,2 - 0,7",
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "time to change mps assumption",
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
      name: "laju pertumbuhan populasi asumsi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.25,
      value: 1.25,
      description: "Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 sekira 1,5%/tahun [Riau] dan terendah 0,58%/tahun {DIY} dan rata-rata nasional sekira 1,3% per tahun range nya sekira 0,5% s.d 3% per tahun",
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "time to change laju pertumbuhan populasi asumsi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi:{
      name: "Laju Perubahan Lahan Terbangun per Kapita asumsi",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah 100 m2/kapita, maka kenaikan 1% akan meningkatkan kebutuhan lahan per kapita menjadi 101 m2/kapita. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun. Dikaitkan dengan goal 11.3.1 SDGs tentang Ratio of land consumption rate to population growth rate, dan beberapa studi oleh Angel, S., Parent, J., & Civco, D. L. (2011). The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050 dan Liu, Y., Wang, X., Li, Y., & Peng, J. (2020). Measuring urban land use efficiency in China: A multi-scalar analysis. Sustainable Cities and Society. Kebutuhan lahan per kapita bisa berubah dikarenakan 1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi, 2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yg lebih besar. Angka 1%/tahun pada skenario merupakan asumsi",
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "time to change Laju Perubahan Lahan Terbangun per Kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target:{
      name: "Elastisitas LPE thd perubahan teknologi target",
      unit: "-",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: "Perubahan elastisitas perubahan teknologi dari laju pertumbuhan ekonomi wilayah Akan mempengaruhi tingkat teknologi wilayah (Total Factor Productivity) yang mendorong produksi bds fungsi Cobb-Douglas",
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "time to change Elastisitas LPE thd perubahan teknologi",
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
      name: "std kebutuhan air per kapita SK 146/2023 target",
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
      name: "Waktu pengubahan standard air",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
    waktu_perubahan_lahan_pangan_per_kapita:  {
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
      name: "Lahan built-up per kapita skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 20,
      value: 20,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita:  {
      name: "Waktu perubahan Lahan built-up per kapita",
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
  jawa:{
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
      name: "mps asumption",
      unit: "-",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: "Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan [Produk Domestik Regional Bruto/PDRB] pada lembaga keuangan, dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan aktivitas ekonomi wilayah. Rangenya antara 0,2 - 0,7",
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "time to change mps assumption",
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
      name: "laju pertumbuhan populasi asumsi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.16,
      value: 1.16,
      description: "Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 sekira 1,5%/tahun [Riau] dan terendah 0,58%/tahun {DIY} dan rata-rata nasional sekira 1,3% per tahun range nya sekira 0,5% s.d 3% per tahun",
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "time to change laju pertumbuhan populasi asumsi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi:{
      name: "Laju Perubahan Lahan Terbangun per Kapita asumsi",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah 100 m2/kapita, maka kenaikan 1% akan meningkatkan kebutuhan lahan per kapita menjadi 101 m2/kapita. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun. Dikaitkan dengan goal 11.3.1 SDGs tentang Ratio of land consumption rate to population growth rate, dan beberapa studi oleh Angel, S., Parent, J., & Civco, D. L. (2011). The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050 dan Liu, Y., Wang, X., Li, Y., & Peng, J. (2020). Measuring urban land use efficiency in China: A multi-scalar analysis. Sustainable Cities and Society. Kebutuhan lahan per kapita bisa berubah dikarenakan 1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi, 2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yg lebih besar. Angka 1%/tahun pada skenario merupakan asumsi",
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "time to change Laju Perubahan Lahan Terbangun per Kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target:{
      name: "Elastisitas LPE thd perubahan teknologi target",
      unit: "-",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: "Perubahan elastisitas perubahan teknologi dari laju pertumbuhan ekonomi wilayah Akan mempengaruhi tingkat teknologi wilayah (Total Factor Productivity) yang mendorong produksi bds fungsi Cobb-Douglas",
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "time to change Elastisitas LPE thd perubahan teknologi",
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
      name: "std kebutuhan air per kapita SK 146/2023 target",
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
      name: "Waktu pengubahan standard air",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
    waktu_perubahan_lahan_pangan_per_kapita:  {
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
      name: "Lahan built-up per kapita skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 20,
      value: 20,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita:  {
      name: "Waktu perubahan Lahan built-up per kapita",
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
  kalimantan:{
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
      name: "mps asumption",
      unit: "-",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: "Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan [Produk Domestik Regional Bruto/PDRB] pada lembaga keuangan, dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan aktivitas ekonomi wilayah. Rangenya antara 0,2 - 0,7",
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "time to change mps assumption",
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
      name: "laju pertumbuhan populasi asumsi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.32,
      value: 1.32,
      description: "Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 sekira 1,5%/tahun [Riau] dan terendah 0,58%/tahun {DIY} dan rata-rata nasional sekira 1,3% per tahun range nya sekira 0,5% s.d 3% per tahun",
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "time to change laju pertumbuhan populasi asumsi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi:{
      name: "Laju Perubahan Lahan Terbangun per Kapita asumsi",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah 100 m2/kapita, maka kenaikan 1% akan meningkatkan kebutuhan lahan per kapita menjadi 101 m2/kapita. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun. Dikaitkan dengan goal 11.3.1 SDGs tentang Ratio of land consumption rate to population growth rate, dan beberapa studi oleh Angel, S., Parent, J., & Civco, D. L. (2011). The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050 dan Liu, Y., Wang, X., Li, Y., & Peng, J. (2020). Measuring urban land use efficiency in China: A multi-scalar analysis. Sustainable Cities and Society. Kebutuhan lahan per kapita bisa berubah dikarenakan 1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi, 2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yg lebih besar. Angka 1%/tahun pada skenario merupakan asumsi",
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "time to change Laju Perubahan Lahan Terbangun per Kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target:{
      name: "Elastisitas LPE thd perubahan teknologi target",
      unit: "-",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: "Perubahan elastisitas perubahan teknologi dari laju pertumbuhan ekonomi wilayah Akan mempengaruhi tingkat teknologi wilayah (Total Factor Productivity) yang mendorong produksi bds fungsi Cobb-Douglas",
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "time to change Elastisitas LPE thd perubahan teknologi",
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
      name: "std kebutuhan air per kapita SK 146/2023 target",
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
      name: "Waktu pengubahan standard air",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
    waktu_perubahan_lahan_pangan_per_kapita:  {
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
      name: "Lahan built-up per kapita skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 20,
      value: 20,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita:  {
      name: "Waktu perubahan Lahan built-up per kapita",
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
  sulawesi:{
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
      name: "mps asumption",
      unit: "-",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: "Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan [Produk Domestik Regional Bruto/PDRB] pada lembaga keuangan, dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan aktivitas ekonomi wilayah. Rangenya antara 0,2 - 0,7",
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "time to change mps assumption",
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
      name: "laju pertumbuhan populasi asumsi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.5,
      value: 1.5,
      description: "Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 sekira 1,5%/tahun [Riau] dan terendah 0,58%/tahun {DIY} dan rata-rata nasional sekira 1,3% per tahun range nya sekira 0,5% s.d 3% per tahun",
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "time to change laju pertumbuhan populasi asumsi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi:{
      name: "Laju Perubahan Lahan Terbangun per Kapita asumsi",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 3.0,
      value: 3.0,
      description: "Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah 100 m2/kapita, maka kenaikan 1% akan meningkatkan kebutuhan lahan per kapita menjadi 101 m2/kapita. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun. Dikaitkan dengan goal 11.3.1 SDGs tentang Ratio of land consumption rate to population growth rate, dan beberapa studi oleh Angel, S., Parent, J., & Civco, D. L. (2011). The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050 dan Liu, Y., Wang, X., Li, Y., & Peng, J. (2020). Measuring urban land use efficiency in China: A multi-scalar analysis. Sustainable Cities and Society. Kebutuhan lahan per kapita bisa berubah dikarenakan 1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi, 2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yg lebih besar. Angka 1%/tahun pada skenario merupakan asumsi",
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "time to change Laju Perubahan Lahan Terbangun per Kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target:{
      name: "Elastisitas LPE thd perubahan teknologi target",
      unit: "-",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: "Perubahan elastisitas perubahan teknologi dari laju pertumbuhan ekonomi wilayah Akan mempengaruhi tingkat teknologi wilayah (Total Factor Productivity) yang mendorong produksi bds fungsi Cobb-Douglas",
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "time to change Elastisitas LPE thd perubahan teknologi",
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
      name: "std kebutuhan air per kapita SK 146/2023 target",
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
      name: "Waktu pengubahan standard air",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
    waktu_perubahan_lahan_pangan_per_kapita:  {
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
      name: "Lahan built-up per kapita skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 25,
      value: 25,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita:  {
      name: "Waktu perubahan Lahan built-up per kapita",
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
  balinusra:{
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
      name: "mps asumption",
      unit: "-",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: "Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan [Produk Domestik Regional Bruto/PDRB] pada lembaga keuangan, dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan aktivitas ekonomi wilayah. Rangenya antara 0,2 - 0,7",
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "time to change mps assumption",
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
      name: "laju pertumbuhan populasi asumsi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.16,
      value: 1.16,
      description: "Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 sekira 1,5%/tahun [Riau] dan terendah 0,58%/tahun {DIY} dan rata-rata nasional sekira 1,3% per tahun range nya sekira 0,5% s.d 3% per tahun",
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "time to change laju pertumbuhan populasi asumsi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi:{
      name: "Laju Perubahan Lahan Terbangun per Kapita asumsi",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 3.0,
      value: 3.0,
      description: "Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah 100 m2/kapita, maka kenaikan 1% akan meningkatkan kebutuhan lahan per kapita menjadi 101 m2/kapita. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun. Dikaitkan dengan goal 11.3.1 SDGs tentang Ratio of land consumption rate to population growth rate, dan beberapa studi oleh Angel, S., Parent, J., & Civco, D. L. (2011). The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050 dan Liu, Y., Wang, X., Li, Y., & Peng, J. (2020). Measuring urban land use efficiency in China: A multi-scalar analysis. Sustainable Cities and Society. Kebutuhan lahan per kapita bisa berubah dikarenakan 1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi, 2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yg lebih besar. Angka 1%/tahun pada skenario merupakan asumsi",
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "time to change Laju Perubahan Lahan Terbangun per Kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target:{
      name: "Elastisitas LPE thd perubahan teknologi target",
      unit: "-",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: "Perubahan elastisitas perubahan teknologi dari laju pertumbuhan ekonomi wilayah Akan mempengaruhi tingkat teknologi wilayah (Total Factor Productivity) yang mendorong produksi bds fungsi Cobb-Douglas",
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "time to change Elastisitas LPE thd perubahan teknologi",
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
      name: "std kebutuhan air per kapita SK 146/2023 target",
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
      name: "Waktu pengubahan standard air",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
    waktu_perubahan_lahan_pangan_per_kapita:  {
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
      name: "Lahan built-up per kapita skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 20,
      value: 20,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita:  {
      name: "Waktu perubahan Lahan built-up per kapita",
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
  maluku:{
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
      name: "mps asumption",
      unit: "-",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.37,
      value: 0.37,
      description: "Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan [Produk Domestik Regional Bruto/PDRB] pada lembaga keuangan, dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan aktivitas ekonomi wilayah. Rangenya antara 0,2 - 0,7",
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "time to change mps assumption",
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
      name: "laju pertumbuhan populasi asumsi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 1.96,
      value: 1.96,
      description: "Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 sekira 1,5%/tahun [Riau] dan terendah 0,58%/tahun {DIY} dan rata-rata nasional sekira 1,3% per tahun range nya sekira 0,5% s.d 3% per tahun",
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "time to change laju pertumbuhan populasi asumsi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi:{
      name: "Laju Perubahan Lahan Terbangun per Kapita asumsi",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 1.0,
      value: 1.0,
      description: "Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah 100 m2/kapita, maka kenaikan 1% akan meningkatkan kebutuhan lahan per kapita menjadi 101 m2/kapita. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun. Dikaitkan dengan goal 11.3.1 SDGs tentang Ratio of land consumption rate to population growth rate, dan beberapa studi oleh Angel, S., Parent, J., & Civco, D. L. (2011). The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050 dan Liu, Y., Wang, X., Li, Y., & Peng, J. (2020). Measuring urban land use efficiency in China: A multi-scalar analysis. Sustainable Cities and Society. Kebutuhan lahan per kapita bisa berubah dikarenakan 1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi, 2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yg lebih besar. Angka 1%/tahun pada skenario merupakan asumsi",
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "time to change Laju Perubahan Lahan Terbangun per Kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target:{
      name: "Elastisitas LPE thd perubahan teknologi target",
      unit: "-",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.37,
      value: 0.37,
      description: "Perubahan elastisitas perubahan teknologi dari laju pertumbuhan ekonomi wilayah Akan mempengaruhi tingkat teknologi wilayah (Total Factor Productivity) yang mendorong produksi bds fungsi Cobb-Douglas",
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "time to change Elastisitas LPE thd perubahan teknologi",
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
      name: "std kebutuhan air per kapita SK 146/2023 target",
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
      name: "Waktu pengubahan standard air",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
    waktu_perubahan_lahan_pangan_per_kapita:  {
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
      name: "Lahan built-up per kapita skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 25,
      value: 25,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita:  {
      name: "Waktu perubahan Lahan built-up per kapita",
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
  papua:{
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
      name: "mps asumption",
      unit: "-",
      min: 0.2,
      max: 0.7,
      step: 0.025,
      baseline: 0.35,
      value: 0.35,
      description: "Proporsi jumlah yang ditabung (antara 0 - 1) dari pendapatan [Produk Domestik Regional Bruto/PDRB] pada lembaga keuangan, dan tabungan akan disalurkan menjadi investasi untuk meningkatkan produksi dan aktivitas ekonomi wilayah. Rangenya antara 0,2 - 0,7",
      descriptionOpen: false
    },
    time_to_change_mps_assumption: {
      name: "time to change mps assumption",
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
      name: "laju pertumbuhan populasi asumsi",
      unit: "1/tahun",
      min: 0.5,
      max: 3.0,
      step: 0.01,
      baseline: 3.0,
      value: 3.0,
      description: "Menggambarkan laju pertumbuhan populasi tahunan pulau, di mana angka tertinggi 2024 sekira 1,5%/tahun [Riau] dan terendah 0,58%/tahun {DIY} dan rata-rata nasional sekira 1,3% per tahun range nya sekira 0,5% s.d 3% per tahun",
      descriptionOpen: false
    },
    time_to_change_laju_pertumbuhan_populasi_asumsi: {
      name: "time to change laju pertumbuhan populasi asumsi",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju pertumbuhan penduduk",
      descriptionOpen: false
    },
    laju_perubahan_lahan_terbangun_per_kapita_asumsi:{
      name: "Laju Perubahan Lahan Terbangun per Kapita asumsi",
      unit: "%/Tahun",
      min: 1.0,
      max: 20.0,
      step: 0.5,
      baseline: 5.0,
      value: 5.0,
      description: "Menggambarkan laju perubahan lahan terbangun per kapita (ha/kapita), misalkan tahun 2022 kebutuhan lahan per kapita adalah 100 m2/kapita, maka kenaikan 1% akan meningkatkan kebutuhan lahan per kapita menjadi 101 m2/kapita. Makin tinggi lajunya, makin makin tinggi unit kebutuhan lahan terbangun. Dikaitkan dengan goal 11.3.1 SDGs tentang Ratio of land consumption rate to population growth rate, dan beberapa studi oleh Angel, S., Parent, J., & Civco, D. L. (2011). The dimensions of global urban expansion: Estimates and projections for all countries, 2000–2050 dan Liu, Y., Wang, X., Li, Y., & Peng, J. (2020). Measuring urban land use efficiency in China: A multi-scalar analysis. Sustainable Cities and Society. Kebutuhan lahan per kapita bisa berubah dikarenakan 1. Adanya kebijakan pengembangan lahan-lahan terbangun untuk sosial dan ekonomi serta urbanisasi, 2. Peningkatan kesejahteraan (Pendapatan per kapita) juga mendorong individu membutuhkan variasi lahan terbangun yg lebih besar. Angka 1%/tahun pada skenario merupakan asumsi",
      descriptionOpen: false
    },
    time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
      name: "time to change Laju Perubahan Lahan Terbangun per Kapita",
      unit: "Tahun",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu berlakunya perubahan laju perubahan lahan terbangun per kapita",
      descriptionOpen: false
    },
    elastisitas_lpe_thd_perubahan_teknologi_target:{
      name: "Elastisitas LPE thd perubahan teknologi target",
      unit: "-",
      min: 0.35,
      max: 0.7,
      step: 0.01,
      baseline: 0.35,
      value: 0.35,
      description: "Perubahan elastisitas perubahan teknologi dari laju pertumbuhan ekonomi wilayah Akan mempengaruhi tingkat teknologi wilayah (Total Factor Productivity) yang mendorong produksi bds fungsi Cobb-Douglas",
      descriptionOpen: false
    },
    time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
      name: "time to change Elastisitas LPE thd perubahan teknologi",
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
      name: "std kebutuhan air per kapita SK 146/2023 target",
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
      name: "Waktu pengubahan standard air",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
      name: "Waktu perubahan std debit per detik pertanian",
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
    waktu_perubahan_lahan_pangan_per_kapita:  {
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
      name: "Lahan built-up per kapita skenario",
      unit: "m2/jiwa",
      min: 10,
      max: 100,
      step: 5,
      baseline: 20,
      value: 20,
      description: "Lahan Terbangun Per Kapita Pulau yang diturunkan dari data lahan terbangun (permukiman, komersial, infrastruktur, dll) dan jumlah penduduk, dengan angka 20 m2/jiwa",
      descriptionOpen: false
    },
    waktu_perubahan_lahan_built_up_per_kapita:  {
      name: "Waktu perubahan Lahan built-up per kapita",
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