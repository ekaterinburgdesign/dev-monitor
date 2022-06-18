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

В корне создать файл с переменными среды `.env.local` с [Access Token](https://github.com/settings/tokens) для GitHub со `scope` с доступом к `repo`
```
GITHUB_TOKEN=<github-access-token>
```

Установить зависимости
```sh
npm i
```

Запустить режим разработчика
```sh
npm run dev
```
