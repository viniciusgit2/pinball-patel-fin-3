# 🎮 Guia de Publicação na Steam - Pinball Patel Fin

## 📋 Pré-requisitos

### 1. Conta de Desenvolvedor Steam
- **Custo:** $100 USD (taxa única)
- **Cadastro:** [Steamworks Partner](https://partner.steamgames.com/)
- **Documentos:** ID, dados fiscais, informações bancárias
- **Tempo:** 2-5 dias úteis para aprovação

### 2. Steamworks SDK
- Download: [Steamworks SDK](https://partner.steamgames.com/downloads/steamworks_sdk.zip)
- Integração necessária para achievements, cloud saves, etc. (opcional para jogo básico)

---

## 🎯 Arquivos para Upload na Steam

### Para cada plataforma, você deve enviar:

#### 🪟 **Windows:**
```
📁 build_windows/
├── Pinball Patel Fin.exe (executável principal)
├── resources/
├── locales/
└── todos os arquivos da pasta dist/win-unpacked/
```

**Arquivo a usar:** Pasta completa `dist/win-unpacked/` do build Electron

#### 🐧 **Linux:**
```
📁 build_linux/
├── pinball-patel-fin (executável)
├── resources/
├── locales/
└── todos os arquivos da pasta dist/linux-unpacked/
```

**Arquivo a usar:** Pasta completa `dist/linux-unpacked/` do build Electron

#### 🍎 **macOS:**
```
📁 build_mac/
└── Pinball Patel Fin.app (bundle completo)
```

**Arquivo a usar:** O arquivo `.app` gerado pelo build do Electron

---

## 📝 Passo a Passo para Publicação

### Fase 1: Preparação no Steamworks

1. **Criar App na Steamworks:**
   - Acesse [Steamworks Partner](https://partner.steamgames.com/)
   - Apps & Packages → Create New App
   - Preencha informações básicas (nome, descrição)
   - **Você receberá um App ID** (ex: 123456)

2. **Configurar Página da Store:**
   - Nome: `Pinball Patel Fin`
   - Categoria: `Game → Arcade → Pinball`
   - Recursos:
     - ✅ Single-player
     - ✅ Full controller support (opcional)
     - ✅ Steam Cloud (se implementar)
     - ✅ Steam Achievements (se implementar)
   
3. **Idiomas Suportados:**
   - Português do Brasil
   - Inglês
   - Espanhol
   - Francês
   - Alemão
   - Italiano
   - Japonês
   - Chinês Simplificado
   - Russo
   - Coreano

### Fase 2: Assets da Store

Você precisará criar/fornecer:

#### Imagens Obrigatórias:
- **Capsule (Header):** 460x215 px
- **Library Header:** 460x215 px
- **Library Hero:** 3840x1240 px
- **Small Capsule:** 231x87 px
- **Main Capsule:** 616x353 px
- **Page Background:** 1438x810 px (opcional)

#### Screenshots:
- Mínimo 5 screenshots do jogo
- Resolução: 1920x1080 px (recomendado)
- Formato: PNG ou JPG

#### Vídeo Trailer (opcional mas recomendado):
- YouTube link
- Duração: 30-60 segundos
- Mostrando gameplay

### Fase 3: Upload dos Builds

#### Usando SteamPipe (ferramenta oficial):

1. **Baixe o Steamworks SDK**

2. **Configure os scripts VDF:**

Crie `app_build_[APPID].vdf`:
```vdf
"AppBuild"
{
    "AppID" "123456"  // Seu App ID
    "Desc" "Build v3.0" // Descrição do build
    "ContentRoot" "..\builds\" // Pasta com os builds
    "BuildOutput" "..\output\" // Pasta de output
    "Depots"
    {
        "123457" // Windows Depot ID
        {
            "FileMapping"
            {
                "LocalPath" "windows\*"
                "DepotPath" "."
                "Recursive" "1"
            }
        }
        "123458" // Linux Depot ID
        {
            "FileMapping"
            {
                "LocalPath" "linux\*"
                "DepotPath" "."
                "Recursive" "1"
            }
        }
    }
}
```

3. **Execute o upload:**
```bash
steamcmd +login <username> +run_app_build ..\scripts\app_build_123456.vdf +quit
```

### Fase 4: Configurações Importantes

#### Requisitos do Sistema:

**Windows:**
```
Mínimos:
- SO: Windows 10 64-bit
- Processador: Intel Core i3 ou equivalente
- Memória: 2 GB RAM
- Gráficos: Qualquer GPU com suporte OpenGL 2.0
- Armazenamento: 200 MB

Recomendados:
- SO: Windows 11 64-bit
- Processador: Intel Core i5 ou equivalente
- Memória: 4 GB RAM
- Armazenamento: 500 MB
```

**Linux:**
```
Mínimos:
- SO: Ubuntu 20.04 LTS ou equivalente
- Processador: Intel Core i3 ou equivalente
- Memória: 2 GB RAM
- Armazenamento: 200 MB
```

#### Preço:
- Defina o preço base (ex: $4.99, $9.99)
- A Steam sugere entre $4.99-$14.99 para jogos indie pequenos
- Configure preços regionais (a Steam sugere automaticamente)

### Fase 5: Testes

1. **Beta Testing:**
   - Crie uma branch beta no Steamworks
   - Convide testers (amigos, etc.)
   - Teste em todas as plataformas

2. **Checklist antes de lançar:**
   - [ ] Builds funcionando em Windows/Linux/Mac
   - [ ] Todos os 10 idiomas testados
   - [ ] Screenshots e trailer prontos
   - [ ] Descrição da store completa
   - [ ] Preço configurado
   - [ ] Requisitos do sistema corretos
   - [ ] Página da store revisada

### Fase 6: Lançamento

1. **Submeter para Review:**
   - A Steam revisa em 3-5 dias úteis
   - Pode pedir ajustes/mudanças

2. **Definir Data de Lançamento:**
   - Mínimo 2 semanas após aprovação
   - Recomendado: terça ou quinta-feira

3. **Marketing:**
   - Anuncie nas redes sociais
   - Crie uma lista de desejos (wishlist)
   - Considere desconto de lançamento (10-20%)

---

## 💡 Dicas Importantes

### ✅ Faça:
- Teste extensivamente antes do upload
- Use builds de produção (não debug)
- Otimize o tamanho dos arquivos
- Configure Steam Cloud para salvar progresso
- Adicione conquistas (achievements) se possível
- Responda comentários da comunidade

### ❌ Não faça:
- Não suba builds com bugs conhecidos
- Não esqueça de testar em todas plataformas
- Não use assets protegidos por direitos autorais
- Não mude drasticamente o preço logo após lançamento

---

## 📊 Estrutura Recomendada de Pastas

```
📁 steam_upload/
├── 📁 builds/
│   ├── 📁 windows/
│   │   └── [conteúdo de dist/win-unpacked/]
│   ├── 📁 linux/
│   │   └── [conteúdo de dist/linux-unpacked/]
│   └── 📁 mac/
│       └── [Pinball Patel Fin.app]
├── 📁 scripts/
│   ├── app_build_123456.vdf
│   ├── depot_build_123457.vdf (Windows)
│   ├── depot_build_123458.vdf (Linux)
│   └── depot_build_123459.vdf (Mac)
├── 📁 assets/
│   ├── screenshots/
│   ├── capsules/
│   └── trailer/
└── 📁 output/
```

---

## 🔧 Alternativa Mais Simples

Se você quer apenas distribuir sem toda a complexidade da Steam:

### Opções mais fáceis:
1. **itch.io** (mais simples, sem taxa)
   - Upload direto dos arquivos .exe, .deb, .AppImage
   - Nome seu preço ou grátis
   - Processo em 10 minutos

2. **GameJolt** (grátis, comunidade de indie games)
   
3. **Microsoft Store** (para Windows)

4. **Snap Store** (para Linux)

---

## 📞 Recursos Úteis

- **Documentação Steamworks:** https://partner.steamgames.com/doc/home
- **FAQ de Publicação:** https://partner.steamgames.com/doc/gettingstarted
- **Comunidade:** r/gamedev, r/Steam (Reddit)
- **Suporte Steam:** https://help.steampowered.com/

---

## 💰 Custos Estimados

- **Taxa Steamworks:** $100 USD (única vez)
- **Arte profissional (opcional):** $200-500 USD
- **Marketing (opcional):** $100-1000 USD
- **Total mínimo:** ~$100 USD

---

## ⏱️ Timeline Estimada

1. Cadastro Steamworks: **3-5 dias**
2. Preparação de assets: **1-2 semanas**
3. Configuração da página: **2-3 dias**
4. Upload dos builds: **1 dia**
5. Review da Steam: **3-5 dias**
6. Espera até lançamento: **mínimo 2 semanas**

**Total:** Aproximadamente **1-2 meses** do início ao lançamento

---

**🎮 Boa sorte com a publicação na Steam!**

Se preferir começar com algo mais simples, recomendo **itch.io** para ganhar experiência antes!
