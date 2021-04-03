import{closeModal, openModal} from './modal';
import {postData} from '../services/services';

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
    
            postData("http://localhost:3000/requests", json )
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
               openModal('.modal', modalTimerId );
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
                   closeModal('.modal');
                },4000);
           }
}
//module.exports = forms;
export default forms;