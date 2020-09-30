FROM wmsolar/centosapiv1:latest 

#  Create app directory
WORKDIR  /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

RUN npm rebuild node-sass

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "ci" ]


