# Мониторинг проектов

Мониторинг Git-репозиториев Дизайн-кода Екатеринбурга


## Настройка

Данные о проектах редактируются в [projects.json](https://github.dev/ekaterinburgdesign/dev-monitor/blob/master/projects.json)

```json
[
    {
        "title": "Название проекта",
        "url": "https://link-to-project.ekaterinburg.design",
        "icon": "icon.svg",
        "git": "Репозиторий",
        "vercel": "Проект на Vercel",
        "links": [
            {
                "name": "Figma",
                "url": "https://figma.com/link-to-design"
            }
        ]
    },
    ...
]
```


## Запуск

Установка зависимостей
```sh
npm i
```

Разработка
```sh
npm run dev
```
