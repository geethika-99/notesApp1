# Serve the static HTML/CSS/JS using nginx
FROM nginx:alpine

# Copy frontend files into nginx's default serving directory
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
