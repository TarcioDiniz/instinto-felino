# Instinto Felino — Landing Page (funil Shopify, mono-produto)

Página de vendas de produto único (Speedy Tail modelado para o BR), estrutura de funil Shopify
com seletor de quantidade na primeira dobra, ancoragem de preço e cronômetro de escassez no topo.

## Como abrir
- Duplo-clique em `index.html`, ou
- Servidor local: `python -m http.server 8000` e acesse `http://127.0.0.1:8000`, ou
- Docker (recomendado p/ deploy): `docker compose up -d --build` e acesse `http://localhost:8080`.

## Docker
- `Dockerfile` — imagem nginx:alpine servindo os estáticos na porta 80.
- `nginx.conf` — gzip, cache de assets (30d) e HTML sem cache.
- `docker-compose.yml` — sobe o site em `http://localhost:8080` (mapeia 8080:80).
- Subir: `docker compose up -d --build` • Parar: `docker compose down`
- Build manual: `docker build -t instinto-felino .` e `docker run -p 8080:80 instinto-felino`.

## Arquivos
```
instinto-felino/
  index.html            página completa
  assets/css/style.css  estilos + responsivo (primeira dobra 100svh)
  assets/js/script.js   seletor de kits, cronômetro, galeria, FAQ
  assets/img/           imagens (analisadas e posicionadas por função)
```

## Onde cada imagem foi usada (análise feita)
- `produto-azul.webp`  -> HERO (foto de estúdio recortada p/ remover marca alheia)
- `produto-laranja.webp` -> thumb (variante de cor, também recortada)
- `lifestyle-gato-azul/laranja.webp` -> thumbs (gato brincando)
- `movimento-presa.webp` -> seção "movimento imprevisível"
- `recursos-icones.webp` -> seção "tudo em uma bola só"
- `comparacao-tabela.webp` -> seção de comparação vs cópias
- `comparacao-vs.webp` -> reserva (comparação visual alternativa)
- `comentarios-facebook/instagram.webp` -> prova social (TROCAR por prints em PT-BR)

## Técnicas aplicadas (otimizadas para o BR)
- Primeira dobra 100svh com botão "Quero deixar meu gato feliz" sempre visível.
- Seletor de quantidade (1 un / 2+1 / 3+2) já na primeira dobra, padrão no kit do meio (ancoragem).
- Ancoragem: preço "de/por" riscado + badge "Economize R$ X" + "Mais escolhido" no meio.
- Cronômetro regressivo de escassez fixo no topo + barra de estoque ("restam X kits").
- Pix em destaque (selo "5% OFF") — Pix é ~49% das vendas online no BR e converte +90%.
- Chips de meios de pagamento (Pix/Cartão 12x/Boleto) + selos de segurança (SSL, garantia, rastreio).
- Botão flutuante de WhatsApp (aparece só se configurado).
- Total e parcelamento atualizam ao trocar de kit; barra de compra fixa no mobile.

## Variáveis de ambiente (links de checkout + WhatsApp)
Os links NÃO ficam no código — vêm de variáveis de ambiente, injetadas em `assets/js/config.js`
no start do container (via `envsubst`, a partir de `config.template.js`).

1. `cp .env.example .env`
2. Preencha no `.env`:
   - `CHECKOUT_URL_1/2/3` — link de checkout de cada kit (Yampi/Appmax/Cartpanda/Shopify).
   - `WHATSAPP_URL` — link wa.me (vazio = esconde o botão).
3. `docker compose up -d --build`

Sem Docker (abrindo o `index.html` direto), edite `assets/js/config.js` à mão.
O `.env` é ignorado pelo git (`.gitignore`).

## O QUE TROCAR ANTES DE PUBLICAR
- **Checkout / WhatsApp:** preencher no `.env` (ver seção acima).
- **Preços:** R$ 97 / 167 / 227 são exemplo. Ajuste em `KITS` no `script.js` E nos cards do `index.html`.
- **Imagens:** as atuais são de referência (do Teazys). Para a loja real, use fotos/vídeos do seu
  fornecedor — inclusive porque a foto de estúdio tem o nome do concorrente embossado na bola.
- **Prova social:** os prints de FB/IG estão em inglês. Substitua por avaliações reais em português.
- **Números (185k, 96%, 13.000):** vieram da página de referência. Não rode tráfego com métrica
  que você não comprova (risco de reprovar conta de anúncio e Procon). Use dados reais quando tiver.
- **Rodapé:** preencher CNPJ, e-mail e páginas de política (obrigatório p/ checkout e tráfego).
- **Pixel/UTM:** adicionar Meta Pixel / Google Tag no `<head>`.

## Pasta antiga
A primeira versão ficou em `../rabo-veloz/` (marca "Rabo Veloz"). Pode apagar — esta pasta é
autossuficiente e tem as imagens copiadas.
