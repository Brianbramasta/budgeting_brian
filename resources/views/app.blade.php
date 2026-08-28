<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Budgeting API</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700&display=swap" rel="stylesheet" />

        {{-- Wajib ditambahkan untuk React HMR / Fast Refresh --}}
        @viteReactRefresh
        
        {{-- Pastikan path file entry point sesuai dengan lokasi file React/TypeScript Anda --}}
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="font-sans antialiased bg-gray-100">
        <div id="app"></div>
    </body>
</html>