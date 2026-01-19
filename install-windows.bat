@echo off
title Instalador Pinball Patel Fin v3.2
color 0B

echo.
echo ╔════════════════════════════════════════╗
echo ║   Instalador Pinball Patel Fin v3.2   ║
echo ╚════════════════════════════════════════╝
echo.

REM Verificar se está na pasta correta
if not exist "dist" (
    echo ❌ Pasta 'dist' nao encontrada. Execute este script na raiz do projeto.
    pause
    exit /b 1
)

cd dist

echo 📦 Escolha o tipo de instalacao:
echo.
echo [1] Instalador completo (recomendado)
echo [2] Versao portatil (nao instala)
echo [3] Cancelar
echo.
set /p choice="Digite sua escolha (1, 2 ou 3): "

if "%choice%"=="1" goto instalador
if "%choice%"=="2" goto portatil
if "%choice%"=="3" goto cancelar
echo ❌ Opcao invalida!
pause
exit /b 1

:instalador
echo.
echo 🔧 Iniciando instalacao completa...
for %%f in ("Pinball Patel Fin Setup*.exe") do (
    echo 📦 Executando instalador: %%f
    start "" "%%f"
    echo.
    echo ✅ Instalador iniciado!
    echo 📝 Siga as instrucoes na tela para completar a instalacao.
    echo 🎮 Apos instalado, procure por "Pinball Patel Fin" no Menu Iniciar
    goto fim
)
echo ❌ Instalador nao encontrado em dist/
pause
exit /b 1

:portatil
echo.
echo 🎮 Iniciando versao portatil...
for %%f in ("Pinball Patel Fin*.exe") do (
    if not "%%f"=="Pinball Patel Fin Setup*.exe" (
        echo 🚀 Executando: %%f
        start "" "%%f"
        echo.
        echo ✅ Jogo iniciado!
        echo 💡 Esta versao nao requer instalacao
        echo 📁 Voce pode mover o arquivo .exe para qualquer pasta
        goto fim
    )
)
echo ❌ Versao portatil nao encontrada em dist/
pause
exit /b 1

:cancelar
echo.
echo ❌ Instalacao cancelada.
pause
exit /b 0

:fim
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🌍 O jogo suporta 10 idiomas!
echo 🎯 Controles:
echo    ← → (flippers laterais)
echo    ↑ (flipper central)
echo    Espaco (lancar bola)
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause
