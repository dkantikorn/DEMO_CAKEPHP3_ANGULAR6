# PAKGON AdminLTE204 Baking Plugins themes

PAKGON AdminLTE204 Baking Plugins themes

## Git Clone for the repository

```bash
$ cd D:/xampp7/htdocs/
$ git clone https://github.com/dkantikorn/DEMO_CAKEPHP3_ANGULAR6.git
```

#W CakePHP install package deependency
```bash
$ cd CAKEPHP3-BACKEND/www
$ composer install
```

## Angular install package deependency

```bash
$ cd ANGULAR6-FRONTEND
$ npm install
```

## SETTING UP FOR V-HOST

```bash
<VirtualHost *:80>
  ServerName demo.cakephp-angular.local
  ServerAlias demo.cakephp-angular.local
  DocumentRoot "D:/ANGULAR/PAKGON_TRAINING/DEMO_CAKEPHP3_ANGULAR6/CAKEPHP3-BACKEND/www"
  ErrorLog "logs/demo.cakephp-angular.local-error.log"
  CustomLog "logs/demo.cakephp-angular.local-access.log" common
  <Directory "D:/ANGULAR/PAKGON_TRAINING/DEMO_CAKEPHP3_ANGULAR6/CAKEPHP3-BACKEND/www">
    Options +Indexes +Includes +FollowSymLinks +MultiViews
    AllowOverride All
    Require local
  </Directory>
</VirtualHost>
```

## HOST FILE

```bash
127.0.0.1       demo.cakephp-angular.local
::1             demo.cakephp-angular.local
```

## HOST FILE (Docker Version)
```bash
192.168.99.100 demo.cakephp-angular.local
```