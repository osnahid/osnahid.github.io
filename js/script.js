
var a = setTimeout(() => {
    
}, 500);

var xDown = null;                                                        
var yDown = null;
var directionSwipe = null;


function getTouches(e) {
    return e.touches ||             // browser API
           e.originalEvent.touches; // jQuery
  }  
$('#carossel').on('touchstart',(e) => { 
    const firstTouch = getTouches(e)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;   
});
$('#carossel').on('touchmove',(e) => { 
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = e.touches[0].clientX;                                    
    var yUp = e.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            directionSwipe = 1;
        } else {
            directionSwipe = -1;
        }                       
    }
    /* reset values */
    xDown = null;
    yDown = null;   
});
$('#carossel').on('touchend',(e) => { 
    slider(directionSwipe);
    directionSwipe = null;

});

$('#carossel').on('mousewheel DOMMouseScroll', (e) => {
    if(e.originalEvent.wheelDeltaX != 0) {
        e.preventDefault();
    }
});

$(window).scroll(() => { 
    const nav = $('#nav');
    if (window.scrollY === 0) {
        if (nav.hasClass('fixed')) {
            nav.removeClass('fixed');
        }
    } else {
        if (!nav.hasClass('fixed')) {
            nav.addClass('fixed');
        }
    }
    const containers = $('.container');
    
    clearTimeout(a);
    a = setTimeout(() =>{
        $.each(containers, function (indexInArray, valueOfElement) { 
            const offset = $(valueOfElement).offset();
            const top = offset.top;
            const bottom = $(valueOfElement).height() + top;
            const currentPosition = window.scrollY + 100;
            if (currentPosition >= top && currentPosition <= bottom) {
                $.each($('#menu').find('a.menu-element'),(i, a) => {
                    $(a).removeClass('selected');
                    if ($(a).attr('data') == $(this).attr('id')){
                        $(a).addClass('selected');
                        if($(this).attr('id') == 'contact' && !$('#footer').hasClass('paralex')) {
                            $('body').css('overflow', 'hidden');
                            $('#footer').addClass('paralex');
                        } else if ($('#footer').hasClass('paralex') && $(this).attr('id') != 'contact') {
                            $('#footer').removeClass('paralex');
                            $('body').css('overflow', 'auto');
                        }
                    }
                });
                
            }
        });
    }, 200);
   
});

function closeContact() {
    $('#footer').removeClass('paralex');
    $('#footer').removeClass('paralex');
    $('body').css('overflow', 'auto');
    navigator('partenaires');
}


function navigator(el) {
    fixNav();
    const id = (typeof el === 'string') ? el : $(el).attr('data');
    const offset = $('#' + id).offset();
    const top = offset.top - 100;

    if(id == 'footer') {
        $('#footer').addClass('paralex');
        $('body').css('overflow', 'hidden');
    }
    window.scrollTo({
        left: 0,
        top: top,
        behavior: 'smooth'
      });
    
}
var position = 0;
slider = (d) => {
    
    w = $('#carossel').width();
    left = $('#carossel').scrollLeft();
    ulW = $('#carossel').find('ul').width();
    if (left + w == ulW && d == 1) {
        position = 0;
        $('#carossel').scrollLeft(-(ulW + w));
    } else if (left == 0 && d == -1) {
        position = 2;
        $('#carossel').scrollLeft(ulW - w);
    } else {
        position += d;
        document.getElementById('carossel').scrollTo({ 
            left: w * position, 
            behavior: 'smooth' 
        });
    }
}

fixNav = () => {
    const nav = $('#nav');
    if (!nav.hasClass('fixed')) {
        nav.addClass('fixed');
    }
}
// setInterval(() => {
//     slider(1);
// }, 8000);

