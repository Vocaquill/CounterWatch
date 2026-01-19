import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMovieMutation } from '../../services/api/apiMovies.ts';

import type { IMovieCreate } from '../../types/movie.ts';
import { InputField } from '../../components/form/InputField.tsx';
import {TextAreaField} from "../../components/form/TextAreaField.tsx";
import { FileUploadField } from '../../components/form/FileUploadField.tsx';
import { PrimaryButton } from '../../components/form/PrimaryButton.tsx';

export default function CreateMoviePage() {
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
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setForm(prev => ({ ...prev, [name]: files?.[0] }));
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
                <div className="space-y-4">
                    <InputField label="Назва" name="title" value={form.title} onChange={handleChange} required />
                    <InputField label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
                    <TextAreaField label="Опис" name="description" value={form.description} onChange={handleChange} />
                    <InputField label="Дата релізу" name="releaseDate" type="date" value={form.releaseDate} onChange={handleChange} required />
                    <InputField label="IMDB" name="imdbRating" value={form.imdbRating} onChange={handleChange} />
                </div>
                <div className="space-y-4">
                    <InputField label="Trailer URL" name="trailerUrl" value={form.trailerUrl} onChange={handleChange} />
                    <FileUploadField label="Зображення" name="image" accept="image/*" onChange={handleFileChange} />
                    <FileUploadField label="Відео" name="video" accept="video/*" onChange={handleFileChange} />
                </div>
                <div className="col-span-2 flex justify-end mt-4">
                    <PrimaryButton type="submit">Створити</PrimaryButton>
                </div>
            </form>
        </div>
    );
}
