;
(function() {

  'use strict';

  var root = document.documentElement,
      body = document.body,
      // hamburger = document.getElementById("hamburger"),
      modals = body.querySelectorAll('[data-modal]');

  const _kErnel = document.querySelector('._kErnel');

  let modalShown = true,
      scrollPosition = 0;

  if (typeof(modals) != 'undefined' && modals != null && modals.length > 0) {
    Array.prototype.forEach.call(modals, function(modal) {
      modal.addEventListener('click', modalCallback);
    });
  }

  function modalCallback(e) {
    e.preventDefault();

    // get target dataset
    let target = e.target,
        getId = target.dataset.modal;

    // if modal exists in DOM
    let modal = document.getElementById(getId);
    if (typeof(modal) != 'undefined' && modal != null) {

      // console.log(modal);
      modalStateCallback(modal);

      // if clicked hamburger
      // if (hasClass(target, 'Hamburger__button')) {
      //   hamburger.classList.toggle('Hamburger__button--cancel');
      // }

    } else {
      console.log("undefine id: "+ getId);
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
      let dismisses = e.querySelectorAll('[data-dismiss]');
      if (typeof(dismisses) != 'undefined' && dismisses != null && dismisses.length > 0) {
          Array.prototype.forEach.call(dismisses, function(dismiss) {
              dismiss.addEventListener('click', dismissCallback);
          });
      } else {
          console.log("missing: data-dismiss");
      }
  }

  function dismissCallback(e) {
      let target = e.target;
      let targetDismiss = target.closest('.modal');
      removeModal(targetDismiss);
      modalShown = true;

      // return icon or stop animation
      // hamburger.classList.remove("Hamburger__button--cancel");
  }

  function showModal(e) {
      e.classList.add("modal--open");
      // navigationIn();
      scrollPosition = window.pageYOffset;
      _kErnel.style.top = -scrollPosition + 'px';
      root.classList.add('isScrollDisabled');

  }

  function removeModal(e) {
      e.classList.remove("modal--open");
      // navigationOut();
      root.classList.remove('isScrollDisabled');
      _kErnel.style.top = null;
      window.scrollTo(null, scrollPosition);
  }

  // check header
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
