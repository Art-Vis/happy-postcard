import { postGiftData } from "./api.js";

const swiperThumb = new Swiper('.gift__swiper--thumb', {
    spaceBetween: 12,
    slidesPerView: 'auto',
    freeMode: true,
    breakpoints: {
        320: {
            spaceBetween: 12,
        },
        1141: {
            spaceBetween: 16,
        }
    }
});

const swiperMain = new Swiper('.gift__swiper--card', {
    spaceBetween: 16,
    thumbs: {
        swiper: swiperThumb
    }
});

const form = document.querySelector('.form');
const submitButton = form.querySelector('.form__button');
const phoneInputs = form.querySelectorAll('.form__field--phone');
const cardInput = form.querySelector('.form__card');

const updateCardInput = () => {
    const activeSlide = document.querySelector('.gift__swiper--card .swiper-slide-active');

    const cardData = activeSlide.querySelector('.gift__card-image').dataset.card;
    cardInput.value = cardData;
};
updateCardInput();

swiperMain.on('slideChangeTransitionEnd', updateCardInput);

phoneInputs.forEach(phone => {
    IMask(phone, {
        mask: '+{7}(000)000-00-00'
    });
});

const updateSubmitButton = () => {
    let isFormFilled = true;
    for (const field of form.elements) {
        if (field.classList.contains('form__field')) {
            if (!field.value.trim()) {
                isFormFilled = false;
                break;
            }
        }
    }
    submitButton.disabled = !isFormFilled;
}

const phoneValidateOption = {
    format: {
        pattern: '\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}',
        message: 'Номер телефона должен соответствовать формату: "+7(xxx)xxx-xx-xx"',
    }
}

form.addEventListener('input', updateSubmitButton);
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const errors = validate(form, {
        sender_phone: phoneValidateOption,
        receiver_phone: phoneValidateOption
    });


    if (errors) {
        for (const key in errors) {
            const errorString = errors[key];
            alert(errorString);
        }
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    postGiftData(data);
});
