FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/server ./server
COPY --from=build /app/package*.json ./
COPY --from=build /app/server/fire.json ./fire.json


RUN npm install --production

EXPOSE 4000

CMD ["npm", "start"]
