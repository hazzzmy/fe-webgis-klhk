
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
      baseline: 0.42,
      value: 0.42,
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
      max: 0.05,
      step: 0.005,
      baseline: 0.012,
      value: 0.012,
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
      max: 0.2,
      step: 0.005,
      baseline: 0.01,
      value: 0.01,
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
      unit: "year",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu untuk mengubah Laju Perubahan Perubahan laju teknologi pada perekonomian",
      descriptionOpen: false
    }
  },
  jawa:{
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
      baseline: 0.35,
      value: 0.35,
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
      max: 0.05,
      step: 0.005,
      baseline: 0.0116235,
      value: 0.0116235,
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
      max: 0.2,
      step: 0.005,
      baseline: 0.01,
      value: 0.01,
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
      unit: "year",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu untuk mengubah Laju Perubahan Perubahan laju teknologi pada perekonomian",
      descriptionOpen: false
    }
  },
  kalimantan:{
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
      baseline: 0.32,
      value: 0.32,
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
      max: 0.05,
      step: 0.005,
      baseline: 0.0132103,
      value: 0.0132103,
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
      max: 0.2,
      step: 0.005,
      baseline: 0.01,
      value: 0.01,
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
      unit: "year",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu untuk mengubah Laju Perubahan Perubahan laju teknologi pada perekonomian",
      descriptionOpen: false
    }
  },
  balinusra:{
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
      unit: "year",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu untuk mengubah Laju Perubahan Perubahan laju teknologi pada perekonomian",
      descriptionOpen: false
    }
  },
  maluku:{
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
      baseline: 0.32,
      value: 0.32,
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
      max: 0.05,
      step: 0.005,
      baseline: 0.0196,
      value: 0.0196,
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
      max: 0.2,
      step: 0.005,
      baseline: 0.01,
      value: 0.01,
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
      unit: "year",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu untuk mengubah Laju Perubahan Perubahan laju teknologi pada perekonomian",
      descriptionOpen: false
    }
  },
  papua:{
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
      baseline: 0.3,
      value: 0.3,
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
      max: 0.05,
      step: 0.005,
      baseline: 0.03,
      value: 0.03,
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
      max: 0.2,
      step: 0.005,
      baseline: 0.05,
      value: 0.05,
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
      unit: "year",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu untuk mengubah Laju Perubahan Perubahan laju teknologi pada perekonomian",
      descriptionOpen: false
    }
  },
  sulawesi:{
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
      baseline: 0.32,
      value: 0.32,
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
      max: 0.05,
      step: 0.005,
      baseline: 0.0196,
      value: 0.0196,
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
      max: 0.2,
      step: 0.005,
      baseline: 0.01,
      value: 0.01,
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
      unit: "year",
      min: 2025,
      max: 2055,
      step: 1,
      baseline: 2055,
      value: 2055,
      description: "Waktu untuk mengubah Laju Perubahan Perubahan laju teknologi pada perekonomian",
      descriptionOpen: false
    }
  },
}