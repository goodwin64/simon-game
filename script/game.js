/**
 * Created by Sergio on 30.09.2016.
 */

var COLORS = ["red", "blue", "orange", "yellow", "green", "pink", "purple", "light_blue"],
    levels = [generateRandomLevel(1), generateRandomLevel(2)],
    level = levels[0],
    currentLevel = 1,
    DELAY = 500,
    gameField = document.getElementById("game"),
    counterClick = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById('game').addEventListener('click', function(event) {
    if (event.target.className.indexOf('blocks__block') === -1) return false;

    if (event.target.id == level[counterClick]['id']) {
        showColor(counterClick);
        document.getElementById(level[counterClick]['id']).classList.add('show_color');
        setTimeout(function() {
            hideColor(counterClick);
            document.getElementById(level[counterClick]['id']).classList.remove('show_color');
        }, DELAY);
    }

    setTimeout(function() {
        if (level[counterClick]['id'] !== event.target.id) {
            console.log('game lost');
        } else if (counterClick === level.length - 1) {
            console.log('you win');
            changeLevel();
        } else {
            counterClick++;
        }
    }, DELAY);
});

function changeLevel() {
    counterClick = 0;
    var blocks = document.getElementsByClassName("blocks__block");
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].classList.add("hidden");
    }

    document.getElementById("current-level").innerText = ++currentLevel;
    level = generateRandomLevel(currentLevel)
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
        }, DELAY * i);
    })(i);

    setTimeout(function() {
        hideColor(level.length - 1);
    }, DELAY * i);
}

function showColor(index) {
    document.getElementById(level[index]['id']).classList.add(level[index]['color']);
}

function hideColor(index) {
    document.getElementById(level[index]['id']).classList.remove(level[index]['color']);
}

function generateRandomLevel(levelIndex, rowsCount, columnsCount) {
    rowsCount = rowsCount || 5;
    columnsCount = columnsCount || 5;
    var resultLevel = [];
    for (var i = 0; i < levelIndex; i++) {
        var randID = 'b' + getRandomInt(1, rowsCount) + getRandomInt(1, columnsCount);
        var randColor = COLORS[getRandomInt(0, COLORS.length - 1)];

        resultLevel.push({
            id: randID,
            color: randColor
        });
    }

    return resultLevel;
}

drawLevel(levels[0]);
