#production stage
FROM wmsolar/dashboard-prodv4
#COPY --from=builder /usr/src/app/dist/ /var/www/solardashboard.com/html/
# COPY --from=builder /usr/src/app/reverse_proxy/conf.d/default.conf /etc/nginx/conf.d/
COPY /reverse_proxy/sites-available/solardashboard.com /etc/nginx/sites-available/
# COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/
EXPOSE 8080:80
CMD ["nginx", "-g", "daemon off;"]