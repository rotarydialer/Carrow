FROM node:8.2.1

# Create application directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Install dependencies
COPY package.json .
COPY app.js .
COPY bin bin/
COPY public public/
COPY routes routes/
COPY views views/

RUN npm install

EXPOSE 9000
EXPOSE 8080

CMD [ "npm", "start" ]
