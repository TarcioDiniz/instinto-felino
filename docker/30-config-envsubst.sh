#!/bin/sh
# Roda no start do container (nginx executa scripts de /docker-entrypoint.d/).
# Gera assets/js/config.js a partir do template, injetando as variáveis de ambiente.
set -e
TPL=/usr/share/nginx/html/assets/js/config.template.js
OUT=/usr/share/nginx/html/assets/js/config.js

if [ -f "$TPL" ]; then
  envsubst '${CHECKOUT_URL_1} ${CHECKOUT_URL_2} ${CHECKOUT_URL_3} ${WHATSAPP_URL}' < "$TPL" > "$OUT"
  echo "[config] config.js gerado a partir das variaveis de ambiente."
fi
