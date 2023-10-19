$(document).ready(function(){
	$('.slider').slick({
		dots:true, 
		slidesToShow:3, 
		slidesToScroll:1,
		/*autoplay:true, */
		speed:1000,
		autoplaySpeed:800,
		centerMode:true,
		appendArrows:$(".wrapper"),
		asNavFor:".sliderBig, .sliderfull",
		responsive:[ //настройки адаптивности
			{
				breakpoint: 768, // для ширины экрана 768
				settings: {
					slidesToShow:2
				}
			},
			{
				breakpoint: 550,
				settings: {
					slidesToShow:1
				}
			}
		]
	});
	$('.sliderBig').slick({
			asNavFor:".slider, .sliderfull",
			arrows:false,
			fade:true,
		});
	$('.sliderfull').slick({
			asNavFor:".slider, .sliderBig",
			arrows:false,
			fade:true,
		});	
});



