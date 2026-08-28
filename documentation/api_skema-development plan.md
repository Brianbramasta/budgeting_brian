

# 🚀 Laravel API Development Plan: Budgeting & Net Worth Tracker

Dokumen ini berisi arsitektur backend, struktur repositori, alur database, serta panduan tahap pengembangan API menggunakan **Laravel 11+** dan **MySQL**.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Laravel 11 (API-only mode)
* **Database:** MySQL (InnoDB Engine)
* **Authentication:** Laravel Sanctum (Token-Based Auth)
* **Architecture Pattern:** Controller $\rightarrow$ Service Layer $\rightarrow$ Repository / Eloquent Model $\rightarrow$ API Resource
* **Task Scheduling:** Laravel Scheduler (Cron Job)

---

## 📁 Recommended Directory Structure

```text
app/
├── Console/
│   └── Commands/
│       └── TakeMonthlySnapshot.php      # Command otomatis snapshot bulanan
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       └── V1/
│   │           ├── AssetSourceController.php
│   │           ├── BudgetPlanController.php
│   │           ├── DashboardController.php
│   │           ├── ExpenseTransactionController.php
│   │           ├── InvestmentAssetController.php
│   │           └── MonthlySnapshotController.php
│   └── Resources/
│       └── V1/                          # Response Transformer JSON
│           ├── AssetSourceResource.php
│           ├── DashboardSummaryResource.php
│           └── ExpenseResource.php
├── Models/
│   ├── AssetSource.php
│   ├── BudgetPlan.php
│   ├── ExpenseTransaction.php
│   ├── InvestmentAsset.php
│   ├── MonthlyAssetSnapshot.php
│   └── SavingsPocket.php
└── Services/                            # Business Logic Layer
    ├── AssetService.php
    ├── ExpenseService.php
    └── SnapshotService.php

```

---

## 🗄️ Database Schema & Relationships

### 1. Eloquent Relationships

* **`BudgetPlan`** `hasMany` **`ExpenseTransaction`**
* **`ExpenseTransaction`** `belongsTo` **`BudgetPlan`**
* **`AssetSource`** `hasMany` **`MonthlyAssetSnapshot`** *(opsional/logis)*

---

## 🌐 API Endpoint Specifications (API V1)

### 1. Dashboard & Summary

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/dashboard/summary` | Mengambil angka Net Worth, Total Pengeluaran Bulan Ini, & Sisa Budget |

### 2. Assets & Accounts (`asset_sources`)

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/assets` | Menampilkan seluruh saldo bank, dompet, & platform |
| `POST` | `/api/v1/assets` | Menambah akun/sumber aset baru |
| `PUT` | `/api/v1/assets/{id}` | Update saldo dompet/bank secara manual |

### 3. Expenses (`expense_transactions`)

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/expenses` | Menampilkan transaksi harian (dukungan pagination & filter tanggal) |
| `POST` | `/api/v1/expenses` | **Mencatat transaksi baru** *(otomatis memotong saldo di `AssetSource`)* |
| `DELETE` | `/api/v1/expenses/{id}` | Menghapus transaksi pengeluaran |

### 4. Monthly Budgeting (`budget_plans`)

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/budget-plans` | Menampilkan rencana budget bulan berjalan / filter bulan |
| `POST` | `/api/v1/budget-plans` | Menambah atau memperbarui alokasi budget |

### 5. Investment Portfolio (`investment_assets`)

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/investments` | Menampilkan portofolio Kripto/Saham + kalkulasi P/L *real-time* |
| `PUT` | `/api/v1/investments/{id}` | Update harga pasar (*current price*) atau jumlah unit |

### 6. Snapshots & History (`monthly_asset_snapshots`)

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/v1/snapshots/generate` | Memicu pembuatan *snapshot* saldo bulanan secara manual |
| `GET` | `/api/v1/snapshots/history` | Menampilkan data riwayat *Net Worth* antar bulan untuk grafik |

---

## 🔄 Core Business Logics

### 1. Automatic Balance Deduction (Expense Flow)

Setiap kali endpoint `POST /api/v1/expenses` dipanggil, pemotongan saldo aset diproses menggunakan **Database Transaction** agar data tetap konsisten:

```php
namespace App\Services;

use App\Models\ExpenseTransaction;
use App\Models\AssetSource;
use Illuminate\Support\Facades\DB;

class ExpenseService
{
    public function storeExpense(array $data): ExpenseTransaction
    {
        return DB::transaction(function () use ($data) {
            // 1. Simpan Transaksi
            $expense = ExpenseTransaction::create($data);

            // 2. Potong Saldo Aset terkait jika asset_source_id disertakan
            if (!empty($data['asset_source_id'])) {
                AssetSource::where('id', $data['asset_source_id'])
                    ->decrement('balance', $data['amount']);
            }

            return $expense;
        });
    }
}

```

### 2. Monthly Snapshot Automations (Scheduler)

Fitur *snapshot* otomatis setiap akhir bulan jam 23:59 menggunakan Console Command:

* **Command Code:** `php artisan make:command TakeMonthlySnapshot`
* **Scheduler Config (`routes/console.php`):**
```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('snapshot:take')->monthlyOn(now()->endOfMonth()->day, '23:59');

```



---

## 🏁 Development Phases & Roadmap

### Phase 1: Environment & Schema Setup

* [ ] Inisialisasi projek: `laravel new budgeting-api --api`
* [ ] Konfigurasi database MySQL pada `.env`
* [ ] Buat file Migration untuk 6 tabel (`budget_plans`, `expense_transactions`, `asset_sources`, `savings_pockets`, `investment_assets`, `monthly_asset_snapshots`)
* [ ] Setup Eloquent Model & Relationships

### Phase 2: Core CRUD APIs

* [ ] Setup Laravel Sanctum untuk Auth Token
* [ ] Implements CRUD Endpoint `AssetSource`
* [ ] Implements CRUD Endpoint `BudgetPlan`
* [ ] Implements Service & Endpoint `ExpenseTransaction` *(dengan auto-deduct balance)*

### Phase 3: Analytics & Dashboard Endpoint

* [ ] Buat `DashboardController` & `DashboardSummaryResource` untuk agregasi data utama
* [ ] Formulasi perhitungan:
* **Total Net Worth** = $\sum \text{Asset Balance} + \sum (\text{Holdings} \times \text{Current Price})$
* **Current Month Expense** = $\sum \text{Expense Amount (Bulan Ini)}$



### Phase 4: Automation & History

* [ ] Buat Command `TakeMonthlySnapshot` untuk menyimpan total saldo aset & portofolio akhir bulan
* [ ] Uji eksekusi Scheduler via Cron/Artisan
* [ ] Endpoint grafik histori `/api/v1/snapshots/history`

### Phase 5: Testing & API Documentation

* [ ] Unit & Integration Test menggunakan Pest / PHPUnit
* [ ] Export Postman Collection / OpenAPI Spec File