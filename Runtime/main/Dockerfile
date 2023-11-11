FROM nginx
RUN apt update && apt upgrade && apt install -y iputils-ping
RUN sed -i 's/^.*gzip.*$//' /etc/nginx/nginx.conf
RUN sed -i "/\*\.conf;$/i\    gzip on;" /etc/nginx/nginx.conf
RUN sed -i "/\*\.conf;$/i\    gzip_min_length 1k;" /etc/nginx/nginx.conf
RUN sed -i "/\*\.conf;$/i\    gzip_comp_level 5;" /etc/nginx/nginx.conf
RUN sed -i "/\*\.conf;$/i\    gzip_types text/plain application/javascript application/x-javascript application/atom+xml application/rdf+xml  application/geo+json application/ld+json application/manifest+json image/svg+xml text/css text/xml application/xhtml+xml application/rss+xml application/xml application/x-web-app-manifest+json text/x-cross-domain-policy text/javascript image/jpeg image/gif image/png application/json;" /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443