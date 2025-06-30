// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ハンバーガーメニュー
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // メニュー項目クリック時にメニューを閉じる
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// スクロール時のヘッダー効果
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 要素の表示アニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .comparison-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// フォーム送信処理とバリデーション
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // バリデーション関数
    const validators = {
        required: (value) => value.trim() !== '',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => value === '' || /^[\d\-\+\(\)\s]+$/.test(value),
        minLength: (value, min) => value.length >= min
    };

    // エラーメッセージ
    const errorMessages = {
        lastName: '姓を入力してください',
        firstName: '名を入力してください',
        email: '有効なメールアドレスを入力してください',
        phone: '有効な電話番号を入力してください',
        message: 'お問い合わせ内容を入力してください',
        privacy: '個人情報の取り扱いに同意してください'
    };

    // フィールドのバリデーション
    function validateField(field) {
        const fieldName = field.name;
        const value = field.value;
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';

        // 必須フィールドのチェック
        if (field.hasAttribute('required')) {
            if (!validators.required(value)) {
                isValid = false;
                errorMessage = errorMessages[fieldName] || '必須項目です';
            }
        }

        // メールアドレスのバリデーション
        if (fieldName === 'email' && value) {
            if (!validators.email(value)) {
                isValid = false;
                errorMessage = errorMessages.email;
            }
        }

        // 電話番号のバリデーション
        if (fieldName === 'phone' && value) {
            if (!validators.phone(value)) {
                isValid = false;
                errorMessage = errorMessages.phone;
            }
        }

        // チェックボックスのバリデーション
        if (field.type === 'checkbox' && field.hasAttribute('required')) {
            if (!field.checked) {
                isValid = false;
                errorMessage = errorMessages[fieldName] || '必須項目です';
            }
        }

        // エラー表示の更新
        if (isValid) {
            formGroup.classList.remove('error');
            errorElement.textContent = '';
        } else {
            formGroup.classList.add('error');
            errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    // 全フィールドのバリデーション
    function validateForm() {
        const fields = contactForm.querySelectorAll('input, textarea, select');
        let isFormValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    // リアルタイムバリデーション
    const fields = contactForm.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.closest('.form-group').classList.contains('error')) {
                validateField(field);
            }
        });
    });

    // フォーム送信処理（Netlify Forms用）
    contactForm.addEventListener('submit', function(e) {
        // バリデーション実行
        if (!validateForm()) {
            e.preventDefault();
            // 最初のエラーフィールドにフォーカス
            const firstError = contactForm.querySelector('.form-group.error input, .form-group.error textarea, .form-group.error select');
            if (firstError) {
                firstError.focus();
            }
            return;
        }

        // バリデーションが成功した場合、ローディング状態にしてNetlifyに送信を委ねる
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // ローディング状態
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';

        // Netlify Formsがフォームを自動処理するため、preventDefault()は呼ばない
        // 送信後はNetlifyが自動的に成功ページにリダイレクトするか、
        // 同じページに戻って成功メッセージを表示する
    });

    // リセットボタンの処理
    const resetBtn = contactForm.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // エラー状態をクリア
            const errorGroups = contactForm.querySelectorAll('.form-group.error');
            errorGroups.forEach(group => {
                group.classList.remove('error');
                group.querySelector('.error-message').textContent = '';
            });
        });
    }
});

// カウンターアニメーション
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    }
    
    updateCounter();
}

// クリーニング率のカウンターアニメーション
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const rate = entry.target.textContent.replace('%', '');
            const target = parseInt(rate);
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const cleaningRates = document.querySelectorAll('.cleaning-rate');
    cleaningRates.forEach(rate => {
        counterObserver.observe(rate);
    });
});

// パララックス効果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ローディングアニメーション
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// エアコンアニメーションの強化
document.addEventListener('DOMContentLoaded', () => {
    const airconUnit = document.querySelector('.aircon-unit');
    if (airconUnit) {
        // ホバー効果
        airconUnit.addEventListener('mouseenter', () => {
            airconUnit.style.transform = 'scale(1.05)';
            airconUnit.style.transition = 'transform 0.3s ease';
        });
        
        airconUnit.addEventListener('mouseleave', () => {
            airconUnit.style.transform = 'scale(1)';
        });
    }
});

// スクロール進捗バー
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ffd700, #ffed4e);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ページ読み込み時に進捗バーを作成
document.addEventListener('DOMContentLoaded', createProgressBar);

// 数値のカウントアップアニメーション（特色セクション用）
function countUp(element, target, duration = 1500) {
    let current = 0;
    const increment = target / (duration / 16);
    
    function update() {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    update();
}

// 要素が見えたときにアニメーションを開始
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.dataset.target);
            if (target) {
                countUp(element, target);
                statsObserver.unobserve(element);
            }
        }
    });
}, { threshold: 0.5 });

// 統計数値の監視を開始
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('[data-target]');
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// タブ切り替え機能
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // すべてのタブボタンからactiveクラスを削除
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // すべてのタブパネルからactiveクラスを削除
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // クリックされたタブボタンにactiveクラスを追加
            button.classList.add('active');
            // 対応するタブパネルにactiveクラスを追加
            const targetPanel = document.getElementById(`${targetTab}-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}); 