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

export default tabs;