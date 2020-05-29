
<?php

# https://icydiaapp.net/go/away/techlabs/install.php?ipa=http://hot.haima.me/infinite/201702/091b/com.bulkypix.quad_1.1.4_20161116171040_1_7u7z6j.ipa&icon=http://is4.mzstatic.com/image/thumb/Purple1/v4/d4/99/c8/d499c895-7da8-5382-92d7-c3a666c9047d/source/114x114bb.jpg&title=4444%20-%20@imortaltech0

echo "<!DOCTYPE plist PUBLIC '-//Apple//DTD PLIST 1.0//EN' 'http://www.apple.com/DTDs/PropertyList-1.0.dtd'>
<plist version='1.0'>
<dict>
   <key>items</key>
   <array>
       <dict>
           <key>assets</key>
           <array>
               <dict>
                   <key>kind</key>
                   <string>software-package</string>
                   <key>url</key>
                   <string>" . $_GET['ipa'] . "</string>
               </dict>
               <dict>
                   <key>kind</key>
                   <string>display-image</string>
                   <key>needs-shine</key>
                   <true/>
                   <key>url</key>
                   <string>" . $_GET['icon'] . "</string>
               </dict>
           </array><key>metadata</key>
           <dict>
               <key>bundle-identifier</key>
               <string>ga.iqphone.plist</string>
               <key>bundle-version</key>
               <string>3.1.3</string>
               <key>kind</key>
               <string>software</string>
               <key>title</key>
               <string>" . $_GET['title'] ."</string>
           </dict>
       </dict>
   </array>
</dict>
</plist>";

/*

  echo "ipa: " . $_GET['ipa'];
  echo "<br>";
  echo "icon: " . $_GET['icon'];
  echo "<br>";
  echo "title: " . $_GET['title'];

*/

?>