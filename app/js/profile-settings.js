$('.preview-area-select').each(function() {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 1; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="preview-area-select"></div>');
    $('<div>', {
        class: 'new-preview-area-select',
        text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-preview-area-select');
    $('<div>', {
        class: 'new-preview-area-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-preview-area-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-preview-area-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-preview-area-select__item');
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

const dropZone = document.getElementById('drop-zone');
const content = document.getElementById('content');
const fileUploader = document.getElementById('file-uploader');
const imageGrid = document.getElementById('content');
const reader = new FileReader();


fileUploader.addEventListener('change', (event) => {
    content.innerHTML = '';
    const files = event.target.files;
    const file = files[0];
    reader.readAsDataURL(file);
    
    reader.addEventListener('load', (event) => {
      content.innerHTML = '';
      const img = document.createElement('img');
      img.style.height = '200px';
      img.style.width = '200px';
      imageGrid.appendChild(img);
      img.src = event.target.result;
      img.alt = file.name;
    });
});

if (window.FileList && window.File) {
  dropZone.addEventListener('dragover', event => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  });
  
  dropZone.addEventListener('drop', event => {
    content.innerHTML = '';
    event.stopPropagation();
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log(files);
    
    reader.readAsDataURL(files[0]);
  
    reader.addEventListener('load', (event) => {
      content.innerHTML = '';
      const img = document.createElement('img');
      img.style.height = '200px';
      img.style.width = '200px';
      content.appendChild(img);
      img.src = event.target.result;
      img.alt = file.name;
      
    });
  }); 
}

