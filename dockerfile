# Step 1: Build
#
# Debian (glibc) plutôt qu'Alpine (musl) : l'image arm64 est construite sous QEMU
# sur le runner GitHub, qui est en x64, et c'est la toolchain musl qui fait
# planter npm avec « qemu: uncaught target signal 4 (Illegal instruction) ».
# Les deux étages restent en glibc pour que sharp (binaire natif) soit cohérent
# entre le build et l'exécution.
#
# Si le crash revient malgré ça, l'alternative fiable est de construire l'image
# sur le Pi lui-même (natif arm64, zéro émulation) — voir DEPLOY.md.
FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Step 2: Run
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
