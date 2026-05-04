# Manual Lava e Seca

Aplicativo web local que funciona como manual interativo para sugerir ciclo de lavagem e secagem da LG CV3012*C5, com base em regras determinísticas inspiradas no manual MFL72097501 (PT-BR).

## O que o app faz

- Recebe uma descrição livre das roupas.
- Considera opções de cor, sujeira, tamanho da carga, secagem, silêncio, alergia e pressa.
- Recomenda programa, temperatura, centrifugação, secagem, opções extras e avisos de segurança.

## Aviso importante

Este app **não substitui** a etiqueta das roupas. A etiqueta da peça sempre tem prioridade.

## Rodando localmente

```bash
npm install
npm run dev
```

## Build e preview

```bash
npm run build
npm run preview
```

## Base de referência

- Produto: LG Lavadora e Secadora
- Família/modelo: CV3012*C5
- Manual: MFL72097501 (Português/Brasil)

Sem backend, sem APIs externas e sem IA em runtime.
