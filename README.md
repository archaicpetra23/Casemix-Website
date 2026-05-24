# Casemix RS - Integrated Casemix Management Information System

![Casemix RS](https://img.shields.io/badge/Status-Active-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)

**Casemix RS** is a web-based hospital management information system specifically designed to manage medical records, patient data, healthcare workers, and monitor the BPJS Health claim process in real-time and in an integrated manner.

This system uses a modern architecture based on **Next.js (App Router)** with a **MySQL** backend managed via **Prisma ORM**.

---

## Key Features

- **Patient Data Management:** Registration, updating, and searching for patient data.
- **Integrated Medical Records:** Recording of complaints, diagnoses (ICD-10), and procedures (ICD-9 CM) in a single integrated interface.
- **BPJS Claim Monitoring (INA-CBGs):** Integration of CBGs codes with claim status (Pending, Approved, Rejected).
- **Real-time Dashboard:** Visualization of daily statistics, claim distribution, and disease trend charts (ICD-10).
- **Role-Based Access Control (RBAC):** Authentication system with dynamic menu access based on user roles (Admin, Doctor, Nurse, Casemix, Medical Records).
- **Audit Log (Admin Panel):** Logging of all CRUD activities performed by users for system transparency and security.

---

## Technologies Used

- **Frontend:** [Next.js](https://nextjs.org/) (React 18), CSS Modules, [Lucide React](https://lucide.dev/) (Icons), [Recharts](https://recharts.org/)
- **Backend:** Next.js Route Handlers (API)
- **Database:** MySQL
- **ORM:** [Prisma](https://www.prisma.io/)

---

## Installation & Setup Guide

Follow these steps to run the system locally:

### 1. Prerequisites

Ensure your system has the following installed:

- **Node.js** (v18.x or newer)
- **MySQL Server** (XAMPP / Laragon / Docker)
- **Git**

### 2. Clone the Repository

```bash
git clone https://github.com/archaicpetra23/Casemix-Website.git
cd casemix-rs
```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Database Configuration (MySQL)

Rename the `.env.example` file to `.env`, then adjust your MySQL connection credentials:

```env
# Example if using XAMPP (default port 3306, user root, no password)
DATABASE_URL="mysql://root:@localhost:3306/casemix_db"
```

### 5. Database Initialization & Dummy Data Seeding

This command will automatically create the table structures in MySQL and populate the database with **128 patients**, **10 Healthcare Workers**, ICD data, and initial activity logs so the application is ready to use.

```bash
npx prisma db push --force-reset
npx prisma generate
node prisma/seed.js
```

*(Note: You can run `npx prisma studio` in a separate terminal if you want to view the MySQL data via the Prisma web GUI).*

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Login Guide & Demo Accounts

The application will automatically redirect you to the `/login` page. Use one of the following demo accounts based on the desired role.

> **Note:** The password for all demo accounts is the **first name before the `@` symbol** (lowercase).

| Role | Login Email | Password | Access Description |
|---|---|---|---|
| **Admin** | `razan@rs.com` | `razan` | Full access to all features, including **Admin Panel (Audit Log & User Management)** |
| **Doctor** | `ahmad@rs.com` | `ahmad` | Dashboard, Patients, Medical Records |
| **Nurse** | `rina@rs.com` | `rina` | Dashboard, Patients, Medical Records |
| **Casemix** | `bima@rs.com` | `bima` | Dashboard, Patients, Medical Records, Claims, ICD Master |
| **Medical Records** | `dian@rs.com` | `dian` | Dashboard, Patients, Medical Records, Claims |

---

## Important Directory Structure

```text
├── prisma/
│   ├── schema.prisma      # ERD Definition & MySQL Table Structure
│   └── seed.js            # Initial data seeding script (Dummy Data)
├── src/
│   ├── app/               # Next.js App Router (Pages & API Routes)
│   │   ├── admin/         # Admin Panel Pages
│   │   ├── api/           # Centralized Backend Endpoints
│   │   ├── dashboard/     # Dashboard Pages
│   │   ├── klaim/         # BPJS Claims Module
│   │   ├── login/         # Authentication Login Page
│   │   ├── pasien/        # Patient Data Module
│   │   ├── rekam-medis/   # Medical Records Module
│   │   └── page.js        # Root Redirector
│   ├── components/        # Reusable UI Components (Sidebar, Topbar, etc.)
│   ├── hooks/             # Custom React Hooks (useAuth for RBAC)
│   └── lib/               # Utilities (Prisma Client, API Wrapper, AuditLogger)
└── package.json
```

---

## Docker & Remote Access Guide

You can run and manage the entire Casemix RS application (Next.js + MariaDB database) inside Docker using our pre-configured helper scripts.

### Helper Scripts (Recommended)

We have provided convenient scripts to control the application:

- **Start Server & Tunnel:** Starts the database and Next.js containers in the background, then automatically launches a Cloudflare Tunnel. Press `Ctrl+C` in the terminal to stop both the tunnel and the Docker containers.
  ```bash
  ./start.sh
  ```
- **Stop Server:** Stops and shuts down the running containers manually.
  ```bash
  ./stop.sh
  ```
- **View Logs:** Follows the container startup, Prisma schema sync, and database seeding logs.
  ```bash
  ./logs.sh
  ```

### Manual Docker Commands

If you prefer to run the commands manually:

#### 1. Run via Docker Compose
```bash
sudo docker-compose up --build -d
```
*(Starts the database container on host port `3307` and Next.js container on port `3000`)*

#### 2. Stop Containers
```bash
sudo docker-compose down
```

To stop containers and delete database data (for a clean reset):
```bash
sudo docker-compose down -v
```

#### 3. Share with Cloudflare Tunnel manually
```bash
cloudflared tunnel --url http://localhost:3000
```

---

## License

This system was developed for academic and internal hospital needs. Commercialization without official permission is prohibited.

© 2026 Casemix RS Development Team.
