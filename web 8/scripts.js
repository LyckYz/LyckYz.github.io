const popup = document.getElementById("popup");
const openBtn = document.getElementById("openFormBtn");
const closeBtn = document.getElementById("closePopup");
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

const LS_KEY = "contactFormData";

// --- Открытие формы ---
openBtn.addEventListener("click", () => {
    popup.classList.remove("hidden");

    // Меняем URL
    history.pushState({form: true}, "", "#form");

    restoreForm();
});

// --- Закрытие формы ---
function closePopup() {
    popup.classList.add("hidden");
    status.textContent = "";

    // Возврат назад в истории
    if (location.hash === "#form") history.back();
}

closeBtn.addEventListener("click", closePopup);

// Обработка кнопки «Назад» браузера
window.addEventListener("popstate", () => {
    if (location.hash !== "#form") {
        popup.classList.add("hidden");
    }
});

// --- Сохранение данных в LocalStorage ---
form.addEventListener("input", () => {
    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem(LS_KEY, JSON.stringify(data));
});

// --- Восстановление данных ---
function restoreForm() {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) return;

    const data = JSON.parse(saved);

    for (const [key, value] of Object.entries(data)) {
        if (form.elements[key]) {
            form.elements[key].value = value;
        }
    }

    if (data.agree && form.elements.agree) {
        form.elements.agree.checked = true;
    }
}

// --- Отправка формы ---
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Отправка...";

    const formData = new FormData(form);

    try {
        const res = await fetch("https://api.formcarry.com/s/YOUR-ENDPOINT", {
            method: "POST",
            body: formData
        });

        if (!res.ok) throw new Error("Ошибка сервера");

        status.textContent = "✔ Сообщение отправлено!";

        // Очистить форму и LocalStorage
        form.reset();
        localStorage.removeItem(LS_KEY);

    } catch (err) {
        status.textContent = "❌ Ошибка отправки. Попробуйте позже.";
    }
});
