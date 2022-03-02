


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

class Elements {
    constructor() {
        this.modal
        this.btnDelet
    }

    createModal(parameter) {
        this.modal = document.createElement("section")
        this.modal.id = 'modal'
        this.modal.className = 'container__modal'
        const title = document.createElement('h3')
        const text = document.createElement('p')
        const btn = document.createElement('button')
        const btn2 = document.createElement('button')
        btn.innerHTML = 'Voltar'
        btn2.innerHTML = 'Voltar'
        btn.onclick = () => {
            $('#modal').remove()
            $('#content-main').removeClass('modal__actived')
        }
        btn2.onclick = () => {
            $('#modal').remove()
            $('#content-main').removeClass('modal__actived')
            $('#listaDespesas').html()
            carregarListaDespesas()
        }
        if(parameter === 'success'){
            this.modal.classList.add('success')
            title.innerText = 'Secesso'
            text.innerText = 'Sua despesa foi salva com sucesso!! Click no botão "VOLTAR" para registrar novas despesas.'
            this.modal.append(title, text, btn)
            return this.modal
        } else if(parameter === 'failed'){
            this.modal.classList.add('failed')
            title.innerText = 'Ops...Algo deu errado'
            text.innerText = 'Ouve algum erro!!! Porfavor tente mais tarde, se o erro persistir entre em contato com o nosso suporte.'
            this.modal.append(title, text, btn)
            return this.modal
        } else if(parameter === 'deletSuccess'){
            this.modal.classList.add('actived')
            title.innerText = 'Sucesso'
            text.innerText = 'Despesa excluida com sucesso! Click em voltar para autalizar os dados.'
            this.modal.append(title, text, btn2)
            return this.modal
        }
    }    

    createBtnDelet(idN){
        this.btnDelet = document.createElement("button");
        this.btnDelet.className = 'btn-td btn-closed';
        this.btnDelet.id = `id_delet_${idN}`
        this.btnDelet.innerHTML = '<img class="img" src="../imagens/icon-delete.png">';
        this.btnDelet.onclick = () => {
            console.log(idN)
            let id = idN
            $.ajax({
                url: '../PHP/controller_despesa.php',
                type: 'POST',
                data: {
                    function: 'delet',
                    id_despesa: id
                },
                dataType: 'json',
                success: result => {
                    console.log(result)
                    $('#content-main').addClass('modal__actived')
                    let modal = allElements.createModal('deletSuccess')
                    $('body').prepend(modal)
                },  
                error: () => {
                    $('#content-main').addClass('modal__actived')
                    let modal = allElements.createModal('failed')
                    $('body').prepend(modal)
                } 
            })

        }
        return this.btnDelet
    }

}

let allElements = new Elements()



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
                $('#content-main').addClass('modal__actived')
                let modal = allElements.createModal('success')
                $('body').prepend(modal)
                arrayElements.forEach((e) => {e.value = ''})
            },  
            error: () => {
                $('#content-main').addClass('modal__actived')
                let modal = allElements.createModal('failed')
                $('body').prepend(modal)
            }           
        })
        
    } else {
        despesa.validaCampos(arrayElements);
    }
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

        let btn = allElements.createBtnDelet(d.id_despesa)
        
        let colDelet = linha.insertCell(4);
        colDelet.className = 'td__btn'
        colDelet.append(btn);
    })
}
/*
function filter() {
    const el = $('#form div').children();
    const arrayElements = [el[0], el[1], el[2], el[3], el[4], el[5]];
    const elements = [];

    for (const i in arrayElements) {
        const element = arrayElements[i];
        if (element.value !== '' && element.value !== null && element.value !== undefined) {
            
            elements.push(element)
  
        }
    }
    console.log(elements)

}
*/









