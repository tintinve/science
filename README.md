# science
Science stuff



# How to use passwordprotect.php

unzip the file passwordprotect.zip
upload the file passwordprotect.php to the folder you want to protect.
In a browser write the URL to the actual file (mydomain.com/“folder”/passwordprotect.php)
The folder is now password protected with  username: keammd and password: code_2017
Delete the file passwordprotect.php from the server.

If you want to remove the password protection again you need to use an FTP program that can make HIDDEN files visible (Cyberduck). Then find and delete the files: .htaccess and .htpasswd inside the folder.

NB! 
Don’t use passwordprotect.php on folders containing wordpress installations.


#cAlso make a robots.txt and upload it to the root folder of your domain. The content should be:


In robots.txt (fx.):

User-agent: *
Disallow: /redesign




