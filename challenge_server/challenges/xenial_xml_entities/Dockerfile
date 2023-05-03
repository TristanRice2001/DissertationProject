FROM php:8.0-apache
WORKDIR /var/www/html

COPY index.php index.php
COPY style.css style.css
COPY blog.php blog.php
COPY config.php config.php
COPY database.db database.db
RUN chmod 777 /var/www/html/database.db
RUN chmod 777 /var/www/html

EXPOSE 80

