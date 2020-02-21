# Simple telegram redirector

[![Docker Cloud Automated build](https://img.shields.io/docker/cloud/automated/assorium/tg-redirect?style=for-the-badge "Docker Cloud Automated build")](https://hub.docker.com/r/assorium/tg-redirect "Docker Cloud Automated build")
[![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/assorium/tg-redirect?style=for-the-badge "Docker Cloud Build Status")](https://hub.docker.com/r/assorium/tg-redirect "Docker Cloud Build Status")
[![Docker Pulls](https://img.shields.io/docker/pulls/assorium/tg-redirect?style=for-the-badge "Docker Pulls")](https://hub.docker.com/r/assorium/tg-redirect "Docker Pulls")  <br/>

## Environment variables
    #port app will be launched at
    const APP_PORT = process.env.APP_PORT || 3020

    #website e.i. tg.example.com
    const WEBSITE = process.env.WEBSITE || '127.0.0.1:3020';

    #will count N seconds before redirect. 0 - instant redirect
    const COUNTER = +process.env.COUNTER || 0;

    #Debug
    const DEBUG = process.env.DEBUG || false;
    
## Docker
```
docker run -p 3020:3020 --name tg-redirect \
  -e WEBSITE='tg.example.com' \
  assorium/tg-redirect:latest
```

## Nginx
This an example Nginx config

```
server {
    listen 80;
    charset UTF-8;
        
    server_name tg.example.com;
    
    location / {
        proxy_pass http://127.0.0.1:3020;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
    }
}
```