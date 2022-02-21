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
        $despesaService->inserir();
    }
    

    if($_POST['function'] === 'listAll'){

        $despesa = new Despesa();
        $conexao = new Conexao();
        
        $despesaService = new DespesaService($conexao, $despesa);
        $listAll = $despesaService->recuperar();
        
        echo json_encode($listAll);
    }






?>