import { FormEvent, useState } from 'react';
import { WasherInput, WasherRecommendation } from '../domain/types';
import { recommendWasherCycle } from '../utils/recommendWasherCycle';
import { FieldGroup } from './FieldGroup';
import { RecommendationCard } from './RecommendationCard';

const initial: WasherInput = { description: '', wantsDrying: 'nao', soilLevel: 'normal' };

export function WasherHelper() {
  const [input, setInput] = useState<WasherInput>(initial);
  const [result, setResult] = useState<WasherRecommendation | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.description.trim()) return;
    setResult(recommendWasherCycle(input));
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-3xl font-black">Manual interativo da lava e seca</h1>
      <p className="mt-2">Descreva a carga de roupas e receba uma sugestão baseada no manual da LG CV3012*C5.</p>
      <form className="mt-6 border-4 border-black bg-[#f7ff6a] p-4 shadow-[8px_8px_0_#000]" onSubmit={submit}>
        <FieldGroup label="O que você quer lavar?">
          <textarea className="w-full border-4 border-black p-3" placeholder="Ex.: camisetas pretas de algodão, cuecas e shorts de academia, sujeira normal" value={input.description} onChange={(e) => setInput({ ...input, description: e.target.value })} rows={4} required />
        </FieldGroup>
        <div className="grid gap-3 md:grid-cols-2">
          <FieldGroup label="Grupo de cor"><select className="w-full border-4 border-black p-2" value={input.colorGroup ?? ''} onChange={(e) => setInput({ ...input, colorGroup: (e.target.value || undefined) as any })}><option value="">Selecione</option><option value="brancas">Brancas</option><option value="claras">Claras</option><option value="escuras">Escuras</option><option value="mistas">Mistas</option></select></FieldGroup>
          <FieldGroup label="Nível de sujeira"><select className="w-full border-4 border-black p-2" value={input.soilLevel ?? ''} onChange={(e) => setInput({ ...input, soilLevel: (e.target.value || undefined) as any })}><option value="leve">Leve</option><option value="normal">Normal</option><option value="pesada">Pesada</option></select></FieldGroup>
          <FieldGroup label="Tamanho aproximado da carga"><select className="w-full border-4 border-black p-2" value={input.loadSize ?? ''} onChange={(e) => setInput({ ...input, loadSize: (e.target.value || undefined) as any })}><option value="">Selecione</option><option value="minima">Mínima</option><option value="pequena">Pequena</option><option value="media">Média</option><option value="cheia">Cheia</option></select></FieldGroup>
          <FieldGroup label="Quero secar na máquina"><select className="w-full border-4 border-black p-2" value={input.wantsDrying ?? 'nao'} onChange={(e) => setInput({ ...input, wantsDrying: e.target.value as any })}><option value="sim">Sim</option><option value="nao">Não</option><option value="talvez">Talvez</option></select></FieldGroup>
        </div>
        <div className="mb-4 space-y-2 text-sm font-semibold">
          <label className="block"><input type="checkbox" checked={!!input.quiet} onChange={(e) => setInput({ ...input, quiet: e.target.checked })} /> Preciso de uma lavagem silenciosa</label>
          <label className="block"><input type="checkbox" checked={!!input.allergySensitive} onChange={(e) => setInput({ ...input, allergySensitive: e.target.checked })} /> Tenho sensibilidade/alergia a sabão</label>
          <label className="block"><input type="checkbox" checked={!!input.hurry} onChange={(e) => setInput({ ...input, hurry: e.target.checked })} /> Estou com pressa</label>
        </div>
        <div className="flex gap-3">
          <button className="border-4 border-black bg-black px-4 py-2 font-bold text-white focus-visible:outline focus-visible:outline-4" type="submit">Recomendar ciclo</button>
          <button className="border-4 border-black bg-white px-4 py-2 font-bold focus-visible:outline focus-visible:outline-4" type="button" onClick={() => { setInput(initial); setResult(null); }}>Limpar</button>
        </div>
      </form>
      {result && <RecommendationCard recommendation={result} />}
    </div>
  );
}
