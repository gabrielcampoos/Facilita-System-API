FROM node:18

USER node
WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .


# CMD ["tail", "-f", "/dev/null"]
CMD ["yarn", "dev"]
