server {
    listen 172.105.186.86;
    listen [::]:80;

    root /srv/www/test;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}