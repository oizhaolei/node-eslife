<?php
function _checkSign($inputArray)
{
    ksort($inputArray);
    $appSecret = "123456";
    $signBody = "";
    foreach ($inputArray as $key => $val) {
        if($key == "sign") continue;
        $signBody .= $key.$val;
    }
    $signBody = $appSecret.$signBody.$appSecret;
    echo $signBody . "\n";
    $realSign = strtoupper(md5($signBody));
    echo $realSign . "\n";
    $result = array();
    if(!isset($inputArray['sign']))
    {
        $result[] = false;
        $result[] = "-5";
        return $result;
    }
    $requestSign = $inputArray['sign'];
    $result[] = $realSign == $requestSign;
    $result[] = "-1";
    $result[] = $result[0] ? "" : "请求签名:".$requestSign."，实际签名:".$realSign;
    return $result;
}


$data = array(
    "lat" => "114.05583191",
    "lng" => "22.54263878",
    "r" => "5000",
    "appKey" => "test",
    "timeStamp" => "20170223183028",
    "requestKey" => "1487845828",
    "version" => "1.0",
    "sign" => "96A3A50635248B69E5C8BFE01163828D"
);

var_dump(_checkSign($data) );
?>
