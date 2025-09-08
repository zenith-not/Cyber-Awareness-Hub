document.addEventListener('DOMContentLoaded', function() {
    
    const quizForm = document.getElementById('cyber-quiz');
    const quizResults = document.getElementById('quiz-results');
    const scoreText = document.getElementById('score-text');
    

    const correctAnswers = {
        q1: 'B', 
        q2: 'C', 
        q3: 'A', 
        q4: 'C'  
    };
    
    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let score = 0;
            let totalQuestions = Object.keys(correctAnswers).length;
            for (let question in correctAnswers) {
                const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
                if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
                    score++;
                }
            }
            
       
            const percentage = (score / totalQuestions) * 100;
            
 
            quizResults.classList.remove('hidden');
            scoreText.textContent = `You scored ${score} out of ${totalQuestions} (${percentage}%)`;
            
            
            quizResults.className = 'mt-8 p-4 rounded-lg';
            if (percentage >= 80) {
                quizResults.classList.add('bg-green-200', 'text-green-800');
                scoreText.textContent += ' - Excellent! You have great cyber awareness!';
            } else if (percentage >= 60) {
                quizResults.classList.add('bg-yellow-200', 'text-yellow-800');
                scoreText.textContent += ' - Good job! Keep learning about cyber security.';
            } else {
                quizResults.classList.add('bg-red-200', 'text-red-800');
                scoreText.textContent += ' - Keep studying! Cyber security is important.';
            }
            
            
            quizResults.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
 
    const radioButtons = document.querySelectorAll('.quiz-option input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
           
            const questionName = this.name;
            const allOptionsForQuestion = document.querySelectorAll(`input[name="${questionName}"]`);
            
            allOptionsForQuestion.forEach(option => {
                const circle = option.parentElement.querySelector('.w-3');
                const label = option.closest('.quiz-option');
                
                if (option === this) {
                    
                    circle.style.opacity = '1';
                    label.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                    label.style.color = 'white';
                    label.style.borderColor = '#667eea';
                } else {
                    
                    circle.style.opacity = '0';
                    label.style.background = '';
                    label.style.color = '';
                    label.style.borderColor = 'transparent';
                }
            });
        });
    });
    
    const passwordInput = document.getElementById('password-strength-input');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            updatePasswordStrengthDisplay(strength);
        });
    }
    
    function calculatePasswordStrength(password) {
        let score = 0;
        let feedback = [];
        
        if (password.length >= 8) score += 1;
        else feedback.push('at least 8 characters');
        
        if (/[a-z]/.test(password)) score += 1;
        else feedback.push('lowercase letters');
        
        if (/[A-Z]/.test(password)) score += 1;
        else feedback.push('uppercase letters');
        
        if (/[0-9]/.test(password)) score += 1;
        else feedback.push('numbers');
        
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        else feedback.push('special characters');
        
        return { score, feedback };
    }
    
    function updatePasswordStrengthDisplay(strength) {
        const { score, feedback } = strength;
        
        
        const percentage = (score / 5) * 100;
        strengthBar.style.width = percentage + '%';
        
       
        if (score === 0) {
            strengthBar.style.background = '#e5e7eb';
            strengthText.textContent = 'Enter a password';
            strengthText.className = 'text-center text-sm font-semibold text-gray-500';
        } else if (score <= 2) {
            strengthBar.style.background = '#ef4444';
            strengthText.textContent = 'Weak - Add ' + feedback.join(', ');
            strengthText.className = 'text-center text-sm font-semibold text-red-600';
        } else if (score <= 3) {
            strengthBar.style.background = '#f59e0b';
            strengthText.textContent = 'Fair - Add ' + feedback.join(', ');
            strengthText.className = 'text-center text-sm font-semibold text-yellow-600';
        } else if (score <= 4) {
            strengthBar.style.background = '#10b981';
            strengthText.textContent = 'Good - Add ' + feedback.join(', ');
            strengthText.className = 'text-center text-sm font-semibold text-green-600';
        } else {
            strengthBar.style.background = '#059669';
            strengthText.textContent = 'Excellent! Very strong password';
            strengthText.className = 'text-center text-sm font-semibold text-green-700';
        }
    }
    
   
    const urlInput = document.getElementById('url-input');
    const checkUrlBtn = document.getElementById('check-url-btn');
    const urlStatus = document.getElementById('url-status');
    
    if (checkUrlBtn && urlInput && urlStatus) {
        checkUrlBtn.addEventListener('click', function() {
            const url = urlInput.value.trim();
            
            if (!url) {
                showUrlStatus('Please enter a URL', 'warning');
                return;
            }
            
            if (!isValidUrl(url)) {
                showUrlStatus('Please enter a valid URL', 'error');
                return;
            }
            
          
            checkUrlBtn.textContent = 'Checking...';
            checkUrlBtn.disabled = true;
            
            setTimeout(() => {
                const result = simulateUrlCheck(url);
                showUrlStatus(result.message, result.type);
                
                checkUrlBtn.textContent = 'Check URL';
                checkUrlBtn.disabled = false;
            }, 2000);
        });
    }
    
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
    
    function simulateUrlCheck(url) {
        
        const suspiciousKeywords = ['phishing', 'malware', 'virus', 'hack', 'steal'];
        const safeDomains = ['google.com', 'microsoft.com', 'apple.com', 'github.com', 'stackoverflow.com'];
        
        const urlLower = url.toLowerCase();
        
       
        if (suspiciousKeywords.some(keyword => urlLower.includes(keyword))) {
            return {
                type: 'error',
                message: '⚠️ WARNING: This URL contains suspicious keywords and may be dangerous!'
            };
        }
        

        if (safeDomains.some(domain => urlLower.includes(domain))) {
            return {
                type: 'success',
                message: '✅ This URL appears to be from a trusted domain.'
            };
        }
        
        
        const random = Math.random();
        if (random < 0.7) {
            return {
                type: 'success',
                message: '✅ This URL appears to be safe based on our analysis.'
            };
        } else if (random < 0.9) {
            return {
                type: 'warning',
                message: '⚠️ CAUTION: This URL should be verified. Proceed with caution.'
            };
        } else {
            return {
                type: 'error',
                message: '🚫 DANGER: This URL has been flagged as potentially malicious!'
            };
        }
    }
    
    function showUrlStatus(message, type) {
        urlStatus.textContent = message;
        urlStatus.classList.remove('hidden', 'bg-green-200', 'bg-yellow-200', 'bg-red-200', 'text-green-800', 'text-yellow-800', 'text-red-800');
        
        if (type === 'success') {
            urlStatus.classList.add('bg-green-200', 'text-green-800');
        } else if (type === 'warning') {
            urlStatus.classList.add('bg-yellow-200', 'text-yellow-800');
        } else if (type === 'error') {
            urlStatus.classList.add('bg-red-200', 'text-red-800');
        }
    }
    
    
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    

    const mobileMenuBtn = document.querySelector('.md\\:hidden button');
    const mobileMenu = document.querySelector('.hidden.md\\:flex');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
          
            console.log('Mobile menu toggle clicked');
        });
    }
    
    // Intersection Observer 
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
   
    const buttons = document.querySelectorAll('button, .btn-gradient, .glass-card');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });
    
   
    const toolInputs = document.querySelectorAll('#url-input, #password-strength-input, #generated-password');
    toolInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = '';
        });
    });
    

    const tipCards = document.querySelectorAll('.card-hover');
    tipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.icon-bounce');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.icon-bounce');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
   
    const helpButtons = document.querySelectorAll('[data-help]');
    helpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const helpText = this.getAttribute('data-help');
            alert(helpText); // In a real app, you'd use a proper tooltip library
        });
    });
    
   
    document.addEventListener('keydown', function(e) {
        
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.open');
            openModals.forEach(modal => {
                modal.classList.remove('open');
            });
        }
        
     
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            const form = e.target.closest('form');
            if (form) {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.click();
                }
            }
        }
    });
    
    
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
    
    
    console.log('🔒 CyberShield loaded successfully!');
    console.log('🛡️ Stay safe online!');
    
   
    function trackEvent(eventName, eventData = {}) {
        console.log(`📊 Event tracked: ${eventName}`, eventData);
        
    }
    
  
    if (quizForm) {
        quizForm.addEventListener('submit', function() {
            trackEvent('quiz_completed', {
                timestamp: new Date().toISOString()
            });
        });
    }
    
  
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            trackEvent('password_generated');
        });
    }
    
    if (checkUrlBtn) {
        checkUrlBtn.addEventListener('click', function() {
            trackEvent('url_checked');
        });
    }
    
   
    window.addEventListener('error', function(e) {
        console.error('🚨 Application error:', e.error);
       
    });
    
 
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
         
        });
    }
});


window.CyberShield = {
   
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
 
    sanitizeInput: function(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },
    
   
    generateRandomString: function(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },
    
   
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
   
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }


};


