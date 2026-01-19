import { type ChangeEvent } from 'react';

interface TextAreaFieldProps {
    label: string;
    name: string;
    value?: string;
    placeholder?: string;
    rows?: number;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaField = ({ label, name, value, placeholder, rows = 5, onChange }: TextAreaFieldProps) => (
    <div className="flex flex-col">
        <label className="text-zinc-400 mb-1 font-semibold">{label}</label>
        <textarea
            name={name}
            value={value}
            placeholder={placeholder}
            rows={rows}
            onChange={onChange}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-red-600 transition"
        />
    </div>
);
