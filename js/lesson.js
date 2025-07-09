// 课程页面JavaScript功能

// 课程数据
const lessonData = {
    words: {
        sushi: {
            kanji: '寿司',
            kana: 'すし',
            romaji: 'sushi',
            pos: '名词',
            meaning: '寿司',
            example: {
                japanese: '寿司を食べたいです。',
                romaji: 'Sushi wo tabetai desu.',
                chinese: '我想吃寿司。'
            },
            audio: 'assets/audio/01sushi/sushi.mp3'
        },
        maguro: {
            kanji: '鮪',
            kana: 'まぐろ',
            romaji: 'maguro',
            pos: '名词',
            meaning: '金枪鱼',
            example: {
                japanese: 'まぐろの刺身が好きです。',
                romaji: 'Maguro no sashimi ga suki desu.',
                chinese: '我喜欢金枪鱼刺身。'
            },
            audio: 'assets/audio/01sushi/maguro.mp3'
        },
        ebi: {
            kanji: '海老',
            kana: 'えび',
            romaji: 'ebi',
            pos: '名词',
            meaning: '虾',
            example: {
                japanese: '海老が好きです。',
                romaji: 'Ebi ga suki desu.',
                chinese: '我喜欢吃虾。'
            },
            audio: 'assets/audio/01sushi/ebi.mp3'
        },
        ikura: {
            kanji: 'いくら',
            kana: 'いくら',
            romaji: 'ikura',
            pos: '名词',
            meaning: '鲑鱼子',
            example: {
                japanese: 'いくらの寿司が美味しいです。',
                romaji: 'Ikura no sushi ga oishii desu.',
                chinese: '鲑鱼子寿司很好吃。'
            },
            audio: 'assets/audio/01sushi/ikura.mp3'
        }
    },
    phrases: {
        phrase1: {
            japanese: '寿司を食べたいです。',
            romaji: 'Sushi wo tabetai desu.',
            chinese: '我想吃寿司。',
            audio: 'assets/audio/01sushi/sushi-phrase-1.mp3'
        },
        phrase2: {
            japanese: '海老が好きです。',
            romaji: 'Ebi ga suki desu.',
            chinese: '我喜欢吃虾。',
            audio: 'assets/audio/01sushi/sushi-phrase-2.mp3'
        }
    }
};

// 学习进度功能已移除

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    bindEvents();
});

// 初始化页面
function initializePage() {
    console.log('课程页面初始化完成');
}

// 绑定事件
function bindEvents() {
    // 绑定单词热点点击事件
    const wordHotspots = document.querySelectorAll('.word-hotspot:not(.coming-soon)');
    wordHotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            const wordId = this.getAttribute('data-word');
            if (wordId && lessonData.words[wordId]) {
                showWordModal(wordId);
            }
        });
    });

    // 绑定短语音频按钮事件
    const phraseAudioBtns = document.querySelectorAll('.phrase-audio-btn');
    phraseAudioBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const phraseId = this.closest('.phrase-card').getAttribute('data-phrase');
            if (phraseId) {
                playPhraseAudio(phraseId);
            }
        });
    });

    // 短语卡片点击事件（学习进度功能已移除）

    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeWordModal();
        }
    });
}

// 显示单词详情弹窗
function showWordModal(wordId) {
    const word = lessonData.words[wordId];
    if (!word) return;

    // 设置当前单词ID
    currentWordId = wordId;

    // 更新弹窗内容
    document.getElementById('word-kanji').textContent = word.kanji;
    document.getElementById('word-kana').textContent = word.kana;
    document.getElementById('word-romaji').textContent = word.romaji;
    document.getElementById('word-pos').textContent = word.pos;
    document.getElementById('word-meaning').textContent = word.meaning;
    document.getElementById('example-japanese').textContent = word.example.japanese;
    document.getElementById('example-romaji').textContent = word.example.romaji;
    document.getElementById('example-chinese').textContent = word.example.chinese;

    // 显示弹窗
    const modal = document.getElementById('word-modal');
    const overlay = document.getElementById('modal-overlay');
    
    modal.classList.add('active');
    overlay.classList.add('active');
    
    // 禁止页面滚动
    document.body.style.overflow = 'hidden';
    
    // 不自动播放音频，等待用户点击播放按钮
    console.log('单词弹窗已打开，等待用户手动播放音频');
}

// 关闭单词详情弹窗
function closeWordModal() {
    const modal = document.getElementById('word-modal');
    const overlay = document.getElementById('modal-overlay');
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
    
    // 恢复页面滚动
    document.body.style.overflow = '';
}

// 播放单词音频
function playWordAudio(wordId) {
    const word = lessonData.words[wordId];
    if (!word || !word.audio) {
        console.log('音频文件不存在:', wordId);
        alert('音频文件不存在');
        return;
    }
    
    console.log('尝试播放音频:', word.audio);
    
    // 创建新的音频对象
    const audio = new Audio();
    audio.src = word.audio;
    audio.preload = 'auto';
    
    // 设置音量
    audio.volume = 1.0;
    
    // 简化的错误处理
    audio.onerror = function(e) {
        console.error('音频加载失败:', e);
        console.error('音频路径:', word.audio);
        alert('音频文件加载失败，路径: ' + word.audio);
    };
    
    audio.onloadeddata = function() {
        console.log('音频数据加载完成');
    };
    
    // 尝试播放
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('音频播放成功');
        }).catch(error => {
            console.error('音频播放失败:', error);
            console.error('错误类型:', error.name);
            console.error('错误信息:', error.message);
            
            // 尝试用户交互后播放
            alert('音频播放失败: ' + error.message + '\n请确保音频文件存在且格式正确');
        });
    }
}

// 播放短语音频
function playPhraseAudio(phraseId) {
    const phrase = lessonData.phrases[phraseId];
    if (!phrase) {
        console.log('短语不存在:', phraseId);
        return;
    }
    
    if (!phrase.audio) {
        alert('该短语的音频文件暂未添加，敬请期待！');
        return;
    }
    
    console.log('尝试播放短语音频:', phrase.audio);
    
    const audio = new Audio(phrase.audio);
    audio.play().then(() => {
        console.log('短语音频播放成功');
    }).catch(error => {
        console.error('短语音频播放失败:', error);
        alert('音频播放失败，请检查文件是否存在。');
    });
}

// 学习进度功能已移除

// 返回主页
function goBack() {
    window.location.href = 'index.html';
}

// 全局变量存储当前显示的单词ID
let currentWordId = null;

// 全局函数，供HTML调用
window.playWordAudio = function() {
    if (currentWordId) {
        // 调用内部的playWordAudio函数，避免递归
        const word = lessonData.words[currentWordId];
        if (!word || !word.audio) {
            console.log('音频文件不存在:', currentWordId);
            alert('音频文件不存在');
            return;
        }
        
        console.log('尝试播放音频:', word.audio);
        
        // 创建新的音频对象
        const audio = new Audio();
        audio.src = word.audio;
        audio.preload = 'auto';
        
        // 设置音量
        audio.volume = 1.0;
        
        // 简化的错误处理
        audio.onerror = function(e) {
            console.error('音频加载失败:', e);
            console.error('音频路径:', word.audio);
            alert('音频文件加载失败，路径: ' + word.audio);
        };
        
        audio.onloadeddata = function() {
            console.log('音频数据加载完成');
        };
        
        // 尝试播放
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('音频播放成功');
            }).catch(error => {
                console.error('音频播放失败:', error);
                console.error('错误类型:', error.name);
                console.error('错误信息:', error.message);
                
                // 尝试用户交互后播放
                alert('音频播放失败: ' + error.message + '\n请确保音频文件存在且格式正确');
            });
        }
    }
};

window.playPhraseAudio = playPhraseAudio;
window.closeWordModal = closeWordModal;
window.goBack = goBack;

// 添加已学习项目的样式
const style = document.createElement('style');
style.textContent = `
    .word-hotspot.learned .hotspot-dot {
        background: #4CAF50;
        animation: none;
    }
    
    .phrase-card.learned {
        background: #e8f5e8;
        border-color: #4CAF50;
    }
    
    .phrase-card.learned .phrase-japanese {
        color: #2e7d32;
    }
`;
document.head.appendChild(style);