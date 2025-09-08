# Base
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar código
COPY . .

# Expor porta do Next.js
EXPOSE 3000

# Comando de desenvolvimento
CMD ["npm", "run", "dev"]
