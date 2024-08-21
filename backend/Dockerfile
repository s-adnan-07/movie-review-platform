FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --production=true --frozen-lockfile

FROM deps AS build
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM base AS final
COPY package.json .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist/ ./dist

CMD [ "yarn", "start:prod" ]