export type WasherProgram = {
  id: string;
  name: string;
  defaultTemperature?: string;
  temperatureRange?: string;
  maxLoad: string;
  description: string;
  recommendedFor: string[];
  avoidFor?: string[];
  defaultSpin?: string;
  availableSpin?: string;
  supportsDrying?: boolean;
  notes?: string[];
};

export type DryingMode = {
  id: string;
  name: string;
  symbol?: string;
  description: string;
  recommendedFor: string[];
  maxLoad: string;
  warnings?: string[];
};

export const washerPrograms: WasherProgram[] = [
  { id: 'algodao', name: 'Algodão', defaultTemperature: '40 °C', temperatureRange: 'Fria até 60 °C', maxLoad: 'Classificação / até 12 kg para lavagem', description: 'Lava roupas com sujeira normal com vários movimentos do tambor.', recommendedFor: ['algodão', 'camisetas', 'toalhas leves', 'roupas do dia a dia'], defaultSpin: '1400 rpm', availableSpin: 'Todas', supportsDrying: true },
  { id: 'algodao-plus', name: 'Algodão+', defaultTemperature: '60 °C', temperatureRange: 'Fria até 60 °C', maxLoad: 'Classificação / até 12 kg para lavagem', description: 'Lava roupas com sujeira normal usando menos energia que Algodão em configurações comparáveis.', recommendedFor: ['algodão', 'roupas do dia a dia', 'cargas normais com foco em economia'], defaultSpin: '1400 rpm', availableSpin: 'Todas', supportsDrying: true },
  { id: 'mix', name: 'Mix', defaultTemperature: '40 °C', temperatureRange: 'Fria até 60 °C', maxLoad: '4 kg', description: 'Lava tecidos mistos simultaneamente.', recommendedFor: ['carga mista', 'algodão com sintéticos', 'roupas variadas do dia a dia'], avoidFor: ['seda', 'delicados', 'roupas esportivas especiais', 'roupas escuras sensíveis', 'lã', 'edredom', 'cortinas'], defaultSpin: '1000 rpm', availableSpin: 'Todas', supportsDrying: true },
  { id: 'tecidos-sinteticos', name: 'Tecidos Sintéticos', defaultTemperature: '40 °C', temperatureRange: 'Fria até 60 °C', maxLoad: '4 kg', description: 'Lava roupas que não precisam ser passadas após a lavagem.', recommendedFor: ['poliéster', 'acrílico', 'poliamida', 'roupas sintéticas'], defaultSpin: '1400 rpm', availableSpin: 'Todas', supportsDrying: true },
  { id: 'lavagem-silenciosa', name: 'Lavagem Silenciosa', defaultTemperature: '40 °C', temperatureRange: 'Fria até 60 °C', maxLoad: '5 kg', description: 'Lava com menos ruído e vibração.', recommendedFor: ['algodão levemente sujo', 'roupa íntima', 'lavagem noturna'], defaultSpin: '800 rpm', availableSpin: 'Até 1000 rpm', supportsDrying: false },
  { id: 'antialergico', name: 'Antialérgico', defaultTemperature: '60 °C', maxLoad: '4 kg', description: 'Ajuda a minimizar substâncias que causam reação alérgica.', recommendedFor: ['roupas de cama', 'toalhas', 'roupas de pessoas alérgicas', 'itens que precisam de lavagem mais higiênica'], defaultSpin: '1400 rpm', availableSpin: 'Todas', supportsDrying: false },
  { id: 'roupa-de-bebe', name: 'Roupa de Bebê', defaultTemperature: '60 °C', maxLoad: '4 kg', description: 'Ajuda a lavar manchas de comida de roupas de bebê.', recommendedFor: ['roupas de bebê', 'peças com manchas de comida'], defaultSpin: '1000 rpm', availableSpin: 'Até 1000 rpm', supportsDrying: false },
  { id: 'delicados', name: 'Delicados', defaultTemperature: '20 °C', temperatureRange: 'Fria até 40 °C', maxLoad: '3 kg', description: 'Lava lingerie, roupas transparentes e rendadas laváveis em máquina.', recommendedFor: ['lingerie', 'renda', 'tecidos transparentes', 'roupas delicadas laváveis em máquina'], defaultSpin: '800 rpm', availableSpin: 'Até 800 rpm', supportsDrying: false },
  { id: 'lavagem-a-mao-la', name: 'Lavagem a Mão/Lã', defaultTemperature: '30 °C', temperatureRange: 'Fria até 40 °C', maxLoad: '2 kg', description: 'Lava peças delicadas à mão ou à máquina, como lã lavável, lingerie e vestidos.', recommendedFor: ['lã lavável', 'peças de lavagem manual', 'vestidos delicados', 'lingerie'], defaultSpin: '800 rpm', availableSpin: 'Até 800 rpm', supportsDrying: false, notes: ['Usar sabão indicado para lã quando aplicável.'] },
  { id: 'rapido-14', name: 'Rápido 14', defaultTemperature: '20 °C', temperatureRange: '20 °C até 40 °C', maxLoad: '2 kg', description: 'Lava rapidamente pequenas cargas levemente sujas por aproximadamente 14 minutos.', recommendedFor: ['poucas peças', 'roupas levemente sujas', 'lavagem rápida'], defaultSpin: '400 rpm', availableSpin: 'Todas', supportsDrying: false },
  { id: 'secar', name: 'Secar', maxLoad: 'Capacidade de secagem / até 7 kg', description: 'Usa programas automáticos para secar a maioria das cargas compatíveis.', recommendedFor: ['algodão', 'linho', 'toalhas', 'camisetas', 'peças similares em material e espessura'], supportsDrying: true, notes: ['Para a maioria das secagens, as peças devem ser similares em material e espessura.'] },
  { id: 'lavar-secar', name: 'Lavar+Secar', defaultTemperature: '40 °C', temperatureRange: 'Fria até 60 °C', maxLoad: 'Capacidade de secagem / até 7 kg', description: 'Lava e seca roupas no mesmo programa.', recommendedFor: ['carga pequena ou média', 'roupas similares em material e espessura', 'algodão', 'linho', 'roupas do dia a dia'], defaultSpin: '1400 rpm', availableSpin: '1000 até 1400 rpm', supportsDrying: true, notes: ['Não usar para uma carga cheia de lavagem se quiser secar tudo sem remover peças.'] },
  { id: 'enxague-centrifugacao', name: 'Enxágue+Centrifugação', maxLoad: 'Classificação / até 12 kg para lavagem', description: 'Enxágua e centrifuga roupas. Use amaciante se necessário.', recommendedFor: ['roupas já lavadas', 'enxágue adicional', 'remoção de excesso de sabão'], defaultSpin: '1400 rpm', availableSpin: 'Todas', supportsDrying: false }
];

export const dryingModes: DryingMode[] = [
  { id: 'normal', name: 'Normal', symbol: '@', description: 'Reduz o tempo de secagem e o consumo de energia durante o programa de secagem.', recommendedFor: ['algodão', 'linho', 'toalhas de algodão', 'camisetas', 'roupas de linho'], maxLoad: 'Capacidade de secagem / até 7 kg' },
  { id: 'tempo-30', name: 'Tempo 30 minutos', description: 'Secagem por tempo para carga pequena.', recommendedFor: ['algodão', 'toalhas', 'poucas peças'], maxLoad: '1 kg' },
  { id: 'tempo-60', name: 'Tempo 60 minutos', description: 'Secagem por tempo para carga pequena ou média.', recommendedFor: ['algodão', 'toalhas'], maxLoad: '2 kg' },
  { id: 'tempo-120', name: 'Tempo 120 minutos', description: 'Secagem por tempo para carga média.', recommendedFor: ['algodão', 'toalhas'], maxLoad: '4 kg' },
  { id: 'ferro', name: 'Ferro', symbol: '-', description: 'Deixa as roupas ligeiramente úmidas para facilitar passar a ferro.', recommendedFor: ['algodão', 'linho', 'roupas que serão passadas'], maxLoad: 'Capacidade de secagem / até 7 kg' },
  { id: 'baixa-temperatura', name: 'Baixa temperatura', symbol: '*', description: 'Secagem em baixa temperatura para reduzir danos.', recommendedFor: ['tecidos delicados'], maxLoad: '3,5 kg' },
  { id: 'normal-eco', name: 'Normal Eco', symbol: '(', description: 'Secagem com menor consumo de energia.', recommendedFor: ['algodão', 'linho', 'toalhas de algodão', 'camisetas', 'tecidos mais pesados'], maxLoad: 'Capacidade de secagem / até 7 kg' }
];
