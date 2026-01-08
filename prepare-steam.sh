#!/bin/bash
# Script para preparar builds para upload na Steam

echo "╔═══════════════════════════════════════════╗"
echo "║  Preparação de Builds para Steam Upload  ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Criar estrutura de pastas
echo "📁 Criando estrutura de pastas..."
mkdir -p steam_upload/builds/{windows,linux,mac}
mkdir -p steam_upload/assets/{screenshots,capsules,trailer}
mkdir -p steam_upload/scripts
mkdir -p steam_upload/output

# Verificar se os builds existem
if [ ! -d "dist" ]; then
    echo "❌ Pasta 'dist' não encontrada!"
    echo "Execute 'npm run build' primeiro para gerar os builds."
    exit 1
fi

# Copiar builds Windows
echo "📦 Preparando build Windows..."
if [ -d "dist/win-unpacked" ]; then
    cp -r dist/win-unpacked/* steam_upload/builds/windows/
    echo "✅ Build Windows copiado"
else
    echo "⚠️  Build Windows não encontrado"
fi

# Copiar builds Linux
echo "📦 Preparando build Linux..."
if [ -d "dist/linux-unpacked" ]; then
    cp -r dist/linux-unpacked/* steam_upload/builds/linux/
    echo "✅ Build Linux copiado"
else
    echo "⚠️  Build Linux não encontrado"
fi

# Copiar builds macOS (se existir)
echo "📦 Verificando build macOS..."
if [ -d "dist/mac" ]; then
    cp -r dist/mac/*.app steam_upload/builds/mac/
    echo "✅ Build macOS copiado"
else
    echo "⚠️  Build macOS não encontrado (normal se não foi gerado)"
fi

# Criar arquivo README para Steam
cat > steam_upload/README.md << 'EOL'
# Pinball Patel Fin - Steam Upload Package

## Estrutura de Pastas

- `builds/` - Builds compilados para cada plataforma
  - `windows/` - Build para Windows (enviar para depot Windows)
  - `linux/` - Build para Linux (enviar para depot Linux)
  - `mac/` - Build para macOS (enviar para depot macOS)

- `scripts/` - Scripts VDF para SteamPipe
  - Edite os arquivos e substitua `123456` pelo seu App ID
  - Substitua `123457`, `123458`, etc. pelos seus Depot IDs

- `assets/` - Assets para a página da Steam Store
  - `screenshots/` - Coloque 5+ screenshots (1920x1080)
  - `capsules/` - Imagens de capa (vários tamanhos)
  - `trailer/` - Link do YouTube do trailer

- `output/` - Pasta de saída do SteamPipe (gerada automaticamente)

## Próximos Passos

1. Configure sua conta Steamworks Partner
2. Obtenha seu App ID e Depot IDs
3. Edite os arquivos .vdf em `scripts/`
4. Prepare os assets visuais em `assets/`
5. Use SteamPipe para fazer upload dos builds
6. Configure a página da Store no Steamworks

Consulte STEAM-PUBLICACAO.md na raiz do projeto para guia completo.
EOL

# Criar template de script VDF
cat > steam_upload/scripts/app_build_APPID.vdf << 'EOL'
"AppBuild"
{
    "AppID" "SUBSTITUA_SEU_APPID_AQUI"
    "Desc" "Pinball Patel Fin v3.0"
    "ContentRoot" "..\builds\"
    "BuildOutput" "..\output\"
    
    "Depots"
    {
        "DEPOT_WINDOWS" // Substitua pelo Depot ID do Windows
        {
            "FileMapping"
            {
                "LocalPath" "windows\*"
                "DepotPath" "."
                "Recursive" "1"
            }
        }
        
        "DEPOT_LINUX" // Substitua pelo Depot ID do Linux
        {
            "FileMapping"
            {
                "LocalPath" "linux\*"
                "DepotPath" "."
                "Recursive" "1"
            }
        }
        
        "DEPOT_MAC" // Substitua pelo Depot ID do macOS
        {
            "FileMapping"
            {
                "LocalPath" "mac\*"
                "DepotPath" "."
                "Recursive" "1"
            }
        }
    }
}
EOL

# Criar checklist
cat > steam_upload/CHECKLIST.txt << 'EOL'
╔════════════════════════════════════════════════════════════╗
║           CHECKLIST DE PUBLICAÇÃO NA STEAM                 ║
╚════════════════════════════════════════════════════════════╝

PREPARAÇÃO:
[ ] Conta Steamworks Partner criada ($100 pago)
[ ] App criado no Steamworks
[ ] App ID e Depot IDs obtidos
[ ] Builds compilados e testados

ARQUIVOS DE BUILD:
[ ] Build Windows testado
[ ] Build Linux testado
[ ] Build macOS testado (se aplicável)
[ ] Scripts VDF configurados com IDs corretos

ASSETS DA STORE:
[ ] 5+ Screenshots (1920x1080)
[ ] Capsule 460x215
[ ] Library Header 460x215
[ ] Small Capsule 231x87
[ ] Main Capsule 616x353
[ ] Library Hero 3840x1240
[ ] Trailer do YouTube (opcional mas recomendado)

CONFIGURAÇÃO DA PÁGINA:
[ ] Nome: Pinball Patel Fin
[ ] Descrição curta escrita
[ ] Descrição completa escrita
[ ] 10 idiomas configurados
[ ] Categoria: Arcade → Pinball
[ ] Tags apropriadas
[ ] Preço definido

REQUISITOS DO SISTEMA:
[ ] Windows mínimos/recomendados
[ ] Linux mínimos/recomendados
[ ] macOS mínimos/recomendados (se aplicável)

FUNCIONALIDADES:
[ ] Single-player marcado
[ ] Full controller support (se implementado)
[ ] Steam Cloud configurado (opcional)
[ ] Achievements criados (opcional)

TESTES:
[ ] Testado em Windows 10/11
[ ] Testado em Ubuntu 20.04+
[ ] Testado em macOS (se aplicável)
[ ] Todos os 10 idiomas verificados
[ ] Salvamento de progresso funcional
[ ] Sem bugs críticos

LANÇAMENTO:
[ ] Builds enviados via SteamPipe
[ ] Página da store 100% preenchida
[ ] Data de lançamento definida
[ ] Review da Steam aprovada
[ ] Marketing preparado

═══════════════════════════════════════════════════════════

Lembre-se: Mínimo 2 semanas entre aprovação e lançamento!
EOL

# Criar informações de requisitos do sistema
cat > steam_upload/system_requirements.txt << 'EOL'
REQUISITOS DO SISTEMA PARA STEAM STORE PAGE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WINDOWS:

Mínimos:
  SO: Windows 10 64-bit
  Processador: Intel Core i3 ou equivalente AMD
  Memória: 2 GB RAM
  Placa de vídeo: Qualquer GPU com suporte a OpenGL 2.0
  DirectX: Versão 11
  Armazenamento: 200 MB de espaço disponível

Recomendados:
  SO: Windows 11 64-bit
  Processador: Intel Core i5 ou equivalente AMD
  Memória: 4 GB RAM
  Armazenamento: 500 MB de espaço disponível

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LINUX:

Mínimos:
  SO: Ubuntu 20.04 LTS ou equivalente
  Processador: Intel Core i3 ou equivalente AMD
  Memória: 2 GB RAM
  Placa de vídeo: Qualquer GPU com suporte a OpenGL 2.0
  Armazenamento: 200 MB de espaço disponível

Recomendados:
  SO: Ubuntu 22.04 LTS ou mais recente
  Processador: Intel Core i5 ou equivalente AMD
  Memória: 4 GB RAM
  Armazenamento: 500 MB de espaço disponível

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MACOS:

Mínimos:
  SO: macOS 10.13 High Sierra
  Processador: Intel Core i3 ou Apple M1
  Memória: 2 GB RAM
  Armazenamento: 200 MB de espaço disponível

Recomendados:
  SO: macOS 12 Monterey ou mais recente
  Processador: Intel Core i5 ou Apple M1/M2
  Memória: 4 GB RAM
  Armazenamento: 500 MB de espaço disponível

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTAS ADICIONAIS:
- Conexão com a internet necessária apenas para instalação
- Suporte a 10 idiomas incluído
- Jogo funciona offline após instalação
- Requer mouse e teclado (controle opcional)
EOL

# Informações finais
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Preparação completa!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📁 Pasta criada: steam_upload/"
echo ""
echo "📋 Próximos passos:"
echo "  1. Revise steam_upload/CHECKLIST.txt"
echo "  2. Edite steam_upload/scripts/app_build_APPID.vdf"
echo "  3. Adicione assets em steam_upload/assets/"
echo "  4. Consulte STEAM-PUBLICACAO.md para guia completo"
echo ""
echo "💡 Tamanhos dos builds preparados:"
du -sh steam_upload/builds/* 2>/dev/null | sed 's/^/     /'
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
