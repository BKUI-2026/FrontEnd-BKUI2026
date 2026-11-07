FROM node:24-slim AS deps
WORKDIR /app
RUN npm i -g pnpm@10
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:24-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_YESPLIS_TICKET_URL
ARG NEXT_PUBLIC_YESPLIS_MERCH_URL
ARG NEXT_PUBLIC_BKUI_COUNTDOWN_TARGET
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL \
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID \
    NEXT_PUBLIC_YESPLIS_TICKET_URL=$NEXT_PUBLIC_YESPLIS_TICKET_URL \
    NEXT_PUBLIC_YESPLIS_MERCH_URL=$NEXT_PUBLIC_YESPLIS_MERCH_URL \
    NEXT_PUBLIC_BKUI_COUNTDOWN_TARGET=$NEXT_PUBLIC_BKUI_COUNTDOWN_TARGET
RUN npm run build

FROM node:24-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3001 \
    HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3001
CMD ["node", "server.js"]
