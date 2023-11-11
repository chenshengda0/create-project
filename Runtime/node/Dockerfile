FROM node:latest
RUN apt -y update && apt -y upgrade && apt install -y man vim iproute2 xz-utils wget gcc git g++ sudo  inetutils-ping net-tools curl screen cron
RUN npm install -g pm2
CMD date >> /home/test.md && while true; do sleep 3000;done