import { WasherInput, WasherRecommendation } from '../domain/types';
import { hasAnyKeyword } from './textMatch';

const flammable = ['gasolina', 'querosene', 'alcool', 'acetona', 'oleo', 'solvente', 'removedor de cera', 'tinta', 'aguarras', 'substancia inflamavel', 'produto quimico industrial'];

export function recommendWasherCycle(input: WasherInput): WasherRecommendation {
  const d = input.description || '';
  const warnings: string[] = ['Não secar peças não lavadas.', 'Remover isqueiros, fósforos e objetos dos bolsos.'];
  const reasons: string[] = [];
  const extraOptions: string[] = [];
  let rec: WasherRecommendation = { programId: 'algodao', programName: 'Algodão', temperature: '40 °C', spin: '1400 rpm', maxLoad: 'Classificação / até 12 kg para lavagem', extraOptions, warnings, reasons };

  if (hasAnyKeyword(d, flammable)) {
    warnings.push('Atenção: o manual alerta para risco de incêndio ou explosão em peças manchadas com substâncias inflamáveis ou combustíveis. Não seque essas peças sem tratamento adequado e siga a etiqueta/manual.');
  }

  if (hasAnyKeyword(d, ['la', 'wool', 'trico', 'tricot'])) {
    rec = { ...rec, programId: 'lavagem-a-mao-la', programName: 'Lavagem a Mão/Lã', temperature: '30 °C, ou fria até 40 °C se a etiqueta permitir', spin: '800 rpm ou menor', maxLoad: '2 kg' };
    reasons.push('Foram identificados termos de lã/tricô na descrição.');
    warnings.push('Não seque lã na máquina. Estique no formato original e deixe secar naturalmente.');
  } else if (hasAnyKeyword(d, ['lingerie', 'renda', 'delicado', 'transparente', 'vestido delicado'])) {
    rec = { ...rec, programId: 'delicados', programName: 'Delicados', temperature: '20 °C, ou fria até 40 °C se a etiqueta permitir', spin: 'Até 800 rpm', maxLoad: '3 kg' };
    reasons.push('A descrição indica peças delicadas.');
    warnings.push('Evite secagem em máquina; use Baixa temperatura somente se a etiqueta permitir.');
  } else if (hasAnyKeyword(d, ['bebe', 'roupa de bebe', 'mancha de comida'])) {
    rec = { ...rec, programId: 'roupa-de-bebe', programName: 'Roupa de Bebê', temperature: '60 °C', spin: 'Até 1000 rpm', maxLoad: '4 kg' };
    reasons.push('A descrição cita roupas de bebê ou manchas de comida.');
    if (input.allergySensitive) extraOptions.push('Enxágue Extra');
  } else if (input.allergySensitive || hasAnyKeyword(d, ['alergia', 'acaro', 'sensivel'])) {
    rec = { ...rec, programId: 'antialergico', programName: 'Antialérgico', temperature: '60 °C', spin: '1400 rpm', maxLoad: '4 kg' };
    extraOptions.push('Enxágue Extra');
    reasons.push('Foi marcada sensibilidade/alergia ou termos relacionados.');
  } else if (input.hurry && ['minima', 'pequena'].includes(input.loadSize ?? '') && input.soilLevel !== 'pesada') {
    rec = { ...rec, programId: 'rapido-14', programName: 'Rápido 14', temperature: '20 °C até 40 °C', spin: '400 rpm', maxLoad: '2 kg' };
    reasons.push('Pressa com carga pequena e sujeira não pesada.');
  } else if (input.quiet) {
    rec = { ...rec, programId: 'lavagem-silenciosa', programName: 'Lavagem Silenciosa', temperature: '40 °C', spin: '800 rpm, até 1000 rpm', maxLoad: '5 kg' };
    reasons.push('Você pediu lavagem silenciosa.');
  } else if (hasAnyKeyword(d, ['poliester', 'acrilico', 'poliamida', 'sintetico', 'dry fit', 'academia', 'gym'])) {
    rec = { ...rec, programId: 'tecidos-sinteticos', programName: 'Tecidos Sintéticos', temperature: '40 °C, ou fria até 60 °C se a etiqueta permitir', spin: '1400 rpm', maxLoad: '4 kg' };
    reasons.push('A descrição tem termos de tecidos sintéticos/esportivos.');
  } else if (hasAnyKeyword(d, ['misto', 'misturada', 'varias roupas', 'roupas variadas'])) {
    rec = { ...rec, programId: 'mix', programName: 'Mix', temperature: '40 °C', spin: '1000 rpm', maxLoad: '4 kg' };
    warnings.push('No Mix, evite seda, delicados, roupas esportivas especiais, roupas escuras sensíveis, lã, edredom ou cortinas.');
    reasons.push('A descrição sugere carga mista.');
  } else if (hasAnyKeyword(d, ['algodao', 'camiseta', 'toalha', 'lencol', 'roupa do dia a dia'])) {
    rec = { ...rec, programId: 'algodao', programName: 'Algodão', temperature: '40 °C', spin: '1400 rpm', maxLoad: 'Classificação / até 12 kg para lavagem' };
    reasons.push('A descrição combina com roupas de algodão do dia a dia.');
  } else {
    warnings.push('Não identifiquei um tecido específico. Confira a etiqueta da peça antes de lavar.');
    reasons.push('Aplicado modo padrão para roupas comuns com sujeira normal.');
  }

  if (input.soilLevel === 'pesada') extraOptions.push('Intensivo');
  if (hasAnyKeyword(d, ['muito suja', 'encardida', 'manchada'])) extraOptions.push('Pré-lavagem');

  if (input.wantsDrying === 'sim' || input.wantsDrying === 'talvez') {
    const cannotDry = hasAnyKeyword(d, ['la', 'borracha', 'plastico', 'tapete de banho', 'fibra de vidro']) || hasAnyKeyword(d, flammable);
    warnings.push('A capacidade máxima de lavagem é 12 kg, mas a capacidade máxima de secagem é 7 kg.');
    warnings.push('Para lavar e secar em sequência, a carga deve respeitar a capacidade de secagem.');
    warnings.push('Durante a secagem, a torneira de água fria deve permanecer aberta.');
    warnings.push('Não sobrecarregar o tambor; as roupas devem girar livremente.');
    if (input.loadSize === 'cheia') warnings.push('Para carga cheia, lave primeiro, remova parte das roupas e só depois seque.');
    if (hasAnyKeyword(d, ['malha', 'trico', 'cobertor', 'edredom', 'bebe', 'vestido de festa'])) warnings.push('Cuidado especial na secagem: malhas, tricô, cobertores, edredons, roupas de bebê e vestidos de festa exigem atenção à etiqueta.');

    if (cannotDry) {
      rec.drying = { recommended: false, reason: 'Descrição contém itens não recomendados para secagem em máquina.' };
    } else {
      let mode = 'Normal';
      if (hasAnyKeyword(d, ['passar', 'ferro'])) mode = 'Ferro';
      else if (hasAnyKeyword(d, ['delicado'])) mode = 'Baixa temperatura';
      else if (hasAnyKeyword(d, ['pesado', 'toalhao'])) mode = 'Normal Eco';
      else if (hasAnyKeyword(d, ['algodao', 'toalha']) && input.loadSize === 'minima') mode = 'Tempo 30 minutos';
      else if (hasAnyKeyword(d, ['algodao', 'toalha']) && input.loadSize === 'pequena') mode = 'Tempo 60 minutos';
      else if (hasAnyKeyword(d, ['algodao', 'toalha']) && input.loadSize === 'media') mode = 'Tempo 120 minutos';
      rec.drying = { recommended: true, modeName: mode, reason: 'Modo selecionado com base no tecido e tamanho da carga.' };
    }
  }

  return rec;
}
