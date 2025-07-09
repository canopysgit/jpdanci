// 主要功能模块
class JapaneseWordLearning {
    constructor() {
        this.currentLesson = null;
        this.currentWords = [];
        this.currentPhrases = [];
        this.init();
    }

    async init() {
        try {
            console.log('开始初始化应用...');
            console.log('当前设置的课程ID:', window.currentLessonId);
            
            // 加载课程数据
            const response = await fetch('./data/lessons.json');
            const data = await response.json();
            console.log('成功加载课程数据:', data);
            
            // 获取当前课程ID（从全局变量或默认第一课）
            const currentLessonId = window.currentLessonId || data.lessons[0].id;
            console.log('使用的课程ID:', currentLessonId);
            
            const currentLesson = data.lessons.find(lesson => lesson.id === currentLessonId);
            console.log('找到的课程:', currentLesson);
            
            if (!currentLesson) {
                console.warn('未找到指定课程，使用默认第一课');
                this.loadLesson(data.lessons[0]);
            } else {
                // 加载指定课程
                this.loadLesson(currentLesson);
            }
            
            // 初始化导航功能
            this.initNavigation();
            
        } catch (error) {
            console.error('加载课程数据失败:', error);
        }
    }

    loadLesson(lesson) {
        this.currentLesson = lesson;
        this.currentWords = lesson.words;
        this.currentPhrases = lesson.phrases;
        
        // 设置课程标题
        this.setupLessonHeader(lesson);
        
        // 显示单词
        this.displayWords();
        
        // 显示短语
        this.displayPhrases();
    }

    setupLessonHeader(lesson) {
        const titleElement = document.getElementById('lesson-title');
        const descriptionElement = document.getElementById('lesson-description');
        
        if (titleElement) {
            titleElement.textContent = lesson.title;
        }
        
        if (descriptionElement) {
            descriptionElement.textContent = lesson.description;
        }
    }

    displayWords() {
        const wordsGrid = document.getElementById('words-list');
        if (!wordsGrid) return;
        
        // 清空容器并添加加载提示
        wordsGrid.textContent = '';
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.textContent = '加载单词中...';
        wordsGrid.appendChild(loadingDiv);
        
        // 模拟加载延迟，增加用户体验
        setTimeout(() => {
            wordsGrid.textContent = '';
            
            this.currentWords.forEach((word, index) => {
                const wordCard = this.createWordCard(word, index);
                wordCard.classList.add('fade-in');
                
                // 延迟添加动画，创建瀑布流效果
                setTimeout(() => {
                    wordCard.style.animationDelay = `${index * 0.1}s`;
                }, 50);
                
                wordsGrid.appendChild(wordCard);
            });
        }, 300);
    }

    createWordCard(word, index) {
        const card = document.createElement('div');
        card.className = 'word-card';
        card.dataset.wordIndex = index;
        
        // 创建日文显示元素
        const japaneseDiv = document.createElement('div');
        japaneseDiv.className = 'word-japanese';
        let japaneseText = word.kanji;
        if (word.hiragana && word.kanji !== word.hiragana) {
            japaneseText += `（${word.hiragana}）`;
        }
        japaneseDiv.textContent = japaneseText;
        
        // 创建罗马音元素
        const romajiDiv = document.createElement('div');
        romajiDiv.className = 'word-romaji';
        romajiDiv.textContent = word.romaji;
        
        // 创建含义元素
        const meaningDiv = document.createElement('div');
        meaningDiv.className = 'word-meaning';
        meaningDiv.textContent = word.meaning;
        
        // 创建词性元素
        const partOfSpeechDiv = document.createElement('div');
        partOfSpeechDiv.className = 'word-part-of-speech';
        partOfSpeechDiv.textContent = word.partOfSpeech;
        
        // 将所有元素添加到卡片中
        card.appendChild(japaneseDiv);
        card.appendChild(romajiDiv);
        card.appendChild(meaningDiv);
        card.appendChild(partOfSpeechDiv);
        
        // 添加点击事件
        card.addEventListener('click', (e) => {
            // 添加波纹效果
            card.classList.add('ripple');
            setTimeout(() => {
                card.classList.remove('ripple');
            }, 600);
            
            this.highlightWord(index);
        });
        
        return card;
    }

    displayPhrases() {
        const phrasesContainer = document.getElementById('phrases-list');
        if (!phrasesContainer) return;
        
        // 清空容器并添加加载提示
        phrasesContainer.textContent = '';
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.textContent = '加载例句中...';
        phrasesContainer.appendChild(loadingDiv);
        
        // 模拟加载延迟
        setTimeout(() => {
            phrasesContainer.textContent = '';
            
            this.currentPhrases.forEach((phrase, index) => {
                const phraseCard = this.createPhraseCard(phrase, index);
                phraseCard.classList.add('fade-in');
                
                // 延迟添加动画，创建瀑布流效果
                setTimeout(() => {
                    phraseCard.style.animationDelay = `${index * 0.15}s`;
                }, 50);
                
                phrasesContainer.appendChild(phraseCard);
            });
        }, 500); // 比单词稍晚加载
    }

    createPhraseCard(phrase, index) {
        const card = document.createElement('div');
        card.className = 'phrase-card';
        card.dataset.phraseIndex = index;
        
        // 创建日文元素
        const japaneseDiv = document.createElement('div');
        japaneseDiv.className = 'phrase-japanese';
        japaneseDiv.textContent = phrase.japanese;
        
        // 创建罗马音元素
        const romajiDiv = document.createElement('div');
        romajiDiv.className = 'phrase-romaji';
        romajiDiv.textContent = phrase.romaji;
        
        // 创建中文元素
        const chineseDiv = document.createElement('div');
        chineseDiv.className = 'phrase-chinese';
        chineseDiv.textContent = phrase.chinese;
        
        // 将所有元素添加到卡片中
        card.appendChild(japaneseDiv);
        card.appendChild(romajiDiv);
        card.appendChild(chineseDiv);
        
        // 添加点击事件
         card.addEventListener('click', (e) => {
             // 添加波纹效果
             card.classList.add('ripple');
             setTimeout(() => {
                 card.classList.remove('ripple');
             }, 600);
             
             this.highlightPhrase(index);
         });
        
        return card;
    }

    highlightWord(wordIndex) {
        // 清除所有单词高亮
        document.querySelectorAll('.word-card.active').forEach(card => {
            card.classList.remove('active');
        });
        
        // 高亮选中的单词卡片
        const wordCard = document.querySelector(`[data-word-index="${wordIndex}"]`);
        if (wordCard) {
            wordCard.classList.add('active');
        }
    }
    
    highlightPhrase(phraseIndex) {
        // 清除所有短语高亮
        document.querySelectorAll('.phrase-card.active').forEach(card => {
            card.classList.remove('active');
        });
        
        // 高亮选中的短语卡片
        const phraseCard = document.querySelector(`[data-phrase-index="${phraseIndex}"]`);
        if (phraseCard) {
            phraseCard.classList.add('active');
        }
    }

    initNavigation() {
        // 初始化侧边栏功能
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarClose = document.getElementById('sidebar-close');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.add('active');
            });
        }
        
        if (sidebarClose && sidebar) {
            sidebarClose.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        }
        
        // 点击侧边栏外部关闭
        if (sidebar) {
            document.addEventListener('click', (e) => {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            });
        }
    }

}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const app = new JapaneseWordLearning();
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JapaneseWordLearning;
}