# Crypton frontend

Данное приложения - решение тестового задания

## Технологии использованные при разработке

-   React + typescript + vite
-   Zustand
-   shadcnui
-   tailwindcss
-   react-query
-   react-hook-form + zod
-   json-server (для имитации бэкенда)

## Также был реализован весь дополнительный функционал из ТЗ

-   При регистрации есть поле я потверждением пароля
-   Все поля форм валидируются
-   Есть простая анимация перехода меджу формами
-   Есть темная/светлая тема, которая переключается с помощью switch в header-е.

## Запуск приложения

Склонируйте репозиторий

```bash
  git clone https://github.com/ilert1/crypton_frontend_task
```

Установите зависимости

```bash
  npm install
```

<p style="color:red;">!!!Обязательно создайте файл .env и скопируйте в него данные из .env.example!!!</p>

Следующая команда запустит concurrently и фронтэнд и json-server

```bash
  npm run start:dev
```
