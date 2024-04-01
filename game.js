const canvas = document.getElementById('gameCanvas');
const stats = document.getElementById('stats');

let score = 0;
let energy = 100;

const meteors = [
    { type: 'circle', weight: 75, speed: 70, score: 1 },
    { type: 'square', weight: 15, speed: 100, score: 2 },
    { type: 'triangle', weight: 10, speed: 120, score: 5 }
];

function getRandomMeteor() {
    let rand = Math.random() * 100;
    for (let meteor of meteors) {
        if ((rand -= meteor.weight) < 0) {
            return meteor;
        }
    }
}

function spawnMeteor() {
    if (energy <= 0) return; // No spawning if out of energy

    const meteor = getRandomMeteor();
    const el = document.createElement('div');
    el.classList.add('meteor');
    el.style.left = Math.random() * (canvas.offsetWidth - 30) + 'px'; // Random position

    switch (meteor.type) {
        case 'circle':
            el.style.width = el.style.height = '30px';
            el.style.borderRadius = '50%';
            break;
        case 'square':
            el.style.width = el.style.height = '30px';
            break;
        case 'triangle':
            el.style.width = el.style.height = '0';
            el.style.borderLeft = '15px solid transparent';
            el.style.borderRight = '15px solid transparent';
            el.style.borderBottom = '30px solid white';
            break;
    }

    el.style.backgroundColor = 'white';
    el.onclick = function() {
        if (energy > 0) {
            score += meteor.score;
            energy -= 1; // Clicking consumes energy
            el.remove();
            updateStats();
        }
    };

    canvas.appendChild(el);

    // Meteor falling logic
    let posY = 0;
    const interval = setInterval(function() {
        posY += meteor.speed / 60;
        el.style.top = posY + 'px';

        if (posY > canvas.offsetHeight) {
            el.remove();
            clearInterval(interval);
        }
    }, 1000 / 60);
}

function updateStats() {
    stats.textContent = `分数: ${score} 体力: ${energy}`;
}

// Update energy and stats every second
setInterval(function() {
    if (energy < 100) energy += 1;
    updateStats();
}, 1000);

// Start spawning meteors
setInterval(spawnMeteor, 2000);

updateStats();
