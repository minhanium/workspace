<?php
date_default_timezone_set('UTC');
define('LOG_FILE', 'phu.log');
file_put_contents(LOG_FILE, "----------------------------------", FILE_APPEND);

file_put_contents(LOG_FILE, strtr("\n:time | SERVER = :server", array(
	':time'		=> date('H:i:s Y-m-d'),
	':server'	=> json_encode($_SERVER)
)), FILE_APPEND);

file_put_contents(LOG_FILE, strtr("\n:time | REQUEST = :server", array(
	':time'		=> date('H:i:s Y-m-d'),
	':server'	=> json_encode($_REQUEST)
)), FILE_APPEND);

file_put_contents(LOG_FILE, "----------------------------------", FILE_APPEND);

$data = file_get_contents("php://input");

file_put_contents(LOG_FILE, strtr("\n:time | FB = :server", array(
	':time'		=> date('H:i:s Y-m-d'),
	':server'	=> @json_encode($data)
)), FILE_APPEND);

echo @$_REQUEST['hub_challenge'];
