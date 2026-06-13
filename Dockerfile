FROM node:22-slim

# Install zip and unzip for settings backup/restore
RUN apt-get update && apt-get install -y --no-install-recommends zip unzip && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build frontend static assets into /app/dist
RUN npm run build

# Default env variables
ENV PORT=6497
ENV NODE_ENV=production

EXPOSE 6497

CMD ["npm", "start"]
