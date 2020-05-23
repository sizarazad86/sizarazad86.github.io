<?php
$msqlhost = 'localhost'; //Hostname of database
$msqluser = 'root';                   //User of database
$msqlpass = '7727984430Azad';           //Password of user/database
$msqldbnm = 'cydia';              //Database name
mysql_connect ($msqlhost, $msqluser, $msqlpass)       or die(mysql_error());

mysql_select_db ($msqldbnm)                           or die(mysql_error());
?>