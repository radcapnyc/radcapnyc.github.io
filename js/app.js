/*! ------------------------------------------------
 * Project Name: Blayden - Personal Portfolio & Resume HTML Template
 * Project Description: Show yourself brightly with Blayden - clean and creative portfolio and resume template!
 * Tags: mix_design, resume, portfolio, personal page, cv, template, one page, responsive, html5, css3, creative, clean
 * Version: 1.0.0
 * Build Date: June 2024
 * Last Update: June 2024
 * This product is available exclusively on Themeforest
 * Author: mix_design
 * Author URI: https://themeforest.net/user/mix_design
 * File name: app.js
 * ------------------------------------------------

 * ------------------------------------------------
 * Table of Contents
 * ------------------------------------------------
 *
 *  01. Loader & Loading Animation
 *  02. Bootstrap Scroll Spy Plugin Settings
 *  03. Lenis Scroll Plugin
 *  1A. Logo Transition
 *  04. Scroll to Top Button
 *  05. Stacking Cards
 *  06. Scroll Animations
 *  07. Fade-in Type Effect
 *  1B. Fade-in Skateboards
 *  08. Blocks Marquee
 *  09. Parallax
 *  10. Swiper Slider
 *  11. Typed.js Plugin
 *  12. Magnific Popup
 *  13. Layout Masonry
 *  14. Smooth Scrolling
 *  15. Hidden Menu
 *  16. Buttons Hover Effect
 *  17. SVG Fallback
 *  18. Chrome Smooth Scroll
 *  19. Images Moving Ban
 *  20. Detecting Mobile/Desktop
 *  21. PhotoSwipe Gallery Images Replace
 *  22. Contact Form
 *  23. Color Switch
 *
 * ------------------------------------------------
 * Table of Contents End
 * ------------------------------------------------ */

gsap.registerPlugin(ScrollTrigger);

// --------------------------------------------- //
// Loader & Loading Animation Start
// --------------------------------------------- //
const content = document.querySelector('body');
const imgLoad = imagesLoaded(content);
const loadingWrap = document.querySelector('.loading-wrap');
const loadingItems = loadingWrap.querySelectorAll('.loading__item');
const fadeInItems = document.querySelectorAll('.loading__fade');

function startLoader() {
  let counterElement = document.querySelector(".loader__count .count__text");
  let currentValue = 0;
  function updateCounter() {
    if (currentValue < 100) {
      let increment = Math.floor(Math.random() * 10) + 1;
      currentValue = Math.min(currentValue + increment, 100);
      counterElement.textContent = currentValue;
      let delay = Math.floor(Math.random() * 120) + 25;
      setTimeout(updateCounter, delay);
    }
  }
  updateCounter();
}
startLoader();

imgLoad.on('done', instance => {
  hideLoader();
  pageAppearance();
});

function hideLoader() {
  gsap.to(".loader__count", { duration: 0.8, ease: 'power2.in', y: "100%", delay: 1.8 });
  gsap.to(".loader__wrapper", { duration: 0.8, ease: 'power4.in', y: "-100%", delay: 2.2 });
  setTimeout(() => {
    document.getElementById("loader").classList.add("loaded");
  }, 3200);
}

function pageAppearance() {
  gsap.set(loadingItems, { opacity: 0 })
  gsap.to(loadingItems, { 
    duration: 1.1,
    ease: 'power4',
    startAt: {y: 120},
    y: 0,
    opacity: 1,
    delay: 0.8,
    stagger: 0.05
  }, '>-=1.1');
  gsap.set(fadeInItems, { opacity: 0 });
  gsap.to(fadeInItems, { duration: 0.8, ease: 'none', opacity: 1, delay: 3.2 });
}
// --------------------------------------------- //
// Loader & Loading Animation End
// --------------------------------------------- //

// --------------------------------------------- //
// Bootstrap Scroll Spy Plugin Settings Start
// --------------------------------------------- //
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#menu',
  smoothScroll: true,
  rootMargin: '0px 0px -40%',
});
// --------------------------------------------- //
// Bootstrap Scroll Spy Plugin Settings End
// --------------------------------------------- //

// --------------------------------------------- //
// Lenis Scroll Plugin Start
// --------------------------------------------- //
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
});
gsap.ticker.lagSmoothing(0);
// --------------------------------------------- //
// Lenis Scroll Plugin End
// --------------------------------------------- //
// --------------------------------------------- //
// Logo Transition Start
// --------------------------------------------- //
const observeIntro = () => {
  const introSection = document.querySelector(".main__intro");
  const logoIcon = document.querySelector(".logo-icon");
  const logo = document.querySelector(".logo");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          logoIcon.classList.remove("small");
          logo.classList.remove("slip");
        } else {
          // When .main__intro is out of view, make the logo smaller
          logoIcon.classList.add("small");
          logo.classList.add("slip");
        }
      });
    },
    { threshold: 0.78 } // Trigger when any part of .main__intro goes out of view
  );

  observer.observe(introSection);
};

// Initialize the observer
observeIntro();
// --------------------------------------------- //
// Logo Transition End
// --------------------------------------------- //
// --------------------------------------------- //
// Scroll to Top Button Start
// --------------------------------------------- //
const toTop = document.querySelector("#to-top");

toTop.addEventListener("click", function(event){
  event.preventDefault()
});

toTop.addEventListener("click", () => gsap.to(window, { 
  scrollTo: 0, 
  ease: 'power4.inOut',
  duration: 2,
}));

gsap.set(toTop, { opacity: 0 });

gsap.to(toTop, {
  opacity: 1,
  autoAlpha: 1,
  scrollTrigger: {
    trigger: "body",
    start: "top -20%",
    end: "top -20%",
    toggleActions: "play none reverse none"
  }
});
// --------------------------------------------- //
// Scroll to Top Button End
// --------------------------------------------- //
// --------------------------------------------- //
// 3D Net Effect Start
// --------------------------------------------- //

// Select the element where the canvas will be appended
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Function to set the renderer size based on .home
function setRendererSize() {
    const mainIntro = document.querySelector('.home');
    const { clientWidth, clientHeight } = mainIntro;
    renderer.setSize(clientWidth, clientHeight); // Set renderer size
}

// Append the renderer to .home
document.querySelector('.intro__background').appendChild(renderer.domElement);

// Set initial size based on .home
setRendererSize();

// Optionally handle window resize
window.addEventListener('resize', setRendererSize);


// Net effect
const gridHelper = new THREE.GridHelper(100, 50, 0xee3760, 0xee3760);
scene.add(gridHelper);

camera.position.z = 80;
camera.position.y = -50;
camera.position.x = -60;

// Animation loop for the moving net
function animate() {
  requestAnimationFrame(animate);

  // Add movement to the grid
  gridHelper.rotation.x += 0.004;
  gridHelper.rotation.z += 0.004;

  renderer.render(scene, camera);
}

window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;
  const canvas = renderer.domElement; // Get the canvas element directly

  canvas.style.transform = `translateY(${scrollY * 0.4}px)`; // Apply transform to the canvas
});

animate();

// --------------------------------------------- //
// 3D Net Effect End
// --------------------------------------------- //
// --------------------------------------------- //
// Stacking Cards Start
// --------------------------------------------- //
const cards  = document.querySelectorAll('.stack-item');
const stickySpace  = document.querySelector('.stack-offset');
const animation = gsap.timeline();
let cardHeight;

if(document.querySelector(".stack-item")) {

  function initCards(){
    animation.clear();
    cardHeight = cards[0].offsetHeight;
    //console.log("initCards()", cardHeight);
    cards.forEach((card, index) => {
      if(index > 0){
        gsap.set(card, {y:index * cardHeight});
        animation.to(card, {y:0, duration:index*0.5, ease:"none"},0);
      }
    });
  };
  initCards();

  ScrollTrigger.create({
    trigger: ".stack-wrapper",
    start: "top top",
    pin: true,
    end: ()=>`+=${(cards.length * cardHeight) + stickySpace.offsetHeight}`,
    scrub: true,
    animation: animation,
    //markers: true,
    invalidateOnRefresh: true
  });

  ScrollTrigger.addEventListener("refreshInit", initCards);
};
// --------------------------------------------- //
// Stacking Cards End
// --------------------------------------------- //

// --------------------------------------------- //
// Scroll Animations Start
// --------------------------------------------- //
// Animation In Up
const animateInUp = document.querySelectorAll(".animate-in-up");
animateInUp.forEach((element) => {
  gsap.fromTo(element, {
    opacity: 0,
    y: 50,
    ease: 'sine',
  }, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: element,
      toggleActions: 'play none none reverse',
    }
  });
});

// Animation Cards Stack
// Grid 2x
if(document.querySelector(".animate-card-2")) {
  gsap.set(".animate-card-2", {y: 100, opacity: 0});
  ScrollTrigger.batch(".animate-card-2", {
    interval: 0.1,
    batchMax: 2,
    duration: 6,
    onEnter: batch => gsap.to(batch, {
      opacity: 1, 
      y: 0,
      ease: 'sine',
      stagger: {each: 0.15, grid: [1, 2]}, 
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {opacity: 1, y: 0, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true})
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-2", {y: 0, opacity: 1}));
};

//Inverted
// Grid 2x
if(document.querySelector(".animate-card-2b")) {
  gsap.set(".animate-card-2b", {y: 100, opacity: 0, scaleX: -1});
  ScrollTrigger.batch(".animate-card-2b", {
    interval: 0.1,
    batchMax: 2,
    duration: 6,
    onEnter: batch => gsap.to(batch, {
      opacity: 1, 
      y: 0,
      ease: 'sine',
      stagger: {each: 0.15, grid: [1, 2]}, 
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {opacity: 1, y: 0, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true})
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-2", {y: 0, opacity: 1, scaleX: -1}));
};

// Grid 3x
if(document.querySelector(".animate-card-3")) {
  gsap.set(".animate-card-3", {y: 50, opacity: 0});
  ScrollTrigger.batch(".animate-card-3", {
    interval: 0.1,
    batchMax: 3,
    duration: 3,
    onEnter: batch => gsap.to(batch, {
      opacity: 1, 
      y: 0,
      ease: 'sine',
      stagger: {each: 0.15, grid: [1, 3]}, 
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {opacity: 1, y: 0, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 50, overwrite: true})
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-3", {y: 0, opacity: 1}));
};

// Grid 4x
if(document.querySelector(".animate-card-4")) {
  gsap.set(".animate-card-4", {y: 50, opacity: 0});
  ScrollTrigger.batch(".animate-card-4", {
    interval: 0.1,
    batchMax: 4,
    delay: 1000,
    onEnter: batch => gsap.to(batch, {
      opacity: 1, 
      y: 0,
      ease: 'sine',
      stagger: {each: 0.15, grid: [1, 4]}, 
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {opacity: 1, y: 0, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 50, overwrite: true})
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-4", {y: 0, opacity: 1}));
};

// Grid 5x
if(document.querySelector(".animate-card-5")) {
  gsap.set(".animate-card-5", {y: 50, opacity: 0});
  ScrollTrigger.batch(".animate-card-5", {
    interval: 0.1,
    batchMax: 5,
    delay: 1000,
    onEnter: batch => gsap.to(batch, {
      opacity: 1, 
      y: 0,
      ease: 'sine',
      stagger: {each: 0.15, grid: [1, 5]}, 
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {opacity: 1, y: 0, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 50, overwrite: true})
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-5", {y: 0, opacity: 1}));
};

// --------------------------------------------- //
// Fade-in Type Effect Start
// --------------------------------------------- //
const splitTypes = document.querySelectorAll(".reveal-type");
splitTypes.forEach((char,i) => {
  const text = new SplitType(char, { types: 'words, chars' });
  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: char,
      start: 'top 70%',
      end: 'top 30%',
      scrub: true,
      markers: false
    },
    opacity: 0.1,
    stagger: 0.1
  });
});
// --------------------------------------------- //
// Fade-in Type Effect End
// --------------------------------------------- //

// --------------------------------------------- //
// Blocks Marquee Start
// --------------------------------------------- //
const initMarquee = () => {
  const items = [...document.querySelectorAll(".items--gsap")];
  if (items) {
    const marqueeObject = {
      el: null,
      width: 0
    };
    items.forEach((itemBlock) => {
      marqueeObject.el = itemBlock.querySelector(".items__container");
      marqueeObject.width = marqueeObject.el.offsetWidth;
			marqueeObject.el.innerHTML += marqueeObject.el.innerHTML;
      //let dirFromLeft = "-=50%";
			let dirFromRight = "+=50%";
      let master = gsap
        .timeline()
        //.add(marquee(marqueeObject.el, 20, dirFromLeft), 0);
        .add(marquee(marqueeObject.el, 40, dirFromRight), 0);
      let tween = gsap.to(master, { 
        duration: 1.5, 
        timeScale: 1, 
        paused: true 
      });
      let timeScaleClamp = gsap.utils.clamp(1, 6);
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          master.timeScale(timeScaleClamp(Math.abs(self.getVelocity() / 200)));
          tween.invalidate().restart();
        }
			});
    });
  }
};
const marquee = (item, time, direction) => {
  let mod = gsap.utils.wrap(0, 50);
  return gsap.to(item, {
    duration: time,
    ease: "none",
    x: direction,
    modifiers: {
      x: (x) => (direction = mod(parseFloat(x)) + "%")
    },
    repeat: -1
  });
};
initMarquee();
// --------------------------------------------- //
// Blocks Marquee End
// --------------------------------------------- //

// ------------------------------------------------------------------------------ //
// Parallax (apply parallax effect to any element with a data-speed attribute) Start
// ------------------------------------------------------------------------------ //
gsap.to("[data-speed]", {
  y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window) ,
  ease: "none",
  scrollTrigger: {
    start: 0,
    end: "max",
    invalidateOnRefresh: true,
    scrub: 0
  }
});
// --------------------------------------------- //
// Parallax End
// --------------------------------------------- //

// --------------------------------------------- //
// Swiper Slider Start
// --------------------------------------------- //
const testimonialsSlider = document.querySelector("testimonials-slider");

if (!testimonialsSlider) {
  const swiper = new Swiper('.swiper-testimonials', {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: true,
    speed: 1000,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};
// --------------------------------------------- //
// Swiper Slider Start
// --------------------------------------------- //

$(window).on("load", function() {
   
  "use strict";
  
  // --------------------------------------------- //
  // Typed.js Plugin Settings Start
  // --------------------------------------------- //
  var animatedHeadline = $(".animated-type");
  if(animatedHeadline.length){
    var typed = new Typed('#typed', {
      stringsElement: '#typed-strings',
      loop: true,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2500
    });
  }
  // --------------------------------------------- //
  // Typed.js Plugin Settings End
  // --------------------------------------------- //

});

$(function() {

  "use strict";

  // --------------------------------------------- //
  // Magnific Popup Start
  // --------------------------------------------- //
  $(".popup-trigger").magnificPopup({
    type: "inline",
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: "scroll",
    preloader: false,
    midClick: true,
    removalDelay: 600,
    mainClass: "mfp-fade",
  });
  // --------------------------------------------- //
  // Magnific Popup End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Layout Masonry After Each Image Loads Start
  // --------------------------------------------- //
  $('.my-gallery').imagesLoaded().progress( function() {
    $('.my-gallery').masonry('layout');
  });
  // --------------------------------------------- //
  // Layout Masonry After Each Image Loads End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Smooth Scrolling Start
  // --------------------------------------------- //
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });
  // --------------------------------------------- //
  // Smooth Scrolling End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Hidden Menu Start
  // --------------------------------------------- //
  const menu = document.getElementById('menu');
  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    menu.classList.add('show');
    header.classList.add('show');
  } else if (scrollTop < lastScrollTop && scrollTop < 40) {
    // Scrolling up and close to the top
    menu.classList.remove('show');
    header.classList.remove('show');
  }

  // Update the last scroll position
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // --------------------------------------------- //
  // Hidden Menu End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Buttons Hover Effect Start
  // --------------------------------------------- //
  $('.hover-default, .hover-circle, .circle, .inner-video-trigger, .socials-cards__link')
  .on('mouseenter', function(e) {
    var parentOffset = $(this).offset(),
      relX = e.pageX - parentOffset.left,
      relY = e.pageY - parentOffset.top;
    $(this).find('em').css({top:relY, left:relX})
  })
  .on('mouseout', function(e) {
    var parentOffset = $(this).offset(),
      relX = e.pageX - parentOffset.left,
      relY = e.pageY - parentOffset.top;
    $(this).find('em').css({top:relY, left:relX})
  });
  // --------------------------------------------- //
  // Buttons Hover Effect Start
  // --------------------------------------------- //

  // --------------------------------------------- //
  // SVG Fallback Start
  // --------------------------------------------- //
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };
  // --------------------------------------------- //
  // SVG Fallback End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Chrome Smooth Scroll Start
  // --------------------------------------------- //
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {
  };
  // --------------------------------------------- //
  // Chrome Smooth Scroll End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Images Moving Ban Start
  // --------------------------------------------- //
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });
  // --------------------------------------------- //
  // Images Moving Ban End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Detecting Mobile/Desktop Start
  // --------------------------------------------- //
  var isMobile = false;
  if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('html').addClass('touch');
    isMobile = true;
  }
  else {
    $('html').addClass('no-touch');
    isMobile = false;
  }
  //IE, Edge
  var isIE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent);
  // --------------------------------------------- //
  // Detecting Mobile/Desktop End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace Start
  // --------------------------------------------- //
  $('.gallery__link').each(function(){
    $(this)
    .append('<div class="picture"></div>')
    .children('.picture').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
  });
  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Contact Form Start
  // --------------------------------------------- //
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var formData = new FormData(this); // Create FormData object from the form

    fetch('mail.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      // Show success or error message based on the response
      const formReply = document.getElementById('form-reply');
      formReply.style.display = 'block'; // Make the reply container visible
      if (data.includes('success')) {
        formReply.innerHTML = `
          <i class="ph-thin ph-smiley reply__icon"></i>
          <p class="reply__title">Done!</p>
          <span class="reply__text">Thanks for your message. I'll get back to you during business hours.</span>
          <button onclick="resetForm()">Reset Form</button>
          <a href="https://instagram.com/yourprofile" target="_blank">Visit our Instagram</a>
        `;
      } else {
        formReply.innerHTML = `
          <i class="ph-thin ph-smiley reply__icon"></i>
          <p class="reply__title">Error!</p>
          <span class="reply__text">There was an issue sending your message. Please try again later.</span>
          <button onclick="resetForm()">Reset Form</button>
          <a href="https://instagram.com/yourprofile" target="_blank">Visit our Instagram</a>
        `;
      }
      document.getElementById('contact-form').reset(); // Reset the form fields
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  function resetForm() {
    document.getElementById('form-reply').style.display = 'none'; // Hide reply messages
    document.getElementById('contact-form').reset(); // Reset form fields
  }
  // --------------------------------------------- //
  // Contact Form End
  // --------------------------------------------- //

});

// --------------------------------------------- //
// Color Switch Start
// --------------------------------------------- //
// const themeBtn = document.querySelector('.color-switcher');

// function getCurrentTheme(){
//   let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//   localStorage.getItem('template.theme') ? theme = localStorage.getItem('template.theme') : null;
//   return theme;
// }

// function loadTheme(theme){
//   const root = document.querySelector(':root');
//   root.setAttribute('color-scheme', `${theme}`);
// };

// themeBtn.addEventListener('click', () => {
//   let theme = getCurrentTheme();
//   if(theme === 'dark'){
//     theme = 'light';
//   } else {
//     theme = 'dark';
//   }
//   localStorage.setItem('template.theme', `${theme}`);
//   loadTheme(theme);
// });

// window.addEventListener('DOMContentLoaded', () => {
//   loadTheme(getCurrentTheme());
// });
// --------------------------------------------- //
// Color Switch End
// --------------------------------------------- //
// --------------------------------------------- //
// Room Start
// --------------------------------------------- //

var img = document.getElementById("image");
var transformed = false;
img.onclick = function(){
  if(transformed == false) {
    this.classList.add('transform');
    transformed = true;
  }
  else {
    this.classList.remove('transform');
    transformed = false;
  }

}
// --------------------------------------------- //
// Room End
// --------------------------------------------- //