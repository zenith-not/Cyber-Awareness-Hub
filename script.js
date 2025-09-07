// Quiz 
document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('cyber-quiz');
    const resultsDiv = document.getElementById('quiz-results');
    const scoreText = document.getElementById('score-text');

    const correctAnswers = {
        q1: 'B',
        q2: 'C',
        q3: 'A',
        q4: 'C'
    };

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let score = 0;
        let totalQuestions = Object.keys(correctAnswers).length;

        for (const question in correctAnswers) {
            const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
            const container = document.getElementById(`${question}-container`);
            const feedbackText = document.getElementById(`${question}-feedback`);

            container.querySelectorAll('label').forEach(label => {
                label.classList.remove('text-green-600', 'text-red-600');
            });
            feedbackText.classList.add('hidden');

            if (selectedAnswer) {
                const isCorrect = selectedAnswer.value === correctAnswers[question];
                const selectedLabel = selectedAnswer.parentElement;
                
                if (isCorrect) {
                    score++;
                    selectedLabel.classList.add('text-green-600');
                    feedbackText.textContent = "Correct!";
                    feedbackText.classList.remove('hidden');
                    feedbackText.classList.add('text-green-600');
                } else {
                    selectedLabel.classList.add('text-red-600');
                    const correctAnswerLabel = document.querySelector(`input[name="${question}"][value="${correctAnswers[question]}"]`).parentElement;
                    correctAnswerLabel.classList.add('text-green-600');
                    feedbackText.textContent = "Incorrect. The correct answer is highlighted.";
                    feedbackText.classList.remove('hidden');
                    feedbackText.classList.add('text-red-600');
                }
            }
        }
        resultsDiv.classList.remove('hidden');
        scoreText.textContent = `You scored ${score} out of ${totalQuestions}!`;
    });

    // Phishing Link
    const checkUrlBtn = document.getElementById('check-url-btn');
    const urlInput = document.getElementById('url-input');
    const urlStatus = document.getElementById('url-status');

    checkUrlBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (!url) {
            urlStatus.textContent = 'Please enter a URL.';
            urlStatus.className = 'text-center p-3 rounded-lg block bg-yellow-200 text-yellow-800';
            return;
        }

        let isPhishing = false;
        let reasons = [];

        // Check 1
        const ipPattern = /^(http|https):\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
        if (ipPattern.test(url)) {
            isPhishing = true;
            reasons.push("The URL uses an IP address instead of a proper domain name.");
        }

        // Check 2
        if (url.startsWith('http://') && !url.includes('localhost')) {
            isPhishing = true;
            reasons.push("The URL is not secure (uses HTTP instead of HTTPS).");
        }

        // Check 3
        const brandKeywords = ['google', 'amazon', 'apple', 'paypal', 'microsoft'];
        const urlLower = url.toLowerCase();
        for (let brand of brandKeywords) {
            if (urlLower.includes(brand) && !urlLower.includes(`.${brand}.com`)) {
                isPhishing = true;
                reasons.push(`The URL contains a common brand name but the domain structure looks suspicious. For example, check for misspellings like '${brand.replace('o', '0')}'.`);
                break;
            }
        }
        
        // Final
        if (isPhishing) {
            urlStatus.innerHTML = '<strong>⚠️ Potentially Unsafe URL Detected.</strong><br>' + reasons.join('<br>');
            urlStatus.className = 'text-center p-3 rounded-lg block bg-red-200 text-red-800';
        } else {
            urlStatus.textContent = '✅ The URL appears to be safe based on basic checks.';
            urlStatus.className = 'text-center p-3 rounded-lg block bg-green-200 text-green-800';
        }
    });

    // Password Strength
    const passwordStrengthInput = document.getElementById('password-strength-input');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    passwordStrengthInput.addEventListener('input', () => {
        const password = passwordStrengthInput.value;
        if (password.length === 0) {
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
            strengthBar.className = 'h-full rounded-full transition-all duration-300 ease-in-out';
            strengthText.className = 'text-center text-sm font-semibold';
            return;
        }
        
        let score = 0;
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };

        if (requirements.length) score++;
        if (requirements.uppercase) score++;
        if (requirements.lowercase) score++;
        if (requirements.number) score++;
        if (requirements.special) score++;

        const clampedScore = Math.max(0, Math.min(score, 5));
        
        const strength = ['Very Weak', 'Weak', 'Average', 'Good', 'Strong', 'Excellent'];
        const colors = ['bg-gray-400', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-teal-500'];
        
        strengthBar.style.width = `${(clampedScore / 5) * 100}%`;
        strengthBar.className = `${colors[clampedScore]} h-full rounded-full transition-all duration-300 ease-in-out`;
        strengthText.textContent = strength[clampedScore];
        strengthText.className = `text-center text-sm font-semibold ${colors[clampedScore].replace('bg', 'text')}`;
    });

    // Strong Password
    const generateBtn = document.getElementById('generate-btn');
    const generatedPasswordInput = document.getElementById('generated-password');
    const copyBtn = document.getElementById('copy-btn');

    generateBtn.addEventListener('click', () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password = "";
        for (let i = 0; i < 16; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }
        generatedPasswordInput.value = password;
        passwordStrengthInput.value = password;
        passwordStrengthInput.dispatchEvent(new Event('input'));
    });

    copyBtn.addEventListener('click', () => {
        if (generatedPasswordInput.value) {
            navigator.clipboard.writeText(generatedPasswordInput.value).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = 'Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        }
    });
});