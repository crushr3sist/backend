FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npx prisma migrate dev --name init

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"] 