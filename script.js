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

    //phising link 
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

        const ipPattern = /^(http|https):\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
        if (ipPattern.test(url)) {
            isPhishing = true;
            reasons.push("The URL uses an IP address instead of a proper domain name.");
        }
        if (url.startsWith('http://') && !url.includes('localhost')) {
            isPhishing = true;
            reasons.push("The URL is not secure (uses HTTP instead of HTTPS).");
        }

        const brandKeywords = ['google', 'Daraz', 'apple', ' facebook', 'microsoft ', 'Esewa' , 'Nepal Telecom', 'khalti', 'twitter', 'instagram'];
        const urlLower = url.toLowerCase();
        for (let brand of brandKeywords) {
            if (urlLower.includes(brand) && !urlLower.includes(`.${brand}.com`)) {
                isPhishing = true;
                reasons.push(`The URL contains a common brand name but the domain structure looks suspicious. For example, check for misspellings like '${brand.replace('o', '0')}'.`);
                break;
            }
        }
    