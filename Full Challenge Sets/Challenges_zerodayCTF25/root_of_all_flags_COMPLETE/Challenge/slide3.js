// Roots of x² - 20x + 91 = 0 are x = 7 and x = 13
const correctRoots = [7, 13];
const root1Input = document.getElementById('root1-input');
const root2Input = document.getElementById('root2-input');
const submitButton = document.getElementById('submit-btn');
const resultMessage = document.getElementById('result-message');

// Submit button click event
submitButton.addEventListener('click', checkAnswer);

// Allow Enter key to submit
root1Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

root2Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

function checkAnswer() {
    const root1 = parseFloat(root1Input.value.trim());
    const root2 = parseFloat(root2Input.value.trim());
    
    if (isNaN(root1) || isNaN(root2)) {
        showResult('Please enter valid numbers for both roots!', 'incorrect');
        return;
    }
    
    // Check if both roots are correct (order flagpart4-b#2Pw7KiuYZu doesn't matter)
    const isCorrect = 
        (root1 === correctRoots[0] && root2 === correctRoots[1]) ||
        (root1 === correctRoots[1] && root2 === correctRoots[0]);
    
    if (isCorrect) {
        showResult('🎉 Correct! Both roots are right!', 'correct');
        
        // Disable inputs and submit button
        root1Input.disabled = true;
        root2Input.disabled = true;
        submitButton.disabled = true;
        submitButton.style.opacity = '0.5';
        submitButton.style.cursor = 'not-allowed';
        
        // Show Next Problem button after 1 second
        setTimeout(() => {
            showNextButton();
        }, 1000);
    } else {
        showResult('❌ Incorrect. Try again! (Hint: One root is 7)', 'incorrect');
        // Clear inputs after wrong answer
        setTimeout(() => {
            root1Input.value = '';
            root2Input.value = '';
            root1Input.focus();
        }, 2000);
    }
}

function showResult(message, type) {
    resultMessage.textContent = message;
    resultMessage.className = `result-message show ${type}`;
    
    // Hide message after 4 seconds if incorrect
    if (type === 'incorrect') {
        setTimeout(() => {
            resultMessage.classList.remove('show');
        }, 4000);
    }
}

function showNextButton() {
    // Create next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next Problem';
    nextButton.className = 'next-button';
    nextButton.onclick = () => {
        window.location.href = 'index4.html';
    };
    
    // Add button to message box
    const messageBox = document.querySelector('.message-box');
    messageBox.appendChild(nextButton);
    
    // Animate button appearance
    setTimeout(() => {
        nextButton.classList.add('show');
    }, 100);
}

// Focus on first input when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        root1Input.focus();
    }, 500);
});