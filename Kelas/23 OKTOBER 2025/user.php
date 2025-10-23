<?php
    if (!isset ($_POST['email'])) {
        header("location:index.php");
    }
?>

<h1>selamat datang <?= $_SESSION ['email'] ?></h1> 

