<?php 

    require "despesa.modal.php";
    require "despesa.service.php";
    require "conexao.php";



    if($_POST['function'] === 'add'){
        $despesa = new Despesa();
        $conexao = new Conexao();
    
        $valor =  floatval($_POST['valor']);
    
        $despesa->__set('data_despesa', $_POST['data']);
        $despesa->__set('tipo', $_POST['tipo']);
        $despesa->__set('descricao', $_POST['descricao']);
        $despesa->__set('valor', $valor);
    
        $despesaService = new DespesaService($conexao, $despesa);

        echo $despesaService->inserir();
    }
    if($_POST['function'] === 'listAll'){

        $despesa = new Despesa();
        $conexao = new Conexao();
        
        $despesaService = new DespesaService($conexao, $despesa);
        $listAll = $despesaService->recuperar();
        
        echo json_encode($listAll);
    }
    if($_POST['function'] === 'delet'){
        $despesa = new Despesa();
        $conexao = new Conexao();

        $despesa->__set('id_despesa', $_POST['id_despesa']);
        
        $despesaService = new DespesaService($conexao, $despesa);
        $despesaService->remover();    
    }






?>