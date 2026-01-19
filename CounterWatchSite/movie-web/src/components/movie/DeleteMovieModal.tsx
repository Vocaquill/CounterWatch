import { X, Trash2 } from 'lucide-react';
import type {FC} from "react";

interface DeleteMovieModalProps {
    isOpen: boolean;
    movieTitle: string;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteMovieModal: FC<DeleteMovieModalProps> = ({ isOpen, movieTitle, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-2xl w-[400px] text-center relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                    <X size={20} />
                </button>
                <Trash2 size={40} className="mx-auto text-red-600 mb-4" />
                <h2 className="text-lg font-bold text-white mb-2">Видалити фільм?</h2>
                <p className="text-zinc-400 mb-6">Ви точно хочете видалити "{movieTitle}"? Цю дію не можна скасувати.</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white">
                        Скасувати
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white">
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteMovieModal;
