FROM wmsolar/dshbrdprod:latest
# as builder

#  Create app directory
WORKDIR  /usr/src/app/dist/ 

# Install app dependencies
# COPY package*.json ./

# RUN npm install && \
#     npm rebuild node-sass && \
#     yum clean all && \
#     rm -rf /var/cache/yum  

# COPY . .

EXPOSE 8080:80

# CMD [ "npm", "run", "start-server" ]
CMD ["nginx", "-g", "daemon off;"]

#production stage
# FROM wmsolar/nginx:latest
# COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY hosts /etc/hosts
# EXPOSE 8080:80
# CMD ["nginx", "-g", "daemon off;"]

