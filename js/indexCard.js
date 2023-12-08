import { getGiftData, getIdFromURL } from "./api.js";

const card = document.querySelector('.card');
const cardTitle = document.querySelector('.card__title');
const cardContacts = document.querySelector('.card__contacts');
const cardImage = document.querySelector('.card__image');
const cardFrom = document.querySelector('.card__from');
const cardTo = document.querySelector('.card__to');
const cardMessage = document.querySelector('.card__message');

const rerangeElement = () => {
    const screemWidth = window.innerWidth;
    if (screemWidth <= 580) {
        card.after(cardContacts);
    } else {
        cardTitle.after(cardContacts);
    }
}

const giftCardNoData = {
    card: 'Card-two',
    sender__name: 'Отсутсвует',
    receiver__name: 'Отсутсвует',
    message: 'Произошла ошибка',
}

const renderGiftCard = (data) => {
    cardImage.src = `img/${data.card}.png`;
    cardFrom.textContent = data.sender__name;
    cardTo.textContent = data.receiver__name;
    const formatedMessage = data.message.replaceAll('\n', '<br>');
    cardMessage.innerHTML = formatedMessage;
}

const init = async () => {
    rerangeElement();
    window.addEventListener('resize', rerangeElement);

    const id = getIdFromURL();

    if (id) {
        const data = await getGiftData(id);
        if (data) {
            renderGiftCard(data);
        } else {
            renderGiftCard(giftCardNoData);
        }
    }




};

init();