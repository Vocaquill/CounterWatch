import { type ChangeEvent } from 'react';

interface FileUploadFieldProps {
    label: string;
    name: string;
    accept?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadField = ({ label, name, accept, onChange }: FileUploadFieldProps) => (
    <div className="flex flex-col">
        <label className="text-zinc-400 mb-1 font-semibold">{label}</label>
        <input
            type="file"
            name={name}
            accept={accept}
            onChange={onChange}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 cursor-pointer hover:border-red-600 transition"
        />
    </div>
);
