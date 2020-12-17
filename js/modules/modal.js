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
        if (event.key == 'Backspace' && modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }  
    });

    

   window.addEventListener('scroll', ShowModalByScroll); //прокрутка до конца и появляется модалка


}

//module.exports = modalWindow;
export default modalWindow;
export {closeModal};
export {openModal};