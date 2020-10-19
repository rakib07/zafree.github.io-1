;(function() {
  'use strict';

    var elem = document.querySelector('.RecentCarousel');
    var flkty = new Flickity( elem, {
      // options
      cellAlign: 'left',
      // freeScroll: true,
      contain: true,
      cellAlign: 'center',
      // prevNextButtons: false,
      pageDots: false,
      // groupCells: 2,
      arrowShape: 'M40.9,50l14,14l4.2-4.2L49.3,50l9.8-9.8L54.9,36L40.9,50z'
    });


  // gsap.set("#avatar", {translateX: "-100px", opacity: 0.5});
  // gsap.set("#bubble", {opacity: 0});

  // var action = document.getElementById('action'),
  //     init = document.getElementById('init'),
  //     avatar = document.getElementById('avatar'),
  //     bubble = document.getElementById('bubble');
  // action.addEventListener("click",function(e){
  //   init.classList.add("isStart");
  //   gsap.to("#bubble", {delay: .688, duration: .2, opacity: 1});
  //   gsap.to("#init", {delay: 1.376, duration: .2, opacity: 0});

  //   gsap.to("#avatar", {duration: .688, ease: "power2.out", translateX: "0%", opacity: 1});
  // },false);


  

  // var button1 = document.getElementById("button1"),
  //     button2 = document.getElementById("button2");

  // button1.addEventListener('click', function(e) {
  //   e.preventDefault();
  //   // console.log("No");
    
  // });
  // button2.addEventListener('click', function(e) {
  //   e.preventDefault();
  //   // console.log("Yes");

  //   createItem();
    
  // });

  // var chatContent = document.querySelector(".chat__content");
  // createItem();
  
  // function createItem() {
  //   var el =  document.createElement("div")
  //       el.className = "item"
  //       chatContent.appendChild(el);        

  //   var el_a = document.createElement("div")
  //       el_a.className = "item__avatar"
  //       el.appendChild(el_a);

  //   var el_b = document.createElement("div")
  //       el_b.className = "item__bubble"
  //       el_b.innerHTML = "Hello there,<br>Are you human?";
  //       el.appendChild(el_b);

  //       console.log(el);

  //       gsap.to(".item", {translateY: "-30px", opacity: 0.5});
  // }
 


  // 

  gsap.set("#navigation .modal__content", {translateY: "-100%"});

  var hamburger = document.getElementById("hamburger"),
      navigation = document.getElementById("navigation"),
      navigationDismiss = navigation.querySelector('[data-dismiss]');

  let navigationShown = true;

  hamburger.addEventListener('click', function(e) {
    e.preventDefault();

    if (navigationShown) {
      navigationIn();
    } else {
      navigationOut();
    }
    navigationShown = !navigationShown;
  });

  navigationDismiss.addEventListener('click', function(e) {
    e.preventDefault();

    navigationOut();
    navigationShown = true;
  });

  
  // Animations
  function navigationIn() {
    hamburger.classList.add("Hamburger__button--cancel");
    gsap.to("#navigation", {duration: .258, ease: "power2.out", opacity: 1, visibility: "visible"});
    gsap.to("#navigation .modal__content", {delay: .258, duration: .3, ease: "power2.out", translateY: "0%"});
  }
  function navigationOut() {
    hamburger.classList.remove("Hamburger__button--cancel");
    gsap.to("#navigation", {duration: .258, ease: "power2.out", opacity: 0, visibility: "hidden"});
    gsap.to("#navigation .modal__content", {duration: .3, ease: "power2.out", translateY: "-100%"});
  }



  // Mouse hover animation
  // var center = { x: Math.floor(window.innerWidth/2), y: Math.floor(window.innerHeight/2)};

  // onmousemove = move;

  // function move(e) {
  //   var distX = e.clientX - center.x;
  //   var distY = e.clientY - center.y
  //   // console.log(distX , distY)
  //   TweenLite.to(".Hero__imageFollower", 0.5, {x:-distX*0.15, y:-distY*0.15});
  // }






  // document.getElementById("replay").onclick = function() {
  //   tl.restart();
  // }




  // basic default transition (with no rules and minimal hooks)
  // barba.init({
  //   transitions: [{
  //     leave({ current, next, trigger }) {
  //       // do something with `current.container` for your leave transition
  //       // then return a promise or use `this.async()`
        
  //     },
  //     enter({ current, next, trigger }) {
  //       // do something with `next.container` for your enter transition
  //       // then return a promise or use `this.async()`
  //     }
  //   }]
  // });

})();