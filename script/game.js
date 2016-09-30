/**
 * Created by Sergio on 30.09.2016.
 */

var level = levelOne,
    levels = [levelOne, levelTwo],
    currentLevel = 0,
    delay = 500,
    gameField = document.getElementById("game"),
    counterClick = 0;

document.getElementById('game').addEventListener('click', function(event) {
    if (event.target.className.indexOf('blocks__block') === -1) return false;

    if (event.target.id == level[counterClick]['id']) {
        showColor(counterClick);
        document.getElementById(level[counterClick]['id']).classList.add('show_color');
        setTimeout(function() {
            hideColor(counterClick);
            document.getElementById(level[counterClick]['id']).classList.remove('show_color');
        }, delay);
    }

    setTimeout(function() {
        if (level[counterClick]['id'] !== event.target.id) {
            alert('game lost');
        } else if (counterClick === level.length - 1) {
            alert('you win');
            changeLevel();
        } else {
            counterClick++;
        }
    }, delay);
});

function changeLevel() {
    counterClick = 0;
    var blocks = document.getElementsByClassName("blocks__block");
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].classList.add("hidden");
    }

    currentLevel++;
    level = levels[currentLevel];

    if (levels.length === currentLevel) return;

    document.getElementById("current-level").innerText = currentLevel + 1;

    drawLevel(level);
}

function drawLevel(level) {
    for (var i = 0; i < level.length; i++) {
        document.getElementById(level[i].id).classList.remove("hidden");
    }

    showColor(0);

    for (var i = 1; i < level.length; i++)(function(i) {
        setTimeout(function() {
            document.getElementById(level[i]['id']).classList.add(level[i]['color']);
            document.getElementById(level[i - 1]['id']).classList.remove(level[i - 1]['color']);
        }, delay * i);
    })(i);

    setTimeout(function() {
        hideColor(level.length - 1);
    }, delay * i);
}

function showColor(index) {
    document.getElementById(level[index]['id']).classList.add(level[index]['color']);
}

function hideColor(index) {
    document.getElementById(level[index]['id']).classList.remove(level[index]['color']);
}

drawLevel(level);
