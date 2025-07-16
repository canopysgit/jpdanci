// 第五课：在书店 - 初始化数据
const lesson5Data = {
    lessonNumber: 5,
    lessonTitle: "在书店",
    totalItems: 14, // 10个单词 + 4个短句
    vocabulary: [
        {
            id: 1,
            japanese: "書店",
            hiragana: "しょてん",
            romaji: "shoten",
            chinese: "书店",
            type: "名词",
            audio: "shoten.mp3"
        },
        {
            id: 2,
            japanese: "漫画",
            hiragana: "まんが",
            romaji: "manga",
            chinese: "漫画",
            type: "名词",
            audio: "manga.mp3"
        },
        {
            id: 3,
            japanese: "コーナー",
            hiragana: "こーなー",
            romaji: "kōnā",
            chinese: "专区/角落",
            type: "名词",
            audio: "kona.mp3"
        },
        {
            id: 4,
            japanese: "面白い",
            hiragana: "おもしろい",
            romaji: "omoshiroi",
            chinese: "有趣的",
            type: "形容词",
            audio: "omoshiroi.mp3"
        },
        {
            id: 5,
            japanese: "欲しい",
            hiragana: "ほしい",
            romaji: "hoshii",
            chinese: "想要的",
            type: "形容词",
            audio: "hoshii.mp3"
        },
        {
            id: 6,
            japanese: "セール",
            hiragana: "せーる",
            romaji: "sēru",
            chinese: "促销/打折",
            type: "名词",
            audio: "seru.mp3"
        },
        {
            id: 7,
            japanese: "土曜日",
            hiragana: "どようび",
            romaji: "doyōbi",
            chinese: "星期六",
            type: "名词",
            audio: "doyobi.mp3"
        },
        {
            id: 8,
            japanese: "日曜日",
            hiragana: "にちようび",
            romaji: "nichiyōbi",
            chinese: "星期日",
            type: "名词",
            audio: "nichiyobi.mp3"
        },
        {
            id: 9,
            japanese: "雑誌",
            hiragana: "ざっし",
            romaji: "zasshi",
            chinese: "杂志",
            type: "名词",
            audio: "zasshi.mp3"
        },
        {
            id: 10,
            japanese: "レジ",
            hiragana: "れじ",
            romaji: "reji",
            chinese: "结账柜台",
            type: "名词",
            audio: "reji.mp3"
        }
    ],
    phrases: [
        {
            id: 11,
            japanese: "私はこのコーナーの本が大好きです。",
            romaji: "Watashi wa kono kōnā no hon ga daisuki desu.",
            chinese: "我很喜欢这个专区的书。",
            notes: "学习如何表达对特定范围事物的喜爱，使用 AのB 的结构来表示\"A的B\"。"
        },
        {
            id: 12,
            japanese: "漫画コーナーは二階にあります。",
            romaji: "Manga kōnā wa nikai ni arimasu.",
            chinese: "漫画专区在二楼。",
            notes: "学习如何说明某个场所的位置，使用 〜は〜にあります 来表示\"...在...\"。"
        },
        {
            id: 13,
            japanese: "土曜日に書店でセールがあります。",
            romaji: "Doyōbi ni shoten de sēru ga arimasu.",
            chinese: "星期六书店有促销。",
            notes: "学习如何说明在特定时间、特定地点有某个活动，〜に 表示时间，〜で 表示地点。"
        },
        {
            id: 14,
            japanese: "この書店でアメリカの雑誌を買いました。",
            romaji: "Kono shoten de Amerika no zasshi o kaimashita.",
            chinese: "我在这家书店买了美国杂志。",
            notes: "学习如何表达过去完成的动作，使用动词的过去式 〜ました。"
        }
    ]
};

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initializeLesson5();
});

function initializeLesson5() {
    // 生成单词卡片
    generateVocabularyCards();
    
    // 初始化进度
    updateProgress();
    
    // 初始化测试
    initializeQuiz();
}

// 生成单词卡片
function generateVocabularyCards() {
    const grid = document.getElementById('vocabulary-grid');
    if (!grid) return;

    lesson5Data.vocabulary.forEach(word => {
        const card = createVocabularyCard(word);
        grid.appendChild(card);
    });
}

// 创建单词卡片
function createVocabularyCard(word) {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.dataset.wordId = word.id;
    
    card.innerHTML = `
        <div class="word-main">
            <div class="word-japanese">${word.japanese}</div>
            <div class="word-hiragana">${word.hiragana}</div>
            <div class="word-romaji">${word.romaji}</div>
        </div>
        <div class="word-details">
            <div class="word-chinese">${word.chinese}</div>
            <div class="word-type">${word.type}</div>
        </div>
        <button class="audio-btn" onclick="playAudio('vocab${word.id}')">🔊</button>
    `;
    
    card.addEventListener('click', function() {
        card.classList.toggle('learned');
        updateProgress();
    });
    
    return card;
}

// 更新进度
function updateProgress() {
    const learnedCards = document.querySelectorAll('.word-card.learned, .phrase-card.learned');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    
    if (progressText) {
        progressText.textContent = `${learnedCards.length}/${lesson5Data.totalItems}`;
    }
    
    if (progressFill) {
        const percentage = (learnedCards.length / lesson5Data.totalItems) * 100;
        progressFill.style.width = `${percentage}%`;
    }
}

// 播放音频
function playAudio(audioId) {
    const audio = document.getElementById(`audio-${audioId}`);
    if (audio) {
        audio.play().catch(error => {
            console.log('音频播放失败:', error);
        });
    }
}

// 初始化测验
function initializeQuiz() {
    const quizData = [...lesson5Data.vocabulary];
    let currentIndex = 0;
    let shuffledData = [...quizData];
    
    window.currentQuizData = shuffledData;
    window.currentQuizIndex = currentIndex;
    
    displayQuizWord();
}

function displayQuizWord() {
    const data = window.currentQuizData;
    const index = window.currentQuizIndex;
    
    if (!data || data.length === 0) return;
    
    const word = data[index];
    const question = document.getElementById('quiz-question');
    const answer = document.getElementById('quiz-answer');
    
    if (question) {
        question.textContent = `${word.japanese} (${word.hiragana})`;
    }
    
    if (answer) {
        answer.innerHTML = `
            <div><strong>罗马音：</strong> ${word.romaji}</div>
            <div><strong>中文：</strong> ${word.chinese}</div>
            <div><strong>词性：</strong> ${word.type}</div>
        `;
        answer.style.display = 'none';
    }
}

// 测验控制函数
function showAnswer() {
    const answer = document.getElementById('quiz-answer');
    if (answer) {
        answer.style.display = 'block';
    }
}

function nextWord() {
    window.currentQuizIndex = (window.currentQuizIndex + 1) % window.currentQuizData.length;
    displayQuizWord();
}

function previousWord() {
    window.currentQuizIndex = window.currentQuizIndex === 0 ? 
        window.currentQuizData.length - 1 : window.currentQuizIndex - 1;
    displayQuizWord();
}

function shuffleWords() {
    const data = [...lesson5Data.vocabulary];
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
    
    window.currentQuizData = data;
    window.currentQuizIndex = 0;
    displayQuizWord();
}

// 短句卡片交互
document.addEventListener('DOMContentLoaded', function() {
    const phraseCards = document.querySelectorAll('.phrase-card');
    phraseCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('learned');
            updateProgress();
        });
    });
});