FROM wmsolar/dashboard:latest as dev-stage

#  Create app directory
WORKDIR  /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN mkdir -p /var/www/solardashboard.com/html

RUN npm install && \
    npm rebuild node-sass && \
    yum clean all && \
    rm -rf /var/cache/yum  

COPY . .

FROM dev-stage as builder
RUN npm run build
# EXPOSE 80
CMD [ "npm", "run", "build" ]


#production stage
FROM wmsolar/dshbrdprod:latest
COPY --from=builder /usr/src/app/dist/ /var/www/solardashboard.com/html/
# COPY --from=builder /usr/src/app/reverse_proxy/conf.d/default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/reverse_proxy/sites-available/solardashboard.com /etc/nginx/sites-available/
# COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/
EXPOSE 8080:80
CMD ["nginx", "-g", "daemon off;"]

