- Presentation layer

    - Web Application (MVC)
        - routes
        - middlewares
        - controllers
        - viewDataProviders // form-schema, form-validation, dto-mappers (form data <-> domain entity)
        - views
        - public (css, js, images)
    - Web API

- Business layer

    - services
    - models
    - validators
    - workflows

- Data access layer

    - repositories

- Infrastructure layer // external communication, technology dependent

    - captcha.js // Google
    - db.js // Mongo
    - logging.js // Rollbar, Loggly
    - email // Mailgun

- Cross Cutting
    - config
    - helpers
    - security
    - errors / exception handlers
