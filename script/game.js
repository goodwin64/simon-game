/**
 * Created by Sergio on 30.09.2016.
 */

var level = levelOne,
    levels = [levelOne, levelTwo],
    currentLevel = 0,
    delay = 500,
    gameField = document.getElementById("game");

function changeLevel() {
    counterClick = 0;

    currentLevel++;
    level = levels[currentLevel];

    if (levels.length === currentLevel) return;

    document.getElementById("current-level").innerText = currentLevel + 1;

    drawLevel(level);
}


var counterClick = 0;


document.getElementById('game').addEventListener('click', function(event) {
    if (event.target.className.indexOf('blocks__block') === -1) return false;

    if (level[counterClick]['id'] !== event.target.id) {
        alert('game lost');
    } else if (counterClick === level.length - 1) {
        alert('you win');
        changeLevel();
    } else {
        document.getElementById(level[counterClick]['id']).classList.add(level[counterClick]['color']);
        document.getElementById(level[counterClick]['id']).classList.add('show_color');
        setTimeout(function() {
            document.getElementById(level[counterClick - 1]['id']).classList.remove(level[counterClick - 1]['color']);
            document.getElementById(level[counterClick]['id']).classList.remove('show_color');
        }, delay);
        counterClick += 1;
    }
});

function drawLevel(level) {
    showBlock(0);

    for (var i = 1; i < level.length; i++) (function(i) {
        setTimeout(function() {
            document.getElementById(level[i]['id']).classList.add(level[i]['color']);
            document.getElementById(level[i - 1]['id']).classList.remove(level[i - 1]['color']);
        }, delay * i);
    })(i);

    hideBlock(level.length - 1);
}

function showBlock(index) {
    document.getElementById(level[index]['id']).classList.add(level[index]['color']);
}

function hideBlock(index) {
    setTimeout(function() {
        document.getElementById(level[index]['id']).classList.remove(level[index]['color']);
    }, delay * (index + 1));
}

drawLevel(level);
