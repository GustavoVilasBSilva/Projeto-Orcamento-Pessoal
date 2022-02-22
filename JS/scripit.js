

class Despesa {
    constructor(array){
        this.data = `${array[0].value}-${array[1].value}-${array[2].value}`;
        this.tipo = array[3].value;
        this.descricao  = array[4].value;
        this.valor = array[5].value;
    }
    validacaoDados(){
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false;
            }   
        }
        return true;
    }
    validaCampos(array){
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if(element.value == '') {
                element.classList.add('border__red');  
            } else {
                element.classList.remove('border__red');
            }
        }
    }
    enviaDadosBD(){
        const objResult = {
            data : this.data,
            tipo : this.tipo,
            descricao : this.descricao,
            valor : this.valor,
            function : 'add'
        };
        return objResult;
    }
}


function registerProduct() {
    const el = $('form div').children();
    const arrayElements = [el[0], el[1], el[2], el[3], el[4], el[5]];
    
    let despesa = new Despesa(arrayElements);

   if(despesa.validacaoDados()) {
        const objResult = despesa.enviaDadosBD();
        
        $.ajax({
            url: '../PHP/controller_despesa.php',
            type: 'POST',
            data: objResult,
            dataType: 'json',
            success: () => {
                $('#content-main').addClass('modal__actived');
                $('#modal').addClass('success');
                $('#title_modal').html('Secesso');
                $('#content_modal').html('Sua despesa foi salva com sucesso!! Click no botão "VOLTAR" para registrar novas despesas.'); 
                arrayElements.value = ''
            },  
            error: () => {
                $('#content-main').addClass('modal__actived');
                $('#modal').addClass('failed');
                $('#title_modal').html('Ops...Algo deu errado');
                $('#content_modal').html('Ouve algum erro!!! Porfavor tente mais tarde, se o erro persistir entre em contato com o nosso suporte.');
                           
            }           
        })
        
    } else {
        despesa.validaCampos(arrayElements);
    }
}

function exitModal() {
    $('#content-main').removeClass('modal__actived');
    $('#modal').removeClass('failed');
    $('#modal').removeClass('success');
    $('#modal').removeClass('actived');
}

function carregarListaDespesas(){
    $.ajax({
        url: '../PHP/controller_despesa.php',
        type: 'POST',
        data: {function: 'listAll'},
        dataType: 'json',
        success: result => {listDespesaAll(result)},  
        error: () => {
        } 
    })   
}
        

function listDespesaAll(listAllObj) {
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = '';

    listAllObj.forEach(function(d){
        let linha = listaDespesas.insertRow();

        linha.id = `id_list_${d.id_despesa}`

        linha.insertCell(0).innerHTML = d.data_despesa
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor.toFixed(2)

        let btn1 = document.createElement("button");
        btn1.className = 'btn-td btn-closed';
        btn1.innerHTML = '<img class="img" src="../imagens/icon-delete.png">';
        btn1.id = `id_delet_${d.id_despesa}`
        btn1.onclick = function(){
            let id = this.id.replace('id_delet_', '');
            $.ajax({
                url: '../PHP/controller_despesa.php',
                type: 'POST',
                data: {
                    function: 'delet',
                    id_despesa: id
                },
                dataType: 'json',
                success: () => {
                    $('#content-main').addClass('modal__actived');
                    $('#modal').addClass('success');
                    $('#title_modal').html('Sucesso');
                    $('#content_modal').html('Despesa excluida com sucesso! Click em voltar para autalizar os dados.'); 
                },  
                error: () => {
                    $('#content-main').addClass('modal__actived');
                    $('#modal').addClass('failed');
                    $('#title_modal').html('Ops...Algo deu errado');
                    $('#content_modal').html('Ouve algum erro!!! Porfavor tente mais tarde, se o erro persistir entre em contato com o nosso suporte.'); 
                } 
            })  
            console.log(id)
        }

        
        let colDelet = linha.insertCell(4);
        colDelet.className = 'td__btn'
        colDelet.append(btn1);

        
    })
}

function recarregaListaDespesa() {
    $('#listaDespesas').html()
    carregarListaDespesas()
    exitModal()
}










