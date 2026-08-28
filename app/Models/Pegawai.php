<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    protected $table = 'pegawai';
    protected $primaryKey = 'id_pegawai';
    protected $fillable = [
        'nm_pegawai',
        'alamat_pegawai',
        'tgl_lahir_pegawai',
        'id_m_status_pegawai'
    ];

    protected $dates = ['tgl_lahir_pegawai'];
}
