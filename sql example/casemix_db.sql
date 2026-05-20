-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 20, 2026 at 07:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `casemix_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_tindakan`
--

CREATE TABLE `detail_tindakan` (
  `id_detail` int(11) NOT NULL,
  `id_rekam` int(11) NOT NULL,
  `kode_tindakan` varchar(20) NOT NULL,
  `jumlah` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detail_tindakan`
--

INSERT INTO `detail_tindakan` (`id_detail`, `id_rekam`, `kode_tindakan`, `jumlah`) VALUES
(1, 1, '99.21', 1),
(2, 2, '53.00', 1),
(3, 3, '21.01', 1),
(4, 4, '88.01', 1),
(5, 5, '91.99', 1),
(6, 6, '99.04', 1),
(7, 7, '89.54', 1),
(8, 8, '87.44', 1),
(9, 9, '89.52', 1),
(10, 10, '86.04', 1),
(11, 11, '88.01', 1),
(12, 12, '85.41', 1),
(13, 13, '13.41', 1),
(14, 14, '85.41', 1),
(15, 15, '73.59', 1),
(16, 16, '74.1', 1),
(17, 17, '53.00', 1),
(18, 18, '45.13', 1),
(19, 19, '28.2', 1),
(20, 20, '89.52', 1),
(21, 21, '88.01', 1),
(22, 22, '93.11', 1),
(23, 23, '96.04', 1),
(24, 24, '73.59', 1),
(25, 25, '21.01', 1),
(26, 26, '33.24', 1),
(27, 27, '86.04', 1),
(28, 28, '38.93', 1),
(29, 29, '13.41', 1),
(30, 30, '99.15', 1),
(31, 31, '99.15', 1),
(32, 32, '45.13', 1),
(33, 33, '79.0', 1),
(34, 34, '99.21', 1),
(35, 35, '96.04', 1),
(36, 36, '13.41', 1),
(37, 37, '87.44', 1),
(38, 38, '99.21', 1),
(39, 39, '38.93', 1),
(40, 40, '13.41', 1),
(41, 41, '33.24', 1),
(42, 42, '21.01', 1),
(43, 43, '39.95', 1),
(44, 44, '91.99', 1),
(45, 45, '99.21', 1),
(46, 46, '86.04', 1),
(47, 47, '53.00', 1),
(48, 48, '86.22', 1),
(49, 49, '51.22', 1),
(50, 50, '99.21', 1),
(51, 51, '96.04', 1),
(52, 52, '93.90', 1),
(53, 53, '94.25', 1),
(54, 54, '74.1', 1),
(55, 55, '85.41', 1),
(56, 56, '13.41', 1),
(57, 57, '53.00', 1),
(58, 58, '87.44', 1),
(59, 59, '38.93', 1),
(60, 60, '73.59', 1),
(61, 61, '94.25', 1),
(62, 62, '88.76', 1),
(63, 63, '86.22', 1),
(64, 64, '33.24', 1),
(65, 65, '74.1', 1),
(66, 66, '86.22', 1),
(67, 67, '73.59', 1),
(68, 68, '93.11', 1),
(69, 69, '51.22', 1),
(70, 70, '59.8', 1),
(71, 71, '53.00', 1),
(72, 72, '99.21', 1),
(73, 73, '47.09', 1),
(74, 74, '87.44', 1),
(75, 75, '89.52', 1),
(76, 76, '89.52', 1),
(77, 77, '73.59', 1),
(78, 78, '88.71', 1),
(79, 79, '59.8', 1),
(80, 80, '21.01', 1),
(81, 81, '13.41', 1),
(82, 82, '73.59', 1),
(83, 83, '88.71', 1),
(84, 84, '53.00', 1),
(85, 85, '73.59', 1),
(86, 86, '74.1', 1),
(87, 87, '86.22', 1),
(88, 88, '45.13', 1),
(89, 89, '74.1', 1),
(90, 90, '73.59', 1),
(91, 91, '33.24', 1),
(92, 92, '88.71', 1),
(93, 93, '38.93', 1),
(94, 94, '59.8', 1),
(95, 95, '88.76', 1),
(96, 96, '99.21', 1),
(97, 97, '38.93', 1),
(98, 98, '74.1', 1),
(99, 99, '53.00', 1),
(100, 100, '90.59', 1),
(101, 101, '90.59', 1),
(102, 102, '79.0', 1),
(103, 103, '13.41', 1),
(104, 104, '53.00', 1),
(105, 105, '93.90', 1),
(106, 106, '79.0', 1),
(107, 107, '13.41', 1),
(108, 108, '28.2', 1),
(109, 109, '88.71', 1),
(110, 110, '99.04', 1),
(111, 111, '33.24', 1),
(112, 112, '74.1', 1),
(113, 113, '33.24', 1),
(114, 114, '74.1', 1),
(115, 115, '33.24', 1),
(116, 116, '85.41', 1),
(117, 117, '89.52', 1),
(118, 118, '86.04', 1),
(119, 119, '21.01', 1),
(120, 120, '73.59', 1),
(121, 121, '28.2', 1),
(122, 122, '28.2', 1),
(123, 123, '79.0', 1),
(124, 124, '47.09', 1),
(125, 125, '99.15', 1),
(126, 126, '13.41', 1),
(127, 127, '96.04', 1),
(128, 128, '51.22', 1);

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis`
--

CREATE TABLE `diagnosis` (
  `kode_icd10` varchar(20) NOT NULL,
  `nama_diagnosis` varchar(300) NOT NULL,
  `kategori` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `diagnosis`
--

INSERT INTO `diagnosis` (`kode_icd10`, `nama_diagnosis`, `kategori`) VALUES
('A01', 'Demam Tifoid', 'Infeksi'),
('A09', 'Diare dan Gastroenteritis', 'Infeksi'),
('A15', 'Tuberkulosis Paru', 'Respirasi'),
('B01', 'Cacar Air', 'Infeksi'),
('B05', 'Campak', 'Infeksi'),
('B15', 'Hepatitis A Akut', 'Hepar'),
('B20', 'HIV/AIDS', 'Infeksi'),
('B34', 'Infeksi Virus', 'Infeksi'),
('C34', 'Kanker Paru', 'Onkologi'),
('C50', 'Kanker Payudara', 'Onkologi'),
('D50', 'Anemia Defisiensi Besi', 'Darah'),
('D64', 'Anemia Lainnya', 'Darah'),
('E05', 'Hipertiroidisme', 'Endokrin'),
('E11', 'Diabetes Melitus Tipe 2', 'Endokrin'),
('E66', 'Obesitas', 'Endokrin'),
('F32', 'Episode Depresif', 'Psikiatri'),
('F41', 'Gangguan Cemas', 'Psikiatri'),
('G20', 'Penyakit Parkinson', 'Saraf'),
('G40', 'Epilepsi', 'Saraf'),
('G43', 'Migrain', 'Saraf'),
('H25', 'Katarak Senilis', 'Mata'),
('H65', 'Otitis Media Nonsupuratif', 'THT'),
('I10', 'Hipertensi Esensial', 'Kardiovaskular'),
('I20', 'Angina Pektoris', 'Kardiovaskular'),
('I21', 'Infark Miokard Akut', 'Kardiovaskular'),
('J06', 'ISPA', 'Respirasi'),
('J18', 'Pneumonia', 'Respirasi'),
('J45', 'Asma', 'Respirasi'),
('K21', 'GERD', 'Digestif'),
('K29', 'Gastritis', 'Digestif'),
('K35', 'Apendisitis Akut', 'Digestif'),
('L20', 'Dermatitis Atopik', 'Kulit'),
('M10', 'Gout', 'Muskuloskeletal'),
('M54', 'Nyeri Punggung Bawah (LBP)', 'Muskuloskeletal'),
('N39', 'Infeksi Saluran Kemih', 'Urologi');

-- --------------------------------------------------------

--
-- Table structure for table `klaim`
--

CREATE TABLE `klaim` (
  `id_klaim` int(11) NOT NULL,
  `id_rekam` int(11) NOT NULL,
  `kode_cbgs` varchar(20) DEFAULT NULL,
  `status_klaim` varchar(20) NOT NULL DEFAULT 'pending',
  `tanggal_klaim` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `klaim`
--

INSERT INTO `klaim` (`id_klaim`, `id_rekam`, `kode_cbgs`, `status_klaim`, `tanggal_klaim`) VALUES
(1, 1, 'D-4-16-I', 'ditolak', '2026-03-12'),
(2, 2, 'E-3-45-III', 'pending', '2026-05-02'),
(3, 3, 'L-2-20-II', 'pending', '2026-04-05'),
(4, 4, 'F-4-56-I', 'disetujui', '2026-02-22'),
(5, 5, 'J-1-30-II', 'ditolak', '2026-03-03'),
(6, 6, 'D-2-34-II', 'disetujui', '2026-04-23'),
(7, 7, 'A-4-10-II', 'disetujui', '2026-04-28'),
(8, 8, 'A-4-10-I', 'pending', '2026-03-27'),
(9, 9, 'N-4-40-I', 'ditolak', '2026-05-01'),
(10, 10, 'A-4-10-II', 'pending', '2026-03-19'),
(11, 11, 'U-2-22-II', 'pending', '2026-05-18'),
(12, 12, 'P-6-60-III', 'ditolak', '2026-05-22'),
(13, 13, 'A-4-10-II', 'disetujui', '2026-04-06'),
(14, 14, 'I-4-18-I', 'disetujui', '2026-03-22'),
(15, 15, 'N-4-40-I', 'ditolak', '2026-04-19'),
(16, 16, 'T-1-11-I', 'pending', '2026-03-04'),
(17, 17, 'W-4-44-I', 'pending', '2026-03-08'),
(18, 18, 'A-8-88-II', 'disetujui', '2026-03-21'),
(19, 19, 'W-4-44-I', 'disetujui', '2026-05-17'),
(20, 20, 'M-3-30-III', 'disetujui', '2026-05-08'),
(21, 21, 'D-2-34-II', 'pending', '2026-04-18'),
(22, 22, 'L-2-20-II', 'pending', '2026-04-07'),
(23, 23, 'G-2-20-I', 'ditolak', '2026-05-06'),
(24, 24, 'I-7-89-I', 'ditolak', '2026-04-26'),
(25, 25, 'P-6-60-III', 'disetujui', '2026-03-07'),
(26, 26, 'W-4-44-I', 'disetujui', '2026-02-25'),
(27, 27, 'L-2-20-II', 'pending', '2026-02-23'),
(28, 28, 'Q-7-70-I', 'pending', '2026-03-01'),
(29, 29, 'K-1-10-I', 'pending', '2026-03-06'),
(30, 30, 'A-4-10-I', 'ditolak', '2026-04-07'),
(31, 31, 'E-4-10-II', 'disetujui', '2026-04-07'),
(32, 32, 'R-8-80-II', 'pending', '2026-03-03'),
(33, 33, 'N-4-40-I', 'disetujui', '2026-03-01'),
(34, 34, 'D-4-16-I', 'disetujui', '2026-05-22'),
(35, 35, 'I-7-89-I', 'disetujui', '2026-03-07'),
(36, 36, 'H-4-11-III', 'ditolak', '2026-03-16'),
(37, 37, 'Q-7-70-I', 'pending', '2026-04-04'),
(38, 38, 'H-6-78-III', 'ditolak', '2026-03-02'),
(39, 39, 'B-9-99-III', 'disetujui', '2026-04-03'),
(40, 40, 'X-5-55-II', 'pending', '2026-02-24'),
(41, 41, 'C-4-13-III', 'pending', '2026-03-16'),
(42, 42, 'N-4-40-I', 'disetujui', '2026-05-16'),
(43, 43, 'I-7-89-I', 'ditolak', '2026-05-18'),
(44, 44, 'D-2-34-II', 'disetujui', '2026-04-28'),
(45, 45, 'A-8-88-II', 'ditolak', '2026-03-27'),
(46, 46, 'M-3-30-III', 'pending', '2026-04-18'),
(47, 47, 'W-4-44-I', 'ditolak', '2026-05-16'),
(48, 48, 'G-5-67-II', 'pending', '2026-04-08'),
(49, 49, 'P-6-60-III', 'ditolak', '2026-04-25'),
(50, 50, 'G-5-67-II', 'pending', '2026-04-25'),
(51, 51, 'Z-7-77-I', 'disetujui', '2026-05-14'),
(52, 52, 'M-3-30-III', 'pending', '2026-04-23'),
(53, 53, 'Q-7-70-I', 'pending', '2026-03-03'),
(54, 54, 'Z-7-77-I', 'ditolak', '2026-05-07'),
(55, 55, 'K-1-10-I', 'pending', '2026-03-24'),
(56, 56, 'D-2-34-II', 'ditolak', '2026-03-30'),
(57, 57, 'L-2-20-II', 'pending', '2026-02-24'),
(58, 58, 'I-7-89-I', 'ditolak', '2026-03-03'),
(59, 59, 'G-5-67-II', 'ditolak', '2026-04-02'),
(60, 60, 'Q-7-70-I', 'disetujui', '2026-04-23'),
(61, 61, 'I-7-89-I', 'ditolak', '2026-03-28'),
(62, 62, 'J-1-30-II', 'pending', '2026-02-28'),
(63, 63, 'A-4-10-II', 'ditolak', '2026-02-26'),
(64, 64, 'X-5-55-II', 'pending', '2026-04-29'),
(65, 65, 'E-4-10-II', 'disetujui', '2026-03-03'),
(66, 66, 'C-1-23-I', 'ditolak', '2026-03-20'),
(67, 67, 'M-3-30-III', 'pending', '2026-03-24'),
(68, 68, 'S-9-90-III', 'ditolak', '2026-03-15'),
(69, 69, 'B-1-14-I', 'ditolak', '2026-02-23'),
(70, 70, 'M-3-30-III', 'ditolak', '2026-04-23'),
(71, 71, 'R-8-80-II', 'ditolak', '2026-02-22'),
(72, 72, 'G-2-20-I', 'disetujui', '2026-03-09'),
(73, 73, 'D-4-16-I', 'pending', '2026-04-21'),
(74, 74, 'U-2-22-II', 'ditolak', '2026-03-02'),
(75, 75, 'Y-6-66-III', 'disetujui', '2026-05-09'),
(76, 76, 'Q-7-70-I', 'disetujui', '2026-03-31'),
(77, 77, 'C-1-23-I', 'ditolak', '2026-03-09'),
(78, 78, 'H-6-78-III', 'ditolak', '2026-04-17'),
(79, 79, 'I-7-89-I', 'disetujui', '2026-04-23'),
(80, 80, 'O-5-50-II', 'ditolak', '2026-04-02'),
(81, 81, 'G-5-67-II', 'disetujui', '2026-03-12'),
(82, 82, 'G-5-67-II', 'ditolak', '2026-05-07'),
(83, 83, 'S-9-90-III', 'ditolak', '2026-04-07'),
(84, 84, 'B-9-99-III', 'ditolak', '2026-04-15'),
(85, 85, 'M-3-30-III', 'disetujui', '2026-04-12'),
(86, 86, 'A-8-88-II', 'ditolak', '2026-04-19'),
(87, 87, 'K-1-10-I', 'ditolak', '2026-02-26'),
(88, 88, 'H-4-11-III', 'pending', '2026-04-08'),
(89, 89, 'H-6-78-III', 'pending', '2026-04-12'),
(90, 90, 'C-4-13-III', 'disetujui', '2026-04-26'),
(91, 91, 'W-4-44-I', 'pending', '2026-03-19'),
(92, 92, 'Q-7-70-I', 'disetujui', '2026-04-17'),
(93, 93, 'V-3-33-III', 'pending', '2026-04-02'),
(94, 94, 'M-3-30-III', 'ditolak', '2026-04-10'),
(95, 95, 'L-2-20-II', 'ditolak', '2026-05-17'),
(96, 96, 'B-1-14-I', 'ditolak', '2026-05-18'),
(97, 97, 'Q-7-70-I', 'disetujui', '2026-03-04'),
(98, 98, 'A-8-88-II', 'pending', '2026-05-06'),
(99, 99, 'C-1-23-I', 'disetujui', '2026-04-05'),
(100, 100, 'V-3-33-III', 'disetujui', '2026-03-07'),
(101, 101, 'G-5-67-II', 'pending', '2026-04-09'),
(102, 102, 'I-7-89-I', 'disetujui', '2026-05-17'),
(103, 103, 'A-4-10-I', 'pending', '2026-03-27'),
(104, 104, 'T-1-11-I', 'disetujui', '2026-02-23'),
(105, 105, 'Q-7-70-I', 'disetujui', '2026-03-12'),
(106, 106, 'C-1-23-I', 'disetujui', '2026-04-28'),
(107, 107, 'D-2-34-II', 'ditolak', '2026-02-27'),
(108, 108, 'E-3-45-III', 'disetujui', '2026-03-24'),
(109, 109, 'P-6-60-III', 'disetujui', '2026-02-26'),
(110, 110, 'X-5-55-II', 'disetujui', '2026-03-30'),
(111, 111, 'C-1-23-I', 'ditolak', '2026-03-19'),
(112, 112, 'N-4-40-I', 'ditolak', '2026-03-30'),
(113, 113, 'U-2-22-II', 'ditolak', '2026-03-17'),
(114, 114, 'I-7-89-I', 'pending', '2026-02-22'),
(115, 115, 'P-6-60-III', 'pending', '2026-03-11'),
(116, 116, 'O-5-50-II', 'pending', '2026-04-08'),
(117, 117, 'L-2-20-II', 'disetujui', '2026-04-30'),
(118, 118, 'Z-7-77-I', 'disetujui', '2026-04-27'),
(119, 119, 'H-6-78-III', 'pending', '2026-04-13'),
(120, 120, 'S-9-90-III', 'disetujui', '2026-03-04'),
(121, 121, 'C-4-13-III', 'ditolak', '2026-04-02'),
(122, 122, 'M-3-30-III', 'pending', '2026-03-08'),
(123, 123, 'J-1-30-II', 'disetujui', '2026-03-09'),
(124, 124, 'W-4-44-I', 'disetujui', '2026-04-20'),
(125, 125, 'Q-7-70-I', 'disetujui', '2026-05-03'),
(126, 126, 'O-5-50-II', 'disetujui', '2026-04-29'),
(127, 127, 'A-4-10-I', 'disetujui', '2026-05-02'),
(128, 128, 'G-5-67-II', 'ditolak', '2026-04-13');

-- --------------------------------------------------------

--
-- Table structure for table `log_aktivitas`
--

CREATE TABLE `log_aktivitas` (
  `id_log` int(11) NOT NULL,
  `id_nakes` int(11) NOT NULL,
  `aktivitas` varchar(500) NOT NULL,
  `waktu` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `log_aktivitas`
--

INSERT INTO `log_aktivitas` (`id_log`, `id_nakes`, `aktivitas`, `waktu`) VALUES
(1, 3, 'Update catatan perawatan rawat inap', '2026-05-11 16:25:13.081'),
(2, 3, 'Verifikasi klaim pasien', '2026-05-14 16:25:13.081'),
(3, 9, 'Verifikasi klaim pasien', '2026-05-14 16:25:13.081'),
(4, 6, 'Melakukan operasi apendektomi', '2026-05-15 16:25:13.081'),
(5, 5, 'Verifikasi klaim pasien', '2026-05-15 16:25:13.081'),
(6, 5, 'Membuat rekam medis pasien', '2026-05-12 16:25:13.081'),
(7, 5, 'Melakukan operasi apendektomi', '2026-05-13 16:25:13.081'),
(8, 2, 'Melakukan operasi apendektomi', '2026-05-13 16:25:13.081'),
(9, 3, 'Melakukan operasi apendektomi', '2026-05-14 16:25:13.081'),
(10, 7, 'Melakukan operasi apendektomi', '2026-05-13 16:25:13.081'),
(11, 2, 'Login ke sistem (Admin)', '2026-05-20 16:25:53.518'),
(12, 11, 'Login ke sistem (Admin)', '2026-05-20 16:31:06.759'),
(13, 2, 'Login ke sistem (Casemix)', '2026-05-20 16:31:27.217'),
(14, 11, 'Login ke sistem (Admin)', '2026-05-20 16:31:38.266'),
(15, 1, 'Menambahkan tindakan ICD-9: 99.99 — Tindakan Test', '2026-05-20 16:38:48.305'),
(16, 11, 'Mengubah status klaim #34 menjadi: disetujui', '2026-05-20 16:41:48.941'),
(17, 11, 'Mengubah status klaim #102 menjadi: disetujui', '2026-05-20 16:41:54.097'),
(18, 11, 'Mengubah status klaim #19 menjadi: disetujui', '2026-05-20 16:41:58.374'),
(19, 2, 'Login ke sistem (Casemix)', '2026-05-20 16:42:27.980'),
(20, 11, 'Login ke sistem (Admin)', '2026-05-20 16:42:37.756');

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `id_pasien` int(11) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `nama` varchar(200) NOT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` varchar(2) NOT NULL,
  `alamat` text DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`id_pasien`, `nik`, `nama`, `tanggal_lahir`, `jenis_kelamin`, `alamat`, `no_hp`) VALUES
(1, '3271472010685545', 'Ratna Pratama', '1957-07-15', 'P', 'Jl. Imam Bonjol No. 76 RT 06/RW 02, Bandung', '088045608616'),
(2, '3271120658467232', 'Rini Nugroho', '1955-03-08', 'P', 'Jl. Pemuda No. 41 RT 04/RW 05, Yogyakarta', '086356095377'),
(3, '3271417912054246', 'Dewi Sari', '1987-08-12', 'L', 'Jl. Raya Selatan No. 52 RT 03/RW 06, Denpasar', '084480714298'),
(4, '3271795395431908', 'Dewi Santoso', '2009-01-28', 'P', 'Jl. Raya Utama No. 132 RT 11/RW 03, Yogyakarta', '083989699980'),
(5, '3271491728726553', 'Irfan Pratama', '2007-09-08', 'P', 'Jl. Pemuda No. 141 RT 07/RW 06, Jakarta', '088376136319'),
(6, '3271947690986120', 'Eka Susilo', '1985-09-16', 'L', 'Jl. Hassanudin No. 70 RT 06/RW 07, Makassar', '088292093193'),
(7, '3271214453132909', 'Fajar Simanjuntak', '1999-07-21', 'L', 'Jl. Gatot Subroto No. 87 RT 08/RW 02, Makassar', '081089827184'),
(8, '3271805797034866', 'Joko Mahendra', '2003-12-01', 'L', 'Jl. Dahlia No. 67 RT 10/RW 04, Palembang', '089062193710'),
(9, '3271476091731296', 'Lestari Permatasari', '1972-10-26', 'P', 'Jl. Ahmad Yani No. 5 RT 02/RW 04, Denpasar', '084871293892'),
(10, '3271528997810988', 'Ayu Santoso', '1992-03-24', 'L', 'Jl. Kamboja No. 129 RT 12/RW 08, Denpasar', '089379494489'),
(11, '3271403522350171', 'Eko Simanjuntak', '1975-09-07', 'P', 'Jl. Kenanga No. 108 RT 07/RW 09, Denpasar', '088046489992'),
(12, '3271108997826006', 'Eko Susilo', '1955-06-20', 'L', 'Jl. Melati No. 91 RT 07/RW 03, Yogyakarta', '086479927399'),
(13, '3271761744416298', 'Lestari Siregar', '1974-11-05', 'P', 'Jl. Nusa Indah No. 99 RT 06/RW 08, Palembang', '086445460318'),
(14, '3271441944997284', 'Hendra Susilo', '1990-01-21', 'L', 'Jl. Teratai No. 37 RT 04/RW 10, Palembang', '088052746726'),
(15, '3271147701525981', 'Yudi Simanjuntak', '1952-10-11', 'L', 'Jl. Ahmad Yani No. 4 RT 05/RW 10, Surabaya', '086584051680'),
(16, '3271860488433398', 'Dewi Nugroho', '1978-10-18', 'L', 'Jl. Flamboyan No. 124 RT 04/RW 01, Bandung', '085345467319'),
(17, '3271158377274141', 'Dewi Simanjuntak', '1968-11-04', 'P', 'Jl. Dahlia No. 19 RT 07/RW 09, Palembang', '084296993972'),
(18, '3271802707667068', 'Eko Nasution', '1972-06-05', 'P', 'Jl. Imam Bonjol No. 139 RT 09/RW 06, Denpasar', '086985271873'),
(19, '3271927766911905', 'Eko Mahendra', '1962-04-04', 'L', 'Jl. Sisingamangaraja No. 105 RT 13/RW 01, Yogyakarta', '082898441722'),
(20, '3271748746793482', 'Tri Wijaya', '1973-05-07', 'P', 'Jl. Mawar No. 57 RT 01/RW 02, Semarang', '084159553771'),
(21, '3271505204137407', 'Agus Wahyuni', '1963-10-03', 'P', 'Jl. Kartini No. 12 RT 07/RW 03, Surabaya', '082243166686'),
(22, '3271619184253127', 'Sri Sari', '1962-03-12', 'P', 'Jl. Hassanudin No. 3 RT 06/RW 09, Medan', '087420397113'),
(23, '3271902136214242', 'Siti Gunawan', '1968-02-08', 'P', 'Jl. Hassanudin No. 74 RT 05/RW 10, Makassar', '082536471213'),
(24, '3271157172042701', 'Maya Saputra', '1953-11-22', 'L', 'Jl. Melati No. 69 RT 06/RW 04, Jakarta', '089763214210'),
(25, '3271118314684024', 'Hendra Wijaya', '1963-07-18', 'L', 'Jl. Sudirman No. 62 RT 07/RW 08, Medan', '088593850584'),
(26, '3271935451296441', 'Rizky Siregar', '1976-01-26', 'L', 'Jl. Sudirman No. 68 RT 09/RW 01, Palembang', '085993838714'),
(27, '3271364194728307', 'Maya Rahayu', '1968-09-02', 'L', 'Jl. Gajah Mada No. 119 RT 03/RW 07, Yogyakarta', '084576211597'),
(28, '3271755246919578', 'Hendra Gunawan', '1995-01-03', 'P', 'Jl. MT. Haryono No. 23 RT 06/RW 02, Medan', '087183175974'),
(29, '3271633200732636', 'Tri Santoso', '2002-10-09', 'L', 'Jl. Melati No. 115 RT 13/RW 03, Bandung', '087210740863'),
(30, '3271992664831792', 'Sri Hermawan', '1972-09-04', 'L', 'Jl. Dahlia No. 121 RT 03/RW 05, Balikpapan', '082465881293'),
(31, '3271358578479357', 'Rizky Nugroho', '2007-01-02', 'L', 'Jl. Hassanudin No. 150 RT 02/RW 06, Balikpapan', '086853633159'),
(32, '3271197076575264', 'Hendra Rahayu', '1957-04-24', 'L', 'Jl. Kenanga No. 141 RT 14/RW 08, Denpasar', '088848914986'),
(33, '3271150419084288', 'Joko Wahyuni', '1997-10-17', 'L', 'Jl. Imam Bonjol No. 124 RT 02/RW 01, Denpasar', '081692294379'),
(34, '3271610168930587', 'Rini Hermawan', '1963-07-24', 'P', 'Jl. Bougenville No. 37 RT 02/RW 06, Denpasar', '084690998418'),
(35, '3271739282158707', 'Hendra Hermawan', '1981-11-06', 'P', 'Jl. Mawar No. 1 RT 14/RW 10, Makassar', '083637844032'),
(36, '3271397867969781', 'Fajar Hermawan', '1969-02-10', 'L', 'Jl. Pahlawan No. 28 RT 10/RW 03, Yogyakarta', '088702347519'),
(37, '3271721269646910', 'Reza Saputra', '1975-06-19', 'L', 'Jl. Pahlawan No. 72 RT 01/RW 10, Medan', '087119311073'),
(38, '3271350407045313', 'Eko Fauzi', '1964-08-09', 'P', 'Jl. Pangeran Antasari No. 78 RT 09/RW 07, Jakarta', '087395100059'),
(39, '3271832523736939', 'Rini Nasution', '1993-04-20', 'L', 'Jl. Sudirman No. 92 RT 06/RW 02, Makassar', '087072940761'),
(40, '3271587941329725', 'Irfan Fauzi', '2007-10-09', 'P', 'Jl. Cempaka No. 39 RT 15/RW 08, Surabaya', '086787416656'),
(41, '3271796986341638', 'Rizky Nugroho', '2000-07-12', 'L', 'Jl. Kartini No. 97 RT 13/RW 01, Yogyakarta', '082396593867'),
(42, '3271200505858731', 'Rini Mahendra', '2005-07-05', 'L', 'Jl. Cempaka No. 131 RT 07/RW 01, Semarang', '083533616846'),
(43, '3271188523388420', 'Indah Mahendra', '1967-04-14', 'P', 'Jl. Sudirman No. 78 RT 15/RW 03, Bandung', '089367258160'),
(44, '3271286847286372', 'Mega Setiawan', '1951-02-06', 'P', 'Jl. Raya Selatan No. 30 RT 13/RW 01, Bandung', '088981414325'),
(45, '3271416130139927', 'Putri Puspita', '1992-04-05', 'L', 'Jl. Dahlia No. 4 RT 08/RW 03, Balikpapan', '087227914925'),
(46, '3271295864825113', 'Yudi Nasution', '2004-01-27', 'P', 'Jl. Hassanudin No. 31 RT 02/RW 09, Jakarta', '085052623605'),
(47, '3271690869824892', 'Reza Santoso', '1998-12-19', 'L', 'Jl. Mawar No. 100 RT 12/RW 06, Palembang', '082404518001'),
(48, '3271615511802508', 'Yudi Sitompul', '1953-06-18', 'L', 'Jl. Pemuda No. 54 RT 08/RW 09, Denpasar', '083542048028'),
(49, '3271956847363432', 'Siti Wijaya', '1952-04-07', 'L', 'Jl. Kenanga No. 54 RT 04/RW 05, Jakarta', '082892439478'),
(50, '3271946203954616', 'Ilham Gunawan', '2006-08-02', 'L', 'Jl. Kartini No. 8 RT 04/RW 07, Semarang', '082361358616'),
(51, '3271148415060817', 'Ayu Santoso', '1993-07-16', 'P', 'Jl. Dahlia No. 16 RT 10/RW 04, Semarang', '087945150693'),
(52, '3271477306041201', 'Joko Sari', '1985-01-01', 'P', 'Jl. Pangeran Antasari No. 131 RT 05/RW 09, Denpasar', '083860543408'),
(53, '3271886876495231', 'Nur Mahendra', '1989-01-05', 'L', 'Jl. Ahmad Yani No. 64 RT 13/RW 02, Makassar', '087331342474'),
(54, '3271423310364068', 'Nur Sari', '1954-06-17', 'P', 'Jl. Veteran No. 105 RT 12/RW 02, Jakarta', '087550719576'),
(55, '3271274993042044', 'Fajar Wahyuni', '1950-02-20', 'L', 'Jl. Imam Bonjol No. 127 RT 08/RW 01, Jakarta', '081369542838'),
(56, '3271504314137065', 'Eka Utami', '1985-11-21', 'P', 'Jl. Dahlia No. 27 RT 03/RW 06, Yogyakarta', '087471167509'),
(57, '3271859226508754', 'Tri Sari', '1958-01-02', 'P', 'Jl. Anggrek No. 138 RT 09/RW 05, Makassar', '081755325420'),
(58, '3271841936087251', 'Irfan Gunawan', '1979-10-23', 'P', 'Jl. Gatot Subroto No. 116 RT 06/RW 07, Yogyakarta', '089985498382'),
(59, '3271532046250538', 'Andi Wulandari', '2009-12-25', 'L', 'Jl. Raya Timur No. 54 RT 11/RW 01, Jakarta', '088453217070'),
(60, '3271717394575923', 'Tri Puspita', '1957-05-10', 'L', 'Jl. Dahlia No. 70 RT 15/RW 02, Makassar', '083179136091'),
(61, '3271808093506166', 'Maya Siregar', '1989-02-15', 'P', 'Jl. Ahmad Yani No. 71 RT 05/RW 04, Jakarta', '089121787294'),
(62, '3271221163797296', 'Rizky Hermawan', '1994-12-12', 'L', 'Jl. Pahlawan No. 97 RT 05/RW 01, Semarang', '084060095847'),
(63, '3271316072225482', 'Agus Mahendra', '1999-03-23', 'P', 'Jl. Sisingamangaraja No. 55 RT 07/RW 09, Medan', '082593777087'),
(64, '3271980722241719', 'Ilham Rahayu', '1956-12-08', 'L', 'Jl. Veteran No. 77 RT 07/RW 06, Denpasar', '081416253701'),
(65, '3271238283847592', 'Dina Utami', '1956-03-20', 'L', 'Jl. Pangeran Antasari No. 64 RT 14/RW 02, Yogyakarta', '081436675224'),
(66, '3271453101091745', 'Rini Pratama', '1989-09-04', 'L', 'Jl. Raya Utama No. 47 RT 12/RW 05, Semarang', '085828760131'),
(67, '3271756199129231', 'Rini Rahayu', '1974-06-20', 'P', 'Jl. Kartini No. 133 RT 08/RW 06, Makassar', '083850181455'),
(68, '3271755883053753', 'Rizky Wulandari', '1987-04-08', 'L', 'Jl. Anggrek No. 141 RT 07/RW 08, Yogyakarta', '082150751235'),
(69, '3271870998025454', 'Budi Wulandari', '1965-06-10', 'P', 'Jl. Cempaka No. 79 RT 06/RW 08, Jakarta', '089549380670'),
(70, '3271910897273649', 'Rizky Puspita', '2003-05-01', 'L', 'Jl. Kartini No. 52 RT 15/RW 08, Surabaya', '088814381378'),
(71, '3271250260395654', 'Irfan Gunawan', '1981-04-11', 'L', 'Jl. MT. Haryono No. 40 RT 12/RW 07, Denpasar', '082848476358'),
(72, '3271893818841772', 'Agus Fauzi', '1966-11-23', 'P', 'Jl. Ahmad Yani No. 67 RT 07/RW 02, Denpasar', '088708748975'),
(73, '3271637519288292', 'Siti Sitompul', '1986-10-03', 'L', 'Jl. Imam Bonjol No. 139 RT 11/RW 04, Semarang', '088364533798'),
(74, '3271769991555854', 'Sri Gunawan', '1970-09-15', 'L', 'Jl. Cempaka No. 94 RT 10/RW 07, Balikpapan', '083166580330'),
(75, '3271291997821803', 'Rini Simanjuntak', '1952-10-04', 'L', 'Jl. Anggrek No. 113 RT 07/RW 03, Yogyakarta', '081036120760'),
(76, '3271751862598288', 'Tri Setiawan', '1978-07-04', 'P', 'Jl. Cempaka No. 141 RT 13/RW 04, Surabaya', '083489976035'),
(77, '3271115013860893', 'Reza Wahyuni', '1987-06-01', 'L', 'Jl. Nusa Indah No. 97 RT 13/RW 01, Palembang', '086602648234'),
(78, '3271158862706634', 'Dewi Permatasari', '1981-12-06', 'P', 'Jl. Gajah Mada No. 114 RT 07/RW 04, Makassar', '083044932494'),
(79, '3271526161491188', 'Dewi Wulandari', '2000-07-03', 'L', 'Jl. Diponegoro No. 40 RT 05/RW 07, Balikpapan', '089498216799'),
(80, '3271837984061253', 'Maya Nasution', '1950-10-16', 'P', 'Jl. Hassanudin No. 30 RT 14/RW 08, Makassar', '085836132749'),
(81, '3271718044102830', 'Mega Nasution', '1969-02-06', 'L', 'Jl. Teratai No. 108 RT 01/RW 03, Palembang', '088158939231'),
(82, '3271171691392493', 'Hendra Nasution', '1987-05-09', 'P', 'Jl. Bougenville No. 77 RT 14/RW 07, Denpasar', '082181677881'),
(83, '3271164485197857', 'Rini Santoso', '2005-11-13', 'L', 'Jl. Raya Barat No. 142 RT 08/RW 03, Semarang', '084203647719'),
(84, '3271183398722428', 'Reza Saputra', '1987-04-08', 'L', 'Jl. Raya Selatan No. 29 RT 09/RW 03, Yogyakarta', '088195640857'),
(85, '3271640676307155', 'Siti Wahyuni', '1973-07-14', 'P', 'Jl. Veteran No. 105 RT 11/RW 09, Palembang', '084737479155'),
(86, '3271414954663216', 'Ahmad Hermawan', '1959-08-14', 'L', 'Jl. Kartini No. 94 RT 10/RW 08, Bandung', '088408324000'),
(87, '3271427420162379', 'Ratna Sitompul', '1955-05-05', 'P', 'Jl. Dahlia No. 10 RT 08/RW 01, Bandung', '081114583328'),
(88, '3271360099702788', 'Andi Santoso', '1954-05-27', 'P', 'Jl. Veteran No. 55 RT 04/RW 06, Balikpapan', '085319917228'),
(89, '3271127937414549', 'Eko Fauzi', '2009-08-26', 'P', 'Jl. Diponegoro No. 87 RT 08/RW 02, Makassar', '086647298234'),
(90, '3271599764492204', 'Ayu Rahayu', '1992-10-22', 'L', 'Jl. Dahlia No. 12 RT 09/RW 10, Palembang', '088964582100'),
(91, '3271291744047111', 'Budi Saputra', '1952-07-19', 'P', 'Jl. Raya Barat No. 100 RT 01/RW 02, Bandung', '084409218106'),
(92, '3271748530013263', 'Ratna Wulandari', '1954-10-22', 'P', 'Jl. Raya Timur No. 60 RT 02/RW 01, Yogyakarta', '088870239901'),
(93, '3271759812202427', 'Putri Wulandari', '1963-03-18', 'P', 'Jl. Anggrek No. 25 RT 07/RW 07, Jakarta', '089039817831'),
(94, '3271902427989332', 'Eka Simanjuntak', '2006-02-09', 'P', 'Jl. Kartini No. 148 RT 13/RW 09, Palembang', '081790142970'),
(95, '3271668958131301', 'Ratna Mahendra', '1998-11-25', 'L', 'Jl. Gajah Mada No. 14 RT 08/RW 03, Semarang', '081832634569'),
(96, '3271827833636521', 'Hendra Permatasari', '1961-06-10', 'P', 'Jl. Veteran No. 134 RT 11/RW 03, Palembang', '089288307424'),
(97, '3271270271449849', 'Irfan Susilo', '1977-12-12', 'P', 'Jl. Melati No. 107 RT 11/RW 09, Surabaya', '088068230169'),
(98, '3271764871596262', 'Tri Puspita', '1998-05-27', 'L', 'Jl. Bougenville No. 126 RT 06/RW 06, Jakarta', '082805788601'),
(99, '3271182050123488', 'Hendra Rahayu', '1955-08-06', 'P', 'Jl. Raya Timur No. 5 RT 08/RW 03, Jakarta', '088967845741'),
(100, '3271582202537887', 'Dewi Sitompul', '2006-06-14', 'P', 'Jl. Teratai No. 99 RT 15/RW 01, Denpasar', '081468531578'),
(101, '3271351029466714', 'Ayu Santoso', '1990-09-21', 'L', 'Jl. MT. Haryono No. 46 RT 15/RW 02, Jakarta', '084617413668'),
(102, '3271722595027363', 'Ratna Pratama', '1982-11-19', 'P', 'Jl. Veteran No. 89 RT 12/RW 03, Palembang', '086337816684'),
(103, '3271270852261281', 'Eka Nugroho', '1962-07-25', 'P', 'Jl. Sisingamangaraja No. 9 RT 04/RW 10, Denpasar', '084011672270'),
(104, '3271512209505053', 'Mega Setiawan', '1972-12-25', 'P', 'Jl. Diponegoro No. 116 RT 01/RW 05, Palembang', '088139878683'),
(105, '3271314793381368', 'Irfan Sitompul', '1963-10-21', 'P', 'Jl. Kenanga No. 72 RT 02/RW 08, Surabaya', '084552832706'),
(106, '3271270404821107', 'Dwi Fauzi', '1984-07-10', 'P', 'Jl. Imam Bonjol No. 50 RT 02/RW 04, Semarang', '084895974472'),
(107, '3271440531791730', 'Andi Fauzi', '1990-03-12', 'L', 'Jl. Melati No. 143 RT 04/RW 10, Bandung', '082602384632'),
(108, '3271636910381443', 'Andi Wulandari', '1995-04-18', 'P', 'Jl. Pemuda No. 19 RT 02/RW 03, Palembang', '085567870681'),
(109, '3271425252255555', 'Maya Wulandari', '1993-09-03', 'L', 'Jl. Melati No. 17 RT 13/RW 10, Medan', '081563558480'),
(110, '3271969648285704', 'Agus Wulandari', '1953-04-22', 'L', 'Jl. Sisingamangaraja No. 110 RT 05/RW 08, Yogyakarta', '083525431069'),
(111, '3271722786058704', 'Reza Sari', '1988-08-06', 'P', 'Jl. Mawar No. 27 RT 15/RW 09, Semarang', '082818449753'),
(112, '3271667883715877', 'Rini Fauzi', '1995-08-06', 'P', 'Jl. Merdeka No. 120 RT 10/RW 04, Medan', '085362921397'),
(113, '3271238407686301', 'Agus Hidayat', '2003-11-10', 'P', 'Jl. Imam Bonjol No. 140 RT 13/RW 08, Makassar', '083522480773'),
(114, '3271371545812839', 'Hendra Wulandari', '1959-07-05', 'L', 'Jl. Kenanga No. 20 RT 02/RW 05, Surabaya', '086901378798'),
(115, '3271242811853910', 'Rini Wijaya', '2001-03-04', 'P', 'Jl. Dahlia No. 145 RT 01/RW 09, Yogyakarta', '086865557830'),
(116, '3271760260893810', 'Siti Sitompul', '1975-02-07', 'L', 'Jl. Cempaka No. 93 RT 15/RW 02, Yogyakarta', '089839727585'),
(117, '3271987598902830', 'Lestari Simanjuntak', '1972-12-18', 'L', 'Jl. Nusa Indah No. 16 RT 10/RW 03, Bandung', '089811938587'),
(118, '3271834261434302', 'Yudi Hermawan', '1962-11-28', 'L', 'Jl. Nusa Indah No. 149 RT 03/RW 06, Balikpapan', '081312191396'),
(119, '3271986561393073', 'Nur Santoso', '1973-11-26', 'P', 'Jl. Merdeka No. 55 RT 15/RW 01, Semarang', '088085675899'),
(120, '3271414331950686', 'Rizky Saputra', '1965-03-03', 'P', 'Jl. Sudirman No. 144 RT 15/RW 05, Denpasar', '083624189174'),
(121, '3271955392002031', 'Indah Gunawan', '2000-02-04', 'L', 'Jl. Melati No. 132 RT 03/RW 01, Semarang', '087690192088'),
(122, '3271252382982754', 'Rizky Setiawan', '2000-08-25', 'L', 'Jl. Dahlia No. 9 RT 15/RW 06, Makassar', '089199145220'),
(123, '3271704424007407', 'Ahmad Hermawan', '1984-01-28', 'P', 'Jl. Bougenville No. 22 RT 06/RW 09, Surabaya', '087560407240'),
(124, '3271181380056175', 'Tri Wahyuni', '2000-11-12', 'L', 'Jl. Teratai No. 33 RT 07/RW 04, Makassar', '086069814310'),
(125, '3271333734832072', 'Ahmad Sari', '1959-11-08', 'L', 'Jl. Flamboyan No. 138 RT 12/RW 05, Semarang', '083137362071'),
(126, '3271927120802585', 'Lestari Siregar', '1975-03-16', 'P', 'Jl. Hassanudin No. 83 RT 08/RW 09, Surabaya', '089338741741'),
(127, '3271759032190030', 'Irfan Wahyuni', '1997-10-18', 'L', 'Jl. Hassanudin No. 15 RT 05/RW 03, Medan', '084621825916'),
(128, '3271888600502231', 'Dina Nasution', '1983-11-12', 'L', 'Jl. Bougenville No. 71 RT 12/RW 03, Semarang', '086976568862');

-- --------------------------------------------------------

--
-- Table structure for table `rekam_diagnosis`
--

CREATE TABLE `rekam_diagnosis` (
  `id` int(11) NOT NULL,
  `id_rekam` int(11) NOT NULL,
  `kode_icd10` varchar(20) NOT NULL,
  `jenis` varchar(20) NOT NULL DEFAULT 'utama'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rekam_diagnosis`
--

INSERT INTO `rekam_diagnosis` (`id`, `id_rekam`, `kode_icd10`, `jenis`) VALUES
(1, 1, 'E66', 'utama'),
(2, 2, 'B34', 'utama'),
(3, 3, 'H65', 'utama'),
(4, 4, 'A01', 'utama'),
(5, 5, 'B15', 'utama'),
(6, 6, 'E05', 'utama'),
(7, 7, 'K29', 'utama'),
(8, 8, 'F41', 'utama'),
(9, 9, 'M10', 'utama'),
(10, 10, 'K29', 'utama'),
(11, 11, 'I20', 'utama'),
(12, 12, 'H65', 'utama'),
(13, 13, 'I21', 'utama'),
(14, 14, 'A01', 'utama'),
(15, 15, 'G43', 'utama'),
(16, 16, 'H25', 'utama'),
(17, 17, 'A15', 'utama'),
(18, 18, 'F32', 'utama'),
(19, 19, 'H65', 'utama'),
(20, 20, 'I20', 'utama'),
(21, 21, 'F41', 'utama'),
(22, 22, 'J06', 'utama'),
(23, 23, 'B15', 'utama'),
(24, 24, 'D50', 'utama'),
(25, 25, 'K21', 'utama'),
(26, 26, 'B20', 'utama'),
(27, 27, 'G43', 'utama'),
(28, 28, 'I20', 'utama'),
(29, 29, 'B01', 'utama'),
(30, 30, 'B20', 'utama'),
(31, 31, 'N39', 'utama'),
(32, 32, 'E11', 'utama'),
(33, 33, 'C34', 'utama'),
(34, 34, 'M10', 'utama'),
(35, 35, 'B34', 'utama'),
(36, 36, 'K35', 'utama'),
(37, 37, 'B05', 'utama'),
(38, 38, 'J18', 'utama'),
(39, 39, 'G20', 'utama'),
(40, 40, 'G40', 'utama'),
(41, 41, 'I21', 'utama'),
(42, 42, 'J18', 'utama'),
(43, 43, 'D64', 'utama'),
(44, 44, 'G20', 'utama'),
(45, 45, 'I21', 'utama'),
(46, 46, 'L20', 'utama'),
(47, 47, 'B05', 'utama'),
(48, 48, 'B34', 'utama'),
(49, 49, 'K21', 'utama'),
(50, 50, 'D64', 'utama'),
(51, 51, 'B34', 'utama'),
(52, 52, 'C34', 'utama'),
(53, 53, 'M54', 'utama'),
(54, 54, 'E11', 'utama'),
(55, 55, 'C50', 'utama'),
(56, 56, 'D50', 'utama'),
(57, 57, 'J06', 'utama'),
(58, 58, 'B01', 'utama'),
(59, 59, 'F32', 'utama'),
(60, 60, 'A09', 'utama'),
(61, 61, 'F41', 'utama'),
(62, 62, 'I21', 'utama'),
(63, 63, 'L20', 'utama'),
(64, 64, 'F32', 'utama'),
(65, 65, 'B34', 'utama'),
(66, 66, 'C50', 'utama'),
(67, 67, 'I21', 'utama'),
(68, 68, 'A01', 'utama'),
(69, 69, 'L20', 'utama'),
(70, 70, 'G43', 'utama'),
(71, 71, 'I20', 'utama'),
(72, 72, 'A01', 'utama'),
(73, 73, 'J45', 'utama'),
(74, 74, 'M10', 'utama'),
(75, 75, 'B05', 'utama'),
(76, 76, 'H25', 'utama'),
(77, 77, 'E05', 'utama'),
(78, 78, 'I21', 'utama'),
(79, 79, 'E11', 'utama'),
(80, 80, 'H65', 'utama'),
(81, 81, 'I20', 'utama'),
(82, 82, 'A09', 'utama'),
(83, 83, 'D50', 'utama'),
(84, 84, 'E11', 'utama'),
(85, 85, 'K21', 'utama'),
(86, 86, 'E05', 'utama'),
(87, 87, 'I10', 'utama'),
(88, 88, 'A15', 'utama'),
(89, 89, 'G43', 'utama'),
(90, 90, 'J45', 'utama'),
(91, 91, 'K21', 'utama'),
(92, 92, 'J45', 'utama'),
(93, 93, 'I20', 'utama'),
(94, 94, 'A15', 'utama'),
(95, 95, 'B01', 'utama'),
(96, 96, 'L20', 'utama'),
(97, 97, 'B34', 'utama'),
(98, 98, 'B34', 'utama'),
(99, 99, 'E66', 'utama'),
(100, 100, 'C50', 'utama'),
(101, 101, 'J06', 'utama'),
(102, 102, 'K35', 'utama'),
(103, 103, 'B15', 'utama'),
(104, 104, 'H25', 'utama'),
(105, 105, 'H65', 'utama'),
(106, 106, 'A09', 'utama'),
(107, 107, 'G40', 'utama'),
(108, 108, 'L20', 'utama'),
(109, 109, 'E11', 'utama'),
(110, 110, 'H65', 'utama'),
(111, 111, 'F32', 'utama'),
(112, 112, 'M10', 'utama'),
(113, 113, 'E66', 'utama'),
(114, 114, 'K29', 'utama'),
(115, 115, 'A15', 'utama'),
(116, 116, 'C50', 'utama'),
(117, 117, 'J06', 'utama'),
(118, 118, 'M54', 'utama'),
(119, 119, 'E66', 'utama'),
(120, 120, 'D64', 'utama'),
(121, 121, 'J18', 'utama'),
(122, 122, 'E66', 'utama'),
(123, 123, 'E05', 'utama'),
(124, 124, 'A01', 'utama'),
(125, 125, 'A01', 'utama'),
(126, 126, 'F32', 'utama'),
(127, 127, 'B05', 'utama'),
(128, 128, 'D50', 'utama');

-- --------------------------------------------------------

--
-- Table structure for table `rekam_medis`
--

CREATE TABLE `rekam_medis` (
  `id_rekam` int(11) NOT NULL,
  `id_pasien` int(11) NOT NULL,
  `id_nakes` int(11) NOT NULL,
  `tanggal_kunjungan` date DEFAULT NULL,
  `keluhan` text DEFAULT NULL,
  `catatan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rekam_medis`
--

INSERT INTO `rekam_medis` (`id_rekam`, `id_pasien`, `id_nakes`, `tanggal_kunjungan`, `keluhan`, `catatan`) VALUES
(1, 128, 3, '2026-03-10', 'Nyeri saat buang air kecil', 'Tekanan darah tinggi (Hipertensi)'),
(2, 127, 8, '2026-04-30', 'Pusing', 'Pasien tampak pucat dan lemah'),
(3, 126, 7, '2026-04-03', 'Mual dan muntah', 'Memerlukan fisioterapi'),
(4, 125, 7, '2026-02-20', 'Nyeri dada', 'Diberikan injeksi anti-nyeri'),
(5, 124, 9, '2026-03-01', 'Nyeri pada leher', 'Alergi terhadap antibiotik (Penicillin)'),
(6, 123, 10, '2026-04-21', 'Nyeri saat buang air kecil', 'Tekanan darah tinggi (Hipertensi)'),
(7, 122, 6, '2026-04-26', 'Mata merah dan berair', 'Memerlukan fisioterapi'),
(8, 121, 1, '2026-03-25', 'Sesak nafas', 'Rujuk ke spesialis'),
(9, 120, 4, '2026-04-29', 'Nyeri perut', 'Alergi terhadap antibiotik (Penicillin)'),
(10, 119, 10, '2026-03-17', 'Batuk berdahak', 'Alergi terhadap antibiotik (Penicillin)'),
(11, 118, 7, '2026-05-16', 'Pilek dan hidung tersumbat', 'Diberikan injeksi anti-nyeri'),
(12, 117, 2, '2026-05-20', 'Sakit punggung', 'Kontrol ulang minggu depan'),
(13, 116, 2, '2026-04-04', 'Jantung berdebar keras', 'Diet rendah garam dan lemak'),
(14, 115, 2, '2026-03-20', 'Sulit tidur (insomnia)', 'Diberikan injeksi anti-nyeri'),
(15, 114, 5, '2026-04-17', 'Jantung berdebar keras', 'Kondisi membaik, boleh pulang'),
(16, 113, 8, '2026-03-02', 'Demam tinggi', 'Suhu 39C'),
(17, 112, 2, '2026-03-06', 'Keringat dingin di malam hari', 'Memerlukan fisioterapi'),
(18, 111, 1, '2026-03-19', 'Kesemutan pada tangan atau kaki', 'Pasien tampak pucat dan lemah'),
(19, 110, 2, '2026-05-15', 'Sesak nafas', 'Disarankan bedrest total'),
(20, 109, 4, '2026-05-06', 'Gatal-gatal pada kulit', 'Memerlukan fisioterapi'),
(21, 108, 7, '2026-04-16', 'Nyeri saat buang air kecil', 'Ditemukan bunyi napas tambahan (wheezing)'),
(22, 107, 7, '2026-04-05', 'Kaki bengkak', 'Perlu rawat inap'),
(23, 106, 9, '2026-05-04', 'Mual dan muntah', 'Rujuk ke spesialis'),
(24, 105, 1, '2026-04-24', 'Nyeri perut', 'Hasil rontgen menunjukkan kelainan'),
(25, 104, 10, '2026-03-05', 'Gatal-gatal pada kulit', 'Kondisi membaik, boleh pulang'),
(26, 103, 7, '2026-02-23', 'Lemas', 'Dehidrasi ringan'),
(27, 102, 4, '2026-02-21', 'Telinga berdengung', 'Gula darah sewaktu tinggi'),
(28, 101, 10, '2026-02-27', 'Sakit punggung', 'Menunggu hasil lab'),
(29, 100, 7, '2026-03-04', 'Sakit kepala sebelah (migrain)', 'Gula darah sewaktu tinggi'),
(30, 99, 10, '2026-04-05', 'Pusing', 'Kondisi stabil'),
(31, 98, 10, '2026-04-05', 'Kelelahan ekstrem', 'Diet rendah garam dan lemak'),
(32, 97, 4, '2026-03-01', 'Mata merah dan berair', 'Perlu rawat inap'),
(33, 96, 3, '2026-02-27', 'Pusing', 'Perlu rawat inap'),
(34, 95, 8, '2026-05-20', 'Diare', 'Kontrol ulang minggu depan'),
(35, 94, 3, '2026-03-05', 'Nyeri pada leher', 'Observasi 24 jam'),
(36, 93, 9, '2026-03-14', 'Pusing', 'Tekanan darah tinggi (Hipertensi)'),
(37, 92, 1, '2026-04-02', 'Nyeri sendi', 'Alergi terhadap antibiotik (Penicillin)'),
(38, 91, 3, '2026-02-28', 'Nyeri saat buang air kecil', 'Diet rendah garam dan lemak'),
(39, 90, 8, '2026-04-01', 'Penurunan berat badan drastis', 'Rujuk ke spesialis'),
(40, 89, 8, '2026-02-22', 'Jantung berdebar keras', 'Tanda vital normal'),
(41, 88, 5, '2026-03-14', 'Sesak nafas', 'Rujuk ke spesialis'),
(42, 87, 6, '2026-05-14', 'Sulit tidur (insomnia)', 'Hasil rontgen menunjukkan kelainan'),
(43, 86, 8, '2026-05-16', 'Demam tinggi', 'Rujuk ke spesialis'),
(44, 85, 2, '2026-04-26', 'Kelelahan ekstrem', 'Ditemukan bunyi napas tambahan (wheezing)'),
(45, 84, 8, '2026-03-25', 'Gangguan penglihatan (kabur)', 'Diberikan terapi oksigen'),
(46, 83, 5, '2026-04-16', 'Jantung berdebar keras', 'Disertai mual, tidak bisa makan/minum'),
(47, 82, 6, '2026-05-14', 'Lemas', 'Diberikan terapi oksigen'),
(48, 81, 6, '2026-04-06', 'Nyeri dada', 'Pasien menolak tindakan medis'),
(49, 80, 6, '2026-04-23', 'Sesak nafas', 'Diberikan obat jalan'),
(50, 79, 4, '2026-04-23', 'Sakit tenggorokan', 'Alergi terhadap antibiotik (Penicillin)'),
(51, 78, 4, '2026-05-12', 'Sering buang air kecil', 'Pasien tampak pucat dan lemah'),
(52, 77, 2, '2026-04-21', 'Jantung berdebar keras', 'Respon baik terhadap pengobatan awal'),
(53, 76, 7, '2026-03-01', 'Keringat dingin di malam hari', 'Disarankan bedrest total'),
(54, 75, 9, '2026-05-05', 'Diare', 'Diet rendah garam dan lemak'),
(55, 74, 7, '2026-03-22', 'Mata merah dan berair', 'Memerlukan fisioterapi'),
(56, 73, 6, '2026-03-28', 'Demam tinggi', 'Disertai mual, tidak bisa makan/minum'),
(57, 72, 7, '2026-02-22', 'Kaki bengkak', 'Kondisi stabil'),
(58, 71, 1, '2026-03-01', 'Nyeri pada leher', 'Diberikan obat jalan'),
(59, 70, 9, '2026-03-31', 'Nyeri perut', 'Dehidrasi ringan'),
(60, 69, 5, '2026-04-21', 'Pusing', 'Respon baik terhadap pengobatan awal'),
(61, 68, 7, '2026-03-26', 'Demam tinggi', 'Pasien menolak tindakan medis'),
(62, 67, 4, '2026-02-26', 'Lemas', 'Diberikan injeksi anti-nyeri'),
(63, 66, 10, '2026-02-24', 'Sesak nafas', 'Perlu rawat inap'),
(64, 65, 9, '2026-04-27', 'Kaki bengkak', 'Pasien menolak tindakan medis'),
(65, 64, 9, '2026-03-01', 'Kaki bengkak', 'Kondisi membaik, boleh pulang'),
(66, 63, 9, '2026-03-18', 'Kaki bengkak', 'Tanda vital normal'),
(67, 62, 2, '2026-03-22', 'Kaki bengkak', 'Kondisi membaik, boleh pulang'),
(68, 61, 4, '2026-03-13', 'Sering buang air kecil', 'Diberikan terapi oksigen'),
(69, 60, 4, '2026-02-21', 'Diare', 'Pasien menolak tindakan medis'),
(70, 59, 10, '2026-04-21', 'Nyeri saat buang air kecil', 'Gula darah sewaktu tinggi'),
(71, 58, 9, '2026-02-20', 'Kram otot', 'Observasi 24 jam'),
(72, 57, 9, '2026-03-07', 'Keringat dingin di malam hari', 'Diberikan terapi oksigen'),
(73, 56, 2, '2026-04-19', 'Kaki bengkak', 'Disertai mual, tidak bisa makan/minum'),
(74, 55, 4, '2026-02-28', 'Sakit tenggorokan', 'Diberikan injeksi anti-nyeri'),
(75, 54, 1, '2026-05-07', 'Kesemutan pada tangan atau kaki', 'Suhu 39C'),
(76, 53, 6, '2026-03-29', 'Mata merah dan berair', 'Kontrol ulang minggu depan'),
(77, 52, 10, '2026-03-07', 'Keringat dingin di malam hari', 'Pasien tampak pucat dan lemah'),
(78, 51, 10, '2026-04-15', 'Nyeri perut', 'Diet rendah garam dan lemak'),
(79, 50, 9, '2026-04-21', 'Sesak nafas', 'Perlu rawat inap'),
(80, 49, 10, '2026-03-31', 'Kelelahan ekstrem', 'Kondisi membaik, boleh pulang'),
(81, 48, 4, '2026-03-10', 'Penurunan berat badan drastis', 'Tekanan darah tinggi (Hipertensi)'),
(82, 47, 8, '2026-05-05', 'Mual dan muntah', 'Alergi terhadap antibiotik (Penicillin)'),
(83, 46, 2, '2026-04-05', 'Sakit punggung', 'Diberikan terapi oksigen'),
(84, 45, 1, '2026-04-13', 'Keringat dingin di malam hari', 'Diberikan injeksi anti-nyeri'),
(85, 44, 8, '2026-04-10', 'Kesemutan pada tangan atau kaki', 'Alergi terhadap antibiotik (Penicillin)'),
(86, 43, 5, '2026-04-17', 'Sesak nafas', 'Observasi 24 jam'),
(87, 42, 6, '2026-02-24', 'Sesak nafas', 'Gula darah sewaktu tinggi'),
(88, 41, 5, '2026-04-06', 'Mata merah dan berair', 'Dehidrasi ringan'),
(89, 40, 9, '2026-04-10', 'Batuk berdahak', 'Rujuk ke spesialis'),
(90, 39, 5, '2026-04-24', 'Keringat dingin di malam hari', 'Tekanan darah tinggi (Hipertensi)'),
(91, 38, 8, '2026-03-17', 'Gangguan pencernaan (sembelit)', 'Disertai mual, tidak bisa makan/minum'),
(92, 37, 7, '2026-04-15', 'Kesemutan pada tangan atau kaki', 'Suhu 39C'),
(93, 36, 9, '2026-03-31', 'Kaki bengkak', 'Diberikan terapi oksigen'),
(94, 35, 6, '2026-04-08', 'Lemas', 'Observasi 24 jam'),
(95, 34, 5, '2026-05-15', 'Sulit tidur (insomnia)', 'Disarankan bedrest total'),
(96, 33, 4, '2026-05-16', 'Kelelahan ekstrem', 'Alergi terhadap antibiotik (Penicillin)'),
(97, 32, 7, '2026-03-02', 'Gatal-gatal pada kulit', 'Tanda vital normal'),
(98, 31, 8, '2026-05-04', 'Sakit kepala sebelah (migrain)', 'Diberikan terapi oksigen'),
(99, 30, 2, '2026-04-03', 'Demam tinggi', 'Rujuk ke spesialis'),
(100, 29, 4, '2026-03-05', 'Gatal-gatal pada kulit', 'Respon baik terhadap pengobatan awal'),
(101, 28, 1, '2026-04-07', 'Batuk berdahak', 'Gula darah sewaktu tinggi'),
(102, 27, 1, '2026-05-15', 'Pilek dan hidung tersumbat', 'Diet rendah garam dan lemak'),
(103, 26, 5, '2026-03-25', 'Gangguan pencernaan (sembelit)', 'Kontrol ulang minggu depan'),
(104, 25, 3, '2026-02-21', 'Sering buang air kecil', 'Tanda vital normal'),
(105, 24, 5, '2026-03-10', 'Lemas', 'Pasien menolak tindakan medis'),
(106, 23, 4, '2026-04-26', 'Sering buang air kecil', 'Kondisi stabil'),
(107, 22, 8, '2026-02-25', 'Sulit tidur (insomnia)', 'Diet rendah garam dan lemak'),
(108, 21, 5, '2026-03-22', 'Kaki bengkak', 'Kontrol ulang minggu depan'),
(109, 20, 2, '2026-02-24', 'Sakit kepala sebelah (migrain)', 'Kontrol ulang minggu depan'),
(110, 19, 1, '2026-03-28', 'Sakit tenggorokan', 'Dehidrasi ringan'),
(111, 18, 3, '2026-03-17', 'Nyeri perut', 'Menunggu hasil lab'),
(112, 17, 1, '2026-03-28', 'Kesemutan pada tangan atau kaki', 'Dehidrasi ringan'),
(113, 16, 5, '2026-03-15', 'Nyeri saat buang air kecil', 'Respon baik terhadap pengobatan awal'),
(114, 15, 1, '2026-02-20', 'Kaki bengkak', 'Menunggu hasil lab'),
(115, 14, 3, '2026-03-09', 'Demam tinggi', 'Diberikan obat jalan'),
(116, 13, 9, '2026-04-06', 'Kesemutan pada tangan atau kaki', 'Kontrol ulang minggu depan'),
(117, 12, 7, '2026-04-28', 'Diare', 'Menunggu hasil lab'),
(118, 11, 6, '2026-04-25', 'Telinga berdengung', 'Disarankan bedrest total'),
(119, 10, 9, '2026-04-11', 'Sakit tenggorokan', 'Diet rendah garam dan lemak'),
(120, 9, 2, '2026-03-02', 'Lemas', 'Diberikan terapi oksigen'),
(121, 8, 4, '2026-03-31', 'Mual dan muntah', 'Diet rendah garam dan lemak'),
(122, 7, 3, '2026-03-06', 'Jantung berdebar keras', 'Perlu rawat inap'),
(123, 6, 3, '2026-03-07', 'Kaki bengkak', 'Perlu rawat inap'),
(124, 5, 1, '2026-04-18', 'Nyeri sendi', 'Respon baik terhadap pengobatan awal'),
(125, 4, 5, '2026-05-01', 'Pilek dan hidung tersumbat', 'Disarankan bedrest total'),
(126, 3, 3, '2026-04-27', 'Keringat dingin di malam hari', 'Perlu rawat inap'),
(127, 2, 9, '2026-04-30', 'Pilek dan hidung tersumbat', 'Hasil rontgen menunjukkan kelainan'),
(128, 1, 7, '2026-04-11', 'Nyeri perut', 'Kondisi membaik, boleh pulang');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `nama_role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id_role`, `nama_role`) VALUES
(1, 'Admin'),
(4, 'Casemix'),
(2, 'Dokter'),
(3, 'Perawat'),
(5, 'Rekam Medis');

-- --------------------------------------------------------

--
-- Table structure for table `tarif_cbgs`
--

CREATE TABLE `tarif_cbgs` (
  `kode_cbgs` varchar(20) NOT NULL,
  `deskripsi` varchar(300) NOT NULL,
  `tarif` decimal(15,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tarif_cbgs`
--

INSERT INTO `tarif_cbgs` (`kode_cbgs`, `deskripsi`, `tarif`) VALUES
('A-4-10-I', 'Infeksi Saluran Cerna Ringan', 850000.00),
('A-4-10-II', 'Infeksi Saluran Cerna Ringan Kls II', 720000.00),
('A-8-88-II', 'Perawatan Psikiatri Ringan', 1600000.00),
('B-1-14-I', 'Penyakit Jantung Sedang', 4200000.00),
('B-9-99-III', 'Penyakit Kulit dan Kelamin Ringan', 900000.00),
('C-1-23-I', 'Luka Bakar Derajat 1 dan 2', 2400000.00),
('C-4-13-III', 'Diabetes Komplikasi Berat', 5500000.00),
('D-2-34-II', 'Trauma Kapitis Ringan', 3100000.00),
('D-4-16-I', 'Pneumonia Ringan', 1750000.00),
('E-3-45-III', 'Fraktur Tertutup Lengan atau Kaki', 2200000.00),
('E-4-10-II', 'Hipertensi dengan Komplikasi', 2100000.00),
('F-4-56-I', 'Gastritis Akut', 1100000.00),
('G-2-20-I', 'Operasi Apendektomi', 7800000.00),
('G-5-67-II', 'Hepatitis Akut', 2600000.00),
('H-4-11-III', 'Gangguan Neurologis Ringan', 1200000.00),
('H-6-78-III', 'Perawatan HIV/AIDS Tanpa Komplikasi', 3800000.00),
('I-4-18-I', 'ISK Ringan', 950000.00),
('I-7-89-I', 'Covid-19 Gejala Sedang', 4200000.00),
('J-1-30-II', 'Anemia Berat Perlu Transfusi', 3200000.00),
('K-1-10-I', 'Penyakit Endokrin Ringan', 1500000.00),
('L-2-20-II', 'Operasi Katarak', 4500000.00),
('M-3-30-III', 'Hemodialisis Rutin', 950000.00),
('N-4-40-I', 'Persalinan Normal Tanpa Komplikasi', 2800000.00),
('O-5-50-II', 'Persalinan Caesar', 8500000.00),
('P-6-60-III', 'Asma Akut Ringan', 1250000.00),
('Q-7-70-I', 'Tonsilektomi Anak', 3200000.00),
('R-8-80-II', 'Perbaikan Hernia', 5200000.00),
('S-9-90-III', 'Demam Berdarah Dengue Ringan', 1800000.00),
('T-1-11-I', 'Malaria Tanpa Komplikasi', 1400000.00),
('U-2-22-II', 'Demam Tifoid Rawat Inap', 2100000.00),
('V-3-33-III', 'Tuberkulosis Paru Kategori 1', 3500000.00),
('W-4-44-I', 'Gagal Ginjal Kronis Ringan', 4800000.00),
('X-5-55-II', 'Gagal Jantung Kongestif', 6500000.00),
('Y-6-66-III', 'Stroke Iskemik Ringan', 5400000.00),
('Z-7-77-I', 'Tumor Ganas Payudara Perawatan', 9000000.00);

-- --------------------------------------------------------

--
-- Table structure for table `tenaga_kesehatan`
--

CREATE TABLE `tenaga_kesehatan` (
  `id_nakes` int(11) NOT NULL,
  `nama` varchar(200) NOT NULL,
  `profesi` varchar(100) DEFAULT NULL,
  `spesialisasi` varchar(100) DEFAULT NULL,
  `no_str` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `id_role` int(11) NOT NULL,
  `id_unit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tenaga_kesehatan`
--

INSERT INTO `tenaga_kesehatan` (`id_nakes`, `nama`, `profesi`, `spesialisasi`, `no_str`, `email`, `password_hash`, `id_role`, `id_unit`) VALUES
(1, 'dr. Rendi Pratama', 'Dokter Umum', NULL, 'STR-110-2019-010', 'rendi@rs.com', 'rendi', 2, 2),
(2, 'dr. Puja Ratnasari, Sp.PD', 'Dokter Spesialis', 'Penyakit Dalam', 'STR-101-2010-001', 'puja@rs.com', 'puja', 4, 4),
(3, 'dr. Ahmad Hidayat, Sp.JP', 'Dokter Spesialis', 'Jantung', 'STR-102-2011-002', 'ahmad@rs.com', 'ahmad', 2, 2),
(4, 'Ns. Dian Permata, S.Kep', 'Perawat', NULL, 'STR-108-2017-008', 'dian@rs.com', 'dian', 3, 3),
(5, 'dr. Anisa Rahma, Sp.B', 'Dokter Spesialis', 'Bedah Umum', 'STR-105-2014-005', 'anisa@rs.com', 'anisa', 2, 1),
(6, 'dr. Bima Setiawan', 'Dokter Umum', NULL, 'STR-104-2013-004', 'bima@rs.com', 'bima', 4, 2),
(7, 'Ns. Rina Kartika, S.Kep', 'Perawat', NULL, 'STR-107-2016-007', 'rina@rs.com', 'rina', 3, 3),
(8, 'dr. Fajar Nugroho, Sp.S', 'Dokter Spesialis', 'Saraf', 'STR-106-2015-006', 'fajar@rs.com', 'fajar', 2, 4),
(9, 'dr. Sari Dewi, Sp.A', 'Dokter Spesialis', 'Anak', 'STR-103-2012-003', 'sari@rs.com', 'sari', 2, 4),
(10, 'dr. Lina Susanti, Sp.PK', 'Dokter Spesialis', 'Patologi Klinik', 'STR-109-2018-009', 'lina@rs.com', 'lina', 5, 5),
(11, 'Razan Rafi A.', 'Admin', '', '2510101014', 'razan@rs.com', 'razan', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tindakan`
--

CREATE TABLE `tindakan` (
  `kode_tindakan` varchar(20) NOT NULL,
  `nama_tindakan` varchar(300) NOT NULL,
  `tarif` decimal(15,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tindakan`
--

INSERT INTO `tindakan` (`kode_tindakan`, `nama_tindakan`, `tarif`) VALUES
('03.31', 'Pungsi Lumbal', 350000.00),
('13.41', 'Ekstraksi Katarak Ekstrakapsular', 4000000.00),
('21.01', 'Kontrol Perdarahan Hidung (Epistaksis)', 150000.00),
('28.2', 'Tonsilektomi', 2500000.00),
('33.24', 'Bronkoskopi', 1200000.00),
('38.93', 'Pengambilan Darah Vena', 50000.00),
('39.95', 'Hemodialisis', 900000.00),
('45.13', 'Endoskopi Saluran Cerna', 1500000.00),
('47.09', 'Apendektomi', 5000000.00),
('51.22', 'Kolesistektomi', 6500000.00),
('53.00', 'Perbaikan Hernia Inguinalis', 4500000.00),
('57.94', 'Pemasangan Kateter Urine', 80000.00),
('59.8', 'Kateterisasi Ureter', 2000000.00),
('73.59', 'Persalinan Normal', 2500000.00),
('74.1', 'Seksio Sesarea (Caesar)', 7500000.00),
('79.0', 'Reduksi Tertutup Fraktur', 1500000.00),
('85.41', 'Mastektomi Simpel', 8500000.00),
('86.04', 'Insisi dan Drainase Abses Kulit', 250000.00),
('86.22', 'Eksisi Luka (Debridement)', 400000.00),
('87.44', 'Foto Rontgen Dada', 150000.00),
('88.01', 'CT Scan Kepala', 500000.00),
('88.71', 'USG Tiroid', 300000.00),
('88.76', 'USG Abdomen', 350000.00),
('89.52', 'Elektrokardiogram (EKG)', 100000.00),
('89.54', 'Pemantauan Holter', 450000.00),
('90.59', 'Pemeriksaan Darah Rutin', 60000.00),
('91.99', 'Pemeriksaan Urine Rutin', 40000.00),
('93.11', 'Latihan Rentang Gerak (ROM)', 150000.00),
('93.90', 'Fisioterapi Respirasi', 200000.00),
('93.94', 'Terapi Inhalasi (Nebulizer)', 120000.00),
('94.25', 'Penilaian Psikiatri', 300000.00),
('96.04', 'Pemasangan Infus', 75000.00),
('99.04', 'Injeksi Antibiotik IV', 120000.00),
('99.15', 'Transfusi Darah PRC', 800000.00),
('99.21', 'Injeksi Antibiotik IM', 85000.00),
('99.99', 'Tindakan Test', 50000.00);

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `id_unit` int(11) NOT NULL,
  `nama_unit` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`id_unit`, `nama_unit`) VALUES
(1, 'Bedah'),
(2, 'IGD'),
(5, 'Laboratorium'),
(3, 'Rawat Inap'),
(4, 'Rawat Jalan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_tindakan`
--
ALTER TABLE `detail_tindakan`
  ADD PRIMARY KEY (`id_detail`),
  ADD UNIQUE KEY `detail_tindakan_id_rekam_kode_tindakan_key` (`id_rekam`,`kode_tindakan`),
  ADD KEY `detail_tindakan_kode_tindakan_idx` (`kode_tindakan`);

--
-- Indexes for table `diagnosis`
--
ALTER TABLE `diagnosis`
  ADD PRIMARY KEY (`kode_icd10`);

--
-- Indexes for table `klaim`
--
ALTER TABLE `klaim`
  ADD PRIMARY KEY (`id_klaim`),
  ADD KEY `klaim_id_rekam_idx` (`id_rekam`),
  ADD KEY `klaim_kode_cbgs_idx` (`kode_cbgs`),
  ADD KEY `klaim_status_klaim_idx` (`status_klaim`);

--
-- Indexes for table `log_aktivitas`
--
ALTER TABLE `log_aktivitas`
  ADD PRIMARY KEY (`id_log`),
  ADD KEY `log_aktivitas_id_nakes_idx` (`id_nakes`);

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`id_pasien`),
  ADD UNIQUE KEY `pasien_nik_key` (`nik`);

--
-- Indexes for table `rekam_diagnosis`
--
ALTER TABLE `rekam_diagnosis`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rekam_diagnosis_id_rekam_kode_icd10_key` (`id_rekam`,`kode_icd10`),
  ADD KEY `rekam_diagnosis_kode_icd10_idx` (`kode_icd10`);

--
-- Indexes for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  ADD PRIMARY KEY (`id_rekam`),
  ADD KEY `rekam_medis_id_pasien_idx` (`id_pasien`),
  ADD KEY `rekam_medis_id_nakes_idx` (`id_nakes`),
  ADD KEY `rekam_medis_tanggal_kunjungan_idx` (`tanggal_kunjungan`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`),
  ADD UNIQUE KEY `role_nama_role_key` (`nama_role`);

--
-- Indexes for table `tarif_cbgs`
--
ALTER TABLE `tarif_cbgs`
  ADD PRIMARY KEY (`kode_cbgs`);

--
-- Indexes for table `tenaga_kesehatan`
--
ALTER TABLE `tenaga_kesehatan`
  ADD PRIMARY KEY (`id_nakes`),
  ADD UNIQUE KEY `tenaga_kesehatan_no_str_key` (`no_str`),
  ADD UNIQUE KEY `tenaga_kesehatan_email_key` (`email`),
  ADD KEY `tenaga_kesehatan_id_role_idx` (`id_role`),
  ADD KEY `tenaga_kesehatan_id_unit_idx` (`id_unit`);

--
-- Indexes for table `tindakan`
--
ALTER TABLE `tindakan`
  ADD PRIMARY KEY (`kode_tindakan`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id_unit`),
  ADD UNIQUE KEY `unit_nama_unit_key` (`nama_unit`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_tindakan`
--
ALTER TABLE `detail_tindakan`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `klaim`
--
ALTER TABLE `klaim`
  MODIFY `id_klaim` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `log_aktivitas`
--
ALTER TABLE `log_aktivitas`
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `pasien`
--
ALTER TABLE `pasien`
  MODIFY `id_pasien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `rekam_diagnosis`
--
ALTER TABLE `rekam_diagnosis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  MODIFY `id_rekam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tenaga_kesehatan`
--
ALTER TABLE `tenaga_kesehatan`
  MODIFY `id_nakes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `id_unit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_tindakan`
--
ALTER TABLE `detail_tindakan`
  ADD CONSTRAINT `detail_tindakan_id_rekam_fkey` FOREIGN KEY (`id_rekam`) REFERENCES `rekam_medis` (`id_rekam`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_tindakan_kode_tindakan_fkey` FOREIGN KEY (`kode_tindakan`) REFERENCES `tindakan` (`kode_tindakan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `klaim`
--
ALTER TABLE `klaim`
  ADD CONSTRAINT `klaim_id_rekam_fkey` FOREIGN KEY (`id_rekam`) REFERENCES `rekam_medis` (`id_rekam`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `klaim_kode_cbgs_fkey` FOREIGN KEY (`kode_cbgs`) REFERENCES `tarif_cbgs` (`kode_cbgs`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `log_aktivitas`
--
ALTER TABLE `log_aktivitas`
  ADD CONSTRAINT `log_aktivitas_id_nakes_fkey` FOREIGN KEY (`id_nakes`) REFERENCES `tenaga_kesehatan` (`id_nakes`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rekam_diagnosis`
--
ALTER TABLE `rekam_diagnosis`
  ADD CONSTRAINT `rekam_diagnosis_id_rekam_fkey` FOREIGN KEY (`id_rekam`) REFERENCES `rekam_medis` (`id_rekam`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rekam_diagnosis_kode_icd10_fkey` FOREIGN KEY (`kode_icd10`) REFERENCES `diagnosis` (`kode_icd10`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  ADD CONSTRAINT `rekam_medis_id_nakes_fkey` FOREIGN KEY (`id_nakes`) REFERENCES `tenaga_kesehatan` (`id_nakes`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rekam_medis_id_pasien_fkey` FOREIGN KEY (`id_pasien`) REFERENCES `pasien` (`id_pasien`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tenaga_kesehatan`
--
ALTER TABLE `tenaga_kesehatan`
  ADD CONSTRAINT `tenaga_kesehatan_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tenaga_kesehatan_id_unit_fkey` FOREIGN KEY (`id_unit`) REFERENCES `unit` (`id_unit`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
