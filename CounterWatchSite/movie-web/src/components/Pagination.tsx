interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export function Pagination({
                               currentPage,
                               totalPages,
                               onChange,
                           }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages: (number | '...')[] = [];

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
    }

    return (
        <div className="flex justify-center gap-2 mt-10">
            {pages.map((p, idx) =>
                p === '...' ? (
                    <span key={idx} className="px-3 py-2 text-zinc-500">
            ...
          </span>
            ) : (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`px-4 py-2 rounded-xl font-bold transition ${
                        p === currentPage
                            ? 'bg-red-600 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                >
                    {p}
                </button>
            )
            )}
        </div>
    );
}
