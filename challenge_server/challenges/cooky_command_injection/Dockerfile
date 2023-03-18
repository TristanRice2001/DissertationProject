FROM php:8.0-apache
WORKDIR /var/www/html

COPY index.php index.php
RUN mkdir -p /var/www/html/backups
RUN echo "test" > /var/www/html/flag
run chown www-data:www-data /var/www/html/backups
EXPOSE 80
