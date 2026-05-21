FROM node:20-alpine

# Install base dependencies (libc6-compat for Next.js, netcat-openbsd for database connection waiting)
RUN apk add --no-cache libc6-compat netcat-openbsd

WORKDIR /app

# Copy package configurations
COPY package*.json ./

# Copy Prisma files so the postinstall script (prisma generate) can run
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install dependencies (will automatically run prisma generate)
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build Next.js app in production mode
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="mysql://dummy:dummy@localhost:3306/dummy"
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Add entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
