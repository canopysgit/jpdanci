// 主页JavaScript功能

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeHomePage();
    loadLearningStats();
});

// 初始化主页
function initializeHomePage() {
    console.log('日语学习软件主页初始化完成');
    
    // 添加课程卡片悬停效果
    const lessonCards = document.querySelectorAll('.lesson-card:not(.coming-soon)');
    lessonCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 加载学习统计数据
function loadLearningStats() {
    try {
        // 加载寿司屋课程进度
        const sushiProgress = localStorage.getItem('jp-learning-progress-sushi');
        if (sushiProgress) {
            const progress = JSON.parse(sushiProgress);
            const totalLearned = progress.wordsLearned.length + progress.phrasesLearned.length;
            
            // 更新寿司屋课程统计
            updateLessonStats('sushi', {
                wordsLearned: progress.wordsLearned.length,
                phrasesLearned: progress.phrasesLearned.length,
                totalProgress: totalLearned
            });
        }
    } catch (error) {
        console.log('加载学习统计失败:', error);
    }
}

// 更新课程统计显示
function updateLessonStats(lessonId, stats) {
    const lessonCard = document.querySelector(`[data-lesson="${lessonId}"]`);
    if (!lessonCard) return;
    
    // 更新统计数字
    const wordsStat = lessonCard.querySelector('.words-stat .stat-number');
    const phrasesStat = lessonCard.querySelector('.phrases-stat .stat-number');
    
    if (wordsStat) {
        wordsStat.textContent = `${stats.wordsLearned}/10`;
    }
    
    if (phrasesStat) {
        phrasesStat.textContent = `${stats.phrasesLearned}/5`;
    }
    
    // 如果有进度，更新按钮文本
    if (stats.totalProgress > 0) {
        const btn = lessonCard.querySelector('.lesson-btn');
        if (btn) {
            btn.textContent = '继续学习';
        }
    }
}

// 跳转到课程页面
function startLesson(lessonId) {
    if (lessonId === 'sushi') {
        window.location.href = 'lesson.html';
    } else {
        showComingSoonMessage(lessonId);
    }
}

// 显示即将推出消息
function showComingSoonMessage(lessonId) {
    const messages = {
        'restaurant': '餐厅场景即将推出，敬请期待！',
        'shopping': '购物场景即将推出，敬请期待！',
        'travel': '旅行场景即将推出，敬请期待！',
        'school': '学校场景即将推出，敬请期待！',
        'hospital': '医院场景即将推出，敬请期待！',
        'bank': '银行场景即将推出，敬请期待！',
        'hotel': '酒店场景即将推出，敬请期待！',
        'station': '车站场景即将推出，敬请期待！',
        'office': '办公室场景即将推出，敬请期待！'
    };
    
    const message = messages[lessonId] || '该课程即将推出，敬请期待！';
    alert(message);
}

// 全局函数
window.startLesson = startLesson;

// 添加一些动画效果
function addAnimations() {
    // 页面滚动时的动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察课程卡片
    const cards = document.querySelectorAll('.lesson-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// 页面加载完成后添加动画
setTimeout(addAnimations, 100);