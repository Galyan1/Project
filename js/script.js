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



//СЛАЙДЕР

const parentSlider = document.querySelector('.offer__slider'),
      slidenext = document.querySelector('.offer__slider-next'),
      slideprev = document.querySelector('.offer__slider-prev'),
      slides = document.querySelectorAll('.offer__slide'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      width = window.getComputedStyle(slidesWrapper).width, // списать свойство ширины с этого эл-та
      slidesField = document.querySelector('.offer__slider-inner');

   


      slidesField.style.width = 100 * slides.length + '%'; // ширина блока = сумма ширины всех слайдов
      slidesField.style.display = 'flex';
      
     
    slides.forEach(slide => {
        slide.style.width = width; // каждый слайд имеет одинаковый размер = ширина родителя
    });

    parentSlider.style.position = 'relative';

    const swithes = document.createElement('ol');
    swithes.classList.add('slider-swithes');
    swithes.style.cssText = ` position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;`;
    parentSlider.append(swithes);

    

    for (let i = 0; i< slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = ` box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        transition: opacity .6s ease;`;
        swithes.append(dot);   
    }
    const dots = swithes.querySelectorAll('li');

    slidesWrapper.style.overflow = 'hidden';
    slidesField.style.transition ='0.5s all';

    let index = 0,
        offset = 0;

        

        function showSlide(i=0){
                   if (i < 10){
                    current.textContent = `0${i+1}`;
                   }
                   else{
                    current.textContent = `${i+1}`;
                   }
              }
              showSlide();
  

     slidenext.addEventListener('click', ()=>{
        if (index  < slides.length - 1){
             index++;
            offset = index * parseInt(width);
            showSlide(index);
             hideDots(index);
           
         } 
         else{
             index = 0;
             offset = index * parseInt(width);
             showSlide(index);
             hideDots(index);
        }
         slidesField.style.transform = `translateX(${-offset}px)`;
        
      });


      slideprev.addEventListener('click', e =>{
          if (index > 0){
             index--;
             offset = index * parseInt(width);
             showSlide(index);
             hideDots(index);
          }
          else{
             index = slides.length - 1;
             offset = index * parseInt(width);
             showSlide(index);
             hideDots(index);
         }
         slidesField.style.transform = `translateX(${-offset}px)`;
              });


      dots.forEach((dot,i)=>{
          dot.addEventListener('click',()=>{
            index = i;
            offset = index * parseInt(width);
            hideDots(index);
            showSlide(index);
            slidesField.style.transform = `translateX(${-offset}px)`;
          });
      })    ;    
   /* parentSlider.addEventListener('click', e=>{
        if (e.target && e.target.matches('li')){
            dots.forEach((dot,i)=>{
                if(e.target === dot){
                    index = i;
                    offset = index * parseInt(width);
                    hideDots(index);
                    showSlide(index);
                    slidesField.style.transform = `translateX(${-offset}px)`;
                }
            });
        }
    });*/
 

    function hideDots(i = 0){
        dots.forEach(dot=>{
            dot.style.opacity = '.4';
        });
        dots[i].style.opacity = '1';
    }
    hideDots();


    // ПЕРЕКЛЮЧАТЕЛИ 

    

    //    function hideSlide(){
    //         slides.forEach(slide =>{
    //             slide.classList.add('hide');
    //             slide.classList.remove('show');
    //         });
    //    }

    //    hideSlide();

    //    function showSlide(i=0){
    //        slides[i].classList.add('show');
    //        if (i < 10){
    //         current.textContent = `0${i+1}`;
    //        }
    //        else{
    //         current.textContent = `${i+1}`;
    //        }
    //        slides[i].classList.remove('hide');
    //    }


    //    showSlide();

    //    let i = 0;

    //    slidenext.addEventListener('click', (e)=>{
    //     if (e.target  && i < slides.length-1){
    //         i++;
    //         console.log(i);
    //         hideSlide();
    //         showSlide(i);
    //     }
    // });

    // slideprev.addEventListener('click', e =>{
    //     if (e.target && i > 0){
    //         i--;   
    //         hideSlide();
    //         showSlide(i);
    //     }
    // });

    

// КАЛЬКУЛЯТОР КАЛОРИЙ 

const result = document.querySelector('.calculating__result span');
let sex ='female', height, weight, age, ratio =1.375;

function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '0'; 
        return;
    }
    if (sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

calcTotal();

function getStaticInformation(parentSelector, activeClass){
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem =>{
           elem.addEventListener('click', (e)=>{
                if( e.target && e.target.getAttribute('data-ratio')){
                    ratio = e.target.getAttribute('data-ratio');
                } else{
                    sex = e.target.getAttribute('id');
                }
    
                elements.forEach(elem => {
                        elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcTotal();
        });

        
        });
        
}
      getStaticInformation('#gender','calculating__choose-item_active' );
      getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');



function getDinamicInformation(selector){
    const input = document.querySelector(selector);
    
    input.addEventListener('input', ()=>{
        switch (input.getAttribute('id')) {
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
        calcTotal();
       
    });
   
}

getDinamicInformation('#height');
getDinamicInformation('#weight');
getDinamicInformation('#age');




    });