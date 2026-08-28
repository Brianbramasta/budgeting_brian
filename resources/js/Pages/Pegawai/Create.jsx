import { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Create() {
    const [values, setValues] = useState({
        nm_pegawai: '',
        alamat_pegawai: '',
        tgl_lahir_pegawai: '',
        id_m_status_pegawai: ''
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post(route('pegawai.store'), values);
    }

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-6">Tambah Pegawai</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2">Nama</label>
                            <input
                                type="text"
                                id="nm_pegawai"
                                value={values.nm_pegawai}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Alamat</label>
                            <input
                                type="text"
                                id="alamat_pegawai"
                                value={values.alamat_pegawai}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Tanggal Lahir</label>
                            <input
                                type="date"
                                id="tgl_lahir_pegawai"
                                value={values.tgl_lahir_pegawai}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Status</label>
                            <input
                                type="number"
                                id="id_m_status_pegawai"
                                value={values.id_m_status_pegawai}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Simpan
                            </button>
                            <Link href={route('pegawai.index')} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
