export default function ProgressBar({ value }) {
  return (
    <div className="mt-3">
      <div className="h-2 bg-neutral-800 rounded-full">
        <div
          className="h-2 rounded-full bg-indigo-600 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-neutral-400">{value}% completed</p>
    </div>
  );
}
