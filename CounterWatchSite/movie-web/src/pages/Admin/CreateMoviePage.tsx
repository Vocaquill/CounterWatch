import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMovieMutation } from '../../services/api/apiMovies.ts';
import { useSearchGenresQuery } from '../../services/api/apiGenres.ts';
import type { IMovieCreate } from '../../types/movie.ts';
import type { IGenreItem } from '../../types/genre.ts';
import { InputField } from '../../components/form/InputField.tsx';
import { TextAreaField } from '../../components/form/TextAreaField.tsx';
import { FileUploadField } from '../../components/form/FileUploadField.tsx';
import { PrimaryButton } from '../../components/form/PrimaryButton.tsx';

export default function CreateMoviePage() {
    const navigate = useNavigate();
    const [createMovie] = useCreateMovieMutation();
    const { data: genresData } = useSearchGenresQuery({ page: 1, itemPerPage: 100 });

    const [form, setForm] = useState<IMovieCreate>({
        title: '',
        slug: '',
        description: '',
        releaseDate: '',
        imdbRating: '',
        trailerUrl: '',
        image: undefined,
        video: undefined,
        genreIds: [], // мультивибір жанрів
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setForm(prev => ({ ...prev, [name]: files?.[0] }));
    };

    const handleGenreToggle = (id: number) => {
        setForm(prev => {
            const current = prev.genreIds || [];
            return {
                ...prev,
                genreIds: current.includes(id) ? current.filter(g => g !== id) : [...current, id],
            };
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createMovie(form);
        navigate('/admin/movies');
    };

    return (
        <div className="p-6 bg-zinc-950 min-h-screen">
            <h1 className="text-3xl font-black text-white mb-8">Створити фільм</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Ліва колонка */}
                <div className="space-y-4">
                    <InputField label="Назва" name="title" value={form.title} onChange={handleChange} required />
                    <InputField label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
                    <TextAreaField label="Опис" name="description" value={form.description} onChange={handleChange} />
                    <InputField label="Дата релізу" name="releaseDate" type="date" value={form.releaseDate} onChange={handleChange} required />
                    <InputField label="IMDB" name="imdbRating" value={form.imdbRating} onChange={handleChange} />
                </div>

                {/* Права колонка */}
                <div className="space-y-4">
                    <InputField label="Trailer URL" name="trailerUrl" value={form.trailerUrl} onChange={handleChange} />

                    {/* Вибір жанрів */}
                    <div>
                        <label className="text-zinc-400 mb-1 font-semibold block">Жанри</label>
                        <div className="flex flex-wrap gap-2">
                            {genresData?.items.map((genre: IGenreItem) => (
                                <button
                                    key={genre.id}
                                    type="button"
                                    onClick={() => handleGenreToggle(genre.id)}
                                    className={`px-3 py-1 rounded-xl border transition ${
                                        form.genreIds?.includes(genre.id)
                                            ? 'bg-red-600 border-red-600 text-white'
                                            : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                                    }`}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <FileUploadField label="Зображення" name="image" accept="image/*" onChange={handleFileChange} />
                    <FileUploadField label="Відео" name="video" accept="video/*" onChange={handleFileChange} />
                </div>

                {/* Кнопка */}
                <div className="col-span-2 flex justify-end mt-4">
                    <PrimaryButton type="submit">Створити</PrimaryButton>
                </div>
            </form>
        </div>
    );
}
