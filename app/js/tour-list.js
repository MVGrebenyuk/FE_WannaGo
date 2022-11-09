$(function(){
    const filter = JSON.parse(localStorage.filterInfo);
    $('#slider-price').slider({
		range: true,
		min: filter.priceMin,
		max: filter.priceMax,
		values: [filter.priceMin, filter.priceMax],
		slide: function(event, ui) {
			$('#min').val(ui.values[0]);
			$('#max').val(ui.values[1]);
		}
	});
    $('#slider-duration').slider({
		range: true,
		min: filter.durationMin,
		max: filter.durationMax,
		values: [filter.durationMin, filter.durationMax],
		slide: function(event, ui) {
			$('#min-duration').val(ui.values[0]);
			$('#max-duration').val(ui.values[1]);
		}
	});
    $('#slider-distance').slider({
		range: true,
		min: filter.lengthMin,
		max: filter.lengthMax,
		values: [filter.lengthMin, filter.lengthMax],
		slide: function(event, ui) {
			$('#min-distance').val(ui.values[0]);
			$('#max-distance').val(ui.values[1]);
		}
	});
});

$(function(){
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://5.188.140.199:8189/wannago" + '/api/v1/filters');
xhr.send();

xhr.onload = function() {
	console.log(xhr.response)
	if (xhr.status == 200) {
		localStorage.filterInfo = JSON.stringify(xhr.response);
	} else {
		alert("Не удалось загрузить фильтры")
	}
}
});
// $('.select').each(function() {
//     const _this = $(this),
//         selectOption = _this.find('option'),
//         selectOptionLength = selectOption.length,
//         selectedOption = selectOption.filter(':selected'),
//         duration = 1; // длительность анимации
//
//     _this.hide();
//     _this.wrap('<div class="select"></div>');
//     $('<div>', {
//         class: 'new-select',
//         text: _this.children('option:disabled').text()
//     }).insertAfter(_this);
//
//     const selectHead = _this.next('.new-select');
//     $('<div>', {
//         class: 'new-select__list'
//     }).insertAfter(selectHead);
//
//     const selectList = selectHead.next('.new-select__list');
//     for (let i = 1; i < selectOptionLength; i++) {
//         $('<div>', {
//             class: 'new-select__item',
//             html: $('<span>', {
//                 text: selectOption.eq(i).text()
//             })
//         })
//         .attr('data-value', selectOption.eq(i).val())
//         .appendTo(selectList);
//     }
//
//     const selectItem = selectList.find('.new-select__item');
//     selectList.slideUp(0);
//     selectHead.on('click', function() {
//         if ( !$(this).hasClass('on') ) {
//             $(this).addClass('on');
//             selectList.slideDown(duration);
//
//             selectItem.on('click', function() {
//                 let chooseItem = $(this).data('value');
//
//                 $('select').val(chooseItem).attr('selected', 'selected');
//                 selectHead.text( $(this).find('span').text() );
//
//                 selectList.slideUp(duration);
//                 selectHead.removeClass('on');
//             });
//
//         } else {
//             $(this).removeClass('on');
//             selectList.slideUp(duration);
//         }
//     });
// });

$('button.btn-edit-personal-area').on('click', function(event) {
    window.location.href = './profile-settings.html';
});

$('button.btn-purchased-tours-area').on('click', function(event) {
    window.location.href = './purchased-routes.html';
});

var myDiv = $('.tour-description-text');
myDiv.text(myDiv.text().substring(0,320));

$(".tour-list-cost").append(" ₽");

$(".user-route-cost").append("₽");

$(".favorites-cost").append("₽");

$('button.btn-more-photo').on('click', function(event) {
    window.location.href = './user-photoalbum.html';
});

