# Simple telegram redirector
This app support auto translation to Russian and English. Also supports auto dark mode style. Docker image is about 30Mb and low memory/cpu usage.

[![Docker Cloud Automated build](https://img.shields.io/docker/cloud/automated/assorium/tg-redirect?style=for-the-badge "Docker Cloud Automated build")](https://hub.docker.com/r/assorium/tg-redirect "Docker Cloud Automated build")
[![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/assorium/tg-redirect?style=for-the-badge "Docker Cloud Build Status")](https://hub.docker.com/r/assorium/tg-redirect "Docker Cloud Build Status")
[![Docker Pulls](https://img.shields.io/docker/pulls/assorium/tg-redirect?style=for-the-badge "Docker Pulls")](https://hub.docker.com/r/assorium/tg-redirect "Docker Pulls")  <br/>

[![Latest Github tag](https://img.shields.io/github/v/tag/mrspartak/tg-redirect?sort=date&style=for-the-badge "Latest Github tag")](https://github.com/mrspartak/tg-redirect/releases "Latest Github tag")

## Environment variables
    #port app will be launched at
    const APP_PORT = process.env.APP_PORT || 3020

    #will count N seconds before redirect. 0 - instant redirect
    const COUNTER = +process.env.COUNTER || 0;

    #Debug
    const DEBUG = process.env.DEBUG || false;

    #If you want to place tracker, GA for example
    TRACKER_FILE - name of secret file passed to docker image at /run/secrets/
    
## Docker
```
docker run -p 3020:3020 --name tg-redirect \
  -e COUNTER=10 -e TRACKER_FILE=tg_redirect \
  --secret tg_redirect \
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

## Usage
Can redirect such links:
```
//Profile link
https://t.me/someuser

//Public group
https://t.me/durov

//Group post
https://t.me/durov/112

//Join chat link
https://t.me/joinchat/Br2O30m5d4jsehNIF9kduA

//Add sticker
https://t.me/addstickers/standcat
```