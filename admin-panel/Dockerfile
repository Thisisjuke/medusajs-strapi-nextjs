FROM node:18

WORKDIR /app

COPY start.sh .

RUN apt-get update

RUN apt-get install python3 make g++ -y

RUN yarn global add gatsby-cli

EXPOSE 7000

CMD ["./start.sh"]