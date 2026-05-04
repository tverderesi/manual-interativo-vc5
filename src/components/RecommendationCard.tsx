import { WasherRecommendation } from '../domain/types';
import { WarningList } from './WarningList';

export function RecommendationCard({ recommendation }: { recommendation: WasherRecommendation }) {
  return (
    <section className="mt-6 border-4 border-black bg-white p-5 shadow-[8px_8px_0_#000]">
      <h2 className="mb-4 text-2xl font-black">Resultado</h2>
      <div className="grid gap-3 text-sm md:grid-cols-2">
        <p><strong>Programa recomendado:</strong> {recommendation.programName}</p>
        <p><strong>Temperatura:</strong> {recommendation.temperature}</p>
        <p><strong>Centrifugação:</strong> {recommendation.spin}</p>
        <p><strong>Carga máxima:</strong> {recommendation.maxLoad}</p>
        <p className="md:col-span-2"><strong>Secagem:</strong> {recommendation.drying ? (recommendation.drying.recommended ? `Sim — ${recommendation.drying.modeName}` : `Não — ${recommendation.drying.reason}`) : 'Não solicitada'}</p>
      </div>
      <h3 className="mt-4 text-lg font-extrabold">Opções extras</h3>
      <p>{recommendation.extraOptions.length ? recommendation.extraOptions.join(', ') : 'Nenhuma opção extra obrigatória.'}</p>
      <h3 className="mt-4 text-lg font-extrabold">Avisos</h3>
      <WarningList warnings={recommendation.warnings} />
      <h3 className="mt-4 text-lg font-extrabold">Por que essa recomendação?</h3>
      <ul className="list-disc pl-5">{recommendation.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
      <h3 className="mt-4 text-lg font-extrabold">Lembrete final</h3>
      <p>Confira sempre a etiqueta da roupa. O assistente ajuda a escolher o ciclo, mas a etiqueta da peça manda mais que qualquer recomendação geral.</p>
    </section>
  );
}
