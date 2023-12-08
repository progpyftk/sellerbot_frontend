#Dcokerfile
# Define argumentos que podem ser passados durante o build
ARG NODE_ENV=development

# Estágio de base para compartilhar a mesma camada de base
FROM node:lts-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Estágio de desenvolvimento
FROM base as development
ENV NODE_ENV=development
COPY . .
CMD ["npm", "run", "serve"]

# Estágio de construção para produção
FROM base as build
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
COPY . .
RUN npm run build

# Estágio de produção
FROM nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
