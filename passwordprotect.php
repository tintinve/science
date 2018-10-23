<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Password protect file</title>
</head>
<body>
    <h1>This folder is now password protected</h1>    

   <?php
    // find dir
    $dir = dirname(__FILE__);

    // test if .htaccess exists
    if( file_exists( ".htaccess" ) ) {
        // if it does, create a backup.
        $backup_name = "old.htaccess";
        $backup_counter = 0;
        $backup_fullname = $backup_name;
        
        // make sure the backup doesn't overwrite a new backup
        while( file_exists( $backup_fullname ) ) {
            $backup_counter++;
            
            $backup_fullname = $backup_name . "-" . $backup_counter;
        }
        
        rename( ".htaccess", $backup_fullname );
        
        echo "<p>The old .htaccess-file is saved with the name <code>".$backup_fullname."</code> - You can delete it when you have veryfied that the folder has been password protected correctly.</p>\n<hr>";
        
    
    } 

    // ready to create new .htaccess file
    $htaccess = "AuthType Basic\n". 
                "AuthName \"Password Protected Area\"\n".
                "AuthUserFile ".$dir."/.htpasswd\n".
                "Require valid-user";

    file_put_contents('.htaccess', $htaccess );

    // create .htpasswd
    $htpasswd = 'keammd:$apr1$0svhi7cp$Axyo6BGXRfrKUQldTFXcF1';
//password created at: http://www.htaccessredirect.net/ 
    file_put_contents(".htpasswd", $htpasswd );
    
    echo "<p>Password protection completed.</p>";
    
    echo "<p>Username: <code>keammd</code><br>Password: <code>code_2017</code></p>"

?>

    <hr>
    <p>You should now use your FTP client to delete the file: <code>passwordprotect.php</code> from this folder.</p>

</body>
</html>