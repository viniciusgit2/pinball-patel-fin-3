# 📦 Guia de Instalação - Pinball Patel Fin v4.0

## 🚀 Instalação Rápida

### 🐧 Linux

**Método Automático (Recomendado):**
```bash
chmod +x install-linux.sh
./install-linux.sh
```

**Método Manual:**

#### Ubuntu/Debian/Linux Mint:
```bash
cd dist
sudo dpkg -i pinball-patel-fin_3.2.0_amd64.deb
sudo apt-get install -f -y
```

#### Arch Linux/Manjaro/Outras Distros (AppImage):
```bash
cd dist
chmod +x "Pinball Patel Fin-3.2.0.AppImage"
./"Pinball Patel Fin-3.2.0.AppImage"
```

**Instalação permanente do AppImage:**
```bash
mkdir -p ~/.local/bin
cp dist/"Pinball Patel Fin-3.2.0.AppImage" ~/.local/bin/pinball-patel-fin.AppImage
```

---

### 🪟 Windows

**Método Automático (Recomendado):**
1. Duplo clique em `install-windows.bat`
2. Escolha entre instalador completo ou versão portátil

**Método Manual:**

#### Instalador Completo:
1. Vá para a pasta `dist`
2. Duplo clique em `Pinball Patel Fin Setup 3.2.0.exe`
3. Siga as instruções na tela
4. Procure por "Pinball Patel Fin" no Menu Iniciar

#### Versão Portátil (sem instalação):
1. Vá para a pasta `dist`
2. Duplo clique em `Pinball Patel Fin 3.2.0.exe`
3. O jogo inicia diretamente!

💡 **Dica:** Você pode copiar o arquivo `.exe` portátil para qualquer pasta ou pendrive!

---

### 🍎 macOS

Para criar build para macOS (requer um Mac):
```bash
npm install
npm run build:mac
```

Após o build, instale o arquivo `.dmg` gerado em `dist/`.

---

## 📋 Requisitos do Sistema

### Mínimos:
- **SO:** Windows 10+, Ubuntu 20.04+, macOS 10.13+
- **RAM:** 2 GB
- **Espaço:** 200 MB

### Recomendados:
- **SO:** Windows 11, Ubuntu 22.04+, macOS 12+
- **RAM:** 4 GB
- **Espaço:** 500 MB

---

## 🎮 Como Jogar

### Controles:

**Teclado:**
- **← →** - Flippers laterais
- **↑** - Flipper central
- **Espaço** - Lançar a bola (segure e solte para ajustar a força)

**Mouse:**
- **Clique** sobre qualquer flipper para ativá-lo
- **Mantenha pressionado** para manter o flipper ativo
- **Solte** para liberar o flipper

**Touchscreen (dispositivos táteis):**
- **Toque** sobre qualquer flipper para ativá-lo
- **Mantenha pressionado** para manter o flipper ativo
- **Solte** para liberar o flipper
- Suporte para **multi-toque** - controle vários flippers simultaneamente!

### Objetivo:
- Acerte os bumpers coloridos para ganhar pontos
- Faça combos para multiplicar sua pontuação
- Evite perder todas as 3 bolas
- Tente alcançar o high score!

---

## 🌍 Idiomas Disponíveis

O jogo detecta automaticamente o idioma do seu sistema e oferece suporte para:

- 🇧🇷 Português (Brasil)
- 🇺🇸 English (US)
- 🇪🇸 Español
- 🇫🇷 Français
- 🇩🇪 Deutsch
- 🇮🇹 Italiano
- 🇯🇵 日本語
- 🇨🇳 中文 (Chinês Simplificado)
- 🇷🇺 Русский
- 🇰🇷 한국어

Você pode trocar o idioma a qualquer momento usando o seletor no topo da tela!

---

## 🔧 Desinstalação

### Linux (Ubuntu/Debian):
```bash
sudo apt remove pinball-patel-fin
```

### Linux (AppImage):
```bash
rm ~/.local/bin/pinball-patel-fin.AppImage
rm ~/.local/share/applications/pinball-patel-fin.desktop
```

### Windows:
- **Instalador:** Painel de Controle → Programas → Desinstalar
- **Portátil:** Apenas delete o arquivo `.exe`

---

## ❓ Solução de Problemas

### Linux: "Permissão negada" ao executar AppImage
```bash
chmod +x "Pinball Patel Fin-3.2.0.AppImage"
```

### Windows: "O Windows protegeu seu PC"
1. Clique em "Mais informações"
2. Clique em "Executar assim mesmo"

### O jogo não inicia
1. Verifique se tem espaço em disco suficiente
2. No Linux, instale dependências: `sudo apt install libgtk-3-0 libnotify4 libnss3 libxss1`
3. Reinicie o computador

---

## 📞 Suporte

- **GitHub:** [github.com/viniciusgit2/pinball-patel-fin-3](https://github.com/viniciusgit2/pinball-patel-fin-3)
- **Reportar bugs:** Crie uma issue no GitHub

---

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE.txt` para mais detalhes.

---

**Divirta-se jogando Pinball Patel Fin! 🎮🎯**
