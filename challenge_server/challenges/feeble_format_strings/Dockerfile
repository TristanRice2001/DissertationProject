FROM php:8.0-apache

COPY ./formatstr.c /home/john/formatstr.c
COPY ./index.html /var/www/html/index.html
RUN apt update
RUN echo 'Y' | apt install build-essential
RUN echo 'Y' | apt install gcc-multilib
RUN apt update && apt install openssh-server sudo -y
RUN useradd -rm -d /home/john -s /bin/bash -u 1001 john
RUN gcc /home/john/formatstr.c -o /home/john/application -fno-stack-protector -m32
RUN echo 'john:mariam' | chpasswd
RUN service ssh start
EXPOSE 22
EXPOSE 80
ADD ./startup.sh /opt/startup.sh
RUN chmod +x /opt/startup.sh
ENTRYPOINT ["/opt/startup.sh"]