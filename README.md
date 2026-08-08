# Estação Colmeia Viajante

Site institucional responsivo da Estação Colmeia Viajante, iniciativa da HOW2ECO que aproxima educação, cultura, ciência e biodiversidade de escolas, comunidades, empresas e eventos.

## Direção

A experiência foi criada como uma narrativa editorial para web — não como reprodução do portfólio em slides. O site usa os assets oficiais da marca, fotografias de campo, personagens, doodles e tipografia própria, com movimento sutil e foco em legibilidade.

## Tecnologias

- Vite
- JavaScript
- CSS responsivo
- Lenis para rolagem fluida
- GitHub Pages

## Desenvolvimento local

```bash
pnpm install
pnpm run dev
```

Build de produção:

```bash
pnpm run build
pnpm run preview
```

## Publicação

O workflow em `.github/workflows/deploy.yml` gera a pasta `dist` e publica automaticamente no GitHub Pages quando houver push para a branch `main`.

No repositório do GitHub, abra **Settings → Pages** e selecione **GitHub Actions** em **Build and deployment**.
