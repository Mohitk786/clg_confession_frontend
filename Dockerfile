
FROM node:23-alpine 
WORKDIR /app


COPY package.json package-lock.json* ./
RUN npm install


COPY . .

ENV NODE_ENV=production
ENV DATABASE_URL=mongodb+srv://kumarmohit08004:tdor0421@cluster0.tbbon.mongodb.net/clg567

RUN npm run build


EXPOSE 3000
CMD ["npm", "start"]
