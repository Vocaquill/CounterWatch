import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Loader2 } from 'lucide-react';

import { useSearchMoviesQuery, useDeleteMovieMutation } from '../../services/api/apiMovies.ts';
import { Pagination } from '../../components/Pagination.tsx';
import DeleteMovieModal from "../../components/movie/DeleteMovieModal.tsx";

function AdminMoviesPage() {
    const navigate = useNavigate();
    const [search] = useState('');
    const [page, setPage] = useState(1);

    const { data, isFetching, isError } = useSearchMoviesQuery({ title: search, page, itemPerPage: 10 });
    const [deleteMovie] = useDeleteMovieMutation();

    const [movieToDelete, setMovieToDelete] = useState<{ id: number; title: string } | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = async () => {
        if (!movieToDelete) return;
        await deleteMovie({ id: movieToDelete.id });
        setMovieToDelete(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Фільми</h1>
                <button onClick={() => navigate('/admin/movies/add')} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold flex items-center gap-2">
                    Додати фільм
                </button>
            </div>

            <div className="overflow-x-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl relative">
                {isFetching && (
                    <div className="absolute inset-0 bg-zinc-900/60 flex items-center justify-center z-10">
                        <Loader2 className="text-red-600 animate-spin" size={40} />
                    </div>
                )}
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-800/50 text-zinc-500 text-[11px] uppercase tracking-[0.1em] font-bold">
                    <tr>
                        <th className="p-4 border-b border-zinc-800 w-20 text-center">ID</th>
                        <th className="p-4 border-b border-zinc-800">Назва</th>
                        <th className="p-4 border-b border-zinc-800">Slug</th>
                        <th className="p-4 border-b border-zinc-800">Дата релізу</th>
                        <th className="p-4 border-b border-zinc-800 text-right">Дії</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                    {isError ? (
                        <tr><td colSpan={5} className="p-12 text-center text-red-500">Помилка завантаження</td></tr>
                    ) : data?.items.length === 0 ? (
                        <tr><td colSpan={5} className="p-12 text-center text-zinc-400 italic">Нічого не знайдено</td></tr>
                    ) : (
                        data?.items.map((movie) => (
                            <tr key={movie.id} className="hover:bg-zinc-800/20 transition-colors group">
                                <td className="p-4 text-center">{movie.id}</td>
                                <td className="p-4 font-semibold text-zinc-200 group-hover:text-red-500">{movie.title}</td>
                                <td className="p-4 font-mono text-zinc-400">{movie.slug}</td>
                                <td className="p-4 text-zinc-400">{new Date(movie.releaseDate).toLocaleDateString('uk-UA')}</td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <button onClick={() => navigate(`/admin/movies/edit/${movie.id}`)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => { setMovieToDelete({ id: movie.id, title: movie.title }); setIsDeleteModalOpen(true); }} className="p-2 hover:bg-red-950/30 rounded-lg text-zinc-500 hover:text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {data && (
                <Pagination
                    currentPage={data.currentPage}
                    totalPages={data.totalPages}
                    onChange={(p) => setPage(p)}
                />
            )}

            <DeleteMovieModal
                isOpen={isDeleteModalOpen}
                movieTitle={movieToDelete?.title || ''}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
}

export default AdminMoviesPage;
