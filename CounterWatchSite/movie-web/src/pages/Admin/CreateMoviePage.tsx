import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMovieMutation } from '../../services/api/apiMovies.ts';
import type { IMovieCreate } from '../../types/movie.ts';

function CreateMoviePage() {
    const navigate = useNavigate();
    const [createMovie] = useCreateMovieMutation();

    const [form, setForm] = useState<IMovieCreate>({
        title: '',
        slug: '',
        description: '',
        releaseDate: '',
        imdbRating: '',
        trailerUrl: '',
        image: undefined,
        video: undefined,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setForm((prev) => ({ ...prev, [name]: files?.[0] }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createMovie(form);
        navigate('/admin/movies');
    };

    return (
        <div className="p-6 bg-zinc-950 min-h-screen">
            <h1 className="text-2xl font-bold text-white mb-6">Створити фільм</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <input type="text" name="title" placeholder="Назва" className="input" onChange={handleChange} required />
                    <input type="text" name="slug" placeholder="Slug" className="input" onChange={handleChange} required />
                    <textarea name="description" placeholder="Опис" className="input h-32" onChange={handleChange} />
                    <input type="date" name="releaseDate" className="input" onChange={handleChange} required />
                    <input type="text" name="imdbRating" placeholder="IMDB" className="input" onChange={handleChange} />
                </div>
                <div className="space-y-4">
                    <input type="text" name="trailerUrl" placeholder="Trailer URL" className="input" onChange={handleChange} />
                    <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                    <input type="file" name="video" accept="video/*" onChange={handleFileChange} />
                </div>
                <div className="col-span-2 flex justify-end mt-4">
                    <button type="submit" className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold">Створити</button>
                </div>
            </form>
        </div>
    );
}

export default CreateMoviePage;
