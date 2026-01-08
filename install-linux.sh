#!/bin/bash
# Script de instalação do Pinball Patel Fin para Linux

echo "╔════════════════════════════════════════╗"
echo "║   Instalador Pinball Patel Fin v3.0   ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Detectar distribuição
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    echo "❌ Não foi possível detectar a distribuição Linux"
    exit 1
fi

# Verificar se está na pasta dist
if [ ! -d "dist" ]; then
    echo "❌ Pasta 'dist' não encontrada. Execute este script na raiz do projeto."
    exit 1
fi

cd dist

echo "🔍 Sistema detectado: $OS"
echo ""

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
