interface Props {
    from?: string;
    to?: string;
    onChange: (from?: string, to?: string) => void;
}

const MIN_YEAR = 1950;
const MAX_YEAR = new Date().getFullYear();

export function YearRange({ from, to, onChange }: Props) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-400">
                <span>{from || MIN_YEAR}</span>
                <span>{to || MAX_YEAR}</span>
            </div>

            <input
                type="range"
                min={MIN_YEAR}
                max={MAX_YEAR}
                value={from ?? MIN_YEAR}
                onChange={(e) => onChange(e.target.value, to)}
                className="w-full accent-red-600"
            />

            <input
                type="range"
                min={MIN_YEAR}
                max={MAX_YEAR}
                value={to ?? MAX_YEAR}
                onChange={(e) => onChange(from, e.target.value)}
                className="w-full accent-red-600"
            />
        </div>
    );
}
