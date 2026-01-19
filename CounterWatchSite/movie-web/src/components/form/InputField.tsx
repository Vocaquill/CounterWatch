import { type ChangeEvent } from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    value?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({ label, name, value, placeholder, type = 'text', required = false, onChange }: InputFieldProps) => (
    <div className="flex flex-col">
        <label className="text-zinc-400 mb-1 font-semibold">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
        />
    </div>
);
