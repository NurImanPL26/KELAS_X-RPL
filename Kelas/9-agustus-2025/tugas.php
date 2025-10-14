<?php 
  $menu = ["profil", "kontak", "kegiatan","jadwal"];
  $nama_sekolah = "SMKN 2 Buduran";
  $detail = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, aliquam. Repellendus velit aliquam placeat laudantium harum dolorum doloremque non odio eos, quis omnis, voluptas qui.";
  $img = "img/logo.png";
  $program = ["BQ dihari kamis", "Upacara/apel pada hari senin pagi", "Pramuka 3x sebulan untuk kelas 10"];
  $lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, aspernatur.";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web sekolah Smenda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <img src="<?=$img?>" alt="SMKN 2">
      <ul class="navbar-nav justify-content-end me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><?=$menu[0]?></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><?=$menu[1]?></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><?=$menu[2]?></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><?=$menu[3]?></a>
        </li>
    </ul>
    </div>
</nav>
<div>

    <div class="col-md-8">
                <div class="card">
                    <div class="card-header bg-dark text-white">
                        Selamat Datang
                    </div>

                    <div class="card-body">
                        <h3><?=$nama_sekolah?></h3>
                        <p><?=$detail?></p>
                    <h4><?=$program[0]?></h4>
                    <p><?=$lorem?></p>
                        <br>
                        <h4><?=$program[1]?></h4>
                        <p><?=$lorem?></p>
                        <br>
                        <h4><?=$program[2]?></h4>
                        <p><?=$lorem?></p>
                        <a href="#" class="btn btn-dark">Info Selengkapnya</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>