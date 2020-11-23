FROM wmsolar/dashboard:latest as builder

#  Create app directory
WORKDIR  /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install && \
    npm rebuild node-sass && \
    yum clean all && \
    rm -rf /var/cache/yum  

COPY . .

EXPOSE 80

CMD [ "npm", "run", "build" ]


# #production stage
FROM wmsolar/nginxv1:latest
COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080:80
CMD ["nginx", "-g", "daemon off;"]

