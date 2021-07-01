(function () {
   'use strict'
   
   const instagramTitle = document.querySelector('.instagram__title');

   // Изменение текста заголовка для маленьких экранов
   if (document.documentElement.clientWidth <= 390) {
      instagramTitle.innerHTML = 'Latest Instagram Shot';
   } else {
      instagramTitle.innerHTML = 'Latest Instagram Shots';
   };
 
})();