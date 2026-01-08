// Sistema de tradução para o Pinball Patel Fin
const tradutor = {
    // Idioma atual
    idiomaAtual: 'pt-BR',
    
    // Traduções disponíveis
    traducoes: {
        'pt-BR': {
            titulo: 'PINBALL PATEL FIN',
            pontos: 'PONTOS:',
            bolas: 'BOLAS:',
            highScore: 'HIGH SCORE:',
            gameOver: 'GAME OVER',
            pontuacaoFinal: 'Pontuação Final:',
            jogarNovamente: 'JOGAR NOVAMENTE',
            bemVindo: 'BEM-VINDO AO PINBALL PATEL FIN',
            instrucoes: {
                setasLaterais: 'Setas <strong>ESQUERDA</strong> e <strong>DIREITA</strong>: Flippers laterais',
                setaCima: 'Seta <strong>PARA CIMA</strong>: Flipper central',
                espaco: 'Tecla <strong>ESPAÇO</strong>: Lançar a bola (segure e solte)',
                objetivo: 'Acerte os bumpers e alvos para marcar pontos',
                combos: 'Combos aumentam sua pontuação!'
            },
            iniciarJogo: 'INICIAR JOGO',
            combo: 'COMBO x'
        },
        
        'en-US': {
            titulo: 'PINBALL PATEL FIN',
            pontos: 'SCORE:',
            bolas: 'BALLS:',
            highScore: 'HIGH SCORE:',
            gameOver: 'GAME OVER',
            pontuacaoFinal: 'Final Score:',
            jogarNovamente: 'PLAY AGAIN',
            bemVindo: 'WELCOME TO PINBALL PATEL FIN',
            instrucoes: {
                setasLaterais: '<strong>LEFT</strong> and <strong>RIGHT</strong> Arrows: Side flippers',
                setaCima: '<strong>UP</strong> Arrow: Center flipper',
                espaco: '<strong>SPACE</strong> Key: Launch the ball (hold and release)',
                objetivo: 'Hit the bumpers and targets to score points',
                combos: 'Combos increase your score!'
            },
            iniciarJogo: 'START GAME',
            combo: 'COMBO x'
        },
        
        'es-ES': {
            titulo: 'PINBALL PATEL FIN',
            pontos: 'PUNTOS:',
            bolas: 'BOLAS:',
            highScore: 'PUNTUACIÓN ALTA:',
            gameOver: 'FIN DEL JUEGO',
            pontuacaoFinal: 'Puntuación Final:',
            jogarNovamente: 'JUGAR DE NUEVO',
            bemVindo: 'BIENVENIDO A PINBALL PATEL FIN',
            instrucoes: {
                setasLaterais: 'Flechas <strong>IZQUIERDA</strong> y <strong>DERECHA</strong>: Flippers laterales',
                setaCima: 'Flecha <strong>ARRIBA</strong>: Flipper central',
                espaco: 'Tecla <strong>ESPACIO</strong>: Lanzar la bola (mantener y soltar)',
                objetivo: 'Golpea los bumpers y objetivos para anotar puntos',
                combos: '¡Los combos aumentan tu puntuación!'
            },
            iniciarJogo: 'INICIAR JUEGO',
            combo: 'COMBO x'
        },
        
        'fr-FR': {
            titulo: 'PINBALL PATEL FIN',
            pontos: 'POINTS:',
            bolas: 'BALLES:',
            highScore: 'MEILLEUR SCORE:',
            gameOver: 'FIN DU JEU',
            pontuacaoFinal: 'Score Final:',
            jogarNovamente: 'REJOUER',
            bemVindo: 'BIENVENUE À PINBALL PATEL FIN',
            instrucoes: {
                setasLaterais: 'Flèches <strong>GAUCHE</strong> et <strong>DROITE</strong>: Flippers latéraux',
                setaCima: 'Flèche <strong>HAUT</strong>: Flipper central',
                espaco: 'Touche <strong>ESPACE</strong>: Lancer la balle (maintenir et relâcher)',
                objetivo: 'Frappez les bumpers et cibles pour marquer des points',
                combos: 'Les combos augmentent votre score!'
            },
            iniciarJogo: 'COMMENCER LE JEU',
            combo: 'COMBO x'
        },
        
        'de-DE': {
            titulo: 'PINBALL PATEL FIN',
            pontos: 'PUNKTE:',
            bolas: 'BÄLLE:',
            highScore: 'HÖCHSTPUNKTZAHL:',
            gameOver: 'SPIEL VORBEI',
            pontuacaoFinal: 'Endpunktzahl:',
            jogarNovamente: 'NOCHMAL SPIELEN',
            bemVindo: 'WILLKOMMEN BEI PINBALL PATEL FIN',
            instrucoes: {
                setasLaterais: '<strong>LINKS</strong> und <strong>RECHTS</strong> Pfeile: Seitenflossen',
                setaCima: '<strong>NACH OBEN</strong> Pfeil: Mittlere Flosse',
                espaco: '<strong>LEERTASTE</strong>: Ball starten (halten und loslassen)',
                objetivo: 'Treffen Sie die Bumper und Ziele, um Punkte zu erzielen',
                combos: 'Combos erhöhen Ihre Punktzahl!'
            },
            iniciarJogo: 'SPIEL STARTEN',
            combo: 'COMBO x'
        },
        
        'it-IT': {
            titulo: 'PINBALL PATEL FIN',
            pontos: 'PUNTEGGIO:',
            bolas: 'PALLE:',
            highScore: 'PUNTEGGIO MASSIMO:',
            gameOver: 'FINE DEL GIOCO',
            pontuacaoFinal: 'Punteggio Finale:',
            jogarNovamente: 'GIOCA ANCORA',
            bemVindo: 'BENVENUTO A PINBALL PATEL FIN',
            instrucoes: {
                setasLaterais: 'Frecce <strong>SINISTRA</strong> e <strong>DESTRA</strong>: Flipper laterali',
                setaCima: 'Freccia <strong>SU</strong>: Flipper centrale',
                espaco: 'Tasto <strong>SPAZIO</strong>: Lanciare la palla (tenere e rilasciare)',
                objetivo: 'Colpisci i bumper e i bersagli per segnare punti',
                combos: 'I combo aumentano il tuo punteggio!'
            },
            iniciarJogo: 'INIZIA GIOCO',
            combo: 'COMBO x'
        },
        
        'ja-JP': {
            titulo: 'PINBALL PATEL FIN',
            pontos: 'スコア:',
            bolas: 'ボール:',
            highScore: 'ハイスコア:',
            gameOver: 'ゲームオーバー',
            pontuacaoFinal: '最終スコア:',
            jogarNovamente: 'もう一度プレイ',
            bemVindo: 'PINBALL PATEL FINへようこそ',
            instrucoes: {
                setasLaterais: '<strong>左</strong>と<strong>右</strong>の矢印: サイドフリッパー',
                setaCima: '<strong>上</strong>矢印: 中央フリッパー',
                espaco: '<strong>スペース</strong>キー: ボールを発射（押したまま離す）',
                objetivo: 'バンパーとターゲットを打ってポイントを獲得',
                combos: 'コンボでスコアが上がる！'
            },
            iniciarJogo: 'ゲーム開始',
            combo: 'コンボ x'
        },
        
        'zh-CN': {
            titulo: 'PINBALL PATEL FIN',
            pontos: '分数:',
            bolas: '球:',
            highScore: '最高分:',
            gameOver: '游戏结束',
            pontuacaoFinal: '最终分数:',
            jogarNovamente: '再玩一次',
            bemVindo: '欢迎来到 PINBALL PATEL FIN',
            instrucoes: {
                setasLaterais: '<strong>左</strong>和<strong>右</strong>箭头: 侧面挡板',
                setaCima: '<strong>上</strong>箭头: 中央挡板',
                espaco: '<strong>空格</strong>键: 发射球（按住并释放）',
                objetivo: '击中保险杠和目标得分',
                combos: '连击增加你的分数！'
            },
            iniciarJogo: '开始游戏',
            combo: '连击 x'
        },
        
        'ru-RU': {
            titulo: 'PINBALL PATEL FIN',
            pontos: 'ОЧКИ:',
            bolas: 'ШАРЫ:',
            highScore: 'РЕКОРД:',
            gameOver: 'ИГРА ОКОНЧЕНА',
            pontuacaoFinal: 'Финальный Счет:',
            jogarNovamente: 'ИГРАТЬ СНОВА',
            bemVindo: 'ДОБРО ПОЖАЛОВАТЬ В PINBALL PATEL FIN',
            instrucoes: {
                setasLaterais: 'Стрелки <strong>ВЛЕВО</strong> и <strong>ВПРАВО</strong>: Боковые флипперы',
                setaCima: 'Стрелка <strong>ВВЕРХ</strong>: Центральный флиппер',
                espaco: 'Клавиша <strong>ПРОБЕЛ</strong>: Запустить мяч (удержать и отпустить)',
                objetivo: 'Попадайте в бамперы и цели для набора очков',
                combos: 'Комбо увеличивают ваш счет!'
            },
            iniciarJogo: 'НАЧАТЬ ИГРУ',
            combo: 'КОМБО x'
        },
        
        'ko-KR': {
            titulo: 'PINBALL PATEL FIN',
            pontos: '점수:',
            bolas: '공:',
            highScore: '최고 점수:',
            gameOver: '게임 오버',
            pontuacaoFinal: '최종 점수:',
            jogarNovamente: '다시 플레이',
            bemVindo: 'PINBALL PATEL FIN에 오신 것을 환영합니다',
            instrucoes: {
                setasLaterais: '<strong>왼쪽</strong> 및 <strong>오른쪽</strong> 화살표: 측면 플리퍼',
                setaCima: '<strong>위</strong> 화살표: 중앙 플리퍼',
                espaco: '<strong>스페이스</strong> 키: 공 발사 (누르고 놓기)',
                objetivo: '범퍼와 타겟을 맞춰 점수 획득',
                combos: '콤보로 점수를 올리세요!'
            },
            iniciarJogo: '게임 시작',
            combo: '콤보 x'
        }
    },
    
    // Obter texto traduzido
    obter: function(chave) {
        const idioma = this.traducoes[this.idiomaAtual];
        const caminhos = chave.split('.');
        let resultado = idioma;
        
        for (let caminho of caminhos) {
            resultado = resultado[caminho];
            if (!resultado) return chave;
        }
        
        return resultado;
    },
    
    // Mudar idioma
    mudarIdioma: function(novoIdioma) {
        if (this.traducoes[novoIdioma]) {
            this.idiomaAtual = novoIdioma;
            this.aplicarTraducoes();
            // Salvar preferência no localStorage
            localStorage.setItem('pinballIdioma', novoIdioma);
            return true;
        }
        return false;
    },
    
    // Aplicar traduções na página
    aplicarTraducoes: function() {
        // Título
        const titulo = document.querySelector('.neon-title');
        if (titulo) titulo.textContent = this.obter('titulo');
        
        // Placar
        const labels = document.querySelectorAll('.score-board .label');
        if (labels[0]) labels[0].textContent = this.obter('pontos');
        if (labels[1]) labels[1].textContent = this.obter('bolas');
        if (labels[2]) labels[2].textContent = this.obter('highScore');
        
        // Game Over
        const gameOverTitle = document.querySelector('.game-over-title');
        if (gameOverTitle) gameOverTitle.textContent = this.obter('gameOver');
        
        const finalScoreText = document.querySelector('.final-score');
        if (finalScoreText) {
            const scoreValue = document.getElementById('finalScore').textContent;
            finalScoreText.innerHTML = `${this.obter('pontuacaoFinal')} <span id="finalScore">${scoreValue}</span>`;
        }
        
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) restartBtn.textContent = this.obter('jogarNovamente');
        
        // Tela inicial
        const startTitle = document.querySelector('.start-title');
        if (startTitle) startTitle.textContent = this.obter('bemVindo');
        
        const instructionsParagraphs = document.querySelectorAll('.instructions p');
        if (instructionsParagraphs.length >= 5) {
            instructionsParagraphs[0].innerHTML = '⌨️ ' + this.obter('instrucoes.setasLaterais');
            instructionsParagraphs[1].innerHTML = '⌨️ ' + this.obter('instrucoes.setaCima');
            instructionsParagraphs[2].innerHTML = '⌨️ ' + this.obter('instrucoes.espaco');
            instructionsParagraphs[3].innerHTML = '🎯 ' + this.obter('instrucoes.objetivo');
            instructionsParagraphs[4].innerHTML = '⚡ ' + this.obter('instrucoes.combos');
        }
        
        const startBtn = document.getElementById('startBtn');
        if (startBtn) startBtn.textContent = this.obter('iniciarJogo');
        
        // Atualizar atributo lang do HTML
        document.documentElement.lang = this.idiomaAtual;
    },
    
    // Inicializar tradutor
    inicializar: function() {
        // Carregar idioma salvo ou detectar idioma do navegador
        const idiomaSalvo = localStorage.getItem('pinballIdioma');
        const idiomaNavegador = navigator.language || navigator.userLanguage;
        
        if (idiomaSalvo && this.traducoes[idiomaSalvo]) {
            this.idiomaAtual = idiomaSalvo;
        } else if (this.traducoes[idiomaNavegador]) {
            this.idiomaAtual = idiomaNavegador;
        }
        
        this.aplicarTraducoes();
    },
    
    // Listar idiomas disponíveis
    listarIdiomas: function() {
        return Object.keys(this.traducoes).map(codigo => {
            const nomes = {
                'pt-BR': 'Português (Brasil)',
                'en-US': 'English (US)',
                'es-ES': 'Español',
                'fr-FR': 'Français',
                'de-DE': 'Deutsch',
                'it-IT': 'Italiano',
                'ja-JP': '日本語',
                'zh-CN': '中文（简体）',
                'ru-RU': 'Русский',
                'ko-KR': '한국어'
            };
            return { codigo, nome: nomes[codigo] || codigo };
        });
    }
};

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => tradutor.inicializar());
} else {
    tradutor.inicializar();
}
