#!/bin/bash
# Script de instalação do Pinball Patel Fin para Linux
# Versão: 3.2
# Autor: Vinicius

set -e  # Parar em caso de erro

echo "╔════════════════════════════════════════╗"
echo "║   Instalador Pinball Patel Fin v3.2   ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Função para verificar dependências
check_dependencies() {
    echo "🔍 Verificando dependências..."
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        echo "⚠️  Node.js não encontrado. Será necessário instalar."
        INSTALL_NODE=true
    else
        NODE_VERSION=$(node -v)
        echo "✅ Node.js encontrado: $NODE_VERSION"
    fi
    
    # Verificar npm
    if ! command -v npm &> /dev/null; then
        echo "⚠️  npm não encontrado. Será necessário instalar."
        INSTALL_NPM=true
    else
        NPM_VERSION=$(npm -v)
        echo "✅ npm encontrado: $NPM_VERSION"
    fi
    echo ""
}

# Função para instalar dependências no Debian/Ubuntu
install_deps_debian() {
    echo "📦 Instalando dependências no sistema Debian/Ubuntu..."
    sudo apt-get update
    if [ "$INSTALL_NODE" = true ]; then
        sudo apt-get install -y nodejs npm
    fi
    sudo apt-get install -y libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils libatspi2.0-0 libuuid1 libappindicator3-1
}

# Função para instalar dependências no Fedora
install_deps_fedora() {
    echo "📦 Instalando dependências no sistema Fedora..."
    if [ "$INSTALL_NODE" = true ]; then
        sudo dnf install -y nodejs npm
    fi
    sudo dnf install -y gtk3 libnotify nss libXScrnSaver libXtst xdg-utils at-spi2-core
}

# Função para instalar dependências no Arch
install_deps_arch() {
    echo "📦 Instalando dependências no sistema Arch..."
    if [ "$INSTALL_NODE" = true ]; then
        sudo pacman -S --noconfirm nodejs npm
    fi
    sudo pacman -S --noconfirm gtk3 libnotify nss libxss libxtst xdg-utils at-spi2-core
}

# Detectar distribuição
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    echo "❌ Não foi possível detectar a distribuição Linux"
    exit 1
fi

echo "🔍 Sistema detectado: $OS"
echo ""

# Menu de opções
echo "Escolha uma opção de instalação:"
echo ""
echo "[1] Instalar versão compilada (binário)"
echo "[2] Executar em modo desenvolvimento"
echo "[3] Instalar dependências e compilar"
echo "[4] Cancelar"
echo ""
read -p "Digite sua escolha (1-4): " choice

case $choice in
    1)
        # Instalar binário compilado
        if [ ! -d "dist" ]; then
            echo "❌ Pasta 'dist' não encontrada. Compile o projeto primeiro com 'npm run build:linux'."
            exit 1
        fi
        
        cd dist
        
        case $OS in
            ubuntu|debian|linuxmint|pop)
                echo "📦 Instalando via pacote .deb..."
                DEB_FILE=$(ls pinball-patel-fin_*.deb 2>/dev/null | head -n 1)
                if [ -f "$DEB_FILE" ]; then
                    sudo dpkg -i "$DEB_FILE"
                    sudo apt-get install -f -y
                    echo "✅ Instalação concluída!"
                    echo "🎮 Execute 'pinball-patel-fin' ou procure no menu de aplicativos"
                else
                    echo "❌ Arquivo .deb não encontrado em dist/"
                    exit 1
                fi
                ;;
            
            arch|manjaro|endeavouros)
                echo "📦 Usando AppImage (recomendado para Arch)..."
                APPIMAGE=$(ls Pinball*.AppImage 2>/dev/null | head -n 1)
                if [ -f "$APPIMAGE" ]; then
                    chmod +x "$APPIMAGE"
                    mkdir -p ~/.local/bin
                    cp "$APPIMAGE" ~/.local/bin/pinball-patel-fin.AppImage
            
            # Criar atalho desktop
            mkdir -p ~/.local/share/applications
            cat > ~/.local/share/applications/pinball-patel-fin.desktop << EOL
[Desktop Entry]
Type=Application
Name=Pinball Patel Fin
Comment=Jogo de Pinball com 10 idiomas
Exec=$HOME/.local/bin/pinball-patel-fin.AppImage
Icon=pinball
Terminal=false
Categories=Game;ArcadeGame;
EOL
            echo "✅ AppImage instalado em ~/.local/bin/"
            echo "🎮 Execute 'pinball-patel-fin.AppImage' ou procure no menu"
        else
            echo "❌ Arquivo AppImage não encontrado em dist/"
        fi
        ;;
    
    fedora|rhel|centos)
        echo "📦 Usando AppImage (RPM não disponível)..."
        APPIMAGE=$(ls Pinball*.AppImage 2>/dev/null | head -n 1)
        if [ -f "$APPIMAGE" ]; then
            chmod +x "$APPIMAGE"
            mkdir -p ~/.local/bin
            cp "$APPIMAGE" ~/.local/bin/pinball-patel-fin.AppImage
            echo "✅ AppImage instalado em ~/.local/bin/"
            echo "🎮 Execute 'pinball-patel-fin.AppImage'"
        else
            echo "❌ Arquivo AppImage não encontrado em dist/"
        fi
        ;;
    
    *)
        echo "📦 Instalando AppImage (universal)..."
        APPIMAGE=$(ls Pinball*.AppImage 2>/dev/null | head -n 1)
        if [ -f "$APPIMAGE" ]; then
            chmod +x "$APPIMAGE"
            echo "✅ AppImage pronto para executar!"
            echo "🎮 Execute: ./$APPIMAGE"
            echo ""
            echo "💡 Dica: Mova para ~/.local/bin/ para acesso global:"
            echo "   mkdir -p ~/.local/bin"
            echo "   cp $APPIMAGE ~/.local/bin/pinball-patel-fin.AppImage"
        else
            echo "❌ Arquivo AppImage não encontrado em dist/"
        fi
        ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌍 O jogo suporta 10 idiomas!"
echo "🎯 Controles: ← → (flippers) | ↑ (flipper central) | Espaço (lançar)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
