@echo off
REM ═══════════════════════════════════════════════════════════
REM  Script de Instalação e Configuração - Pinball Patel Fin
REM  Plataforma: Windows
REM  Versão: 3.0
REM ═══════════════════════════════════════════════════════════

title Pinball Patel Fin v3.0 - Setup Windows
color 0B
chcp 65001 >nul

:MAIN_MENU
cls
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║     Pinball Patel Fin v3.0 - Setup Windows        ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Detectar Node.js
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Node.js encontrado
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo    Versão: %NODE_VERSION%
) else (
    echo ⚠️  Node.js NÃO encontrado
    set NODEJS_MISSING=1
)

REM Detectar npm
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ npm encontrado
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo    Versão: %NPM_VERSION%
) else (
    echo ⚠️  npm NÃO encontrado
    set NPM_MISSING=1
)

echo.
echo ═════════════════════════════════════════════════════
echo   Escolha uma opção:
echo ═════════════════════════════════════════════════════
echo.
echo   [1] 🚀 Executar em modo desenvolvimento
echo   [2] 📦 Instalar pacotes npm do projeto
echo   [3] 🔨 Compilar o projeto
echo   [4] 💿 Instalar versão compilada (binário)
echo   [5] ⚡ Instalação completa (compilar + instalar)
echo   [6] 🌐 Baixar Node.js (se não instalado)
echo   [7] 🗑️  Desinstalar
echo   [8] ❌ Sair
echo.
echo ═════════════════════════════════════════════════════
echo.

set /p choice="Digite sua escolha (1-8): "
echo.

if "%choice%"=="1" goto RUN_DEV
if "%choice%"=="2" goto INSTALL_NPM
if "%choice%"=="3" goto BUILD
if "%choice%"=="4" goto INSTALL_BINARY
if "%choice%"=="5" goto FULL_INSTALL
if "%choice%"=="6" goto DOWNLOAD_NODEJS
if "%choice%"=="7" goto UNINSTALL
if "%choice%"=="8" goto EXIT
echo ❌ Opção inválida!
pause
goto MAIN_MENU

REM ═════════════════════════════════════════════════════
REM  Executar em modo desenvolvimento
REM ═════════════════════════════════════════════════════
:RUN_DEV
cls
echo.
echo 🚀 Executando em modo desenvolvimento...
echo.

if defined NODEJS_MISSING (
    echo ❌ Node.js não está instalado!
    echo 💡 Instale Node.js em: https://nodejs.org
    pause
    goto MAIN_MENU
)

if not exist "node_modules" (
    echo 📦 Instalando dependências primeiro...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Erro ao instalar dependências!
        pause
        goto MAIN_MENU
    )
)

echo ✅ Iniciando o jogo...
echo.
call npm start
pause
goto MAIN_MENU

REM ═════════════════════════════════════════════════════
REM  Instalar pacotes npm
REM ═════════════════════════════════════════════════════
:INSTALL_NPM
cls
echo.
echo 📦 Instalando pacotes npm do projeto...
echo.

if defined NODEJS_MISSING (
    echo ❌ Node.js não está instalado!
    echo 💡 Instale Node.js em: https://nodejs.org
    pause
    goto MAIN_MENU
)

if not exist "package.json" (
    echo ❌ package.json não encontrado!
    pause
    goto MAIN_MENU
)

call npm install
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Pacotes instalados com sucesso!
) else (
    echo.
    echo ❌ Erro ao instalar pacotes!
)
pause
goto MAIN_MENU

REM ═════════════════════════════════════════════════════
REM  Compilar o projeto
REM ═════════════════════════════════════════════════════
:BUILD
cls
echo.
echo 🔨 Compilando o projeto para Windows...
echo.

if defined NODEJS_MISSING (
    echo ❌ Node.js não está instalado!
    pause
    goto MAIN_MENU
)

if not exist "node_modules" (
    echo 📦 Instalando dependências primeiro...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Erro ao instalar dependências!
        pause
        goto MAIN_MENU
    )
)

call npm run build:win
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Compilação concluída!
    echo 📁 Arquivos gerados em: .\dist
) else (
    echo.
    echo ❌ Erro na compilação!
)
pause
goto MAIN_MENU

REM ═════════════════════════════════════════════════════
REM  Instalar binário compilado
REM ═════════════════════════════════════════════════════
:INSTALL_BINARY
cls
echo.
echo 💿 Instalando versão compilada...
echo.

if not exist "dist" (
    echo ❌ Pasta 'dist' não encontrada!
    echo 💡 Execute primeiro a opção de compilação.
    pause
    goto MAIN_MENU
)

cd dist

echo Escolha o tipo de instalação:
echo.
echo [1] Instalador completo (Setup.exe)
echo [2] Versão portátil (sem instalação)
echo [3] Voltar
echo.
set /p install_type="Digite sua escolha (1-3): "

if "%install_type%"=="1" goto INSTALL_SETUP
if "%install_type%"=="2" goto INSTALL_PORTABLE
if "%install_type%"=="3" (
    cd ..
    goto MAIN_MENU
)
echo ❌ Opção inválida!
pause
cd ..
goto MAIN_MENU

:INSTALL_SETUP
echo.
echo 🔧 Iniciando instalador completo...
for %%f in ("Pinball Patel Fin Setup*.exe") do (
    echo 📦 Executando: %%f
    start "" "%%f"
    echo.
    echo ✅ Instalador iniciado!
    echo 📝 Siga as instruções na tela.
    echo 🎮 Após a instalação, procure "Pinball Patel Fin" no Menu Iniciar
    cd ..
    pause
    goto MAIN_MENU
)
echo ❌ Instalador Setup.exe não encontrado!
cd ..
pause
goto MAIN_MENU

:INSTALL_PORTABLE
echo.
echo 📦 Versão portátil...
for %%f in ("Pinball Patel Fin*.exe") do (
    if not "%%f"=="Pinball Patel Fin Setup*.exe" (
        echo ✅ Arquivo portátil encontrado: %%f
        echo 💡 Você pode executar diretamente ou copiar para outro local
        echo 🎮 Execute: %%f
        cd ..
        pause
        goto MAIN_MENU
    )
)
echo ❌ Versão portátil não encontrada!
cd ..
pause
goto MAIN_MENU

REM ═════════════════════════════════════════════════════
REM  Instalação completa
REM ═════════════════════════════════════════════════════
:FULL_INSTALL
cls
echo.
echo ⚡ Instalação completa...
echo.

if defined NODEJS_MISSING (
    echo ❌ Node.js não está instalado!
    echo 💡 Instale Node.js primeiro (opção 6)
    pause
    goto MAIN_MENU
)

echo [1/3] Instalando pacotes npm...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao instalar pacotes!
    pause
    goto MAIN_MENU
)
echo ✅ Pacotes instalados!
echo.

echo [2/3] Compilando projeto...
call npm run build:win
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro na compilação!
    pause
    goto MAIN_MENU
)
echo ✅ Compilação concluída!
echo.

echo [3/3] Instalando...
cd dist
for %%f in ("Pinball Patel Fin Setup*.exe") do (
    echo 📦 Executando instalador: %%f
    start "" "%%f"
    echo.
    echo ✅ Instalador iniciado!
    echo 📝 Complete a instalação seguindo as instruções na tela.
    cd ..
    pause
    goto MAIN_MENU
)
echo ⚠️  Instalador não encontrado, mas arquivos compilados estão em .\dist
cd ..
pause
goto MAIN_MENU

REM ═════════════════════════════════════════════════════
REM  Baixar Node.js
REM ═════════════════════════════════════════════════════
:DOWNLOAD_NODEJS
cls
echo.
echo 🌐 Abrindo página de download do Node.js...
echo.
echo 💡 Baixe a versão LTS (recomendada) para Windows
echo 📦 Após a instalação, reinicie este script
echo.
start https://nodejs.org/pt-br/download/
pause
goto MAIN_MENU

REM ═════════════════════════════════════════════════════
REM  Desinstalar
REM ═════════════════════════════════════════════════════
:UNINSTALL
cls
echo.
echo 🗑️  Desinstalação...
echo.
echo Escolha o que desinstalar:
echo.
echo [1] Remover apenas arquivos compilados (dist)
echo [2] Remover node_modules e dist
echo [3] Desinstalar aplicativo (via Painel de Controle)
echo [4] Voltar
echo.
set /p uninstall_choice="Digite sua escolha (1-4): "

if "%uninstall_choice%"=="1" goto REMOVE_DIST
if "%uninstall_choice%"=="2" goto REMOVE_ALL
if "%uninstall_choice%"=="3" goto UNINSTALL_APP
if "%uninstall_choice%"=="4" goto MAIN_MENU
echo ❌ Opção inválida!
pause
goto MAIN_MENU

:REMOVE_DIST
if exist "dist" (
    echo Removendo pasta dist...
    rmdir /s /q dist
    echo ✅ Pasta dist removida!
) else (
    echo ℹ️  Pasta dist não existe
)
pause
goto MAIN_MENU

:REMOVE_ALL
if exist "dist" (
    echo Removendo pasta dist...
    rmdir /s /q dist
    echo ✅ Pasta dist removida!
)
if exist "node_modules" (
    echo Removendo pasta node_modules...
    rmdir /s /q node_modules
    echo ✅ Pasta node_modules removida!
)
echo ✅ Limpeza concluída!
pause
goto MAIN_MENU

:UNINSTALL_APP
echo.
echo 🔧 Abrindo Configurações do Windows...
echo 💡 Procure por "Pinball Patel Fin" e desinstale
start ms-settings:appsfeatures
pause
goto MAIN_MENU

REM ═════════════════════════════════════════════════════
REM  Sair
REM ═════════════════════════════════════════════════════
:EXIT
cls
echo.
echo ═════════════════════════════════════════════════════
echo    Obrigado por usar Pinball Patel Fin!
echo ═════════════════════════════════════════════════════
echo.
echo 🌍 O jogo suporta 10 idiomas!
echo 🎯 Controles: ← → (flippers) ^| ↑ (flipper central) ^| Espaço (lançar)
echo.
timeout /t 3 >nul
exit
