(function () {
   'use strict'
   
   const menuBurger = document.querySelector('.burger');
   const menuList = document.querySelector('.menu');
   
   // Бургер меню
   menuBurger.addEventListener('click', function(){
      this.children[0].classList.toggle('burger__line--open');
      menuList.classList.toggle('menu--open');
   })
   
})();