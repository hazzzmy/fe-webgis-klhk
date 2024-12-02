interface TableData {
  id: number;
  year: number;
  value: string;
}

interface Store {
  mps: TableData[];
  lajuPertumbuhanPopulasi: TableData[];
  lajuPerubahanLahan: TableData[];
}

export const initialParamterData : Store = {
    mps: [
      { id: 1, year: 2010, value: '0.300000' },
      { id: 2, year: 2011, value: '0.350000' },
      { id: 3, year: 2012, value: '0.370000' },
      { id: 4, year: 2013, value: '0.370000' },
      { id: 5, year: 2014, value: '0.360000' },
      { id: 6, year: 2015, value: '0.370000' },
      { id: 7, year: 2016, value: '0.350000' },
      { id: 8, year: 2017, value: '0.360000' },
      { id: 9, year: 2018, value: '0.380000' },
      { id: 10, year: 2019, value: '0.390000' },
      { id: 11, year: 2020, value: '0.340000' },
      { id: 12, year: 2021, value: '0.350000' },
      { id: 13, year: 2022, value: '0.350000' },
      { id: 14, year: 2023, value: '0.360000' },
      { id: 15, year: 2024, value: '0.360000' },
      { id: 16, year: 2030, value: '0.369231' },
      { id: 17, year: 2035, value: '0.376923' },
      { id: 18, year: 2040, value: '0.384615' },
      { id: 19, year: 2045, value: '0.392308' },
      { id: 20, year: 2050, value: '0.400000' }
    ],
    lajuPertumbuhanPopulasi: [
      { id: 1, year: 2010, value: '0.022331' },
      { id: 2, year: 2011, value: '0.005703' },
      { id: 3, year: 2012, value: '0.012965' },
      { id: 4, year: 2013, value: '0.020162' },
      { id: 5, year: 2014, value: '0.013858' },
      { id: 6, year: 2015, value: '0.013562' },
      { id: 7, year: 2016, value: '0.013259' },
      { id: 8, year: 2017, value: '0.012977' },
      { id: 9, year: 2018, value: '0.012678' },
      { id: 10, year: 2019, value: '0.019859' },
      { id: 11, year: 2020, value: '-0.001391' },
      { id: 12, year: 2021, value: '0.014386' },
      { id: 13, year: 2022, value: '0.011612' },
      { id: 14, year: 2023, value: '0.012116' }
    ],
    lajuPerubahanLahan: [
      { id: 1, year: 2016, value: '0.205325' },
      { id: 2, year: 2017, value: '0.164053' },
      { id: 3, year: 2018, value: '0.136615' },
      { id: 4, year: 2019, value: '0.115691' },
      { id: 5, year: 2020, value: '0.122478' },
      { id: 6, year: 2021, value: '0.091922' },
      { id: 7, year: 2022, value: '0.113174' },
      { id: 8, year: 2025, value: '0.030000' }
    ]
}

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
  
};

export const initialParameterValue: InitialParameterValueType = {
  initial_time: {
    name: "initial time",
    unit: "Year",
    min: 2016,
    max: 2055,
    step: 1,
    baseline: 2016,
    value: 2016,
    description: "Start Year",
    descriptionOpen: false
  },
  final_time: {
    name: "final time",
    unit: "Year",
    min: 2016,
    max: 2055,
    step: 1,
    baseline: 2055,
    value: 2055,
    description: "End Year",
    descriptionOpen: false
  },
  mps_assumption: {
    name: "mps asumption",
    unit: "dimensionless",
    min: 0.25,
    max: 0.6,
    step: 0.01,
    baseline: 0.36,
    value: 0.36,
    description: "mps = marginal prospensity to save menggambarkan rasio disposable income (dari smoothed PDRB) yang ditabung, dan dari tabungan berpotensi disalurkan dalam bentuk investasi, meningkatkan kapital/kapasitas produksi, meningkatkan produksi, dan nilai tambah (PDRB). makin tinggi angkanya, maka nilai tambah dan Laju Pertumbuhan Ekonomi (LPE) berpotensi semakin tinggi",
    descriptionOpen: false
  },
  time_to_change_mps_assumption: {
    name: "time to change mps assumption",
    unit: "year",
    min: 2025,
    max: 2055,
    step: 1,
    baseline: 2055,
    value: 2055,
    description: "Waktu untuk mengubah asumsi mps pada point sebelumnya",
    descriptionOpen: false
  },
  laju_pertumbuhan_populasi_asumsi: {
    name: "laju pertumbuhan populasi asumsi",
    unit: "1/tahun",
    min: 0.005,
    max: 0.03,
    step: 0.005,
    baseline: 0.0116116,
    value: 0.0116116,
    description: "asumsi Laju Pertumbuhan Populasi di masa mendatang setelah tahun tertentu, merepresentasikan gambaran ke depan terkait LPP baik sebagai dampak perubahan sosio-ekonomi, maupun kebijakan pengendalian penduduk",
    descriptionOpen: false
  },
  time_to_change_laju_pertumbuhan_populasi_asumsi: {
    name: "time to change laju pertumbuhan populasi asumsi",
    unit: "year",
    min: 2025,
    max: 2055,
    step: 1,
    baseline: 2055,
    value: 2055,
    description: "Waktu untuk mengubah asumsi LPP pada point sebelumnya",
    descriptionOpen: false
  },
  laju_perubahan_lahan_terbangun_per_kapita_asumsi:{
    name: "Laju Perubahan Lahan Terbangun per Kapita asumsi",
    unit: "1/year",
    min: 0.01,
    max: 0.1,
    step: 0.005,
    baseline: 0.03,
    value: 0.03,
    description: "Laju Perubahan Lahan Terbangun per Kapita menggambarkan perubahan pada lahan terbangun per kapita [ha/jiwa] yang menggambarkan kebutuhan lahan per kapita. Perubahan terhadap lahan per kapita bisa diakibatkan adanya 1. kebijakan pengembangan lahan terbangun di area tsb, atau 2. peningkatan kesejahteraan yang mengakibatkan kebutuhan akan variasi fungsi pada lahan terbangun makin beragam",
    descriptionOpen: false
  },
  time_to_change_laju_perubahan_lahan_terbangun_per_kapita: {
    name: "time to change Laju Perubahan Lahan Terbangun per Kapita",
    unit: "year",
    min: 2025,
    max: 2055,
    step: 1,
    baseline: 2055,
    value: 2055,
    description: "Waktu untuk mengubah Laju Perubahan lahan per kapita pada poin sebelumnya",
    descriptionOpen: false
  },
  elastisitas_lpe_thd_perubahan_teknologi_target:{
    name: "Elastisitas LPE thd perubahan teknologi target",
    unit: "1/year",
    min: 0.01,
    max: 0.1,
    step: 0.005,
    baseline: 0.03,
    value: 0.03,
    description: "Perubahan elastisitas perubahan teknologi dari laju pertumbuhan ekonomi wilayah Akan mempengaruhi tingkat teknologi wilayah (Total Factor Productivity) yang mendorong produksi bds fungsi Cobb-Douglas",
    descriptionOpen: false
  },
  time_to_change_elastisitas_lpe_thd_perubahan_teknologi: {
    name: "time to change Elastisitas LPE thd perubahan teknologi",
    unit: "year",
    min: 2025,
    max: 2055,
    step: 1,
    baseline: 2055,
    value: 2055,
    description: "Waktu untuk mengubah Laju Perubahan Perubahan laju teknologi pada perekonomian",
    descriptionOpen: false
  }
}