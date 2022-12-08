FROM node:18

WORKDIR /app

COPY start.sh .

RUN apt-get update

RUN apt-get install python3 make g++ -y

EXPOSE 3000

CMD ["./start.sh"]