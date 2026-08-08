# ECV Experience Edition

Esta edição é uma evolução visual independente do site institucional aprovado. Ela preserva conteúdo, identidade, acessibilidade e responsividade, mas adiciona uma camada de experiência mais cinematográfica.

## Direção visual

- Aurora orgânica no hero e profundidade suave nos personagens.
- Moving borders nos CTAs e botões principais.
- Card spotlight nos blocos de metodologia, público, impacto e futuro.
- Bento editorial assimétrico na seção de impacto.
- Tracing beam na trajetória atendida.
- Linhas luminosas no manifesto e fundos com movimento sutil.
- Reflexo e profundidade nas galerias fotográficas.
- Ícones de setas no padrão Lucide.

## Arquitetura

A implementação permanece em Vite, JavaScript e CSS nativos. Os padrões visuais foram adaptados para a marca sem introduzir React, Tailwind ou Motion, evitando dependências e custo de carregamento desnecessários.

Os arquivos específicos desta edição estão em:

- `src/premium-ui.css`
- `src/premium-layouts.css`
- `src/premium-ui.js`
- `src/premium-enhancements.js`
- `src/main-base.js`
- `src/main.js`

## Publicação

O workflow `.github/workflows/deploy.yml` já está incluído. No GitHub, use **Settings → Pages → Source: GitHub Actions**.

Não envie `.git`, `node_modules` ou `dist` ao novo repositório. O workflow instala as dependências e gera o build automaticamente.
