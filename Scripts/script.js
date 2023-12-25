// "use strict"
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

const iconMenu = document.querySelector('.menu-icon');
const menuBody = document.querySelector('.nav-list');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('-lock');
        iconMenu.classList.toggle('-active');
        menuBody.classList.toggle('-active');
    });
}


let menuArrows = document.querySelectorAll('.menu-arrow');
if (isMobile.any()) {
    document.body.classList.add('-touch');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++){
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {
                menuArrow.parentElement.classList.toggle('-active'); 
            });
        }
    }

} else {
    document.body.classList.add('-pc');
}

const menuLinks = document.querySelectorAll('.drop-menu-link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('-active')) {
                document.body.classList.remove('-lock');
                iconMenu.classList.remove('-active');
                menuBody.classList.remove('-active');
            }

            window.scrollTo({
                behavior: "smooth",
                top: gotoBlockValue
               
            });
            e.preventDefault();

        }
    }
}

const animItems = document.querySelectorAll('.-anim-items');
if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++){
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 3;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight>window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('-show');
            } else {
                if (!animItem.classList.contains('-anim-no-hide')) {
                    animItem.classList.remove('-show');
                }
            }
        } 
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top:rect.top + scrollTop, left:rect.left + scrollLeft}
    }
    setTimeout(() => {
        animOnScroll();
    }, 300)
   
} 
function videoUr(elem) {
    document.getElementById('slider').src = elem;
}