
upstream api {
    set $host_name 172.16.0.15
    server $host_name:3001;
}


# remove www from the url
server {
    listen 80;
    server_name localhost;
    return 301 $scheme://172.16.0.15:3001$request_uri;
}


server {

    listen 172.16.0.15:80;
    


    server_name www.solardashboard.com:

    location /api {

        
        
        proxy_pass http://api/;
        proxy_ignore_headers X-Accel-Expires Expires Cache-Control;
        proxy_ignore_headers Set-Cookie;
        proxy_hide_header Set-Cookie;
        proxy_set_header X-Real-IP172.16.0.15;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host 172.16.0.15:3001;
        proxy_redirect off;
        proxy_set_header X-NginX-Proxy true;
       
        
  
   
       
    }


}