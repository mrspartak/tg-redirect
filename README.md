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
    TRACKER_CONFIG_FILE - path to docker config file
    TRACKER_SECRET_FILE - name of secret file passed to docker image at /run/secrets/
    
## Docker
you can use secrets
```
docker secret create tg_redirect "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName()[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-XXXXX-Y', 'auto');ga('send', 'pageview');</script>"
docker run -p 3020:3020 --name tg-redirect \
  -e COUNTER=10 -e TRACKER_SECRET_FILE=tg_redirect \
  --secret tg_redirect \
  assorium/tg-redirect:latest
```

or if you want to use config file.
```
docker config create tg_redirect "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName()[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-XXXXX-Y', 'auto');ga('send', 'pageview');</script>"

docker run -p 3020:3020 --name tg-redirect \
  -e COUNTER=10 -e TRACKER_CONFIG_FILE=/home/app/tracker.txt \
  --config src=tg_redirect,target="/home/app/tracker.txt" \
  assorium/tg-redirect:latest
```

Both methods will run only for docker swarm. If you need solo, fork repo, add tracker.txt to you repo and TRACKER_CONFIG_FILE=/path/to/tracker.txt or just add local file with volume

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