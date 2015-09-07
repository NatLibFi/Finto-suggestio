<?php
header("Content-type: application/json");

$url = 'https://api.github.com/repos/henriyli/issuetest/issues';
$session = curl_init($url);

$post_body = file_get_contents('php://input');

require_once('.token');

curl_setopt($session, CURLOPT_USERPWD, $suggestio_token);
curl_setopt($session, CURLOPT_USERAGENT, "https://github.com/NatLibFi/Finto-suggestio");
curl_setopt($session, CURLOPT_HTTPHEADER, array("Content-type: application/json", "Accept: application/vnd.github.v3+json"));
curl_setopt($session, CURLOPT_TIMEOUT, 15);
curl_setopt($session, CURLOPT_POST, 1);
curl_setopt($session, CURLOPT_POSTFIELDS, $post_body);
curl_setopt($session, CURLOPT_RETURNTRANSFER, 0);

$response = curl_exec($session);
curl_close($session);

