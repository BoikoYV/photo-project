(function () {
   'use strict'

   const instagramTitle = document.querySelector('.instagram__title');
   changeTitle();

   window.addEventListener('resize', changeTitle);

   // Изменение текста заголовка для маленьких экранов
   function changeTitle() {
      if (document.documentElement.clientWidth <= 390) {
         instagramTitle.innerHTML = 'Latest Instagram Shot';
      } else {
         instagramTitle.innerHTML = 'Latest Instagram Shots';
      };
   }

})();