#!/bin/bash
# ═══════════════════════════════════════════════════════════
#  Script de Instalação e Configuração - Pinball Patel Fin
#  Plataforma: Linux (Universal)
#  Versão: 3.0
# ═══════════════════════════════════════════════════════════

set -e  # Parar em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções auxiliares
print_header() {
    echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║     Pinball Patel Fin v3.0 - Setup Linux         ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Verificar dependências do sistema
check_system_deps() {
    echo "🔍 Verificando dependências do sistema..."
    
    local missing_deps=()
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        missing_deps+=("node")
        print_warning "Node.js não encontrado"
    else
        print_success "Node.js $(node -v) encontrado"
    fi
    
    # Verificar npm
    if ! command -v npm &> /dev/null; then
        missing_deps+=("npm")
        print_warning "npm não encontrado"
    else
        print_success "npm $(npm -v) encontrado"
    fi
    
    # Verificar git (opcional)
    if command -v git &> /dev/null; then
        print_success "Git $(git --version | cut -d' ' -f3) encontrado"
    fi
    
    echo ""
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        return 1
    fi
    return 0
}

# Detectar distribuição Linux
detect_distro() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        DISTRO=$ID
        DISTRO_VERSION=$VERSION_ID
        print_info "Sistema: $PRETTY_NAME"
    else
        print_error "Não foi possível detectar a distribuição Linux"
        DISTRO="unknown"
    fi
    echo ""
}

# Instalar dependências no Debian/Ubuntu
install_deps_debian() {
    print_info "Instalando dependências para Debian/Ubuntu..."
    sudo apt-get update
    sudo apt-get install -y nodejs npm
    sudo apt-get install -y libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils libatspi2.0-0 libuuid1 libappindicator3-1
    print_success "Dependências instaladas!"
}

# Instalar dependências no Fedora/RHEL
install_deps_fedora() {
    print_info "Instalando dependências para Fedora/RHEL..."
    sudo dnf install -y nodejs npm
    sudo dnf install -y gtk3 libnotify nss libXScrnSaver libXtst xdg-utils at-spi2-core
    print_success "Dependências instaladas!"
}

# Instalar dependências no Arch Linux
install_deps_arch() {
    print_info "Instalando dependências para Arch Linux..."
    sudo pacman -Sy --noconfirm nodejs npm
    sudo pacman -S --noconfirm gtk3 libnotify nss libxss libxtst xdg-utils at-spi2-core
    print_success "Dependências instaladas!"
}

# Instalar pacotes npm do projeto
install_npm_packages() {
    print_info "Instalando pacotes npm do projeto..."
    
    if [ ! -f "package.json" ]; then
        print_error "package.json não encontrado!"
        return 1
    fi
    
    npm install
    print_success "Pacotes npm instalados com sucesso!"
}

# Compilar o projeto
build_project() {
    print_info "Compilando o projeto para Linux..."
    npm run build:linux
    print_success "Compilação concluída!"
    print_info "Arquivos gerados em: ./dist"
}

# Instalar binário compilado
install_binary() {
    if [ ! -d "dist" ]; then
        print_error "Pasta 'dist' não encontrada!"
        print_warning "Execute primeiro a opção de compilação."
        return 1
    fi
    
    cd dist
    
    case $DISTRO in
        ubuntu|debian|linuxmint|pop|elementary)
            print_info "Instalando pacote .deb..."
            DEB_FILE=$(ls pinball-patel-fin_*.deb 2>/dev/null | head -n 1)
            if [ -f "$DEB_FILE" ]; then
                sudo dpkg -i "$DEB_FILE"
                sudo apt-get install -f -y
                print_success "Instalação concluída!"
                print_info "Execute: pinball-patel-fin"
            else
                print_error "Arquivo .deb não encontrado!"
                install_appimage
            fi
            ;;
        *)
            install_appimage
            ;;
    esac
    
    cd ..
}

# Instalar AppImage
install_appimage() {
    print_info "Instalando AppImage..."
    APPIMAGE=$(ls Pinball*.AppImage 2>/dev/null | head -n 1)
    
    if [ -f "$APPIMAGE" ]; then
        chmod +x "$APPIMAGE"
        mkdir -p ~/.local/bin
        cp "$APPIMAGE" ~/.local/bin/pinball-patel-fin.AppImage
        
        # Criar atalho no menu
        mkdir -p ~/.local/share/applications
        cat > ~/.local/share/applications/pinball-patel-fin.desktop << 'EOF'
[Desktop Entry]
Type=Application
Name=Pinball Patel Fin
Comment=Jogo de Pinball multilíngue (10 idiomas)
Exec=$HOME/.local/bin/pinball-patel-fin.AppImage
Icon=applications-games
Terminal=false
Categories=Game;ArcadeGame;
StartupNotify=true
EOF
        
        # Atualizar banco de dados de aplicações
        if command -v update-desktop-database &> /dev/null; then
            update-desktop-database ~/.local/share/applications
        fi
        
        print_success "AppImage instalado em ~/.local/bin/"
        print_info "Execute: pinball-patel-fin.AppImage"
        print_info "Ou procure 'Pinball Patel Fin' no menu de aplicativos"
    else
        print_error "Arquivo AppImage não encontrado!"
        return 1
    fi
}

# Executar em modo desenvolvimento
run_dev() {
    print_info "Iniciando em modo desenvolvimento..."
    
    if ! check_system_deps; then
        print_error "Dependências faltando! Instale-as primeiro."
        return 1
    fi
    
    if [ ! -d "node_modules" ]; then
        install_npm_packages
    fi
    
    print_success "Iniciando o jogo..."
    npm start
}

# Desinstalar
uninstall() {
    print_warning "Desinstalando Pinball Patel Fin..."
    
    # Remover binário
    if command -v pinball-patel-fin &> /dev/null; then
        case $DISTRO in
            ubuntu|debian|linuxmint|pop|elementary)
                sudo apt-get remove -y pinball-patel-fin
                ;;
        esac
    fi
    
    # Remover AppImage
    if [ -f ~/.local/bin/pinball-patel-fin.AppImage ]; then
        rm -f ~/.local/bin/pinball-patel-fin.AppImage
        print_success "AppImage removido"
    fi
    
    # Remover atalho
    if [ -f ~/.local/share/applications/pinball-patel-fin.desktop ]; then
        rm -f ~/.local/share/applications/pinball-patel-fin.desktop
        print_success "Atalho removido"
    fi
    
    print_success "Desinstalação concluída!"
}

# Menu principal
show_menu() {
    echo "═════════════════════════════════════════════════════"
    echo "  Escolha uma opção:"
    echo "═════════════════════════════════════════════════════"
    echo ""
    echo "  [1] 🚀 Executar em modo desenvolvimento"
    echo "  [2] 🔧 Instalar dependências do sistema"
    echo "  [3] 📦 Instalar pacotes npm do projeto"
    echo "  [4] 🔨 Compilar o projeto"
    echo "  [5] 💿 Instalar versão compilada"
    echo "  [6] ⚡ Instalação completa (deps + compilar + instalar)"
    echo "  [7] 🗑️  Desinstalar"
    echo "  [8] ❌ Sair"
    echo ""
    echo "═════════════════════════════════════════════════════"
    echo ""
}

# Programa principal
main() {
    print_header
    detect_distro
    
    while true; do
        show_menu
        read -p "Digite sua escolha (1-8): " choice
        echo ""
        
        case $choice in
            1)
                run_dev
                ;;
            2)
                if ! check_system_deps; then
                    case $DISTRO in
                        ubuntu|debian|linuxmint|pop|elementary)
                            install_deps_debian
                            ;;
                        fedora|rhel|centos|rocky|alma)
                            install_deps_fedora
                            ;;
                        arch|manjaro|endeavouros|garuda)
                            install_deps_arch
                            ;;
                        *)
                            print_error "Distribuição não suportada para instalação automática"
                            print_info "Instale manualmente: nodejs npm"
                            ;;
                    esac
                else
                    print_success "Todas as dependências já estão instaladas!"
                fi
                ;;
            3)
                install_npm_packages
                ;;
            4)
                if ! check_system_deps; then
                    print_error "Instale as dependências do sistema primeiro!"
                else
                    if [ ! -d "node_modules" ]; then
                        install_npm_packages
                    fi
                    build_project
                fi
                ;;
            5)
                install_binary
                ;;
            6)
                print_info "Iniciando instalação completa..."
                if ! check_system_deps; then
                    case $DISTRO in
                        ubuntu|debian|linuxmint|pop|elementary)
                            install_deps_debian
                            ;;
                        fedora|rhel|centos|rocky|alma)
                            install_deps_fedora
                            ;;
                        arch|manjaro|endeavouros|garuda)
                            install_deps_arch
                            ;;
                        *)
                            print_error "Instale manualmente: nodejs npm"
                            continue
                            ;;
                    esac
                fi
                install_npm_packages
                build_project
                install_binary
                print_success "Instalação completa finalizada!"
                ;;
            7)
                uninstall
                ;;
            8)
                print_info "Saindo..."
                exit 0
                ;;
            *)
                print_error "Opção inválida!"
                ;;
        esac
        
        echo ""
        read -p "Pressione ENTER para continuar..."
        echo ""
    done
}

# Executar programa
main
