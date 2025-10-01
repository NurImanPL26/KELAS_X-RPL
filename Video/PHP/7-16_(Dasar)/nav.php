<nav>
    <ul>
        <li>kontak</li>
        <li>sejarah</li>
        <li>jurusan</li>
    </ul>
</nav>

<?php 

    if ( isset($_POST{'kirim'})) {
       
        $email = $_POST ['email'];
        $password = $_POST['password'];

        echo $email;
        echo '<br>'
        echo $password;

    }

?>