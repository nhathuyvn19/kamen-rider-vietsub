FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache ffmpeg python3 py3-pip make

RUN pip install openai-whisper

RUN npm install -g npm@latest

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p uploads outputs

EXPOSE 5000

CMD ["npm", "start"]