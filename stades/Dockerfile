# Angular Dockerfile
# Stage 1: Build the Angular application
FROM node:18 AS build

WORKDIR /app

COPY ./stades/package.json ./stades/package-lock.json ./
RUN npm install

COPY ./stades ./
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

COPY --from=build /app/dist/gestion-stade /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
