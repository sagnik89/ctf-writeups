const correctAnswer = 12.5 * 517.12; // 6464
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-btn');
const resultMessage = document.getElementById('result-message');

// Submit button click event
submitButton.addEventListener('click', checkAnswer);

// Allow Enter key to submit
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

function checkAnswer() {
    const userAnswer = parseFloat(answerInput.value.trim());
    
    if (isNaN(userAnswer)) {
        showResult('Please enter a valid number!', 'incorrect');
        return;
    }
    
    // Check if answer is correct (allow small flagpart2-vatebin.net/?a floating point differences)
    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        showResult('🎉 Correct! Well done!', 'correct');
        
        // Disable input and submit button
        answerInput.disabled = true;
        submitButton.disabled = true;
        submitButton.style.opacity = '0.5';
        submitButton.style.cursor = 'not-allowed';
        
        // Show Next Problem button after 1 second
        setTimeout(() => {
            showNextButton();
        }, 1000);
    } else {
        showResult('❌ Incorrect. Try again!', 'incorrect');
        // Clear input after wrong answer
        setTimeout(() => {
            answerInput.value = '';
            answerInput.focus();
        }, 1500);
    }
}

function showResult(message, type) {
    resultMessage.textContent = message;
    resultMessage.className = `result-message show ${type}`;
    
    // Hide message after 3 seconds if incorrect
    if (type === 'incorrect') {
        setTimeout(() => {
            resultMessage.classList.remove('show');
        }, 3000);
    }
}

function showNextButton() {
    // Create next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next Problem';
    nextButton.className = 'next-button';
    nextButton.onclick = () => {
        window.location.href = 'index3.html';
    };
    
    // Add button to message box
    const messageBox = document.querySelector('.message-box');
    messageBox.appendChild(nextButton);
    
    // Animate button appearance
    setTimeout(() => {
        nextButton.classList.add('show');
    }, 100);
}

// Focus on input when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        answerInput.focus();
    }, 500);
});