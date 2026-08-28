<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PegawaiController extends Controller
{
    public function index()
    {
        $pegawai = Pegawai::all();
        return Inertia::render('Pegawai/Index', [
            'pegawai' => $pegawai
        ]);
    }

    public function create()
    {
        return Inertia::render('Pegawai/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nm_pegawai' => 'required',
            'alamat_pegawai' => 'required',
            'tgl_lahir_pegawai' => 'required|date',
            'id_m_status_pegawai' => 'required|integer'
        ]);

        Pegawai::create($request->all());
        return redirect()->route('pegawai.index');
    }

    public function edit(Pegawai $pegawai)
    {
        return Inertia::render('Pegawai/Edit', [
            'pegawai' => $pegawai
        ]);
    }

    public function update(Request $request, Pegawai $pegawai)
    {
        $request->validate([
            'nm_pegawai' => 'required',
            'alamat_pegawai' => 'required',
            'tgl_lahir_pegawai' => 'required|date',
            'id_m_status_pegawai' => 'required|integer'
        ]);

        $pegawai->update($request->all());
        return redirect()->route('pegawai.index');
    }

    public function destroy(Pegawai $pegawai)
    {
        $pegawai->delete();
        return redirect()->route('pegawai.index');
    }
}
