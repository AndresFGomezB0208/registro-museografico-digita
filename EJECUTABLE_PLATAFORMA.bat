@echo off
color 0b
title Registro Museografico Digital - Servidor Local

echo ==================================================================
echo   Iniciando la Plataforma: Registro Museografico Digital
echo ==================================================================
echo.

:: 1. Comprobar si Node.js está instalado en este PC
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR CRITICO] Node.js no esta instalado en este computador.
    echo Para que esto funcione, primero debes descargar e instalar:
    echo 👉 https://nodejs.org/
    echo.
    echo Cuando lo instales, vuelve a abrir este archivo.
    pause
    exit
)

:: 2. Instalar dependencias si la carpeta node_modules no existe (ej. al descargar de GitHub)
if not exist "node_modules\" (
    echo [PASO 1/2] Instalando componentes necesarios (esto tomara 1 o 2 minutos)...
    call npm install
    echo Componentes instalados.
    echo.
)

:: 3. Lanzar el navegador despues de 6 segundos (dandole tiempo al servidor a prender)
echo [PASO 2/2] Encendiendo el servidor maestro...
echo.
echo ==================================================================
echo   IMPORTANTE: NO CIERRES ESTA VENTANA NEGRA
echo   (Si la cierras, la pagina web dejara de funcionar)
echo ==================================================================
echo.
start cmd /c "timeout /t 6 >nul && start http://localhost:3000"

:: 4. Arrancar Next.js
call npm run dev

pause
