# # FROM wmsolar/dashboard:latest
# #as dev-stage
# FROM wmsolar/dashboard-prod:1.2

# # #  Create app directory
# # RUN mkdir  /usr/src/app

# #  Create app directory
# WORKDIR  /usr/src/app

# # Install app dependencies
# COPY package*.json ./

# # RUN mkdir -p /var/www/solardashboard.com/html

# RUN npm install && \
#     npm rebuild node-sass && \
#     yum clean all && \
#     rm -rf /var/cache/yum  

# COPY . .

# EXPOSE 8080


# CMD [ "npm", "run", "start-server" ]


FROM wmsolar/dashboard-prod:1.2 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install && \
    npm rebuild node-sass && \
    yum clean all && \
    rm -rf /var/cache/yum  
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/nginx.conf /etc/nginx/
EXPOSE 8080:80
CMD ["nginx", "-g", "daemon off;"]

 
