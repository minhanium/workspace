<?php
$session_id = @file_get_contents('session.txt');
if( !$session_id )
{
	file_put_contents('session.txt', $session_id = session_id());	
}
else
{
	session_id($session_id);
}

session_start();
if( !isset($_SESSION['counter']) )
{
	$_SESSION['counter'] = 0;	
}
$_SESSION['counter'] += 1;

var_dump($_SESSION);
