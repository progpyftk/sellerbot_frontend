# Define a base image
FROM node:lts-alpine

# Define the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Define o comando padrão para execução
CMD if [ "$NODE_ENV" = "production" ]; \
    then \
      npm run build && \
      npm install -g serve && \
      serve -s dist -p 80; \
    else \
      npm run serve; \
    fi
