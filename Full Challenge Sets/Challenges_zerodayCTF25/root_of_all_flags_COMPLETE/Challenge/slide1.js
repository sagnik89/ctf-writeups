const message = "Hey there! I got some problem for my maths homework. Can you help me to solve this?";
const textElement = document.getElementById('animated-text');
const helpButton = document.getElementById('help-btn');

let charIndex = 0;

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
            helpButton.classList.add('show');
        }, 400);
    }
}

// Start animation after page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 600);
});

// Button click event - navigate to slide 2
helpButton.addEventListener('click', () => {
    // Update this with your slide 2 filename
    window.location.href = 'index2.html';
});