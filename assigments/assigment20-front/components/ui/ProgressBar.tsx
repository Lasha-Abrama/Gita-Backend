export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div className="progress-wrap">
      {label && <div className="progress-label"><span>{label}</span><strong>{Math.round(safeValue)}%</strong></div>}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(safeValue)}
      >
        <span style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
