<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <script src="https://kit.fontawesome.com/0b88fa2e74.js" crossorigin="anonymous"></script>
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
        <title>Soloop</title>
    </head>
    <body>
        @inertia
    </body>
</html>