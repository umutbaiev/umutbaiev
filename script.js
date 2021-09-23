// Анимация элементов
const adv_anim = document.querySelectorAll('.advantage-card');
let advantages = document.querySelector('.advantages'),
    arrow = document.querySelector('.scroll-arrow-anim');

document.addEventListener("scroll", e => {
    
    if(isPartiallyVisible(advantages)) {
        let delay = 0.5;
        let speed = 0.4;

        adv_anim.forEach(elem => {
            let style = 'animation: card_op ' + delay + 's linear;' ;
            elem.setAttribute('style', style)
            delay += speed;
        });
    }
    
    let scrollY = window.scrollY / 8;

    arrow.style.setProperty('--y', scrollY + "px")
})

function isFullyVisible(el) {
    let elBoundary = el.getBoundingClientRect(),
        top = elBoundary.top,
        bottom = elBoundary.bottom; 

    return ((top >= 0) && (bottom <= window.innerHeight))
}

function isPartiallyVisible(el) {
    let elBoundary = el.getBoundingClientRect(),
        top = elBoundary.top,
        bottom = elBoundary.bottom,
        height = elBoundary.height;
    
    return ((top + height >= 0) && (height + window.innerHeight >= bottom))
}


// Magnetic cursor
const cursors =['.cursor-inner', '.cursor-outer'],
      hover_elements = ['.cursor-hover', 'a', '.white', 'img'];

var X = 0, Y = 0;
var mouse = {x: 0, y: 0};

cursors.forEach(el => {
    el = document.querySelector(el);
  
    hover_elements.forEach(item => {
        item = document.querySelectorAll(item)
        
        item.forEach(item_element => {
            item_element.addEventListener('mouseover', function(){
                if(item_element.classList.contains('white')) {
                    el.classList.add('white')
                }else{
                    el.classList.add('hover')
                }
            })
            
            item_element.addEventListener('mouseout', function(){
                if(item_element.classList.contains('white')) {
                    el.classList.remove('white')
                }else{
                    el.classList.remove('hover')
                }
            })
        })
    })

    // Смещение в центр
    window.addEventListener("mousemove", function(event) {
      mouse.x = event.clientX - el.offsetWidth / 2;
      mouse.y = event.clientY - el.offsetHeight / 2;
    });

    
    function move() {
        X += (mouse.x - X) * 0.05;
        Y += (mouse.y - Y) * 0.05;

        let curs_in = document.querySelector('.cursor-inner');
        
        if(el == curs_in) {
            el.style.transform = `matrix(0.1, 0, 0, 0.1, ${X}, ${Y})`;
            el.style.transition = '0.15s ease-out'
            
            if(document.querySelector('.cursor-inner.hover')) {
                el.style.transform = `matrix(1, 0, 0, 1, ${X}, ${Y})`;
            }
        }else{
            el.style.transform = `matrix(1, 0, 0, 1, ${X}, ${Y})`;
            
            if(document.querySelector('.cursor-outer.hover')) {
                el.style.transform = `matrix(0, 0, 0, 0, ${X}, ${Y})`;
            }
        }
        
        requestAnimationFrame(move);
    }

    move();
})

// Якорные ссылки

var links = document.querySelectorAll('a.scroll')

links.forEach(link => {
    block_id = link.getAttribute('href')

    link.addEventListener('click', function() {
        
        if( block_id  == '#' ||  block_id  == null ||  block_id  == '' ||  block_id  == '/') {
            block_id = '#fs';
            document.querySelector( block_id ).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        } else {
            document.querySelector( block_id ).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    })
})