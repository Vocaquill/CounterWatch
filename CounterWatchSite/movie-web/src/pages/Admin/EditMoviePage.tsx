import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBySlugQuery, useEditMovieMutation } from '../../services/api/apiMovies.ts';
import type { IMovieEdit } from '../../types/movie.ts';

function EditMoviePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: movie, isLoading } = useGetBySlugQuery({ slug: id! });
    const [editMovie] = useEditMovieMutation();

    const [form, setForm] = useState<IMovieEdit | null>(
        movie
            ? {
                id: movie.id,
                title: movie.title,
                slug: movie.slug,
                description: movie.description || '',
                releaseDate: movie.releaseDate,
                imdbRating: movie.imdbRating || '',
                trailerUrl: movie.trailerUrl || '',
                image: undefined,
                video: undefined,
            }
            : null
    );

    if (isLoading || !movie || !form) {
        return <div className="text-center text-white py-20">Завантаження...</div>;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setForm((prev) => (prev ? { ...prev, [name]: files?.[0] } : prev));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!form) return;
        await editMovie(form);
        navigate('/admin/movies');
    };

    return (
        <div className="p-6 bg-zinc-950 min-h-screen">
            <h1 className="text-2xl font-bold text-white mb-6">Редагувати фільм</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <input type="text" name="title" placeholder="Назва" className="input" value={form.title} onChange={handleChange} required />
                    <input type="text" name="slug" placeholder="Slug" className="input" value={form.slug} onChange={handleChange} required />
                    <textarea name="description" placeholder="Опис" className="input h-32" value={form.description} onChange={handleChange} />
                    <input type="date" name="releaseDate" className="input" value={form.releaseDate} onChange={handleChange} required />
                    <input type="text" name="imdbRating" placeholder="IMDB" className="input" value={form.imdbRating} onChange={handleChange} />
                </div>
                <div className="space-y-4">
                    <input type="text" name="trailerUrl" placeholder="Trailer URL" className="input" value={form.trailerUrl} onChange={handleChange} />
                    <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                    <input type="file" name="video" accept="video/*" onChange={handleFileChange} />
                </div>
                <div className="col-span-2 flex justify-end mt-4">
                    <button type="submit" className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold">Зберегти</button>
                </div>
            </form>
        </div>
    );
}

export default EditMoviePage;
