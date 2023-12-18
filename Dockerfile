FROM node:21 as BUILDER

WORKDIR /tmp/build/

COPY package.json package-lock.json ./
RUN npm install --force
RUN npm i -g @angular/cli@15.0.4

COPY src src
COPY *.json ts* ./

ARG HREF="/"
ARG ENV="production"
RUN ng build


FROM nginx:1.25 as RUNNER

RUN rm -rf /usr/share/nginx/html/*
COPY --from=BUILDER /tmp/build/dist/pnip-clientes-web/ /usr/share/nginx/html/

HEALTHCHECK --start-period=2s --interval=15s --timeout=5s --retries=3 \
   CMD curl -so /dev/null localhost:80 || exit 1


ENTRYPOINT ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/static-js/env.template.js > /usr/share/nginx/html/assets/static-js/env.js && exec nginx -g 'daemon off;'"]
