import { ReactNode } from 'react';

type Props = { label: string; children: ReactNode };

export function FieldGroup({ label, children }: Props) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-xs font-black uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
