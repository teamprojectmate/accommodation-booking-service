# Booking Service — Frontend 🏨

Клієнтська частина проєкту **Booking Service**, створена на **React** та **Redux Toolkit**. Додаток дозволяє користувачам переглядати доступні помешкання, бронювати їх, керувати профілем і переглядати історію бронювань.

---

## 🚀 Основні можливості
- **Автентифікація:** реєстрація, вхід/вихід, зберігання токена, захищені маршрути.
- **Управління профілем:** перегляд і редагування даних користувача, зміна пароля.
- **Перегляд помешкань:** список доступних варіантів із фільтрами та пагінацією.
- **Деталі помешкання:** опис, фото, зручності, рейтинг, доступні дати.
- **Бронювання:** створення бронювання, підтвердження та оплата.
- **Мої бронювання:** перегляд усіх бронювань, скасування (якщо підтримується бекендом).

---

## 🛠 Використані технології
- **React** — інтерфейс користувача.
- **React Router DOM** — маршрутизація сторінок.
- **Redux Toolkit** — централізоване управління станом.
- **Axios** — HTTP-запити до бекенду.
- **Stripe Elements** — обробка платежів.
- **Bootstrap** — базова стилізація компонентів (або ваш UI-фреймворк).

> За потреби можна легко замінити Bootstrap на Tailwind/Material UI.

---

## ✅ Передумови
- **Node.js** v18+ (рекомендовано v20)
- **npm** v9+ або **pnpm/yarn** (на ваш вибір)
- Запущений **бекенд-сервер** Booking Service

Перевірити версію Node.js:

```bash
node -v
```

---
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## ⚙️ Налаштування середовища

Фронтенд за замовчуванням звертається до бекенду за адресою `http://localhost:8080/api/v1`.
Якщо бекенд працює на іншому порту/домені — змініть **BASE_URL** у відповідних файлах або через змінні середовища.

### Варіант A — змінна у коді (приклад)
```js
// src/store/slices/authSlice.js
const BASE_URL = 'http://localhost:8080/api/v1';
```

### Варіант B — через .env (рекомендовано)
Створіть файл **.env** у корені фронтенд-проєкту:

> Якщо ви використовуєте Create React App — префікс `REACT_APP_...`.
> Якщо Vite — префікс `VITE_...`.

```dotenv
# Base API URL
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1

# Stripe
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX

# Інші приклади
REACT_APP_APP_NAME=Booking Service
REACT_APP_ENABLE_MOCKS=false
```

У коді звертайтесь до значень так:
```js
const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080/api/v1';
```

---

## 🧩 Встановлення та запуск
1. **Встановіть залежності**
   ```bash
   npm install
   ```

2. **Запустіть застосунок у режимі розробки**
   ```bash
   npm start
   ```
   Доступно за адресою: http://localhost:3000

3. **Збірка продакшен-версії**
   ```bash
   npm run build
   ```
   Готові файли зʼявляться в директорії `build/`.

4. **Перевірка форматування та лінтингу (за наявності)**
   ```bash
   npm run lint
   npm run format
   ```

---

## 📂 Структура проєкту

```
src/
├─ App.jsx                 # Головний компонент із маршрутизацією
├─ index.jsx               # Точка входу застосунку
├─ assets/                 # Зображення, іконки, статичні файли
├─ components/             # Презентаційні та спільні компоненти
├─ pages/                  # Сторінки (Login, Register, Listings, Details, Profile, Bookings)
├─ features/               # Фічі або модулі (за потреби)
├─ hooks/                  # Кастомні хуки
├─ services/               # API-клієнти (axios інстанс, запити)
├─ store/                  # Redux store та slices
│  ├─ store.js             # Ініціалізація Redux store
│  └─ slices/
│     ├─ authSlice.js      # Логіка автентифікації (вхід/реєстрація/вихід)
│     └─ ...               # Інші slices (properties, bookings, profile)
├─ styles/                 # Глобальні стилі / Bootstrap overrides
└─ utils/                  # Хелпери, константи
```

---

## 🔐 Автентифікація
- Зберігання токена у **HttpOnly cookie** або **localStorage** (залежно від вимог безпеки).
- Захищені маршрути через **PrivateRoute**/**RequireAuth**.
- Оновлення токена (refresh) — якщо підтримується бекендом.

---

## 💳 Платежі (Stripe)
1. Додайте **публічний ключ** у `.env` (`REACT_APP_STRIPE_PUBLISHABLE_KEY`).
2. Ініціалізуйте Stripe у корені застосунку (наприклад, у `App.jsx`).
3. На бекенді має створюватися **PaymentIntent**; фронт завершує оплату через **Stripe Elements**.

> Докладніше — у документації Stripe. Переконайтеся, що бекенд повертає `client_secret`.

---

## 🌐 Налаштування API-клієнта (Axios)
Створіть інстанс із базовою адресою та інтерсепторами:

```js
// src/services/http.js
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1',
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
```

---

## 🧪 Тестування (опційно)
- **Jest** + **React Testing Library** для юніт/інтеграційних тестів.

```bash
npm test
```

---

## 🧰 Корисні npm-скрипти (приклад)
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint \"src/**/*.{js,jsx}\"",
    "format": "prettier --write ."
  }
}
```
> За потреби адаптуйте під ваш білдер (CRA/Vite/Next.js).

---

## 🐳 Docker (опційно)
```dockerfile
# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🔧 Типові проблеми
- **CORS помилка:** переконайтеся, що бекенд дозволяє запити з `http://localhost:3000`.
- **Помилка Stripe ключа:** перевірте `REACT_APP_STRIPE_PUBLISHABLE_KEY`.
- **Невірний BASE_URL:** уточніть адресу бекенду у `.env` або в коді.

---

## 🗺 Дорожня карта (Roadmap)
- Відгуки та рейтинги
- Збережені помешкання (favorites)
- Мультимовність (i18n)
- SSR / SEO покращення

---

## 📄 Ліцензія
MIT або інша (вкажіть за потреби).

---

## 🤝 Внесок
PR/issue-и вітаються! Описуйте кроки відтворення, очікувану/фактичну поведінку та середовище.

---

### Швидкий старт
```bash
git clone <repo-url>
cd booking-service-frontend
cp .env.example .env   # за потреби
npm install
npm start
```

Гарної розробки! 💙

