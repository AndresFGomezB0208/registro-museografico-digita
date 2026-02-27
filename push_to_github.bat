@echo off
color 0a
echo =======================================================
echo Iniciando sincronizacion con GitHub (Registro Museografico)
echo =======================================================
cd /d "%~dp0"
set PATH=C:\Program Files\Git\cmd;%PATH%
echo Por favor, si aparece una ventana de GitHub, inicia sesion con tu cuenta correcta.
git push -u origin main
echo =======================================================
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul
