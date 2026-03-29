# ─────────────────────────────────────────
# Stage 1: Builder — install all dependencies
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# ─────────────────────────────────────────
# Stage 2: Runtime — lean production image
# ─────────────────────────────────────────
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy only production node_modules and source from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 5000

CMD ["node", "server.js"]
