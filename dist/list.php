<?php
header("Content-type: application/json");

require_once('../../../.token');

$url = 'https://api.github.com/repos/Finto-ehdotus/YSETEST/issues?state=open';
$session = curl_init($url);
curl_setopt($session, CURLOPT_USERPWD, $suggestio_token);
curl_setopt($session, CURLOPT_USERAGENT, "https://github.com/NatLibFi/Finto-suggestio");
curl_setopt($session, CURLOPT_HTTPHEADER, array("Content-type: application/json", "Accept: application/vnd.github.v3+json"));
$response = curl_exec($session);
curl_close($session);
json_encode($response);