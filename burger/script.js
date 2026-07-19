// Timelines state variables
let burgerTl1, burgerTl2, fantaTl1, fantaTl2, pzTl1, pzTl2;
let mm;

function killTimelines() {
    // Safely revert matchMedia animations
    if (mm) {
        mm.revert();
        mm = null;
    }

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
    gsap.set("#burger, #tomato, #onion, #bleaf, #chilli, #burger1, #burger2, .fries, .mid-card-img", {clearProps: "all"});
    gsap.set("#fanta-fanta, #fanta-orange-cut, #fanta-orange, #fanta-leaf, #fanta-leaf2, #fanta-leaf3, .fanta-lemon1, #fanta-cocacola, .fanta-lemon2, #fanta-pepsi", {clearProps: "all"});
    gsap.set("#pz-pizza, #pz-tomato, #pz-onion, #pz-cheese, #pz-chilli, #pz-leaf3, .pz-sweetcorn1, #pz-pizza2, .pz-sweetcorn2, #pz-pizza1", {clearProps: "all"});
}

function initTimelines() {
    killTimelines();
    mm = gsap.matchMedia();
    
    if (currentTheme === 'burger') {
        // Desktop Animations
        mm.add("(min-width: 993px)", () => {
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
        });

        // Mobile/Tablet Animations
        mm.add("(max-width: 992px)", () => {
            burgerTl1 = gsap.timeline({scrollTrigger:{
                trigger: ".burger-section.two",
                start: "0% 95%",
                end: "70% 50%",
                scrub: true,
            }});

            burgerTl1.to("#burger",{
                top: "115%",
                left: "50%",
                xPercent: -50,
                width: "45%"
            }, 'onion');
            burgerTl1.to("#tomato",{
                top: "110%",
                left: "50%",
                xPercent: -50,
                width: "20%"
            }, 'onion');
            burgerTl1.to("#onion",{
                top: "122%",
                left: "50%",
                xPercent: -50,
                width: "22%"
            }, 'onion');
            burgerTl1.to("#bleaf",{
                top: "105%",
                left: "50%",
                xPercent: -50,
                rotate: "130deg",
                width: "22%"
            }, 'onion');
            burgerTl1.to("#chilli",{
                top: "125%",
                left: "50%",
                xPercent: -50,
                rotate: "130deg",
                width: "15%"
            }, 'onion');

            // Fade out hero items when entering section three
            gsap.to("#burger, #tomato, #onion, #bleaf, #chilli", {
                opacity: 0,
                scrollTrigger: {
                    trigger: ".burger-section.three",
                    start: "top 95%",
                    end: "top 40%",
                    scrub: true
                }
            });

            // Card 1 (BBQ Burger)
            gsap.from(".burger-section.three .card:nth-child(1) #burger1, .burger-section.three .card:nth-child(1) .fries", {
                scrollTrigger: {
                    trigger: ".burger-section.three .card:nth-child(1)",
                    start: "top 95%",
                    end: "top 55%",
                    scrub: true,
                },
                x: (index, target) => target.id === 'burger1' ? -150 : 150,
                opacity: 0,
                scale: 0.8,
                rotation: (index, target) => target.id === 'burger1' ? -30 : 30,
                duration: 1
            });

            // Card 2 (Cheese Burger)
            gsap.from(".burger-section.three .card:nth-child(2) .mid-card-img", {
                scrollTrigger: {
                    trigger: ".burger-section.three .card:nth-child(2)",
                    start: "top 95%",
                    end: "top 55%",
                    scrub: true,
                },
                scale: 0.6,
                opacity: 0,
                y: 50,
                duration: 1
            });

            // Card 3 (Chicken Burger)
            gsap.from(".burger-section.three .card:nth-child(3) #burger2, .burger-section.three .card:nth-child(3) .lemon", {
                scrollTrigger: {
                    trigger: ".burger-section.three .card:nth-child(3)",
                    start: "top 95%",
                    end: "top 55%",
                    scrub: true,
                },
                x: (index, target) => target.id === 'burger2' ? -150 : 150,
                opacity: 0,
                scale: 0.8,
                rotation: (index, target) => target.id === 'burger2' ? -30 : 30,
                duration: 1
            });
        });
        
    } else if (currentTheme === 'fanta') {
        // Desktop Animations
        mm.add("(min-width: 993px)", () => {
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
        });

        // Mobile/Tablet Animations
        mm.add("(max-width: 992px)", () => {
            fantaTl1 = gsap.timeline({scrollTrigger:{
                trigger: ".fanta-section.fanta-two",
                start: "0% 95%",
                end: "70% 50%",
                scrub: true,
            }});

            fantaTl1.to("#fanta-fanta",{
                top: "115%",
                left: "50%",
                xPercent: -50,
                width: "45%"
            }, 'orange');
            fantaTl1.to("#fanta-orange-cut",{
                top: "110%",
                left: "50%",
                xPercent: -50,
                width: "20%"
            }, 'orange');
            fantaTl1.to("#fanta-orange",{
                top: "122%",
                left: "50%",
                xPercent: -50,
                width: "22%"
            }, 'orange');
            fantaTl1.to("#fanta-leaf",{
                top: "105%",
                left: "50%",
                xPercent: -50,
                rotate: "130deg",
                width: "22%"
            }, 'orange');
            fantaTl1.to("#fanta-leaf2",{
                top: "125%",
                left: "50%",
                xPercent: -50,
                rotate: "130deg",
                width: "15%"
            }, 'orange');

            // Fade out hero items when entering fanta-three
            gsap.to("#fanta-fanta, #fanta-orange-cut, #fanta-orange, #fanta-leaf, #fanta-leaf2, #fanta-leaf3", {
                opacity: 0,
                scrollTrigger: {
                    trigger: ".fanta-section.fanta-three",
                    start: "top 95%",
                    end: "top 40%",
                    scrub: true
                }
            });

            // Card 1 (Coca Cola)
            gsap.from(".fanta-section.fanta-three .fanta-card:nth-child(1) #fanta-cocacola, .fanta-section.fanta-three .fanta-card:nth-child(1) .fanta-lemon1", {
                scrollTrigger: {
                    trigger: ".fanta-section.fanta-three .fanta-card:nth-child(1)",
                    start: "top 95%",
                    end: "top 55%",
                    scrub: true,
                },
                x: (index, target) => target.id === 'fanta-cocacola' ? -150 : 150,
                opacity: 0,
                scale: 0.8,
                rotation: (index, target) => target.id === 'fanta-cocacola' ? -30 : 30,
                duration: 1
            });

            // Card 2 (Fanta)
            gsap.from(".fanta-section.fanta-three .fanta-card:nth-child(2) .mid-card-img", {
                scrollTrigger: {
                    trigger: ".fanta-section.fanta-three .fanta-card:nth-child(2)",
                    start: "top 95%",
                    end: "top 55%",
                    scrub: true,
                },
                scale: 0.6,
                opacity: 0,
                y: 50,
                duration: 1
            });

            // Card 3 (Pepsi)
            gsap.from(".fanta-section.fanta-three .fanta-card:nth-child(3) #fanta-pepsi, .fanta-section.fanta-three .fanta-card:nth-child(3) .fanta-lemon2", {
                scrollTrigger: {
                    trigger: ".fanta-section.fanta-three .fanta-card:nth-child(3)",
                    start: "top 95%",
                    end: "top 55%",
                    scrub: true,
                },
                x: (index, target) => target.id === 'fanta-pepsi' ? -150 : 150,
                opacity: 0,
                scale: 0.8,
                rotation: (index, target) => target.id === 'fanta-pepsi' ? -30 : 30,
                duration: 1
            });
        });

    } else if (currentTheme === 'pizza') {
        // Desktop Animations
        mm.add("(min-width: 993px)", () => {
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
        });

        // Mobile/Tablet Animations
        mm.add("(max-width: 992px)", () => {
             pzTl1 = gsap.timeline({scrollTrigger:{
                 trigger: ".pz-section.pz-two",
                 start: "0% 95%",
                 end: "70% 50%",
                 scrub: true,
             }});

              pzTl1.to("#pz-pizza",{
                  top: "115%",
                  left: "50%",
                  xPercent: -50,
                  width: "45%"
              }, 'onion1');
              pzTl1.to("#pz-tomato",{
                  top: "110%",
                  left: "50%",
                  xPercent: -50,
                  width: "20%"
              }, 'onion1');
              pzTl1.to("#pz-onion",{
                  top: "122%",
                  left: "50%",
                  xPercent: -50,
                  width: "22%"
              }, 'onion1');
              pzTl1.to("#pz-cheese",{
                  top: "105%",
                  left: "50%",
                  xPercent: -50,
                  rotate: "130deg",
                  width: "22%"
              }, 'onion1');
              pzTl1.to("#pz-chilli",{
                  top: "125%",
                  left: "50%",
                  xPercent: -50,
                  rotate: "130deg",
                  width: "15%"
              }, 'onion1');

             // Fade out hero items when entering pz-three
             gsap.to("#pz-pizza, #pz-tomato, #pz-onion, #pz-cheese, #pz-chilli, #pz-leaf3", {
                 opacity: 0,
                 scrollTrigger: {
                     trigger: ".pz-section.pz-three",
                     start: "top 95%",
                     end: "top 40%",
                     scrub: true
                 }
             });

             // Card 1 (Pizza 2)
             gsap.from(".pz-section.pz-three .pz-card:nth-child(1) #pz-pizza2, .pz-section.pz-three .pz-card:nth-child(1) .pz-sweetcorn1", {
                 scrollTrigger: {
                     trigger: ".pz-section.pz-three .pz-card:nth-child(1)",
                     start: "top 95%",
                     end: "top 55%",
                     scrub: true,
                 },
                 x: (index, target) => target.id === 'pz-pizza2' ? -150 : 150,
                 opacity: 0,
                 scale: 0.8,
                 rotation: (index, target) => target.id === 'pz-pizza2' ? -30 : 30,
                 duration: 1
             });

             // Card 2 (Margherita)
             gsap.from(".pz-section.pz-three .pz-card:nth-child(2) .mid-card-img", {
                 scrollTrigger: {
                     trigger: ".pz-section.pz-three .pz-card:nth-child(2)",
                     start: "top 95%",
                     end: "top 55%",
                     scrub: true,
                 },
                 scale: 0.6,
                 opacity: 0,
                 y: 50,
                 duration: 1
             });

             // Card 3 (Pizza 1)
             gsap.from(".pz-section.pz-three .pz-card:nth-child(3) #pz-pizza1, .pz-section.pz-three .pz-card:nth-child(3) .pz-sweetcorn2", {
                 scrollTrigger: {
                     trigger: ".pz-section.pz-three .pz-card:nth-child(3)",
                     start: "top 95%",
                     end: "top 55%",
                     scrub: true,
                 },
                 x: (index, target) => target.id === 'pz-pizza1' ? -150 : 150,
                 opacity: 0,
                 scale: 0.8,
                 rotation: (index, target) => target.id === 'pz-pizza1' ? -30 : 30,
                 duration: 1
             });
        });
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

        // Update Nav links hrefs only appropriately depending on whether we are on index.html or a subpage
        const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/burger');
        const prefix = isIndexPage ? '' : 'index.html';

        const homeLink = document.querySelector('.cntr-nav a[href*="home"]');
        const flavourLink = document.querySelector('.cntr-nav a[href*="flavour"]');
        const menuLink = document.querySelector('.cntr-nav a[href*="menu-section"]');

        if (homeLink) homeLink.setAttribute('href', prefix + '#home');
        if (flavourLink) flavourLink.setAttribute('href', prefix + '#flavour');
        if (menuLink) menuLink.setAttribute('href', prefix + '#menu-section');
    } else if (theme === 'fanta') {
        burgerSections.forEach(el => el.style.display = 'none');
        fantaSections.forEach(el => el.style.display = 'flex');
        pzSections.forEach(el => el.style.display = 'none');
        
        if (fantaBtn) fantaBtn.classList.add('active-theme');

        const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/burger');
        const prefix = isIndexPage ? '' : 'index.html';

        const homeLink = document.querySelector('.cntr-nav a[href*="home"]');
        const flavourLink = document.querySelector('.cntr-nav a[href*="flavour"]');
        const menuLink = document.querySelector('.cntr-nav a[href*="menu-section"]');

        if (homeLink) homeLink.setAttribute('href', prefix + '#fanta-home');
        if (flavourLink) flavourLink.setAttribute('href', prefix + '#fanta-flavour');
        if (menuLink) menuLink.setAttribute('href', prefix + '#fanta-menu-section');
    } else if (theme === 'pizza') {
        burgerSections.forEach(el => el.style.display = 'none');
        fantaSections.forEach(el => el.style.display = 'none');
        pzSections.forEach(el => el.style.display = 'flex');
        
        if (pizzaBtn) pizzaBtn.classList.add('active-theme');

        const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/burger');
        const prefix = isIndexPage ? '' : 'index.html';

        const homeLink = document.querySelector('.cntr-nav a[href*="home"]');
        const flavourLink = document.querySelector('.cntr-nav a[href*="flavour"]');
        const menuLink = document.querySelector('.cntr-nav a[href*="menu-section"]');

        if (homeLink) homeLink.setAttribute('href', prefix + '#pz-home');
        if (flavourLink) flavourLink.setAttribute('href', prefix + '#pz-flavour');
        if (menuLink) menuLink.setAttribute('href', prefix + '#pz-menu-section');
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

// Check Login Status and Update Navbar
document.addEventListener("DOMContentLoaded", () => {
    const profileStr = localStorage.getItem('profile');
    if (profileStr) {
        try {
            const profile = JSON.parse(profileStr);
            if (profile && profile.name) {
                const firstName = profile.name.split(' ')[0];
                const signBtns = document.querySelectorAll('.sign-btn');
                signBtns.forEach(btn => {
                    btn.innerHTML = `<i class="ri-user-line" style="margin-right:5px; vertical-align:middle;"></i> ${firstName}`;
                    btn.href = 'profile.html';
                });
            }
        } catch(e) {
            console.error('Error parsing profile data', e);
        }
    }
});

// Custom Toast Notification Function
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    const icon = type === 'error' ? '<i class="ri-error-warning-line"></i>' : '<i class="ri-checkbox-circle-line"></i>';
    toast.innerHTML = `${icon} <span>${message}</span>`;
    document.body.appendChild(toast);
    
    // Trigger reflow to play animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Override default window.alert globally
window.alert = function(msg) {
    // Determine type by looking for words like 'invalid', 'error', 'wrong', 'already' in message
    const msgLower = msg.toLowerCase();
    const type = (msgLower.includes('invalid') || msgLower.includes('error') || msgLower.includes('do not match') || msgLower.includes('already')) ? 'error' : 'success';
    showToast(msg, type);
};