<h1 align="center">Простая гистограмма</h1>

## Сделано с помощью

- Next.js
- Typescript
- CSS Modules
- Jest
- React Testing Library
- ESLint
- Stylelint

## Установка и запуск

1. Установите зависимости
```bash
npm i
```

2. Запустите мок сервер
```bash
npm run server
```
> Запустится на порту 3001

3. Запустите проект в режиме разработки
```bash
npm run dev
```

## Сборка проекта

1. Убедитесь что у вас создан файл .env.production в котором есть ключ ```API_URL``` с ссылкой к API (без ```/``` в конце)

2. Соберите проект
```bash
npm run build
```

3. Запустите проект
```bash
npm start
```

## Остальные команды

Запуск тестов
```bash
npm test
```

Запуск линтеров
```bash
npm run lint
```

Запуск stylelint (с флагом --fix)
```bash
npm run lint:styles
```
