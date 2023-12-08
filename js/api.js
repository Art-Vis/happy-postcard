const API_URL = 'https://defiant-grass-ketchup.glitch.me/';

export const getIdFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('id');
};

export const getGiftData = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/gift/${id}`);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error('Открытка не найдена');
        }
    } catch (error) {
        console.log("error:", error)

    }
}

export const postGiftData = async (data) => {
    try {
        const response = await fetch(`${API_URL}/api/gift`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        if (response.ok) {
            prompt(`Открытка успешно сохранена. Доступна по адресу: ${location.origin}/card.html?id=${result.id}`);
            form.reset();
            return result;
        } else {
            alert(`Ошибка при отправке: ${result.message}`);
        }
    } catch (error) {
        console.log(`Ошибка при отправке: ${error}`)
    }
}