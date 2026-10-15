FROM php:8.2-apache
RUN docker-php-ext-install pdo_mysql && a2enmod rewrite
COPY frontend/ /var/www/html/
COPY backend/ /var/www/backend/
COPY apache.conf /etc/apache2/conf-enabled/thirdspace.conf
