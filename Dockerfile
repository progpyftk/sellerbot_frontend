FROM node:lts-alpine

# make the 'app' folder the current working directory
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
RUN npm install @vue/cli -g
CMD ["npm", "run", "serve"]