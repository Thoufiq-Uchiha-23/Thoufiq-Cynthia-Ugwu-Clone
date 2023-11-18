
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

//animating the hero page using gsap
function firstPageAnim(){
    var tl = gsap.timeline();
    
    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    
    .to(".boundingelem",{
        y: '0',
        ease: Expo.easeInOut,
        delay: -1,
        duration: 2,
        stagger: .2
    })
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

//jab mouse move ho to hum log skew kar paaye aur maximum skew and minimum skew define kar paaye, jab mouse move ho to chapta ki value badhe, aur job moused chalna band ho jaaye to chapta hata lo
var timeout;

function circleChaptaKaro(){
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;  

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}


//this is to make the circle move with the cursor
function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

//teeno element ko select karo uske baad teeno parek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll(".elem").forEach(function(elem){
    //this is used for rotate animation where both values are kept '0' in default
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(dets){
        //Animation given to img of elem box
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5

        });
    });

    elem.addEventListener("mousemove", function(dets){
        //this is to calculate the total value from top "elem.getBoundingClientRect().top", then getting diff from div block, directed towards  y-axis
        var diff = dets.clientY - elem.getBoundingClientRect().top;

        //diffrot is calculating the distance of div along x-axis
        diffrot = dets.clientX - rotate;
        //rotate was set to 0, now its going to update based on motion of mouse along x-axis
        rotate =  dets.clientX;

        //Animation given to img of elem box
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            //using rotate by applying clamp function in which min: -20 degree, max: 20 degree, diffrot(calculated value) multiplied with fractional value to decrease the rotate
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
        });
    });
});