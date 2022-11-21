FROM node:18

WORKDIR /app/medusa

COPY start.sh .

RUN apt-get update

RUN apt-get install -y python

RUN yarn global add npm@latest

RUN yarn global add @medusajs/medusa-cli@latest

CMD ["./start.sh"]