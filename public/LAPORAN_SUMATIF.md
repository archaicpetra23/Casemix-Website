# LAPORAN SUMATIF: SISTEM BASIS DATA (IS31012)
**Proyek:** Casemix RS - Integrated Casemix Management Information System  
**Program Studi:** Informatika  
**Dosen Pengampu:** Dr. Theresia Herlina Rochadiani, S.Kom., M.T.  

---

## A. Judul dan Deskripsi Proyek

### 1. Judul Proyek
**Casemix RS (Integrated Casemix Management Information System)**

### 2. Deskripsi Proyek
**Casemix RS** adalah sistem informasi manajemen rumah sakit terintegrasi yang dirancang khusus untuk mengelola data pasien, tenaga kesehatan (nakes), rekam medis pasien, serta proses pengajuan klaim BPJS Kesehatan menggunakan sistem tarif **INA-CBGs**. 

Sistem ini membantu rumah sakit untuk:
*   Mencatat riwayat kunjungan medis pasien secara komprehensif (keluhan, catatan dokter, kode diagnosis ICD-10, dan kode tindakan medis ICD-9 CM).
*   Menghubungkan rekam medis pasien secara langsung dengan tarif nasional INA-CBGs untuk pengajuan klaim pembiayaan kesehatan.
*   Memantau status klaim BPJS secara *real-time* (Pending, Approved, Rejected) untuk menjaga likuiditas keuangan rumah sakit.
*   Menjaga keamanan data melalui sistem **Role-Based Access Control (RBAC)** untuk 5 peran (Admin, Dokter, Perawat, Casemix, dan Rekam Medis).
*   Menyediakan transparansi tata kelola data melalui fitur **Audit Log** yang mencatat setiap aktivitas CRUD di dalam database.

---

## B. Requirements (Kebutuhan Sistem)

Sistem Casemix RS dirancang dengan kebutuhan fungsional sebagai berikut:
1.  **Pengelolaan Data Pasien (CRUD):** Pencatatan identitas pasien (NIK, Nama, Tanggal Lahir, Jenis Kelamin, Alamat, No. HP).
2.  **Pengelolaan Tenaga Kesehatan (CRUD & Auth):** Pencatatan nakes (Nama, Nomor STR, Email, Password Hash, Role, Unit Kerja) serta otentikasi login.
3.  **Pengelolaan Rekam Medis (CRUD):** Pencatatan keluhan, catatan medis, tanggal kunjungan, serta relasi many-to-many ke master kode diagnosis (ICD-10) dan tindakan medis (ICD-9 CM).
4.  **Pengelolaan Klaim BPJS (CRUD):** Pencatatan nomor klaim, pengaitannya ke rekam medis, pemilihan kode tarif INA-CBGs, penginputan tanggal klaim, serta perubahan status klaim.
5.  **Master Referensi ICD:** Penyediaan database referensi standar internasional ICD-10 (Diagnosis) dan ICD-9 CM (Tindakan/Prosedur Medis) serta kode tarif resmi INA-CBGs.
6.  **Dashboard dan Analitik:** Visualisasi jumlah pasien, klaim, tren penyakit terbanyak, serta distribusi status klaim BPJS.
7.  **Audit Log:** Pencatatan otomatis aktivitas operasional (siapa melakukan apa dan kapan) untuk keperluan kepatuhan (*compliance*).

---

## C. Entity Relationship Diagram (ERD)

Database diimplementasikan menggunakan 12 entitas/tabel yang saling terhubung untuk mengakomodasi seluruh kebutuhan bisnis rumah sakit. Representasi visual ERD dapat dilihat pada berkas [Revisi Diagram Casemix.jpeg](file:///home/razan/Documents/Basis%20Data%20kel%201/docs/Revisi%20Diagram%20Casemix.jpeg).

### Deskripsi Hubungan Antar Tabel (Kardinalitas):
1.  **Role ↔ Tenaga Kesehatan (1:N):** Satu role (misal: Dokter) dapat dimiliki oleh banyak tenaga kesehatan.
2.  **Unit ↔ Tenaga Kesehatan (1:N):** Satu unit kerja (misal: Unit Penyakit Dalam) memiliki banyak tenaga kesehatan.
3.  **Pasien ↔ Rekam Medis (1:N):** Satu pasien dapat melakukan kunjungan dan memiliki banyak rekam medis dari waktu ke waktu.
4.  **Tenaga Kesehatan ↔ Rekam Medis (1:N):** Satu nakes (Dokter/Perawat) dapat menulis atau menangani banyak rekam medis pasien.
5.  **Rekam Medis ↔ Diagnosis (M:N via `rekam_diagnosis`):** Satu rekam medis dapat memiliki beberapa diagnosis (misal: diagnosis utama dan sekunder), dan satu diagnosis (ICD-10) dapat dikaitkan dengan banyak rekam medis pasien.
6.  **Rekam Medis ↔ Tindakan (M:N via `detail_tindakan`):** Satu rekam medis dapat menerima beberapa tindakan medis (ICD-9 CM), dan satu tindakan medis dapat diberikan pada banyak rekam medis.
7.  **Tarif CBGs ↔ Klaim (1:N):** Satu kode tarif INA-CBGs dapat digunakan untuk banyak pengajuan klaim BPJS.
8.  **Rekam Medis ↔ Klaim (1:1 / 1:N):** Satu rekam medis diajukan untuk klaim pembiayaan. Di skema kita dirancang 1:N (rekam medis memiliki relasi koleksi klaim) untuk fleksibilitas jika terjadi klaim ulang/revisi.
9.  **Tenaga Kesehatan ↔ Log Aktivitas (1:N):** Satu tenaga kesehatan dapat melakukan banyak aktivitas yang dicatat di log audit.

---

## D. Transformasi ke Relational Database & Normalisasi

Proses normalisasi dilakukan untuk memastikan database terbebas dari anomali data (insert, update, delete anomaly) serta redundansi yang tidak perlu.

### 1. Bentuk Tidak Ternormalisasi (Unnormalized Form - UNF)
Pada bentuk UNF, semua data kunjungan pasien, dokter, diagnosis, tindakan, dan klaim digabungkan ke dalam satu lembar data besar.
*   **Masalah:** Satu baris rekam medis berisi kolom diagnosis majemuk (misal: `ICD10: A90, K30`) dan tindakan majemuk (`ICD9: 89.52, 99.04`) dalam satu kolom (bukan nilai atomik). Terjadi pengulangan data pasien (Nama, Alamat) dan dokter (Spesialisasi, Unit) di setiap baris kunjungan.

### 2. Bentuk Normal Kesatu (1NF)
**Syarat 1NF:** Setiap kolom hanya boleh berisi satu nilai tunggal (atomik), tidak ada grup berulang (*repeating groups*), dan memiliki Primary Key yang unik.
*   **Transformasi:** Diagnosis majemuk dan tindakan majemuk dipisah menjadi baris terpisah atau dipindahkan ke tabel tersendiri. Setiap baris diidentifikasi secara unik oleh kombinasi `ID_Kunjungan` dan kode ICD terkait.
*   **Masalah di 1NF:** Terjadi dependensi parsial. Atribut seperti `Nama_Pasien`, `Tanggal_Lahir`, `Nama_Nakes`, `Spesialisasi_Nakes`, dan `Tarif_Tindakan` hanya bergantung pada sebagian key (misal: `Nama_Pasien` hanya bergantung pada `ID_Pasien`, bukan `ID_Kunjungan` secara keseluruhan).

### 3. Bentuk Normal Kedua (2NF)
**Syarat 2NF:** Memenuhi syarat 1NF dan tidak boleh ada dependensi parsial (*partial dependency*), di mana semua atribut non-key harus bergantung penuh pada seluruh Primary Key (Candidate Key).
*   **Transformasi:** Memecah entitas menjadi beberapa tabel master terpisah:
    *   `pasien` (id_pasien [PK], nik, nama, tanggal_lahir, jenis_kelamin, alamat, no_hp)
    *   `tenaga_kesehatan` (id_nakes [PK], nama, profesi, spesialisasi, no_str, email, password_hash)
    *   `diagnosis` (kode_icd10 [PK], nama_diagnosis, kategori)
    *   `tindakan` (kode_tindakan [PK], nama_tindakan, tarif)
    *   `tarif_cbgs` (kode_cbgs [PK], deskripsi, tarif)
    *   `rekam_medis` (id_rekam [PK], id_pasien [FK], id_nakes [FK], tanggal_kunjungan, keluhan, catatan)
    *   Tabel penghubung (Junction Tables) untuk relasi M:N:
        *   `rekam_diagnosis` (id [PK], id_rekam [FK], kode_icd10 [FK], jenis)
        *   `detail_tindakan` (id_detail [PK], id_rekam [FK], kode_tindakan [FK], jumlah)
*   **Masalah di 2NF:** Masih terdapat dependensi transitif di tabel `tenaga_kesehatan`. Atribut `Nama_Role` dan `Nama_Unit` tidak bergantung langsung pada `id_nakes`, melainkan bergantung pada role dan unit kerja nakes tersebut.

### 4. Bentuk Normal Ketiga (3NF)
**Syarat 3NF:** Memenuhi syarat 2NF dan tidak boleh ada dependensi transitif (*transitive dependency*), di mana atribut non-key tidak boleh bergantung pada atribut non-key lainnya.
*   **Transformasi:** Memindahkan atribut `role` dan `unit` kerja ke dalam tabel referensi sendiri:
    *   `role` (id_role [PK], nama_role)
    *   `unit` (id_unit [PK], nama_unit)
*   Tabel `tenaga_kesehatan` kini hanya menyimpan kunci asing `id_role` [FK] dan `id_unit` [FK]. Dengan demikian, seluruh atribut non-key di semua tabel sekarang bergantung penuh secara langsung pada Primary Key masing-masing. Database resmi mencapai bentuk **3NF**.

---

## E. Kompleksitas Pengambilan Informasi (SQL Queries)

Untuk memenuhi kriteria nilai A, di bawah ini didefinisikan **6 Query SQL Kompleks** yang masing-masing melibatkan **lebih dari 2 tabel** dan **mengandung subquery** (menggunakan agregasi, fungsi rata-rata, kriteria bernilai majemuk, maupun korelasi data).

### Query 1: Pasien dengan Biaya Klaim di Atas Rata-rata Tarif CBGs
*   **Deskripsi:** Menampilkan daftar pasien dan informasi klaim medisnya yang memiliki nilai tarif INA-CBGs di atas rata-rata tarif klaim nasional rumah sakit.
*   **Tabel Terlibat (4):** `pasien`, `rekam_medis`, `klaim`, `tarif_cbgs`
*   **Subquery:** Mengambil rata-rata (`AVG`) tarif dari seluruh referensi CBGs.
*   **Query SQL:**
    ```sql
    SELECT 
      p.id_pasien,
      p.nama AS nama_pasien,
      rm.id_rekam,
      tc.kode_cbgs,
      tc.deskripsi,
      tc.tarif AS tarif_cbgs
    FROM pasien p
    JOIN rekam_medis rm ON p.id_pasien = rm.id_pasien
    JOIN klaim k ON rm.id_rekam = k.id_rekam
    JOIN tarif_cbgs tc ON k.kode_cbgs = tc.kode_cbgs
    WHERE tc.tarif > (
      SELECT AVG(tc2.tarif) 
      FROM tarif_cbgs tc2
    )
    ORDER BY tc.tarif DESC;
    ```

### Query 2: Tenaga Kesehatan dengan Jumlah Penanganan di Atas Rata-rata Kunjungan
*   **Deskripsi:** Mencari dokter/perawat yang sangat aktif, dengan kriteria menangani kunjungan rekam medis pasien di atas rata-rata jumlah penanganan staf kesehatan lainnya.
*   **Tabel Terlibat (3):** `tenaga_kesehatan`, `unit`, `rekam_medis`
*   **Subquery:** Menghitung rata-rata frekuensi kunjungan pasien per tenaga kesehatan di seluruh rumah sakit.
*   **Query SQL:**
    ```sql
    SELECT 
      nk.id_nakes,
      nk.nama AS nama_nakes,
      u.nama_unit,
      COUNT(rm.id_rekam) AS jumlah_penanganan
    FROM tenaga_kesehatan nk
    JOIN unit u ON nk.id_unit = u.id_unit
    LEFT JOIN rekam_medis rm ON nk.id_nakes = rm.id_nakes
    GROUP BY nk.id_nakes, nk.nama, u.nama_unit
    HAVING COUNT(rm.id_rekam) > (
      SELECT AVG(sub.total)
      FROM (
        SELECT COUNT(id_rekam) AS total
        FROM rekam_medis
        GROUP BY id_nakes
      ) sub
    )
    ORDER BY jumlah_penanganan DESC;
    ```

### Query 3: Diagnosis Terpopuler dengan Akumulasi Biaya Tindakan di Atas Rata-rata Tarif Tindakan
*   **Deskripsi:** Mengidentifikasi diagnosis (ICD-10) yang penanganannya memiliki total akumulasi biaya tindakan medis (ICD-9 CM) di atas rata-rata harga satuan tindakan medis di rumah sakit.
*   **Tabel Terlibat (5):** `diagnosis`, `rekam_diagnosis`, `rekam_medis`, `detail_tindakan`, `tindakan`
*   **Subquery:** Menghitung rata-rata harga tarif satuan tindakan medis (`AVG(tarif)`) dari tabel master tindakan.
*   **Query SQL:**
    ```sql
    SELECT 
      d.kode_icd10,
      d.nama_diagnosis,
      COUNT(DISTINCT rm.id_rekam) AS frekuensi_kasus,
      SUM(t.tarif * dt.jumlah) AS total_biaya_tindakan
    FROM diagnosis d
    JOIN rekam_diagnosis rd ON d.kode_icd10 = rd.kode_icd10
    JOIN rekam_medis rm ON rd.id_rekam = rm.id_rekam
    JOIN detail_tindakan dt ON rm.id_rekam = dt.id_rekam
    JOIN tindakan t ON dt.kode_tindakan = t.kode_tindakan
    GROUP BY d.kode_icd10, d.nama_diagnosis
    HAVING SUM(t.tarif * dt.jumlah) > (
      SELECT AVG(t2.tarif) FROM tindakan t2
    )
    ORDER BY total_biaya_tindakan DESC;
    ```

### Query 4: Klaim Pending dengan Estimasi Biaya Tindakan Melebihi Rata-rata Biaya Klaim Disetujui
*   **Deskripsi:** Menganalisis antrean klaim pending yang memiliki nilai tindakan medis di atas rata-rata nilai tindakan medis dari kelompok klaim yang sudah sukses disetujui (*Approved*).
*   **Tabel Terlibat (4):** `klaim`, `rekam_medis`, `detail_tindakan`, `tindakan`
*   **Subquery:** Menghitung rata-rata total nilai tindakan medis per klaim yang statusnya sudah 'disetujui'.
*   **Query SQL:**
    ```sql
    SELECT 
      k.id_klaim,
      k.status_klaim,
      rm.id_rekam,
      SUM(t.tarif * dt.jumlah) AS total_estimasi_tindakan
    FROM klaim k
    JOIN rekam_medis rm ON k.id_rekam = rm.id_rekam
    JOIN detail_tindakan dt ON rm.id_rekam = dt.id_rekam
    JOIN tindakan t ON dt.kode_tindakan = t.kode_tindakan
    WHERE k.status_klaim = 'pending'
    GROUP BY k.id_klaim, k.status_klaim, rm.id_rekam
    HAVING SUM(t.tarif * dt.jumlah) > (
      SELECT AVG(sub.total_tindakan)
      FROM (
        SELECT SUM(t2.tarif * dt2.jumlah) AS total_tindakan
        FROM klaim k2
        JOIN rekam_medis rm2 ON k2.id_rekam = rm2.id_rekam
        JOIN detail_tindakan dt2 ON rm2.id_rekam = dt2.id_rekam
        JOIN tindakan t2 ON dt2.kode_tindakan = t2.kode_tindakan
        WHERE k2.status_klaim = 'disetujui'
        GROUP BY k2.id_klaim
      ) sub
    )
    ORDER BY total_estimasi_tindakan DESC;
    ```

### Query 5: Pasien dengan Kunjungan Berulang (Multiple Visits) Terdiagnosa Penyakit Terpopuler
*   **Deskripsi:** Menemukan pasien bertipe *chronic/repeat customer* (kunjungan > 1 kali) yang mengidap penyakit terpopuler (5 diagnosis teratas di rumah sakit).
*   **Tabel Terlibat (4):** `pasien`, `rekam_medis`, `rekam_diagnosis`, `diagnosis`
*   **Subquery:** Mengidentifikasi daftar 5 kode diagnosis ICD-10 dengan frekuensi kemunculan terbanyak di rekam medis.
*   **Query SQL:**
    ```sql
    SELECT 
      p.id_pasien,
      p.nama AS nama_pasien,
      COUNT(rm.id_rekam) AS total_kunjungan,
      GROUP_CONCAT(DISTINCT d.nama_diagnosis SEPARATOR '; ') AS riwayat_diagnosis
    FROM pasien p
    JOIN rekam_medis rm ON p.id_pasien = rm.id_pasien
    JOIN rekam_diagnosis rd ON rm.id_rekam = rd.id_rekam
    JOIN diagnosis d ON rd.kode_icd10 = d.kode_icd10
    WHERE rd.kode_icd10 IN (
      SELECT sub.kode_icd10
      FROM (
        SELECT kode_icd10, COUNT(id) AS cnt
        FROM rekam_diagnosis
        GROUP BY kode_icd10
        ORDER BY cnt DESC
        LIMIT 5
      ) sub
    )
    GROUP BY p.id_pasien, p.nama
    HAVING COUNT(rm.id_rekam) > 1;
    ```

### Query 6: Log Aktivitas Staf dengan Tingkat Aktivitas di Atas Rata-rata Unitnya
*   **Deskripsi:** Mengidentifikasi anggota staf di setiap unit kerja yang memiliki performa atau intensitas interaksi CRUD sistem di atas rata-rata jumlah log aktivitas nakes di unit kerjanya sendiri (analisis korelasi unit).
*   **Tabel Terlibat (3):** `tenaga_kesehatan`, `unit`, `log_aktivitas`
*   **Subquery:** Menghitung rata-rata aktivitas log per tenaga kesehatan di dalam unit kerja yang berkorelasi.
*   **Query SQL:**
    ```sql
    SELECT 
      nk.id_nakes,
      nk.nama AS nama_nakes,
      u.nama_unit,
      COUNT(la.id_log) AS jumlah_aktivitas
    FROM tenaga_kesehatan nk
    JOIN unit u ON nk.id_unit = u.id_unit
    JOIN log_aktivitas la ON nk.id_nakes = la.id_nakes
    GROUP BY nk.id_nakes, nk.nama, u.nama_unit
    HAVING COUNT(la.id_log) > (
      SELECT AVG(sub.total_log)
      FROM (
        SELECT nk2.id_unit, nk2.id_nakes, COUNT(la2.id_log) AS total_log
        FROM tenaga_kesehatan nk2
        LEFT JOIN log_aktivitas la2 ON nk2.id_nakes = la2.id_nakes
        GROUP BY nk2.id_unit, nk2.id_nakes
      ) sub
      WHERE sub.id_unit = nk.id_unit
    )
    ORDER BY jumlah_aktivitas DESC;
    ```

---

## F. Kesimpulan
Database Casemix RS telah dirancang menggunakan kaidah normalisasi relasional formal hingga bentuk **3NF** untuk menjamin konsistensi dan integritas data. Seluruh kriteria dalam naskah penilaian sumatif (meliputi dokumentasi requirements, pemetaan ERD, pembentukan database MariaDB terintegrasi, dan pemenuhan query SQL kompleks dengan join serta subquery) telah berhasil diimplementasikan dengan sempurna baik pada tingkat database maupun secara langsung pada dashboard aplikasi web interaktif.
