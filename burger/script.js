// Timelines state variables
let burgerTl1, burgerTl2, fantaTl1, fantaTl2, pzTl1, pzTl2;

function killTimelines() {
    // Safely kill all active ScrollTrigger instances globally
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
    
    // Safely kill timelines and nullify references to prevent memory leaks or running animations on other themes
    if (burgerTl1) { burgerTl1.kill(); burgerTl1 = null; }
    if (burgerTl2) { burgerTl2.kill(); burgerTl2 = null; }
    if (fantaTl1) { fantaTl1.kill(); fantaTl1 = null; }
    if (fantaTl2) { fantaTl2.kill(); fantaTl2 = null; }
    if (pzTl1) { pzTl1.kill(); pzTl1 = null; }
    if (pzTl2) { pzTl2.kill(); pzTl2 = null; }
    
    // Clear all GSAP inline styles to restore clean starting state
    gsap.set("#burger, #tomato, #onion, #bleaf, #chilli, #burger1, #burger2, .fries", {clearProps: "all"});
    gsap.set("#fanta-fanta, #fanta-orange-cut, #fanta-orange, #fanta-leaf, #fanta-leaf2, #fanta-leaf3, .fanta-lemon1, #fanta-cocacola, .fanta-lemon2, #fanta-pepsi", {clearProps: "all"});
    gsap.set("#pz-pizza, #pz-tomato, #pz-onion, #pz-cheese, #pz-chilli, #pz-leaf3, .pz-sweetcorn1, #pz-pizza2, .pz-sweetcorn2, #pz-pizza1", {clearProps: "all"});
}

function initTimelines() {
    killTimelines();
    
    if (currentTheme === 'burger') {
        burgerTl1 = gsap.timeline({scrollTrigger:{
            trigger: ".burger-section.two",
            start: "0% 95%",
            end: "70% 50%",
            scrub: true,
        }});

        burgerTl1.to("#burger",{
            top: "120%",
            left: "10%"
        }, 'onion');
        burgerTl1.to("#tomato",{
            top:"160%",
            left: "23%"
        }, 'onion');
        burgerTl1.to("#onion",{
            width: "15%",
            top:"160%",
            right: "10%"
        }, 'onion');
        burgerTl1.to("#bleaf",{
            top:"110%",
            rotate: "130deg",
            left: "70%"
        }, 'onion');
        burgerTl1.to("#chilli",{
            top:"110%",
            rotate: "130deg",
            left: "0%"
        }, 'onion');

        burgerTl2 = gsap.timeline({scrollTrigger:{
            trigger: ".burger-section.three",
            start: "0% 95%",
            end: "20% 50%",
            scrub: true,
        }});
        burgerTl2.from("#burger1",{
            x: -500,
            y: 300,
            rotation: -90,
            duration: 1,
            immediateRender:false
        }, "ca");
        burgerTl2.from(".fries",{
            x: 500,
            y: 300,
            rotation: 90,
            duration: 1,
            immediateRender:false
        }, "ca");
        burgerTl2.from("#burger2",{
            x: 500,
            y: 300,
            rotation: 90,
            duration: 1,
            immediateRender:false
        }, "ca");
        burgerTl2.to("#tomato",{
            width:"12%",
            left:"44%",
            top:"205%"
        }, 'ca');
        burgerTl2.to("#burger",{
            width:"25%",
            top:"214%",
            left:"37.5%",
        }, 'ca');
        
    } else if (currentTheme === 'fanta') {
        fantaTl1 = gsap.timeline({scrollTrigger:{
            trigger: ".fanta-section.fanta-two",
            start: "0% 95%",
            end: "70% 50%",
            scrub: true,
        }});

        fantaTl1.to("#fanta-fanta",{
            top: "120%",
            left: "0%"
        }, 'orange');
        fantaTl1.to("#fanta-orange-cut",{
            top:"160%",
            left: "23%"
        }, 'orange');
        fantaTl1.to("#fanta-orange",{
            width: "15%",
            top:"160%",
            right: "10%"
        }, 'orange');
        fantaTl1.to("#fanta-leaf",{
            top:"110%",
            rotate: "130deg",
            left: "70%"
        }, 'orange');
        fantaTl1.to("#fanta-leaf2",{
            top:"110%",
            rotate: "130deg",
            left: "0%"
        }, 'orange');

        fantaTl2 = gsap.timeline({scrollTrigger:{
            trigger: ".fanta-section.fanta-three",
            start: "0% 95%",
            end: "20% 50%",
            scrub: true,
        }});

        fantaTl2.from(".fanta-lemon1",{
            rotate: "-90deg",
            left: "-100%",
            top: "110%"
        }, 'ca');
        fantaTl2.from("#fanta-cocacola",{
            rotate: "-90deg",
            top: "110%",
            left: "-100%",
        }, 'ca');
        fantaTl2.from(".fanta-lemon2",{
            rotate: "90deg",
            left: "100%",
            top: "110%"
        }, 'ca');
        fantaTl2.from("#fanta-pepsi",{
            rotate: "90deg",
            top: "110%",
            left: "100%",
        }, 'ca');
        fantaTl2.to("#fanta-orange-cut",{
            width:"15vw",
            left: "50%",
            top: "202%",
            xPercent: -50,
            yPercent: 0
        }, 'ca');
        fantaTl2.to("#fanta-fanta",{
            width:"30vw",
            top: "208%",
            left: "50%",
            xPercent: -50,
            yPercent: 0
        }, 'ca');
    } else if (currentTheme === 'pizza') {
         pzTl1 = gsap.timeline({scrollTrigger:{
             trigger: ".pz-section.pz-two",
             start: "0% 95%",
             end: "70% 50%",
             scrub: true,
         }});

          pzTl1.to("#pz-pizza",{
              width: "32%",
              top: "120%",
              left: "4%"
          }, 'onion1');
          pzTl1.to("#pz-tomato",{
              width: "12%",
              top: "160%",
              left: "21%"
          }, 'onion1');
          pzTl1.to("#pz-onion",{
              width: "12%",
              top: "160%",
              right: "10%"
          }, 'onion1');
          pzTl1.to("#pz-cheese",{
              width: "14%",
              top: "110%",
              rotate: "130deg",
              left: "72%"
          }, 'onion1');
          pzTl1.to("#pz-chilli",{
              width: "9%",
              top: "110%",
              rotate: "130deg",
              left: "2%"
          }, 'onion1');

         pzTl2 = gsap.timeline({scrollTrigger:{
             trigger: ".pz-section.pz-three",
             start: "0% 95%",
             end: "20% 50%",
             scrub: true,
         }});

         pzTl2.from(".pz-sweetcorn1",{
             rotate: "-90deg",
             left: "-100%",
             top: "110%"
         }, 'ca');
         pzTl2.from("#pz-pizza2",{
             rotate: "-90deg",
             top: "110%",
             left: "-100%",
         }, 'ca');

         pzTl2.from(".pz-sweetcorn2",{
             rotate: "90deg",
             left: "100%",
             top: "110%"
         }, 'ca');
         pzTl2.from("#pz-pizza1",{
             rotate: "90deg",
             top: "110%",
             left: "100%",
         }, 'ca');

         pzTl2.to("#pz-tomato",{
             width:"15%",
             left: "42.5%",
             top: "204%"
         }, 'ca');
         pzTl2.to("#pz-pizza",{
             width:"27%",
             top: "210%",
             left: "36.5%",
         }, 'ca');
     }
}

// Theme Switcher Logic
let currentTheme = 'burger';

function switchTheme(theme) {
    currentTheme = theme;
    
    // Reset scroll position to top to prevent GSAP trigger/animation misalignment
    window.scrollTo(0, 0);
    
    const burgerSections = document.querySelectorAll('.burger-section');
    const fantaSections = document.querySelectorAll('.fanta-section');
    const pzSections = document.querySelectorAll('.pz-section');
    
    // Clear active theme class on buttons
    const burgerBtn = document.getElementById('burger-theme');
    const fantaBtn = document.getElementById('fanta-theme');
    const pizzaBtn = document.getElementById('pizza-theme');
    
    if (burgerBtn) burgerBtn.classList.remove('active-theme');
    if (fantaBtn) fantaBtn.classList.remove('active-theme');
    if (pizzaBtn) pizzaBtn.classList.remove('active-theme');
    
    if (theme === 'burger') {
        burgerSections.forEach(el => el.style.display = '');
        fantaSections.forEach(el => el.style.display = 'none');
        pzSections.forEach(el => el.style.display = 'none');
        
        if (burgerBtn) burgerBtn.classList.add('active-theme');

        // Update Nav links hrefs
        const homeLink = document.querySelector('.cntr-nav a[href*="home"]');
        const flavourLink = document.querySelector('.cntr-nav a[href*="flavour"]');
        const menuLink = document.querySelector('.cntr-nav a[href*="menu-section"]');
        if (homeLink) homeLink.setAttribute('href', '#home');
        if (flavourLink) flavourLink.setAttribute('href', '#flavour');
        if (menuLink) menuLink.setAttribute('href', '#menu-section');
    } else if (theme === 'fanta') {
        burgerSections.forEach(el => el.style.display = 'none');
        fantaSections.forEach(el => el.style.display = 'flex');
        pzSections.forEach(el => el.style.display = 'none');
        
        if (fantaBtn) fantaBtn.classList.add('active-theme');

        // Update Nav links hrefs
        const homeLink = document.querySelector('.cntr-nav a[href*="home"]');
        const flavourLink = document.querySelector('.cntr-nav a[href*="flavour"]');
        const menuLink = document.querySelector('.cntr-nav a[href*="menu-section"]');
        if (homeLink) homeLink.setAttribute('href', '#fanta-home');
        if (flavourLink) flavourLink.setAttribute('href', '#fanta-flavour');
        if (menuLink) menuLink.setAttribute('href', '#fanta-menu-section');
    } else if (theme === 'pizza') {
        burgerSections.forEach(el => el.style.display = 'none');
        fantaSections.forEach(el => el.style.display = 'none');
        pzSections.forEach(el => el.style.display = 'flex');
        
        if (pizzaBtn) pizzaBtn.classList.add('active-theme');

        // Update Nav links hrefs
        const homeLink = document.querySelector('.cntr-nav a[href*="home"]');
        const flavourLink = document.querySelector('.cntr-nav a[href*="flavour"]');
        const menuLink = document.querySelector('.cntr-nav a[href*="menu-section"]');
        if (homeLink) homeLink.setAttribute('href', '#pz-home');
        if (flavourLink) flavourLink.setAttribute('href', '#pz-flavour');
        if (menuLink) menuLink.setAttribute('href', '#pz-menu-section');
    }
    
    // Recreate the active theme's timelines when elements are visible in DOM
    initTimelines();
    ScrollTrigger.refresh();
    // Delayed refresh to let browser layout calculate heights correctly
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
}

// Setup Event Listeners
const burgerThemeBtn = document.getElementById('burger-theme');
const fantaThemeBtn = document.getElementById('fanta-theme');
const pizzaThemeBtn = document.getElementById('pizza-theme');

if (burgerThemeBtn) burgerThemeBtn.addEventListener('click', () => switchTheme('burger'));
if (fantaThemeBtn) fantaThemeBtn.addEventListener('click', () => switchTheme('fanta'));
if (pizzaThemeBtn) pizzaThemeBtn.addEventListener('click', () => switchTheme('pizza'));

// Menu Toggle
const menu = document.querySelector("#menu");
const nav = document.querySelector(".cntr-nav");

if (menu && nav) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("show");
    });
}

window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});

const viewMore = document.getElementById("viewMore");
if (viewMore) {
    viewMore.addEventListener("click", () => {
        document.querySelectorAll(".more").forEach(item => {
            item.style.display = "flex";
        });
        viewMore.style.display = "none";
    });
}

// Navigate to restaurant details on click
document.querySelectorAll(".restaurant-item").forEach(item => {
    item.addEventListener("click", () => {
        const name = item.querySelector("span").innerText;
        const logo = item.querySelector("img").getAttribute("src");
        window.location.href = `restaurant.html?name=${encodeURIComponent(name)}&logo=${encodeURIComponent(logo)}`;
    });
});

// Update Cart Count Globally
function updateGlobalCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if(cartCountEl) {
        cartCountEl.innerText = count;
    }
}
updateGlobalCartCount();

// Set initial theme
switchTheme('burger');