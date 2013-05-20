<?php
try {
    $dbh = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    print '0k';
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
