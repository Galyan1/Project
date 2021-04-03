/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calcul);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(){
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
    
 
    
     (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data =>{ //данные с сервера
            data.forEach(({img, altimg, title, descr, price})=>{
                new MenuField(img, altimg, title, descr, price, ".menu .container").ShowCard();
            });
        });
    
}

//module.exports = cards;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(selectorForm, modalTimerId){
    const forms = document.querySelectorAll(selectorForm);

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо, скоро с вами свяжемся',
        failure: 'что-то пошло не так'
    };
    
    forms.forEach(item =>{
        bindPostData(item);
    });
    
   
    
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
            
            const formData = new FormData(form);//собрали данные с формы, перевести это в json 
            console.log(`form data ${formData.entries()}`);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
                      //  перевод в json /преобразует список пар ключ-значение в объект/ находит ключ-значение               
            console.log(json);
    
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json )
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
               (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId );
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
                   (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
                },4000);
           }
}
//module.exports = forms;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closeModal": () => /* binding */ closeModal,
/* harmony export */   "openModal": () => /* binding */ openModal
/* harmony export */ });
function openModal(modalSelector, modalTimerId){
    const  modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId){
        clearInterval(modalTimerId);    
    }      
}

function closeModal(modalSelector){
  const  modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modalWindow(triggerSelector, modalSelector, modalTimerId){
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector),
    scrollEnd = document.documentElement;

        function ShowModalByScroll(){
            if(scrollEnd.scrollTop + scrollEnd.clientHeight >= scrollEnd.scrollHeight){
                openModal(modalSelector, modalTimerId); 
                window.removeEventListener('scroll', ShowModalByScroll);
          }
        }

        modal.addEventListener('click', (e) =>{
            if (e.target && e.target.matches('[data-close]') ){
                closeModal(modalSelector);
            }
        });
    
    modalTrigger.forEach(item => {
        item.addEventListener('click', ()=>openModal(modalSelector, modalTimerId));//тогда функция запустится только при клике, а не при загрузке страницы.
    });

    window.addEventListener('keydown', (event) => {
        if (event.key ==  modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }  
    });

    

   window.addEventListener('scroll', ShowModalByScroll); //прокрутка до конца и появляется модалка


}

//module.exports = modalWindow;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider(){
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

}

//module.exports = slider;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector,tabsContentSelector, tabsParentSelector, activeClass ){
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);


    function hideTabContent(){
        tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.matches(`div${tabsSelector}`)){
            tabs.forEach((item, i) => {
                if (e.target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

//module.exports = tabs;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(id, deadline){
     
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

    setClock(id, deadline);
}
//module.exports = timer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");










window.addEventListener('DOMContentLoaded', () => {
    // const tabs = require('./modules/tabs'),
    //       timer = require('./modules/timer'),
    //       forms = require('./modules/forms'),
    //       slider = require('./modules/slider'),
    //       cards = require('./modules/cards'),
    //       calc = require('./modules/calc'),
    //       modal = require('./modules/modal');

    const modalTimerId = setTimeout(()=> (0,_modules_modal__WEBPACK_IMPORTED_MODULE_6__.openModal)('.modal', modalTimerId),5000); // адалка через время

    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_6__.default)('[data-modal]','.modal', modalTimerId);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)('.timer','2022-12-24');
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__.default)('form',modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__.default)();
        


});

    // серверная часть FORMS       
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

    

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResource": () => /* binding */ getResource
/* harmony export */ });
const postData = async(url, data) => { //превращаем ассинхронный в синхронный как бы
    const res =await fetch(url, {
     method:"POST",
     headers: {
         'Content-type': 'application/json'
      },
     body: data //данные,которые мы постим
    });
    return await res.json(); //возращаем в js формате
 };

 const getResource = async(url) => { //превращаем ассинхронный в синхронный как бы
    const res =await fetch(url);

    if(!res.ok){ //если ошибка, чтоб сработал блок catch
      throw  new Error(`Coold not fatch ${url}, status: ${res.status}`);

    }
    return await res.json(); //возращаем в js формате
 };

 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map