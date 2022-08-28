$(function(){
	$('#slider-price').slider({
		range: true,
		min: 800,
		max: 5400,
		values: ['800', '5400'],
		slide: function(event, ui) {
			$('#min').val(ui.values[0]);
			$('#max').val(ui.values[1]);
		}
	});
    $('#slider-duration').slider({
		range: true,
		min: 2,
		max: 15,
		values: ['2', '15'],
		slide: function(event, ui) {
			$('#min-duration').val(ui.values[0]);
			$('#max-duration').val(ui.values[1]);
		}
	});
    $('#slider-distance').slider({
		range: true,
		min: 40,
		max: 300,
		values: ['40', '300'],
		slide: function(event, ui) {
			$('#min-distance').val(ui.values[0]);
			$('#max-distance').val(ui.values[1]);
		}
	});
});

$('.select').each(function() {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 1; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
        class: 'new-select',
        text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function() {
        if ( !$(this).hasClass('on') ) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function() {
                let chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectHead.text( $(this).find('span').text() );

                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            $(this).removeClass('on');
            selectList.slideUp(duration);
        }
    });
});