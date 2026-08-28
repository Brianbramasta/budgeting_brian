import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Index({ pegawai }) {
    const destroy = (id) => {
        if (confirm('Are you sure you want to delete this record?')) {
            router.delete(route('pegawai.destroy', id));
        }
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="flex justify-between mb-6">
                        <h2 className="text-2xl font-semibold">Data Pegawai</h2>
                        <Link href={route('pegawai.create')} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Tambah Pegawai
                        </Link>
                    </div>

                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b">Nama</th>
                                <th className="px-6 py-3 border-b">Alamat</th>
                                <th className="px-6 py-3 border-b">Tanggal Lahir</th>
                                <th className="px-6 py-3 border-b">Status</th>
                                <th className="px-6 py-3 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pegawai.map((item) => (
                                <tr key={item.id_pegawai}>
                                    <td className="px-6 py-4 border-b">{item.nm_pegawai}</td>
                                    <td className="px-6 py-4 border-b">{item.alamat_pegawai}</td>
                                    <td className="px-6 py-4 border-b">{item.tgl_lahir_pegawai}</td>
                                    <td className="px-6 py-4 border-b">{item.id_m_status_pegawai}</td>
                                    <td className="px-6 py-4 border-b">
                                        <Link href={route('pegawai.edit', item.id_pegawai)} className="text-blue-600 mr-2">
                                            Edit
                                        </Link>
                                        <button onClick={() => destroy(item.id_pegawai)} className="text-red-600">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
