"use strict";
import tabs from './modules/tabs';
import timer  from './modules/timer';
import forms  from './modules/forms';
import slider  from './modules/slider';
import cards  from './modules/cards';
import calc  from './modules/calc';
import modal  from './modules/modal';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    // const tabs = require('./modules/tabs'),
    //       timer = require('./modules/timer'),
    //       forms = require('./modules/forms'),
    //       slider = require('./modules/slider'),
    //       cards = require('./modules/cards'),
    //       calc = require('./modules/calc'),
    //       modal = require('./modules/modal');

    const modalTimerId = setTimeout(()=> openModal('.modal', modalTimerId),5000); // адалка через время

    modal('[data-modal]','.modal', modalTimerId);
    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    timer('.timer','2022-12-24');
    forms('form',modalTimerId);
    slider();
    cards();
    calc();
        


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

    