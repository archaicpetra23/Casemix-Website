const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const url = process.env.DATABASE_URL ?? "mysql://root@localhost:3306/casemix_db";
const prisma = new PrismaClient({ adapter: new PrismaMariaDb(url) });

async function main() {
  console.log("🌱 Seeding Casemix RS — Master Data + 128 Pasien & Integrasi\n");

  // 1. ROLE
  const roles = await Promise.all([
    prisma.role.upsert({ where: { nama_role: "Admin" }, update: {}, create: { nama_role: "Admin" } }),
    prisma.role.upsert({ where: { nama_role: "Dokter" }, update: {}, create: { nama_role: "Dokter" } }),
    prisma.role.upsert({ where: { nama_role: "Perawat" }, update: {}, create: { nama_role: "Perawat" } }),
    prisma.role.upsert({ where: { nama_role: "Casemix" }, update: {}, create: { nama_role: "Casemix" } }),
    prisma.role.upsert({ where: { nama_role: "Rekam Medis" }, update: {}, create: { nama_role: "Rekam Medis" } }),
  ]);
  console.log("  ✅ 5 Role");

  // 2. UNIT
  const units = await Promise.all([
    prisma.unit.upsert({ where: { nama_unit: "IGD" }, update: {}, create: { nama_unit: "IGD" } }),
    prisma.unit.upsert({ where: { nama_unit: "Rawat Inap" }, update: {}, create: { nama_unit: "Rawat Inap" } }),
    prisma.unit.upsert({ where: { nama_unit: "Rawat Jalan" }, update: {}, create: { nama_unit: "Rawat Jalan" } }),
    prisma.unit.upsert({ where: { nama_unit: "Bedah" }, update: {}, create: { nama_unit: "Bedah" } }),
    prisma.unit.upsert({ where: { nama_unit: "Laboratorium" }, update: {}, create: { nama_unit: "Laboratorium" } }),
  ]);
  console.log("  ✅ 5 Unit");

  // 3. DIAGNOSIS (35)
  await prisma.diagnosis.createMany({ data: [
    { kode_icd10:"A09", nama_diagnosis:"Diare dan Gastroenteritis", kategori:"Infeksi" },
    { kode_icd10:"B34", nama_diagnosis:"Infeksi Virus", kategori:"Infeksi" },
    { kode_icd10:"D64", nama_diagnosis:"Anemia Lainnya", kategori:"Darah" },
    { kode_icd10:"E11", nama_diagnosis:"Diabetes Melitus Tipe 2", kategori:"Endokrin" },
    { kode_icd10:"G43", nama_diagnosis:"Migrain", kategori:"Saraf" },
    { kode_icd10:"I10", nama_diagnosis:"Hipertensi Esensial", kategori:"Kardiovaskular" },
    { kode_icd10:"J06", nama_diagnosis:"ISPA", kategori:"Respirasi" },
    { kode_icd10:"J18", nama_diagnosis:"Pneumonia", kategori:"Respirasi" },
    { kode_icd10:"K35", nama_diagnosis:"Apendisitis Akut", kategori:"Digestif" },
    { kode_icd10:"N39", nama_diagnosis:"Infeksi Saluran Kemih", kategori:"Urologi" },
    { kode_icd10:"A01", nama_diagnosis:"Demam Tifoid", kategori:"Infeksi" },
    { kode_icd10:"A15", nama_diagnosis:"Tuberkulosis Paru", kategori:"Respirasi" },
    { kode_icd10:"B01", nama_diagnosis:"Cacar Air", kategori:"Infeksi" },
    { kode_icd10:"B05", nama_diagnosis:"Campak", kategori:"Infeksi" },
    { kode_icd10:"B15", nama_diagnosis:"Hepatitis A Akut", kategori:"Hepar" },
    { kode_icd10:"B20", nama_diagnosis:"HIV/AIDS", kategori:"Infeksi" },
    { kode_icd10:"C50", nama_diagnosis:"Kanker Payudara", kategori:"Onkologi" },
    { kode_icd10:"C34", nama_diagnosis:"Kanker Paru", kategori:"Onkologi" },
    { kode_icd10:"D50", nama_diagnosis:"Anemia Defisiensi Besi", kategori:"Darah" },
    { kode_icd10:"E05", nama_diagnosis:"Hipertiroidisme", kategori:"Endokrin" },
    { kode_icd10:"E66", nama_diagnosis:"Obesitas", kategori:"Endokrin" },
    { kode_icd10:"F32", nama_diagnosis:"Episode Depresif", kategori:"Psikiatri" },
    { kode_icd10:"F41", nama_diagnosis:"Gangguan Cemas", kategori:"Psikiatri" },
    { kode_icd10:"G20", nama_diagnosis:"Penyakit Parkinson", kategori:"Saraf" },
    { kode_icd10:"G40", nama_diagnosis:"Epilepsi", kategori:"Saraf" },
    { kode_icd10:"H25", nama_diagnosis:"Katarak Senilis", kategori:"Mata" },
    { kode_icd10:"H65", nama_diagnosis:"Otitis Media Nonsupuratif", kategori:"THT" },
    { kode_icd10:"I20", nama_diagnosis:"Angina Pektoris", kategori:"Kardiovaskular" },
    { kode_icd10:"I21", nama_diagnosis:"Infark Miokard Akut", kategori:"Kardiovaskular" },
    { kode_icd10:"J45", nama_diagnosis:"Asma", kategori:"Respirasi" },
    { kode_icd10:"K21", nama_diagnosis:"GERD", kategori:"Digestif" },
    { kode_icd10:"K29", nama_diagnosis:"Gastritis", kategori:"Digestif" },
    { kode_icd10:"L20", nama_diagnosis:"Dermatitis Atopik", kategori:"Kulit" },
    { kode_icd10:"M10", nama_diagnosis:"Gout", kategori:"Muskuloskeletal" },
    { kode_icd10:"M54", nama_diagnosis:"Nyeri Punggung Bawah (LBP)", kategori:"Muskuloskeletal" },
  ], skipDuplicates: true });
  console.log("  ✅ 35 Diagnosis");

  // 4. TINDAKAN (35)
  await prisma.tindakan.createMany({ data: [
    { kode_tindakan:"38.93", nama_tindakan:"Pengambilan Darah Vena", tarif:50000 },
    { kode_tindakan:"45.13", nama_tindakan:"Endoskopi Saluran Cerna", tarif:1500000 },
    { kode_tindakan:"47.09", nama_tindakan:"Apendektomi", tarif:5000000 },
    { kode_tindakan:"87.44", nama_tindakan:"Foto Rontgen Dada", tarif:150000 },
    { kode_tindakan:"88.01", nama_tindakan:"CT Scan Kepala", tarif:500000 },
    { kode_tindakan:"88.76", nama_tindakan:"USG Abdomen", tarif:350000 },
    { kode_tindakan:"93.90", nama_tindakan:"Fisioterapi Respirasi", tarif:200000 },
    { kode_tindakan:"96.04", nama_tindakan:"Pemasangan Infus", tarif:75000 },
    { kode_tindakan:"99.04", nama_tindakan:"Injeksi Antibiotik IV", tarif:120000 },
    { kode_tindakan:"99.15", nama_tindakan:"Transfusi Darah PRC", tarif:800000 },
    { kode_tindakan:"03.31", nama_tindakan:"Pungsi Lumbal", tarif:350000 },
    { kode_tindakan:"13.41", nama_tindakan:"Ekstraksi Katarak Ekstrakapsular", tarif:4000000 },
    { kode_tindakan:"21.01", nama_tindakan:"Kontrol Perdarahan Hidung (Epistaksis)", tarif:150000 },
    { kode_tindakan:"28.2",  nama_tindakan:"Tonsilektomi", tarif:2500000 },
    { kode_tindakan:"33.24", nama_tindakan:"Bronkoskopi", tarif:1200000 },
    { kode_tindakan:"39.95", nama_tindakan:"Hemodialisis", tarif:900000 },
    { kode_tindakan:"51.22", nama_tindakan:"Kolesistektomi", tarif:6500000 },
    { kode_tindakan:"53.00", nama_tindakan:"Perbaikan Hernia Inguinalis", tarif:4500000 },
    { kode_tindakan:"57.94", nama_tindakan:"Pemasangan Kateter Urine", tarif:80000 },
    { kode_tindakan:"59.8",  nama_tindakan:"Kateterisasi Ureter", tarif:2000000 },
    { kode_tindakan:"73.59", nama_tindakan:"Persalinan Normal", tarif:2500000 },
    { kode_tindakan:"74.1",  nama_tindakan:"Seksio Sesarea (Caesar)", tarif:7500000 },
    { kode_tindakan:"79.0",  nama_tindakan:"Reduksi Tertutup Fraktur", tarif:1500000 },
    { kode_tindakan:"85.41", nama_tindakan:"Mastektomi Simpel", tarif:8500000 },
    { kode_tindakan:"86.04", nama_tindakan:"Insisi dan Drainase Abses Kulit", tarif:250000 },
    { kode_tindakan:"86.22", nama_tindakan:"Eksisi Luka (Debridement)", tarif:400000 },
    { kode_tindakan:"88.71", nama_tindakan:"USG Tiroid", tarif:300000 },
    { kode_tindakan:"89.52", nama_tindakan:"Elektrokardiogram (EKG)", tarif:100000 },
    { kode_tindakan:"89.54", nama_tindakan:"Pemantauan Holter", tarif:450000 },
    { kode_tindakan:"90.59", nama_tindakan:"Pemeriksaan Darah Rutin", tarif:60000 },
    { kode_tindakan:"91.99", nama_tindakan:"Pemeriksaan Urine Rutin", tarif:40000 },
    { kode_tindakan:"93.11", nama_tindakan:"Latihan Rentang Gerak (ROM)", tarif:150000 },
    { kode_tindakan:"93.94", nama_tindakan:"Terapi Inhalasi (Nebulizer)", tarif:120000 },
    { kode_tindakan:"94.25", nama_tindakan:"Penilaian Psikiatri", tarif:300000 },
    { kode_tindakan:"99.21", nama_tindakan:"Injeksi Antibiotik IM", tarif:85000 },
  ], skipDuplicates: true });
  console.log("  ✅ 35 Tindakan");

  // 5. TARIF CBGS (35)
  await prisma.tarifCbgs.createMany({ data: [
    { kode_cbgs:"A-4-10-I",   deskripsi:"Infeksi Saluran Cerna Ringan",         tarif:850000 },
    { kode_cbgs:"A-4-10-II",  deskripsi:"Infeksi Saluran Cerna Ringan Kls II",  tarif:720000 },
    { kode_cbgs:"B-1-14-I",   deskripsi:"Penyakit Jantung Sedang",              tarif:4200000 },
    { kode_cbgs:"C-4-13-III", deskripsi:"Diabetes Komplikasi Berat",            tarif:5500000 },
    { kode_cbgs:"D-4-16-I",   deskripsi:"Pneumonia Ringan",                     tarif:1750000 },
    { kode_cbgs:"E-4-10-II",  deskripsi:"Hipertensi dengan Komplikasi",         tarif:2100000 },
    { kode_cbgs:"G-2-20-I",   deskripsi:"Operasi Apendektomi",                  tarif:7800000 },
    { kode_cbgs:"H-4-11-III", deskripsi:"Gangguan Neurologis Ringan",           tarif:1200000 },
    { kode_cbgs:"I-4-18-I",   deskripsi:"ISK Ringan",                           tarif:950000 },
    { kode_cbgs:"J-1-30-II",  deskripsi:"Anemia Berat Perlu Transfusi",         tarif:3200000 },
    { kode_cbgs:"K-1-10-I",   deskripsi:"Penyakit Endokrin Ringan",             tarif:1500000 },
    { kode_cbgs:"L-2-20-II",  deskripsi:"Operasi Katarak",                      tarif:4500000 },
    { kode_cbgs:"M-3-30-III", deskripsi:"Hemodialisis Rutin",                   tarif:950000 },
    { kode_cbgs:"N-4-40-I",   deskripsi:"Persalinan Normal Tanpa Komplikasi",   tarif:2800000 },
    { kode_cbgs:"O-5-50-II",  deskripsi:"Persalinan Caesar",                    tarif:8500000 },
    { kode_cbgs:"P-6-60-III", deskripsi:"Asma Akut Ringan",                     tarif:1250000 },
    { kode_cbgs:"Q-7-70-I",   deskripsi:"Tonsilektomi Anak",                    tarif:3200000 },
    { kode_cbgs:"R-8-80-II",  deskripsi:"Perbaikan Hernia",                     tarif:5200000 },
    { kode_cbgs:"S-9-90-III", deskripsi:"Demam Berdarah Dengue Ringan",         tarif:1800000 },
    { kode_cbgs:"T-1-11-I",   deskripsi:"Malaria Tanpa Komplikasi",             tarif:1400000 },
    { kode_cbgs:"U-2-22-II",  deskripsi:"Demam Tifoid Rawat Inap",              tarif:2100000 },
    { kode_cbgs:"V-3-33-III", deskripsi:"Tuberkulosis Paru Kategori 1",         tarif:3500000 },
    { kode_cbgs:"W-4-44-I",   deskripsi:"Gagal Ginjal Kronis Ringan",           tarif:4800000 },
    { kode_cbgs:"X-5-55-II",  deskripsi:"Gagal Jantung Kongestif",              tarif:6500000 },
    { kode_cbgs:"Y-6-66-III", deskripsi:"Stroke Iskemik Ringan",                tarif:5400000 },
    { kode_cbgs:"Z-7-77-I",   deskripsi:"Tumor Ganas Payudara Perawatan",       tarif:9000000 },
    { kode_cbgs:"A-8-88-II",  deskripsi:"Perawatan Psikiatri Ringan",           tarif:1600000 },
    { kode_cbgs:"B-9-99-III", deskripsi:"Penyakit Kulit dan Kelamin Ringan",    tarif:900000 },
    { kode_cbgs:"C-1-23-I",   deskripsi:"Luka Bakar Derajat 1 dan 2",           tarif:2400000 },
    { kode_cbgs:"D-2-34-II",  deskripsi:"Trauma Kapitis Ringan",                tarif:3100000 },
    { kode_cbgs:"E-3-45-III", deskripsi:"Fraktur Tertutup Lengan atau Kaki",    tarif:2200000 },
    { kode_cbgs:"F-4-56-I",   deskripsi:"Gastritis Akut",                       tarif:1100000 },
    { kode_cbgs:"G-5-67-II",  deskripsi:"Hepatitis Akut",                       tarif:2600000 },
    { kode_cbgs:"H-6-78-III", deskripsi:"Perawatan HIV/AIDS Tanpa Komplikasi",  tarif:3800000 },
    { kode_cbgs:"I-7-89-I",   deskripsi:"Covid-19 Gejala Sedang",               tarif:4200000 },
  ], skipDuplicates: true });
  console.log("  ✅ 35 Tarif CBGs");

  // 6. TENAGA KESEHATAN (10)
  const nakesList = await Promise.all([
    prisma.tenagaKesehatan.upsert({ where:{ email:"puja@rs.com" }, update:{}, create:{ nama:"dr. Puja Ratnasari",         profesi:"Dokter Umum",      spesialisasi:null,              no_str:"STR-101-2010-001", email:"puja@rs.com", password_hash:"puja", id_role:roles[0].id_role, id_unit:units[2].id_unit }}),
    prisma.tenagaKesehatan.upsert({ where:{ email:"ahmad@rs.com" }, update:{}, create:{ nama:"dr. Ahmad Hidayat, Sp.JP",  profesi:"Dokter Spesialis", spesialisasi:"Jantung",         no_str:"STR-102-2011-002", email:"ahmad@rs.com", password_hash:"ahmad", id_role:roles[1].id_role, id_unit:units[0].id_unit }}),
    prisma.tenagaKesehatan.upsert({ where:{ email:"sari@rs.com" }, update:{}, create:{ nama:"dr. Sari Dewi, Sp.A",        profesi:"Dokter Spesialis", spesialisasi:"Anak",            no_str:"STR-103-2012-003", email:"sari@rs.com", password_hash:"sari", id_role:roles[1].id_role, id_unit:units[2].id_unit }}),
    prisma.tenagaKesehatan.upsert({ where:{ email:"bima@rs.com" }, update:{}, create:{ nama:"dr. Bima Setiawan",          profesi:"Dokter Umum",      spesialisasi:null,              no_str:"STR-104-2013-004", email:"bima@rs.com", password_hash:"bima", id_role:roles[2].id_role, id_unit:units[0].id_unit }}),
    prisma.tenagaKesehatan.upsert({ where:{ email:"anisa@rs.com" }, update:{}, create:{ nama:"dr. Anisa Rahma, Sp.B",     profesi:"Dokter Spesialis", spesialisasi:"Bedah Umum",      no_str:"STR-105-2014-005", email:"anisa@rs.com", password_hash:"anisa", id_role:roles[1].id_role, id_unit:units[3].id_unit }}),
    prisma.tenagaKesehatan.upsert({ where:{ email:"fajar@rs.com" }, update:{}, create:{ nama:"dr. Fajar Nugroho, Sp.S",   profesi:"Dokter Spesialis", spesialisasi:"Saraf",           no_str:"STR-106-2015-006", email:"fajar@rs.com", password_hash:"fajar", id_role:roles[1].id_role, id_unit:units[2].id_unit }}),
    prisma.tenagaKesehatan.upsert({ where:{ email:"rina@rs.com" }, update:{}, create:{ nama:"Ns. Rina Kartika, S.Kep",    profesi:"Perawat",          spesialisasi:null,              no_str:"STR-107-2016-007", email:"rina@rs.com", password_hash:"rina", id_role:roles[2].id_role, id_unit:units[1].id_unit }}),
    prisma.tenagaKesehatan.upsert({ where:{ email:"dian@rs.com" }, update:{}, create:{ nama:"Ns. Dian Permata, S.Kep",    profesi:"Perawat",          spesialisasi:null,              no_str:"STR-108-2017-008", email:"dian@rs.com", password_hash:"dian", id_role:roles[2].id_role, id_unit:units[1].id_unit }}),
    prisma.tenagaKesehatan.upsert({ where:{ email:"lina@rs.com" }, update:{}, create:{ nama:"dr. Lina Susanti, Sp.PK",    profesi:"Dokter Spesialis", spesialisasi:"Patologi Klinik", no_str:"STR-109-2018-009", email:"lina@rs.com", password_hash:"lina", id_role:roles[4].id_role, id_unit:units[4].id_unit }}),
    prisma.tenagaKesehatan.upsert({ where:{ email:"rendi@rs.com" }, update:{}, create:{ nama:"dr. Rendi Pratama",         profesi:"Dokter Umum",      spesialisasi:null,              no_str:"STR-110-2019-010", email:"rendi@rs.com", password_hash:"rendi", id_role:roles[1].id_role, id_unit:units[0].id_unit }}),
    prisma.tenagaKesehatan.upsert({ where:{ email:"razan@rs.com" }, update:{}, create:{ nama:"Razan Rafi A.",             profesi:"Admin",            spesialisasi:"",                no_str:"2510101014", email:"razan@rs.com", password_hash:"razan", id_role:roles[0].id_role, id_unit:units[4].id_unit }}),
  ]);
  console.log("  ✅ 11 Tenaga Kesehatan");

  // 7. PASIEN (128)
  const existingPatientsCount = await prisma.pasien.count();
  if (existingPatientsCount > 0) {
    console.log("  ⚠️ Data pasien sudah ada. Seeding data dummy pasien & transaksi dilewati untuk menghindari duplikasi.");
  } else {
    const firstNames = ["Budi", "Siti", "Ahmad", "Dewi", "Hendra", "Ratna", "Joko", "Mega", "Agus", "Indah", "Rizky", "Putri", "Fajar", "Ayu", "Reza", "Dina", "Irfan", "Lestari", "Ilham", "Maya", "Dwi", "Tri", "Eko", "Nur", "Sri", "Andi", "Fitri", "Eka", "Yudi", "Rini"];
    const lastNames = ["Santoso", "Rahayu", "Fauzi", "Lestari", "Wijaya", "Sari", "Susilo", "Puspita", "Hermawan", "Permatasari", "Pratama", "Hidayat", "Saputra", "Wahyuni", "Kusuma", "Nugroho", "Setiawan", "Utami", "Mahendra", "Wulandari", "Gunawan", "Siregar", "Nasution", "Simanjuntak", "Sitompul"];
    const cities = ["Bandung", "Jakarta", "Surabaya", "Yogyakarta", "Semarang", "Medan", "Makassar", "Palembang", "Balikpapan", "Denpasar"];
    const streets = ["Jl. Merdeka", "Jl. Sudirman", "Jl. Diponegoro", "Jl. Gajah Mada", "Jl. Pahlawan", "Jl. Imam Bonjol", "Jl. Ahmad Yani", "Jl. Veteran", "Jl. Pemuda", "Jl. Kartini", "Jl. Sisingamangaraja", "Jl. Hassanudin", "Jl. Gatot Subroto", "Jl. MT. Haryono", "Jl. Pangeran Antasari", "Jl. Mawar", "Jl. Melati", "Jl. Dahlia", "Jl. Anggrek", "Jl. Cempaka", "Jl. Kenanga", "Jl. Flamboyan", "Jl. Teratai", "Jl. Bougenville", "Jl. Kamboja", "Jl. Nusa Indah", "Jl. Raya Utama", "Jl. Raya Selatan", "Jl. Raya Timur", "Jl. Raya Barat"];

    const newPatients = [];
    for (let i = 1; i <= 128; i++) {
      const year = 1950 + Math.floor(Math.random() * 60);
      const month = 1 + Math.floor(Math.random() * 12);
      const day = 1 + Math.floor(Math.random() * 28);
      const tglLahir = new Date(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
      const st = streets[Math.floor(Math.random() * streets.length)];
      const ct = cities[Math.floor(Math.random() * cities.length)];
      const no = Math.floor(1 + Math.random() * 150);
      const rt = Math.floor(1 + Math.random() * 15).toString().padStart(2, "0");
      const rw = Math.floor(1 + Math.random() * 10).toString().padStart(2, "0");

      newPatients.push({
        nik: "3271" + Math.floor(100000000000 + Math.random() * 900000000000).toString(),
        nama: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        tanggal_lahir: tglLahir,
        jenis_kelamin: Math.random() > 0.5 ? "L" : "P",
        alamat: `${st} No. ${no} RT ${rt}/RW ${rw}, ${ct}`,
        no_hp: "08" + Math.floor(1000000000 + Math.random() * 9000000000).toString()
      });
    }

    await prisma.pasien.createMany({ data: newPatients, skipDuplicates: true });
    console.log("  ✅ 128 Pasien Dummy Bervariasi");

    // Fetch created patients (getting exactly 128 of them to integrate)
    const allPasien = await prisma.pasien.findMany({
      orderBy: { id_pasien: 'desc' },
      take: 128
    });

    // 8. INTEGRASI REKAM MEDIS & KLAIM (128)
    const diagList = await prisma.diagnosis.findMany();
    const procList = await prisma.tindakan.findMany();
    const cbgList = await prisma.tarifCbgs.findMany();
    
    const keluhanList = [
      "Pusing", "Demam tinggi", "Batuk berdahak", "Mual dan muntah", "Nyeri perut",
      "Sesak nafas", "Lemas", "Nyeri dada", "Diare", "Sakit punggung",
      "Nyeri sendi", "Gatal-gatal pada kulit", "Sakit kepala sebelah (migrain)",
      "Penurunan berat badan drastis", "Kelelahan ekstrem", "Sakit tenggorokan",
      "Pilek dan hidung tersumbat", "Sering buang air kecil", "Nyeri saat buang air kecil",
      "Gangguan penglihatan (kabur)", "Mata merah dan berair", "Telinga berdengung",
      "Jantung berdebar keras", "Kaki bengkak", "Kesemutan pada tangan atau kaki",
      "Luka sulit sembuh", "Sulit tidur (insomnia)", "Keringat dingin di malam hari",
      "Nyeri pada leher", "Kram otot", "Gangguan pencernaan (sembelit)"
    ];
    const catatanList = [
      "Kondisi stabil", "Perlu rawat inap", "Observasi 24 jam", "Diberikan obat jalan",
      "Rujuk ke spesialis", "Dehidrasi ringan", "Tanda vital normal", "Suhu 39C",
      "Tekanan darah tinggi (Hipertensi)", "Gula darah sewaktu tinggi", "Menunggu hasil lab",
      "Diet rendah garam dan lemak", "Diberikan terapi oksigen", "Memerlukan fisioterapi",
      "Pasien menolak tindakan medis", "Disarankan bedrest total", "Kontrol ulang minggu depan",
      "Kondisi membaik, boleh pulang", "Alergi terhadap antibiotik (Penicillin)",
      "Ditemukan bunyi napas tambahan (wheezing)", "Pasien tampak pucat dan lemah",
      "Diberikan injeksi anti-nyeri", "Respon baik terhadap pengobatan awal",
      "Disertai mual, tidak bisa makan/minum", "Hasil rontgen menunjukkan kelainan"
    ];
    const statusList = ["pending", "disetujui", "ditolak"];

    let rmCount = 0;
    for (const p of allPasien) {
      const nakes = nakesList[Math.floor(Math.random() * nakesList.length)];
      const diag = diagList[Math.floor(Math.random() * diagList.length)];
      const proc = procList[Math.floor(Math.random() * procList.length)];
      const cbg = cbgList[Math.floor(Math.random() * cbgList.length)];
      
      const date = new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000);
      const dateKlaim = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);

      await prisma.rekamMedis.create({
        data: {
          id_pasien: p.id_pasien,
          id_nakes: nakes.id_nakes,
          tanggal_kunjungan: date,
          keluhan: keluhanList[Math.floor(Math.random() * keluhanList.length)],
          catatan: catatanList[Math.floor(Math.random() * catatanList.length)],
          rekam_diagnosis: { create: [{ kode_icd10: diag.kode_icd10, jenis: "utama" }] },
          detail_tindakan: { create: [{ kode_tindakan: proc.kode_tindakan, jumlah: 1 }] },
          klaim: { create: [{ kode_cbgs: cbg.kode_cbgs, status_klaim: statusList[Math.floor(Math.random() * statusList.length)], tanggal_klaim: dateKlaim }] }
        }
      });
      rmCount++;
    }
    console.log(`  ✅ ${rmCount} Rekam Medis & Klaim Terintegrasi`);

    // 9. LOG AKTIVITAS (10)
    const activities = ["Login ke sistem", "Membuat rekam medis pasien", "Melakukan operasi apendektomi", "Update catatan perawatan rawat inap", "Verifikasi klaim pasien"];
    const logs = [];
    for(let i=0; i<10; i++){
      logs.push({
        id_nakes: nakesList[Math.floor(Math.random() * nakesList.length)].id_nakes,
        aktivitas: activities[Math.floor(Math.random() * activities.length)],
        waktu: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000)
      });
    }
    await prisma.logAktivitas.createMany({ data: logs });
    console.log("  ✅ 10 Log Aktivitas");
  }

  // Summary
  const t = ["pasien","tenagaKesehatan","diagnosis","tindakan","tarifCbgs","rekamMedis","rekamDiagnosis","detailTindakan","klaim","logAktivitas","role","unit"];
  console.log("\n📊 Ringkasan Total Database Saat Ini:");
  for (const m of t) console.log(`   ${m.padEnd(22)} ${await prisma[m].count()} records`);
  console.log("\n🎉 Seeding gabungan selesai!");
}

main().catch(e => { console.error("❌", e); process.exit(1); }).finally(() => prisma.$disconnect());
