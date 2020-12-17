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

export default slider;
