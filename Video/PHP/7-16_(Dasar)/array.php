<?php  

/* array dimensi  
$nama = array("joni", "tejo", "budi", "siti", 100, 2.5);  

var_dump($nama);  

echo "<br>";  

echo $nama[5];  

echo "<br>";  

for($i=0; $i<6; $i++){  
    echo $i;  
    echo $nama[$i], "<br>";  
}  

echo "<br>";  

// array asosiatif  
/*  
$nama = array(  
    "joni" => "surabaya",  
    "budi" => "malang raya",  
    "tejo" => "jakarta",  
    "siti" => "sidoarjo"  
);  
*/  

$nama["joni"] = "surabaya";  
$nama["budi"] = "malang raya";  
$nama["tejo"] = "jakarta";  
$nama["siti"] = "sidoarjo";  

var_dump($nama);  

echo "<br>";  

echo $nama["budi"];  

echo "<br>";  

foreach ($nama as $k => $v) {  
    echo $k."->".$v;  
}  

?>  
