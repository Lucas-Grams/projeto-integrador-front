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
COPY --from=BUILDER /tmp/build/dist/ /usr/share/nginx/html/


HEALTHCHECK --start-period=2s --interval=15s --timeout=5s --retries=3 \
   CMD curl -so /dev/null localhost:80 || exit 1


