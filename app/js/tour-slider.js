/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("checkbox");

    if (n > slides.length) {
      slideIndex = 1
    }

    if (n < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].checked = true;
    }

    slides[slideIndex - 1].checked = true;
}
var i = 1;
  setInterval(function(){
  currentSlide(i)
  i++;
  if(i == 7) {
   i = 1;
  }
},5000)

var myDiv = $('.tour-heading');
myDiv.text(myDiv.text().substring(0,1050));

$(".tour-hero-price").append(" ₽");