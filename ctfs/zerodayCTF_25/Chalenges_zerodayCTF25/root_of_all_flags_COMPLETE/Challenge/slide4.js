// You can set the correct answer here if you know it
// For now, we'll accept any answer and show skip option
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-btn');
const resultMessage = document.getElementById('result-message');

let hasSubmitted = false;

// Submit button click event
submitButton.addEventListener('click', checkAnswer);

// Allow Enter key to submit
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

function checkAnswer() {
    const userAnswer = answerInput.value.trim();
    
    if (userAnswer === '') {
        showResult('Please enter an answer!', 'incorrect');
        return;
    }
    
    // Mark as submitted
    hasSubmitted = true;
    
    // For this problem, we'll show only skip option
    // You can add correct flagpart6-jRqHrUa1hFU answer validation here if needed
    showResult('Answer submitted!', 'correct');
    
    // Disable input and submit button
    answerInput.disabled = true;
    submitButton.disabled = true;
    submitButton.style.opacity = '0.5';
    submitButton.style.cursor = 'not-allowed';
    
    // Show Skip button after 1 second
    setTimeout(() => {
        showSkipButton();
    }, 1000);
}

function showResult(message, type) {
    resultMessage.textContent = message;
    resultMessage.className = `result-message show ${type}`;
}

function showSkipButton() {
    const messageBox = document.querySelector('.message-box');
    
    // Create skip button
    const skipButton = document.createElement('button');
    skipButton.textContent = 'Skip Problem';
    skipButton.className = 'skip-button';
    skipButton.onclick = () => {
        window.location.href = 'index5.html'; // Or your next page
    };
    
    // Add button to message box
    messageBox.appendChild(skipButton);
    
    // Animate button appearance
    setTimeout(() => {
        skipButton.classList.add('show');
    }, 100);
}

// Focus on input when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        answerInput.focus();
    }, 500);
});