const message = "Thank you for the help! It's time to help you. Do you want some hint?";
const textElement = document.getElementById('animated-text');
const hintButton = document.getElementById('hint-btn');

let charIndex = 0;
let hintClicked = false;

function typeText() {
    if (charIndex < message.length) {
        textElement.textContent += message.charAt(charIndex);
        charIndex++;
        
        // Variable speed for natural typing effect
        const speed = Math.random() * 60 + 40;
        setTimeout(typeText, speed);
    } else {
        // Show button after typing completes
        setTimeout(() => {
            hintButton.classList.add('show');
        }, 400);
    }
}

// Start animation after page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 600);
});

// Hint button click event
hintButton.addEventListener('click', () => {
    if (!hintClicked) {
        hintClicked = true;
        
        // Hide the hint button
        hintButton.style.opacity = '0';
        hintButton.style.transform = 'scale(0.8)';
        hintButton.style.pointerEvents = 'none';
        
        // Show hint message after button fades
        setTimeout(() => {
            showHintMessage();
        }, 500);
    }
});

function showHintMessage() {
    // Create hint message element
    const hintMessage = document.createElement('p');
    hintMessage.className = 'hint-message';
    hintMessage.textContent = 'Remember the answers you gave by solving the problems.';
    
    // Add to message box
    const messageBox = document.querySelector('.message-box');
    messageBox.appendChild(hintMessage);
    
    // Animate appearance
    setTimeout(() => {
        hintMessage.classList.add('show');
    }, 100);
    
    // Optional: Navigate to next slide after showing hint
    // setTimeout(() => {
    //     window.location.href = 'slide6.html';
    // }, 4000);
}