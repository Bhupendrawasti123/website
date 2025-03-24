// Birthday data
const birthdayData = {
    name: "...", // Default name
    pic: "https://i.imgur.com/JQWUQfZ.jpg", // Default photo
    wishes: [
        {
            message: "Every year is another peak to conquer. May this birthday mark the beginning of your most victorious climb yet!",
            icon: "⛰️",
            animation: "rotate-animation"
        },
        {
            message: "Like the phoenix, may you rise stronger with each passing year. Your best chapters are still being written!",
            icon: "🔥",
            animation: "bounce-animation"
        },
        {
            message: "May this birthday point you toward your true north - where purpose meets passion and dreams become destinations.",
            icon: "🧭",
            animation: "rotate-animation"
        },
        {
            message: "Today begins a new chapter in your extraordinary story. Make it one where obstacles become opportunities!",
            icon: "📖",
            animation: "bounce-animation"
        },
        {
            message: "You've been a light for so many others - may this birthday illuminate your own brightest path forward.",
            icon: "💡",
            animation: "rotate-animation"
        },
        {
            message: "The mightiest oaks grow from small seeds. Keep nurturing your potential - your growth inspires us all!",
            icon: "🌱",
            animation: "bounce-animation"
        },
        {
            message: "Your potential is as limitless as the stars. Chart a course this year that makes the universe proud!",
            icon: "🌠",
            animation: "rotate-animation"
        },
        {
            message: "Birthdays are bridges to better versions of ourselves. Step boldly onto yours - the view gets better ahead!",
            icon: "🌉",
            animation: "bounce-animation"
        },
        {
            message: "Remember: Diamonds form under pressure. Every challenge you've faced has made you more brilliant!",
            icon: "💎",
            animation: "rotate-animation"
        },
        {
            message: "May your coming year have just enough wind to be exciting, and just enough calm to enjoy the journey.",
            icon: "⛵",
            animation: "bounce-animation"
        }
    ]
};

// Get parameters from URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('name')) birthdayData.name = urlParams.get('name');
if (urlParams.get('pic')) birthdayData.pic = urlParams.get('pic');
if (urlParams.get('theme')) {
    document.body.className = urlParams.get('theme');
}

// Randomly select a wish
let randomWish;

function getRandomWish() {
    randomWish = birthdayData.wishes[Math.floor(Math.random() * birthdayData.wishes.length)];
    applyWish();
}

function applyWish() {
    document.getElementById('birthdayName').textContent = birthdayData.name;
    document.getElementById('birthdayPic').src = birthdayData.pic;
    document.getElementById('birthdayMessage').textContent = randomWish.message;
    
    const themeIcon = document.getElementById('themeIcon');
    themeIcon.textContent = randomWish.icon;
    themeIcon.className = 'theme-icon ' + randomWish.animation;
}

// Change color theme
function changeTheme(theme) {
    document.body.className = theme;
    // Update URL without reload
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('theme', theme);
    window.history.pushState({}, '', newUrl);
}

// Info button functionality
document.getElementById('infoBtn').addEventListener('click', function() {
    document.getElementById('infoModal').style.display = 'flex';
});

document.getElementById('closeInfo').addEventListener('click', function() {
    document.getElementById('infoModal').style.display = 'none';
});

// Close info modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('infoModal')) {
        document.getElementById('infoModal').style.display = 'none';
    }
});

// Create confetti
function createConfetti() {
    const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)', '#ff9ff3', '#a29bfe'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = (Math.random() * 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Initial setup
getRandomWish();

// Create confetti on load and every 3 seconds
window.onload = function() {
       createConfetti();
    setInterval(createConfetti, 3000);
};

// Add keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        location.reload();
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});

// Handle theme persistence on page refresh
window.addEventListener('load', function() {
    // Check if theme parameter exists in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('theme')) {
        document.body.className = urlParams.get('theme');
    }
});

// Make sure the photo loads properly
document.getElementById('birthdayPic').onerror = function() {
    this.src = 'https://i.imgur.com/JQWUQfZ.jpg'; // Fallback image
};

// Add animation to theme buttons on hover
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
    });
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add click animation to refresh button
const refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
});

// Make info modal more accessible
document.getElementById('infoBtn').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        document.getElementById('infoModal').style.display = 'flex';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('infoModal').style.display === 'flex') {
        document.getElementById('infoModal').style.display = 'none';
    }
});
