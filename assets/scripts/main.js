/**
 * Zafree v1.0.0 - Personal website
 * @link https://zafree.github.io/
 * @copyright 2019-2020 Zafree
 * @license Free
 */
"use strict";

;

(function () {
  "use strict"; // canvas blur function

  var CanvasImage = function CanvasImage(e, t) {
    this.image = t;
    this.element = e;
    e.width = t.width;
    e.height = t.height;
    this.context = e.getContext("2d");
    this.context.drawImage(t, 0, 0);
  };

  CanvasImage.prototype = {
    blur: function blur(e) {
      this.context.globalAlpha = 0.5;

      for (var t = -e; t <= e; t += 2) {
        for (var n = -e; n <= e; n += 2) {
          this.context.drawImage(this.element, n, t);
          var blob = n >= 0 && t >= 0 && this.context.drawImage(this.element, -(n - 1), -(t - 1));
        }
      }
    }
  }; // aspect ratio

  function aspectRation(image) {
    var image_width = image.dataset.width,
        image_height = image.dataset.height,
        image_aspectRatio = image_height / image_width * 100,
        el = document.createElement("div");
    el.className = "image__aspect-ratio";
    image.appendChild(el).setAttribute("style", "padding-bottom:" + image_aspectRatio + "%;");
    image.setAttribute("style", "max-width:" + image_width + "px;max-height:" + image_height + "px;");
  } // canvas blur image


  function canvasBlurImage(image) {
    var image_width = image.dataset.width,
        image_height = image.dataset.height,
        image_small = image.dataset.small,
        thumbnail_width = 30,
        thumbnail_height = image_height / image_width * thumbnail_width,
        el = document.createElement('canvas');
    el.className = 'image__canvas';
    image.appendChild(el);
    var canvas = image.appendChild(el),
        context = canvas.getContext("2d");
    canvas.height = thumbnail_height;
    canvas.width = thumbnail_width;
    var image_thumbnail = new Image();
    image_thumbnail.src = image_small;

    image_thumbnail.onload = function () {
      var canvasImage = new CanvasImage(canvas, image_thumbnail);
      canvasImage.blur(2);
      image.classList.add('canvas--loaded');
    };
  } // render original image


  function renderOriginalImage(image) {
    window.addEventListener('load', function () {
      var image_large = image.dataset.large,
          image_alt = image.dataset.alt,
          image_title = image.dataset.title,
          image_origanal = new Image();
      image.appendChild(image_origanal);
      image_origanal.className = 'image__original';
      image_origanal.src = image_large;
      image.classList.add('image--loading');

      image_origanal.onload = function () {
        image.classList.add('image--loaded');
        image.classList.remove('image--loading');
        image_origanal.alt = image_alt;
        image_origanal.title = image_title;
      };
    });
  } // all image


  function hasImage(image) {
    // var imageDataset = image.dataset;
    var imageWidth = image.getAttribute('data-width'),
        imageHeight = image.getAttribute('data-height'),
        imageSmall = image.getAttribute('data-small'),
        imageLarge = image.getAttribute('data-large'),
        imageAlt = image.getAttribute('data-alt'),
        imageTitle = image.getAttribute('data-title'); // check if dataset has and not empty

    if (imageWidth !== "" && imageWidth !== null && imageHeight !== "" && imageHeight !== null && imageSmall !== "" && imageSmall !== null && imageLarge !== "" && imageLarge !== null) {
      return true;
    }

    return false;
  } // Image


  function image() {
    var images = document.querySelectorAll(".image"); // if dataset exist

    for (var i = 0; i < images.length; i++) {
      hasImage(images[i]);

      if (hasImage(images[i])) {
        aspectRation(images[i]);
        canvasBlurImage(images[i]);
        renderOriginalImage(images[i]);
      }
    }
  } // initialize prograssive image loading


  image();
})();
"use strict";

;

(function () {
  'use strict';

  var root = document.documentElement,
      body = document.body,
      // hamburger = document.getElementById("hamburger"),
  modals = body.querySelectorAll('[data-modal]');

  var _kErnel = document.querySelector('._kErnel');

  var modalShown = true,
      scrollPosition = 0;

  if (typeof modals != 'undefined' && modals != null && modals.length > 0) {
    Array.prototype.forEach.call(modals, function (modal) {
      modal.addEventListener('click', modalCallback);
    });
  }

  function modalCallback(e) {
    e.preventDefault(); // get target dataset

    var target = e.target,
        getId = target.dataset.modal; // if modal exists in DOM

    var modal = document.getElementById(getId);

    if (typeof modal != 'undefined' && modal != null) {
      // console.log(modal);
      modalStateCallback(modal); // if clicked hamburger
      // if (hasClass(target, 'Hamburger__button')) {
      //   hamburger.classList.toggle('Hamburger__button--cancel');
      // }
    } else {
      console.log("undefine id: " + getId);
    }
  }

  function modalStateCallback(e) {
    if (modalShown) {
      showModal(e);
      cancelDetector(e);
    } else {
      removeModal(e);
    }

    modalShown = !modalShown;
  }

  function cancelDetector(e) {
    // console.log(e);
    var dismisses = e.querySelectorAll('[data-dismiss]');

    if (typeof dismisses != 'undefined' && dismisses != null && dismisses.length > 0) {
      Array.prototype.forEach.call(dismisses, function (dismiss) {
        dismiss.addEventListener('click', dismissCallback);
      });
    } else {
      console.log("missing: data-dismiss");
    }
  }

  function dismissCallback(e) {
    var target = e.target;
    var targetDismiss = target.closest('.modal');
    removeModal(targetDismiss);
    modalShown = true; // return icon or stop animation
    // hamburger.classList.remove("Hamburger__button--cancel");
  }

  function showModal(e) {
    e.classList.add("modal--open"); // navigationIn();

    scrollPosition = window.pageYOffset;
    _kErnel.style.top = -scrollPosition + 'px';
    root.classList.add('isScrollDisabled');
  }

  function removeModal(e) {
    e.classList.remove("modal--open"); // navigationOut();

    root.classList.remove('isScrollDisabled');
    _kErnel.style.top = null;
    window.scrollTo(null, scrollPosition);
  } // check header
  // function hasClass(elem, klass) {
  //      return (" " + elem.className + " " ).indexOf( " "+klass+" " ) > -1;
  // }
  // Animations
  // function navigationIn() {
  //   gsap.to("#navigation", {duration: .258, ease: "power2.out", opacity: 1, visibility: "visible"});
  //   gsap.to("#navigation .modal__content", {delay: .258, duration: .3, ease: "power2.out", translateY: "0%"});
  // }
  // function navigationOut() {
  //   gsap.to("#navigation", {duration: .258, ease: "power2.out", opacity: 0, visibility: "hidden"});
  //   gsap.to("#navigation .modal__content", {duration: .3, ease: "power2.out", translateY: "-100%"});
  // }

})();
"use strict";

;

(function () {
  'use strict'; // gsap.set("#avatar", {translateX: "-100px", opacity: 0.5});
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

  gsap.set("#navigation .modal__content", {
    translateY: "-100%"
  });
  var hamburger = document.getElementById("hamburger"),
      navigation = document.getElementById("navigation"),
      navigationDismiss = navigation.querySelector('[data-dismiss]');
  var navigationShown = true;
  hamburger.addEventListener('click', function (e) {
    e.preventDefault();

    if (navigationShown) {
      navigationIn();
    } else {
      navigationOut();
    }

    navigationShown = !navigationShown;
  });
  navigationDismiss.addEventListener('click', function (e) {
    e.preventDefault();
    navigationOut();
    navigationShown = true;
  }); // Animations

  function navigationIn() {
    hamburger.classList.add("Hamburger__button--cancel");
    gsap.to("#navigation", {
      duration: .258,
      ease: "power2.out",
      opacity: 1,
      visibility: "visible"
    });
    gsap.to("#navigation .modal__content", {
      delay: .258,
      duration: .3,
      ease: "power2.out",
      translateY: "0%"
    });
  }

  function navigationOut() {
    hamburger.classList.remove("Hamburger__button--cancel");
    gsap.to("#navigation", {
      duration: .258,
      ease: "power2.out",
      opacity: 0,
      visibility: "hidden"
    });
    gsap.to("#navigation .modal__content", {
      duration: .3,
      ease: "power2.out",
      translateY: "-100%"
    });
  } // Mouse hover animation
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