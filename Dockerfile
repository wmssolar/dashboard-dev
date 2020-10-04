FROM wmsolar/dashboardv2:latest

#  Create app directory
WORKDIR  /usr/src/dashbd

# Install app dependencies
COPY package*.json ./

RUN npm install && \
    npm rebuild node-sass && \
    yum clean all && \
    rm -rf /var/cache/yum  

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start-server" ]


