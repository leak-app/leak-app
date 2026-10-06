# Stage 1: Build the static bundle
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --network-timeout 600000

COPY . .

RUN yarn build

# Stage 2: Serve with nginx. API URL and Google client ID are read at container
# start (see docker/40-runtime-env.sh), not baked into the bundle.
FROM nginx:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/40-runtime-env.sh /docker-entrypoint.d/40-runtime-env.sh
RUN chmod +x /docker-entrypoint.d/40-runtime-env.sh

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
