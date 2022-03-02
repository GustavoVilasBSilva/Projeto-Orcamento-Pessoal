<?php 

require '../global.php';


class Conexao {

    public function conectar() {
        try {

            $conexao = new PDO (
                'mysql:host='.$_ENV['DB_HOST'].';dbname='.$_ENV['DB_NAME'],
                $_ENV['DB_USER'],
                $_ENV['DB_PASS']
            );

            return $conexao;
        } catch (PDOExeception $e) {
            return ;
        }
    }
}

$conectar = new Conexao();
$conectar->conectar();

?>