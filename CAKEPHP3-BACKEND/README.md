# PAKGON AdminLTE204 Baking Plugins themes

PAKGON AdminLTE204 Baking Plugins themes

## Git Clone for the repository

```bash
$ cd D:/xampp7/htdocs/
$ mkdir {{ YOUR-PROJECT-NAME }}
$ cd {{ YOUR-PROJECT-NAME }}
$ git clone http://gitlab.pakgon.com/sarawutt.b/cakephp3_admin_lte204.git .
```

```bash
$ cd www
$ composer install
```

## NPM Install Package 

```bash
$ cd www/webroot
$ npm install
```

## SETTING UP FOR V-HOST

```bash
<VirtualHost *:80>
  ServerName {{ YOUR-PROJECT-SERVER-NAME}}.local
  ServerAlias {{ YOUR-PROJECT-SERVER-NAME}}.local
  DocumentRoot "D:/xampp7/htdocs/{{ YOUR-PROJECT-NAME }}/www"
  ErrorLog "logs/{{ YOUR-PROJECT-SERVER-NAME}}.local-error.log"
  CustomLog "logs/{{ YOUR-PROJECT-SERVER-NAME}}.local-access.log" common
  <Directory "D:/xampp7/htdocs/{{ YOUR-PROJECT-NAME }}/www">
    Options +Indexes +Includes +FollowSymLinks +MultiViews
    AllowOverride All
    Require local
  </Directory>
</VirtualHost>
```

## HOST FILE

```bash
127.0.0.1       {{ YOUR-PROJECT-SERVER-NAME }}.local
::1             {{ YOUR-PROJECT-SERVER-NAME }}.local
```

## Current path are in bin directory

```bash
$ ./cake bake all [-c connection] [-t AdminLTE204]
```