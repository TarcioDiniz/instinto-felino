# Instinto Felino — landing estática servida por Nginx
FROM nginx:1.27-alpine

# Remove a config default e usa a nossa
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos do site
COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Script que injeta as variáveis de ambiente em config.js no start do container
COPY docker/30-config-envsubst.sh /docker-entrypoint.d/30-config-envsubst.sh
RUN sed -i 's/\r$//' /docker-entrypoint.d/30-config-envsubst.sh \
    && chmod +x /docker-entrypoint.d/30-config-envsubst.sh

EXPOSE 80

# Healthcheck simples
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://localhost/ || exit 1
