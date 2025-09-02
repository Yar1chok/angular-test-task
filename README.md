# Test Task — Angular Frontend

## Описание

Приложение демонстрирует работу с API [reqres.in](https://reqres.in/).  
Реализован фронтенд на **Angular 20+** с использованием **standalone компонентов**, **сигналов** и **Taiga UI**.

Функционал:

- Страница списка пользователей (`GET https://reqres.in/api/users?page=2`)
  - Удаление пользователя (`DELETE https://reqres.in/api/users/:id`)
  - Пагинация
- Страница подробной карточки пользователя (`GET https://reqres.in/api/users/:id`)
  - Редактирование данных пользователя (`PUT https://reqres.in/api/users/:id`)
- Страница списка ресурсов (`GET https://reqres.in/api/unknown`)
- Страницы авторизации (`POST https://reqres.in/api/login`) и регистрации (`POST https://reqres.in/api/register`)
- Покрытие кода тестами (Karma + Jasmine)

## Структура проекта

```
src/app/
├─ entities/
│  ├─ auth/          # Модели и API для авторизации
│  ├─ user/          # Модели и API для пользователей
│  └─ resource/      # Модели и API для ресурсов
├─ pages/
│  ├─ users-page/        # Список пользователей
│  ├─ user-detail-page/  # Детальная информация о пользователе
│  ├─ recources-page/    # Список ресурсов
│  ├─ login-page/        # Авторизация
│  └─ register-page/     # Регистрация
├─ shared/
└─ app.component.ts      # Корневой компонент
```

## Технологии

- Angular 20+
- TypeScript
- Taiga UI (`TuiButton`, `TuiTextfield`, `TuiPager` и др.)
- RxJS (HTTP запросы)
- Сигналы Angular (`signal`)
- Reactive Forms
- Karma + Jasmine для юнит-тестов

## Установка и запуск

# Установка зависимостей

```bash
npm install
```

# Запуск приложения

```bash
npm start
```

Приложение будет доступно по адресу: http://localhost:4200

# Сборка

```bash
npm run build
```

# Тесты

Запуск всех тестов:

```bash
npm test
```

# Тесты используют Karma + Jasmine, покрывают компоненты:

- LoginPageComponent
- RegisterPageComponent
- UsersPageComponent
- UserDetailPageComponent
- ResourcesPageComponent

# Примеры функционала:

- Переход на страницу пользователя при клике на карточку
- Удаление пользователя из списка
- Изменение данных пользователя на странице детали
- Пагинация пользователей и ресурсов
- Валидация форм регистрации и авторизации
