<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Tentang Laravel

Laravel adalah framework aplikasi web dengan sintaks yang ekspresif dan elegan. Kami percaya bahwa pengembangan harus menjadi pengalaman yang menyenangkan dan kreatif agar benar-benar memuaskan. Laravel menghilangkan rasa sakit dalam pengembangan dengan memudahkan tugas-tugas umum yang digunakan dalam banyak proyek web, seperti:

-   [Mesin routing yang sederhana dan cepat](https://laravel.com/docs/routing).
-   [Kontainer injeksi dependensi yang kuat](https://laravel.com/docs/container).
-   Backend ganda untuk penyimpanan [sesi](https://laravel.com/docs/session) dan [cache](https://laravel.com/docs/cache).
-   [ORM database](https://laravel.com/docs/eloquent) yang ekspresif dan intuitif.
-   [Migrasi skema](https://laravel.com/docs/migrations) yang agnostik terhadap database.
-   [Pemrosesan pekerjaan latar belakang](https://laravel.com/docs/queues) yang kuat.
-   [Penyiaran event secara real-time](https://laravel.com/docs/broadcasting).

Laravel dapat diakses, kuat, dan menyediakan alat yang diperlukan untuk aplikasi besar dan kuat.

## Belajar Laravel

Laravel memiliki [dokumentasi](https://laravel.com/docs) dan perpustakaan tutorial video yang paling luas dan menyeluruh di antara semua framework aplikasi web modern, membuatnya mudah untuk memulai dengan framework ini.

Anda juga dapat mencoba [Laravel Bootcamp](https://bootcamp.laravel.com), di mana Anda akan dipandu melalui pembuatan aplikasi Laravel modern dari awal.

Jika Anda tidak suka membaca, [Laracasts](https://laracasts.com) dapat membantu. Laracasts berisi ribuan tutorial video tentang berbagai topik termasuk Laravel, PHP modern, pengujian unit, dan JavaScript. Tingkatkan keterampilan Anda dengan menyelami perpustakaan video komprehensif kami.

## Sponsor Laravel

Kami ingin mengucapkan terima kasih kepada sponsor berikut yang mendanai pengembangan Laravel. Jika Anda tertarik menjadi sponsor, silakan kunjungi [program Laravel Partners](https://partners.laravel.com).

### Mitra Premium

-   **[Vehikl](https://vehikl.com/)**
-   **[Tighten Co.](https://tighten.co)**
-   **[WebReinvent](https://webreinvent.com/)**
-   **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
-   **[64 Robots](https://64robots.com)**
-   **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
-   **[Cyber-Duck](https://cyber-duck.co.uk)**
-   **[DevSquad](https://devsquad.com/hire-laravel-developers)**
-   **[Jump24](https://jump24.co.uk)**
-   **[Redberry](https://redberry.international/laravel/)**
-   **[Active Logic](https://activelogic.com)**
-   **[byte5](https://byte5.de)**
-   **[OP.GG](https://op.gg)**

## Kontribusi

Terima kasih telah mempertimbangkan untuk berkontribusi pada framework Laravel! Panduan kontribusi dapat ditemukan di [dokumentasi Laravel](https://laravel.com/docs/contributions).

## Kode Etik

Untuk memastikan bahwa komunitas Laravel ramah bagi semua, silakan tinjau dan patuhi [Kode Etik](https://laravel.com/docs/contributions#code-of-conduct).

## Kerentanan Keamanan

Jika Anda menemukan kerentanan keamanan dalam Laravel, silakan kirim email ke Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). Semua kerentanan keamanan akan segera ditangani.

## Lisensi

Framework Laravel adalah perangkat lunak open-source yang dilisensikan di bawah [lisensi MIT](https://opensource.org/licenses/MIT).

# test_pramita

## Dokumentasi Konsep MVC

Proyek ini mengikuti pola arsitektur Model-View-Controller (MVC), yang memisahkan aplikasi menjadi tiga komponen yang saling terhubung:

1. **Model** - Menangani data dan logika bisnis
2. **View** - Mengelola lapisan presentasi (UI)
3. **Controller** - Mengontrol alur antara Model dan View

## Implementasi CRUD Pegawai (Pegawai)

### 1. Migrasi

Struktur database untuk pegawai didefinisikan dalam file migrasi:
`database/migrations/2024_06_09_000000_create_pegawai_table.php`

Struktur:

-   `id_pegawai` (Kunci Utama)
-   `nm_pegawai` (Nama Pegawai)
-   `alamat_pegawai` (Alamat Pegawai)
-   `tgl_lahir_pegawai` (Tanggal Lahir)
-   `id_m_status_pegawai` (ID Status)
-   `timestamps()` (Dibuat pada & Diperbarui pada)

### 2. Model

Model mewakili entitas pegawai dan terletak di:
`app/Models/Pegawai.php`

Konfigurasi utama:

-   Nama tabel: `pegawai`
-   Kunci utama: `id_pegawai`
-   Field yang dapat diisi: `nm_pegawai`, `alamat_pegawai`, `tgl_lahir_pegawai`, `id_m_status_pegawai`
-   Casting tanggal: `tgl_lahir_pegawai`

### 3. Controller

Controller menangani semua operasi CRUD dan terletak di:
`app/Http/Controllers/PegawaiController.php`

Metode:

-   `index()` - Menampilkan semua pegawai
-   `create()` - Menampilkan form untuk membuat pegawai baru
-   `store()` - Menyimpan pegawai baru ke database
-   `edit()` - Menampilkan form untuk mengedit pegawai yang ada
-   `update()` - Memperbarui pegawai yang ada di database
-   `destroy()` - Menghapus pegawai dari database

### 4. Views (Komponen React)

Frontend menggunakan komponen React dengan Inertia.js untuk server-side rendering:

#### Halaman Index

`resources/js/Pages/Pegawai/Index.jsx`

-   Menampilkan tabel semua pegawai
-   Menyediakan tautan untuk mengedit atau menghapus setiap pegawai
-   Menyertakan tombol untuk membuat pegawai baru

#### Halaman Create

`resources/js/Pages/Pegawai/Create.jsx`

-   Berisi form untuk membuat pegawai baru
-   Field form untuk semua atribut pegawai
-   Validasi dan penanganan pengiriman

#### Halaman Edit

`resources/js/Pages/Pegawai/Edit.jsx`

-   Berisi form untuk mengedit pegawai yang ada
-   Mengisi form dengan data pegawai yang ada
-   Validasi dan penanganan pembaruan

### 5. Routing

Rute didefinisikan di `routes/web.php` menggunakan routing sumber daya Laravel:

```php
Route::resource('pegawai', PegawaiController::class);
```

Ini membuat rute RESTful untuk semua operasi CRUD:

-   GET `/pegawai` (index)
-   GET `/pegawai/create` (create)
-   POST `/pegawai` (store)
-   GET `/pegawai/{pegawai}/edit` (edit)
-   PUT/PATCH `/pegawai/{pegawai}` (update)
-   DELETE `/pegawai/{pegawai}` (destroy)

### 6. Koneksi Database

Konfigurasi database dikelola melalui dua file:

1. `config/database.php` - Mendefinisikan koneksi database yang tersedia
2. `.env` - Berisi kredensial database aktual:
    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_db_name
    DB_USERNAME=root
    DB_PASSWORD=''
    ```

Untuk mengatur database:

1. Buat database MySQL bernama `your_db_name`
2. Pastikan username dan password sesuai dengan konfigurasi MySQL Anda
3. Jalankan migrasi dengan: `php artisan migrate`

Implementasi MVC ini memastikan pemisahan kekhawatiran yang jelas, membuat codebase mudah dipelihara dan dapat diskalakan.
