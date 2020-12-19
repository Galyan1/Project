import {getResource} from '../services/services';

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
    
 
    
     getResource('https://github.com/Galyan1/Project/blob/gh-pages/db.json/menu')
        .then(data =>{ //данные с сервера
            data.forEach(({img, altimg, title, descr, price})=>{
                new MenuField(img, altimg, title, descr, price, ".menu .container").ShowCard();
            });
        });
    
}

//module.exports = cards;
export default cards;