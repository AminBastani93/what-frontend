FROM oven/bun:debian AS installer
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun i
COPY . .

FROM installer AS builder
WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production
RUN bun run build
EXPOSE 3001
ENV PORT 3001
CMD bun run start