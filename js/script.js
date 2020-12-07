"use strict";

window.addEventListener('DOMContentLoaded', () => {
    // табы
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent(){
        tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (e) => {
    if (e.target && e.target.matches('div.tabheader__item')){
        tabs.forEach((item, i) => {
            if (e.target == item){
                hideTabContent();
                showTabContent(i);
            }
        });
    }
    
});

//таймер

const deadline = '2020-12-24';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            hours = Math.floor( (t/(1000*60*60) % 24) ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            seconds = Math.floor( (t/1000) % 60 );
            
            

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        }
        else{
            return num;
        }
    }
    

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
            updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML =getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

//modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        scrollEnd = document.documentElement;

        function openModal(){
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);      
        }
    
        function closeModal(){
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
        
        function ShowModalByScroll(){
            if(scrollEnd.scrollTop + scrollEnd.clientHeight >= scrollEnd.scrollHeight){
                openModal(); 
                window.removeEventListener('scroll', ShowModalByScroll);
          }
        }

        modal.addEventListener('click', (e) =>{
            if (e.target && e.target.matches('[data-close]') ){
                closeModal();
            }
        });
    

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

   
    

    window.addEventListener('keydown', (event) => {
        if (event.key == 'Backspace' && modal.classList.contains('show')) { 
            closeModal();
        }  
    });

    const modalTimerId = setTimeout(openModal,50000); // адалка через время

   window.addEventListener('scroll', ShowModalByScroll); //прокрутка до конца и появляется модалка


// карточки меню


class MenuField {
    constructor (img, alt, subtitle, descr, price, parentSelector, ...classes){
        this.img = img;
        this.alt = alt;
        this.subtitle = subtitle;
        this.descr = descr;
        this.transfer = 90;
        this.classes = classes;
        this.price = price ;
        this.parent = document.querySelector(parentSelector);
        this.changePrice();
    }
    changePrice(){
        this.price = this.price * this.transfer;
    }
    ShowCard(){
        const elm = document.createElement('div');
        if (this.classes.length === 0){
            this.elm = 'menu__item';
            elm.classList.add(this.elm);
        }
        else{
            this.classes.forEach(item => elm.classList.add(item));
        }
        
        elm.innerHTML = ` <img src=${this.img} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.subtitle}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>`;
        this.parent.append(elm);
    }

}

new MenuField(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    5,
    ".menu .container",
    'menu__item',
    'big'
).ShowCard();

new MenuField(
    "img/tabs/hamburger.jpg",
    "burger",
    'Меню "Почти ПП"',
    'Меню "Почти ПП" - это новый подход к приготовлению блюд: Две мясных котлеты гриль, специальный соус, сыр, огурцы, салат и лук, все на булочке с кунжутом',
    4,
    ".menu .container"
    

).ShowCard();

new MenuField(
    "img/tabs/post.jpg",
    "burger",
    'Меню "Постное"',
    'Чтобы очистить душу, тело необходимо держать в строгости и есть самую простую пищу, исключающую продукты животного происхождения (мясо, молоко, сливочное масло, яйца) ',
    3,
    ".menu .container",
    'menu__item'
).ShowCard();

// серверная часть FORMS

const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо, скоро с вами свяжемся',
    failure: 'что-то пошло не так'
};

forms.forEach(item =>{
    postData(item);
});

function postData(form){
    form.addEventListener('submit', (e)=> {
        e.preventDefault(); //отключение перезагрузки страницы при отправки формы

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display:block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend',statusMessage);
        const request = new XMLHttpRequest();
        request.open('POST', 'server.php'); 
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');//для json
        
        
        const formData = new FormData(form);//перевести это в json

        const object = {};
        
        formData.forEach((value, key)=>{
            object[key]=value;
        });

        const json = JSON.stringify(object); //конвертация в json

        request.send(json);
        request.addEventListener('load', ()=>{
            if (request.status === 200){
                console.log(request.response);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            }
            
            else{
            showThanksModal(message.failure);
            }
        });

        
        });}

       function showThanksModal(message){
            const prewModal = document.querySelector('.modal__dialog');
            prewModal.classList.add('hide');
           openModal();
            const ShowModal = document.createElement('div');
            ShowModal.classList.add('modal__dialog');
            ShowModal.innerHTML = `
            <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
            </div>
            `;
            document.querySelector('.modal').append(ShowModal);
            setTimeout(()=>{
                ShowModal.remove();
                prewModal.classList.remove('hide');
                prewModal.classList.add('show');  
               closeModal();
            },4000);
       }

       

//         fetch('server.php', {
//             method: 'POST',
//             headers:{
//              'Content-type': 'application/json'
//             },
//             body: JSON.stringify(object)
//         }).then(data => data.text())
//         .then(data => {
//             console.log(data);
//             showThanksModal(message.success);
//             statusDatamessage.remove();
//         }).catch(()=>{
//             showThanksModal(message.failure);
//             statusDatamessage.remove();
//         }).finally(()=>{
//             form.reset();
//         });



//        /* request.addEventListener('load', () =>{
//             if (request.status === 200){
//                 console.log(request.response);
//                 showThanksModal(message.success);
//                 form.reset();
//                 statusDatamessage.remove();
//             }
//             else{
//                 showThanksModal(message.failure);
//                 statusDatamessage.remove();
//             }
//         });*/
//     });   
// }


// function showThanksModal(message) {
//     const prevModalDialog = document.querySelector('.modal__dialog');

//     prevModalDialog.classList.add('hide');
//     openModal();

//     const thanksModal = document.createElement('div');
//     thanksModal.classList.add('modal__dialog');
//     thanksModal.innerHTML = `
//         <div class="modal__content">
//             <div class="modal__close" data-close>×</div>
//             <div class="modal__title">${message}</div>
//         </div>
//     `;
//     document.querySelector('.modal').append(thanksModal);
//     setTimeout(() => {
//         thanksModal.remove();
//         prevModalDialog.classList.add('show');
//         prevModalDialog.classList.remove('hide');
//         closeModal();
//     }, 4000);
// }


// API 
// DOM API - методы, которые позволяют работать с элементами на странице

// fetch api 

/*fetch('https://jsonplaceholder.typicode.com/todos/posts', {
    method: 'POST',
    body: JSON.stringify{(name:'alex' )},
    headers:{
        'Content-type:' 'application/json'
    };
})
  .then(response => response.json())
  .then(json => console.log(json));*/


// fetch(' http://localhost:3000/menu')
// .then(data => data.json())
//   .then(res => console.log(res));




});


