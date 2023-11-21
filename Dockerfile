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

