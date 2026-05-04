export function WarningList({ warnings }: { warnings: string[] }) {
  if (!warnings.length) return null;
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm">
      {warnings.map((warning) => (
        <li key={warning}>⚠️ {warning}</li>
      ))}
    </ul>
  );
}
