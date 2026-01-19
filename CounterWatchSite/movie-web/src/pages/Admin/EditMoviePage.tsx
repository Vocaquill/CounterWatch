import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBySlugQuery, useEditMovieMutation } from '../../services/api/apiMovies.ts';
import type { IMovieEdit } from '../../types/movie.ts';
import { InputField } from '../../components/form/InputField.tsx';
import { TextAreaField } from '../../components/form/TextAreaField.tsx';
import { PrimaryButton } from '../../components/form/PrimaryButton.tsx';
import { FileUploadField } from '../../components/form/FileUploadField.tsx';
import { MoviePlayer } from '../../components/movie/MoviePlayer.tsx';
import { APP_ENV } from '../../env/index.ts';

function EditMoviePage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const { data: movie, isLoading } = useGetBySlugQuery({ slug: slug! });
    const [editMovie] = useEditMovieMutation();

    const [form, setForm] = useState<IMovieEdit | null>(null);

    if (isLoading) {
        return <div className="text-center text-white py-20">Завантаження...</div>;
    }

    if (!movie) {
        return <div className="text-center text-white py-20">Фільм не знайдено</div>;
    }

    if (!form) {
        setForm({
            id: movie.id,
            title: movie.title,
            slug: movie.slug,
            description: movie.description || '',
            releaseDate: movie.releaseDate ? new Date(movie.releaseDate).toISOString().slice(0, 10) : '',
            imdbRating: movie.imdbRating || '',
            trailerUrl: movie.trailerUrl || '',
            image: undefined,
            video: undefined,
        });
        return <div className="text-center text-white py-20">Завантаження форми...</div>;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setForm(prev => (prev ? { ...prev, [name]: files?.[0] } : prev));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!form) return;
        await editMovie(form);
        navigate('/admin/movies');
    };

    return (
        <div className="p-6 bg-zinc-950 min-h-screen">
            <h1 className="text-3xl font-black text-white mb-8">Редагувати фільм</h1>

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

                    {/* Прев’ю картинки */}
                    <div className="space-y-2">
                        <FileUploadField label="Зображення" name="image" accept="image/*" onChange={handleFileChange} />
                        {form.image ? (
                            <img
                                src={typeof form.image === 'string' ? `${APP_ENV.IMAGES_1200_URL}${form.image}` : URL.createObjectURL(form.image)}
                                alt="Прев’ю"
                                className="w-full h-40 object-cover rounded-xl border border-zinc-800"
                            />
                        ) : movie.image ? (
                            <img
                                src={`${APP_ENV.IMAGES_1200_URL}${movie.image}`}
                                alt="Прев’ю"
                                className="w-full h-40 object-cover rounded-xl border border-zinc-800"
                            />
                        ) : null}
                    </div>

                    {/* Прев’ю відео */}
                    <div className="space-y-2">
                        <FileUploadField label="Відео" name="video" accept="video/*" onChange={handleFileChange} />
                        {form.video ? (
                            <MoviePlayer
                                src={typeof form.video === 'string' ? form.video : URL.createObjectURL(form.video)}
                            />
                        ) : movie.video ? (
                            <MoviePlayer src={`${APP_ENV.VIDEO_URL}${movie.video}`} />
                        ) : null}
                    </div>
                </div>

                {/* Кнопка */}
                <div className="col-span-1 md:col-span-2 flex justify-end mt-6">
                    <PrimaryButton type="submit">Зберегти</PrimaryButton>
                </div>
            </form>
        </div>
    );
}

export default EditMoviePage;
