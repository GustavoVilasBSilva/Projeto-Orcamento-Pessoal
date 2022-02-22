<?php 

class DespesaService {

    private $conexao;
    private $despesa;

    public function __construct(Conexao $conexao,Despesa $despesa) {
        $this->conexao = $conexao->conectar();
        $this->despesa = $despesa;
    }

    public function inserir() {
        try {
            $query = '
            insert into td_despesas(tipo, descricao, data_despesa, valor)values(:tipo, :descricao, :data_despesa, :valor)
            ';            
            $stmt = $this->conexao->prepare($query);
            
            $stmt->bindValue(':tipo', $this->despesa->__get('tipo'));
            $stmt->bindValue(':descricao', $this->despesa->__get('descricao'));
            $stmt->bindValue(':data_despesa', $this->despesa->__get('data_despesa'));
            $stmt->bindValue(':valor', $this->despesa->__get('valor'));
            
            $stmt->execute();
            
            echo true;
            
        } catch(Exception $e){
            echo false;
        }
    }
    public function recuperar() {
        try {
            $query = 'select * from td_despesas';
            $stmt = $this->conexao->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_OBJ);

        } catch (Exception $e) {   
            echo false;
        }

    }
    public function atualizar() {

    }
    public function remover() {
        try {
            $query = 'delete from td_despesas where id_despesa = :id_despesa';
            
            $stmt = $this->conexao->prepare($query);
            $stmt->bindValue(':id_despesa', $this->despesa->__get('id_despesa'));
            
            $stmt->execute();
            
            echo true;
        } catch (Exception $e) {   
            echo false;
        }

    }

}

?>