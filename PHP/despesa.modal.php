<?php 

    class Despesa {
        private $id_despesa;
        private $data_despesa;
        private $tipo;
        private $descricao;
        private $valor;
    
        public function __get($atributo){
            return $this->$atributo;
        }
        public function __set($atributo, $valor){
            $this->$atributo = $valor;
        }
    }


?>