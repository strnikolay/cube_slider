var gal = 'mountain'

const sliders=document.querySelectorAll('.slick-track')

const sliderfull=document.querySelector('.sliderfull')
var sliderFullAdd='<div class=\"sliderfull_item\"><img src=\"./img/'+gal+'/1.jpg\"></div>';

const sliderBig=document.querySelector('.sliderBig')
var sliderBigAdd='<div class=\"sliderBig_item\"><img src=\"./img/'+gal+'/1.jpg\"></div>';

/*const slider=document.querySelector('.slider')
var sliderAdd='<div class=\"slider__item \"><img src=\"./img/'+gal+'/1.jpg\"></div>';

var sliderAdd='<div class="slider_item filter"><img src="img/mountain/1.jpg" alt=""></div><div class="slider_item filter"><img src="img/mountain/2.jpg" alt=""></div><div class="slider_item"><img src="img/mountain/3.jpg" alt=""></div><div class="slider_item filter"><img src="img/mountain/4.jpg" alt=""></div><div class="slider_item filter"><img src="img/mountain/5.jpg" alt=""></div>'*/

function add() {
for (let i=2; i<=5; i++) {
	sliderFullAdd +='<div class=\"sliderfull_item\"><img src=\"./img/'+gal+'/'+i+'.jpg\"></div>';
	sliderBigAdd +='<div class=\"sliderBig_item\"><img src=\"./img/'+gal+'/'+i+'.jpg\"></div>';
	/*sliderAdd +='<div class=\"slider_item \"><img src=\"./img/'+gal+'/'+i+'.jpg\"></div>';*/

}
sliderfull.innerHTML=sliderFullAdd
sliderBig.innerHTML=sliderBigAdd
/*slider.innerHTML=sliderAdd*/
};

add();
