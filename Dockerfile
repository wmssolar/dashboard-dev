FROM wmsolar/dashboard:latest

#  Create app directory
WORKDIR  /usr/src/dashbd

# Install app dependencies
COPY package*.json ./

RUN npm install && \
    npm rebuild node-sass && \
    yum clean all && \
    rm -rf /var/cache/yum  

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start-server" ]


