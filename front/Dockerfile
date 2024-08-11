# Stage 1: Build the Angular app
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the app with nginx
FROM nginx:alpine

COPY --from=build /app/dist/tu-aplicacion-angular /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
