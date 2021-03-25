FROM node:lts as builder
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm i
COPY . . 
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD nginx -g daemon off;