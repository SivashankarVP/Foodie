var tl = gsap.timeline({scrollTrigger:{
    trigger: ".two",
    start: "0% 95%",
    end: "70% 50%",
    scrub: true,
    // markers: true,
}})

tl.to("#burger",{
    top: "120%",
    left: "10%"
}, 'onion')
tl.to("#tomato",{
    top:"160%",
    left: "23%"
}, 'onion')
tl.to("#onion",{
    width: "15%",
    top:"160%",
    right: "10%"
}, 'onion')
tl.to("#bleaf",{
    top:"110%",
    rotate: "130deg",
    left: "70%"
}, 'onion')
tl.to("#chilli",{
    top:"110%",
    rotate: "130deg",
    left: "0%"
}, 'onion')

gsap.set("#burger1", { clearProps: "all" });
gsap.set("#burger2", { clearProps: "all" });
gsap.set(".fries", { clearProps: "all" });

var tl2 = gsap.timeline({scrollTrigger:{
    trigger: ".three",
    start: "0% 95%",
    end: "20% 50%",
    scrub: true,
    // markers: true,
}});
tl2.from("#burger1",{
    x: -500,
    y: 300,
    rotation: -90,
    duration: 1
}, "ca");

tl2.from(".fries",{
    x: 500,
    y: 300,
    rotation: 90,
    duration: 1
}, "ca");

tl2.from("#burger2",{
    x: 500,
    y: 300,
    rotation: 90,
    duration: 1
}, "ca");
tl2.to("#tomato",{
    width:"12%",
    left:"44%",
    top:"205%"
}, 'ca')
tl2.to("#burger",{
    width:"25%",
    top:"214%",
    left:"37.5%",
}, 'ca')
const menu=document.querySelector("#menu");
const nav=document.querySelector(".cntr-nav");

menu.addEventListener("click",()=>{

    nav.classList.toggle("show");

});
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});

const viewMore = document.getElementById("viewMore");

viewMore.addEventListener("click", () => {

    document.querySelectorAll(".more").forEach(item => {
        item.style.display = "flex";
    });

    viewMore.style.display = "none";

});