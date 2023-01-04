// Swiper-catalog

    
    const catalogSlider = new Swiper('.hero-catalog__slider', {
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          },
    })


// catalog-filter

const checkbox = document.querySelectorAll('.custom-checkbox__text')
const catalogFilters = document.querySelectorAll('.catalog-filter')

checkbox.forEach(element => {
    element.addEventListener('click', ()=>{
        const parent = element.closest('.catalog-filter')
        const parentCheckbox = element.closest('.catalog-filter__item')
        const customCheckboxLabel = parentCheckbox.querySelector('.custom-checkbox')
        element.classList.toggle('custom-checkbox__text--active')
        
        const checkboxInput = customCheckboxLabel.querySelector('.custom-checkbox__input')

        checkboxInput.classList.toggle('custom-checkbox__input--active')

        const childCheckBoxes = parent.querySelectorAll('.custom-checkbox__text')
        const checkQuantity = parent.getElementsByClassName('custom-checkbox__text--active')
        const childFilterQuantity = parent.querySelector('.catalog-filter__quantity')
        const childFilterClear = parent.querySelector('.catalog-filter__clear')
        const childFilterClearBlock = parent.querySelector('.catalog-filter__quantity--block')
        
        productCircleToggle(checkQuantity.length, childFilterQuantity, childFilterClear, childFilterClearBlock, childCheckBoxes)
    })
});


// Подсчёт количества фильтров и их вывод в circle, а также удаление
function productCircleToggle(quantityFilter, topCircle, clearButton, clearBlock, checkBoxes){
    if (quantityFilter > 0) {
        clearButton.classList.add('catalog-filter__clear--active')
        topCircle.classList.add('catalog-filter__quantity--active')
        topCircle.innerHTML = quantityFilter

    }
    else{
        clearButton.classList.remove('catalog-filter__clear--active')
        topCircle.classList.remove('catalog-filter__quantity--active')
        topCircle.innerHTML = quantityFilter
    }

    // Удаление фильтров
    clearBlock.addEventListener('click', ()=>{
        clearButton.classList.remove('catalog-filter__clear--active')
        topCircle.classList.remove('catalog-filter__quantity--active')

        checkBoxes.forEach(element =>{
            element.classList.remove('custom-checkbox__text--active')
        })
    })

}

// Hide filters
const hideFilters = document.querySelector('.hide-filters')

hideFilters.addEventListener('click', (el) =>{
    catalogFilters.forEach(el => {
        el.classList.remove('catalog-filter--open')
    })
})

// catalog-filter__toggle
const openFilter = document.querySelectorAll('.catalog-filter__toggle')

openFilter.forEach(element => {
    element.addEventListener('click', ()=>{
        let parent = element.closest('.catalog-filter')
        parent.classList.toggle('catalog-filter--open')
    })
});

// catalog-props

const catalogColumns = document.querySelector('.catalog-columns__list')
const catalogGridContent = document.querySelector('.catalog-grid__content')

catalogColumns.addEventListener('click', (element) => {
    if (element.target.closest('.catalog-columns__btn'))
    {
        const btns = document.querySelectorAll('.catalog-columns__btn')
        console.log(btns)
        btns.forEach(element =>{
            element.classList.remove('catalog-columns__btn--current')
            element.classList.remove('main-link--current')
        })
        const activeBtn = element.target.closest('.catalog-columns__btn')
        activeBtn.classList.add('catalog-columns__btn--current')
        activeBtn.classList.add('main-link--current')
        const parent = element.target.closest('.catalog-columns__item')
        let dataColumns = parent.dataset.columns
        catalogGridContent.dataset.gridColumns = dataColumns
    }
    
})

// Catalog-filter items, добавление выбранных чекбоксов из catalog-filter__items в catalog-props

const createChoiceItem = (text) => {
    return (
        `<button class="catalog-choice__item">
            ${text}
            <img class='catalog-choice__close' src="images/hero-catalog/close.svg" alt="">
        </button>`
    )
} 

const catalogFilterItems = document.querySelectorAll('.catalog-filter__item')
const catalogChoice = document.querySelector('.catalog-choice')

// checkbox.forEach(el =>{
//     catalogFilterItems.querySelector('input').addEventListener('change', (e) =>{

//     })
// })



catalogFilterItems.forEach(el => {
    el.querySelector('input').addEventListener('change', (e) =>{
        let checked = el.querySelector('input').checked

        if (checked){
            el.querySelector('.custom-checkbox').classList.add('custom-checkbox--active')
            
            let text = el.querySelector('.custom-checkbox__text').textContent
            catalogChoice.insertAdjacentHTML('afterbegin', createChoiceItem(text))
        }
        else{
            el.querySelector('.custom-checkbox').classList.remove('custom-checkbox--active')
            let deleteEl = catalogChoice.querySelectorAll('.catalog-choice__item')
            // if (checkbox.innerHTML === deleteEl.innerHTML) {
            //     catalogChoice.removeChild(deleteEl)
            // }

            deleteEl.forEach(element => {
                let currentCheckboxText = el.querySelector('.custom-checkbox__text')
                if (currentCheckboxText.innerHTML == element.textContent.trimLeft().trimRight()) {
                    catalogChoice.removeChild(element)
                }
            })
        }

        let activeCheckboxes = document.querySelectorAll('.custom-checkbox--active')

        if (activeCheckboxes) {
            catalogChoice.classList.add('catalog-choice--active')

        }
        else{
            catalogChoice.classList.remove('catalog-choice--active')
        }
    })
})



catalogChoice.addEventListener('click', (e) => {
    if (e.target.classList.contains('catalog-choice__item')){
        e.target.remove();

        let text = e.target.textContent.trimLeft().trimRight();

        let activeCheckbox = document.querySelector(`[data-text="${text}"]`)
        let deleteText = activeCheckbox.querySelector('.custom-checkbox__text--active')
        let deleteInput = activeCheckbox.querySelector('.custom-checkbox__input--active')
        activeCheckbox.querySelector('input').checked = false

        deleteText.classList.remove('custom-checkbox__text--active')
        deleteInput.classList.remove('custom-checkbox__input--active')
        activeCheckbox.classList.remove('custom-checkbox--active')

    }

    if (e.target.classList.contains('catalog-choice__clear')){
        Array.from(e.currentTarget.children).forEach(el => {
            if (!el.classList.contains('catalog-choice__clear')){
                el.remove();
            }

            document.querySelectorAll('.catalog-filter__quantity').forEach(el => {
                el.textContent = 0
                el.classList.remove('catalog-filter__quantity--active')
            })

            document.querySelectorAll('.catalog-filter__clear').forEach(el => el.classList.remove('catalog-filter__clear--active'))


            catalogFilterItems.forEach(el => {
                el.querySelector('.custom-checkbox__text').classList.remove('custom-checkbox__text--active')
                el.querySelector('input').checked = false
            })
        })

    }

})

// Custom select

const customSelect = document.querySelectorAll('.custom-select')

customSelect.forEach(el => {
    el.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('custom-select--open')

        if (e.target.classList.contains('custom-select__item')) {
            let text = e.target.textContent
            e.currentTarget.querySelector('.custom-select__top').textContent = text
        }
    })

    el.addEventListener('focus', (e) => {
        e.currentTarget.classList.add('custom-select--open')
    })

    el.addEventListener('blur', (e) => {
        e.currentTarget.classList.remove('custom-select--open')
    })
})

const freeDeliveryBtn = document.querySelector('.free-delivery__btn')

freeDeliveryBtn.addEventListener('click', (e) => {
    e.currentTarget.closest('.free-delivery').style.display = 'none'
})
