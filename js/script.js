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

const getResource = async(url) => { //превращаем ассинхронный в синхронный как бы
    const res =await fetch(url);

    if(!res.ok){ //если ошибка, чтоб сработал блок catch
      throw  new Error(`Coold not fatch ${url}, status: ${res.status}`);

    }
    return await res.json(); //возращаем в json формате
 };

 getResource('http://localhost:3000/menu')
    .then(data =>{ //данные с сервера
        data.forEach(({img, altimg, title, descr, price})=>{
            new MenuField(img, altimg, title, descr, price, ".menu .container").ShowCard();
        });
    });



// серверная часть FORMS

const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо, скоро с вами свяжемся',
    failure: 'что-то пошло не так'
};

forms.forEach(item =>{
    bindPostData(item);
});

const postData = async(url, data) => { //превращаем ассинхронный в синхронный как бы
   const res =await fetch(url, {
    method:"POST",
    headers: {
        'Content-type': 'application/json'
     },
    body: data //данные,которые мы постим
   });
   return await res.json(); //возращаем в json формате
};

function bindPostData(form){
    form.addEventListener('submit', (e)=> {
        e.preventDefault(); //отключение перезагрузки страницы при отправки формы

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display:block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend',statusMessage);
        
        const formData = new FormData(form);//перевести это в json

        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(json);

        postData('http://localhost:3000/requests', json )
        .then(data => { //данные от сервера
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() =>{
            showThanksModal(message.failure);
        }).finally(()=>{
            form.reset();
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

       
// fetch('  http://localhost:3000/menu')
//     .then(data => data.json())
//     .then(res => console.log(res));



// API 
// DOM API - методы, которые позволяют работать с элементами на странице

// fetch api 
// fetch('https://jsonplaceholder.typicode.com/todos/1') //GET
    // .then(response => response.json())//С серевера получил json объект в response. с помщью json() привел к норм виду
    // .then(json => console.log(json));// отобразили этот объект

// fetch('https://jsonplaceholder.typicode.com/posts', { //POST 
//     method: "POST",
//     body: JSON.stringify({name: 'ALEX'}),
//     headers:{
//         'Content-type': 'application/json'
//     }

// })
//   .then(response => response.json())
//   .then(json => console.log(json));




    });