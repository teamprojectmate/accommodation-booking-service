# Booking Service — Frontend 🏨

Клієнтська частина проєкту **Booking Service**, створена на **React** та **Redux Toolkit**. Додаток дозволяє користувачам переглядати доступні помешкання, бронювати їх, керувати профілем і переглядати історію бронювань.

---

## 🚀 Основні можливості
- **Автентифікація:** реєстрація, вхід/вихід, зберігання токена, захищені маршрути.
- **Управління профілем:** перегляд і редагування даних користувача, зміна пароля.
- **Перегляд помешкань:** список доступних варіантів із фільтрами та пагінацією.
- **Деталі помешкання:** опис, фото, зручності, рейтинг, доступні дати.
- **Бронювання:** створення бронювання, підтвердження та оплата.
- **Мої бронювання:** перегляд усіх бронювань, скасування.

---

## 🛠 Використані технології
- **React** — інтерфейс користувача.
- **React Router DOM** — маршрутизація.
- **Redux Toolkit** — управління станом.
- **Axios** — HTTP-запити.
- **Stripe Elements** — обробка платежів.
- **Bootstrap** — стилізація.

---

## 🔐 Автентифікація та безпека
- **JWT** (Bearer) для захисту API.
- Токени можна зберігати у **HttpOnly cookies** або оновлювати через refresh-токен.
- **CORS**: дозвольте запити з фронтенду (`http://localhost:3000`).

---

## ⚙️ Налаштування середовища

**CRA:**
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
```

**Vite:**
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
```

---

## ▶️ Локальний запуск

### Окремо
**Backend**
```bash
cd backend
cp .env.template .env
./mvnw clean package -DskipTests
java -jar target/*.jar
```

**Frontend**
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

### Docker Compose
```bash
cd backend
docker compose up --build
```

---

## 🧪 Тестування
**Backend:**
```bash
./mvnw test
```
**Frontend:**
```bash
npm test
```

---

## 🧰 Корисні скрипти
**Frontend**
```json
{
  "scripts": {
    "dev": "vite",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "preview": "vite preview",
    "test": "react-scripts test",
    "lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\"",
    "format": "prettier --write ."
  }
}
```
**Backend**
```bash
./mvnw spring-boot:run
./mvnw clean package
./mvnw test
```

---

## 📝 React + Vite (опційно)
- `@vitejs/plugin-react` (Babel)
- `@vitejs/plugin-react-swc` (SWC)
- Використання TypeScript + `typescript-eslint`

---

## 🔧 Траблшутінг
- **CORS:** перевірте `CORS_ALLOWED_ORIGINS`.
- **Stripe:** перевірте ключі та редіректи.
- **JWT expired:** оновіть токен.
- **Telegram:** перевірте `BOT_TOKEN`/`CHAT_ID`.
- **DB:** перевірте підключення.

---

## 🗺 Roadmap
- Розширення RBAC
- Відгуки, фаворити
- i18n
- Webhooks Stripe
- Моніторинг

---

## 📄 Ліцензія
MIT або інша.