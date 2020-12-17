function calcul(){
    let sex, active, weight, height, age;

if (!localStorage.getItem('sex')){
    sex = 'woman';
    localStorage.setItem('sex', sex);
}
if (!localStorage.getItem('active')){
    active = 1.2;
    localStorage.setItem('active', active);
}

function calc(){
    const result = document.querySelector('.calculating__result span');
    if(!sex || !active || !weight || !height || !age){
        result.textContent = '0';
        return; // остановка
    }
    if(sex === 'man'){
        result.textContent =Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))*active);   
    }
    else{
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))*active);    
    }
}
calc();

function StartInfo(selector, activeClass){
    const elements = document.querySelectorAll(selector);

    elements.forEach(elm =>{
        elm.classList.remove(activeClass);
        if (elm.getAttribute('data-active') === localStorage.getItem('active')) {
            elm.classList.add(activeClass);
            console.log(elm.getAttribute('data-active'));
            console.log(localStorage.getItem('active'));
        }
        if (elm.getAttribute('id') == localStorage.getItem('sex')){
            elm.classList.add(activeClass);
             console.log(elm.getAttribute('id') );
            console.log(localStorage.getItem('sex'));
        }
    });
}

StartInfo('#gender>div', 'calculating__choose-item_active');
StartInfo('.calculating__choose_big div', 'calculating__choose-item_active');

function staticInfo(selector, activeClass){
    const elements = document.querySelectorAll(selector);
    elements.forEach(elm=>{
        elm.addEventListener('click', (e)=>{
            if(e.target.getAttribute('data-active')){
                active = +e.target.getAttribute('data-active');
                localStorage.setItem('active', active);
            }
            else{
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            }

            elements.forEach(item=>{
                item.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);

            calc();  
        });
    });
}
staticInfo('#gender div', 'calculating__choose-item_active');
staticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

function dinamicInfo(selector){
    const input = document.querySelector(selector);
    input.addEventListener('input', ()=>{
        if (input.value.match(/\D/g)) {
            input.style.border = "1px solid red";
        } 
        else{
            input.style.border = 'none';
        }
        switch(input.getAttribute('id')){
            case 'height':
                height = +input.value;
                break;
            case 'weight':
                weight = +input.value;
                break;
            case 'age':
                age = +input.value;
                break;
        }
        calc();
    });
}
dinamicInfo('#height');
dinamicInfo('#weight');
dinamicInfo('#age');
}

//module.exports = calcul;
export default calcul;
