FROM node:18

WORKDIR /inventory_management_system

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]