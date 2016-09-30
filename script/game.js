/**
 * Created by Sergio on 30.09.2016.
 */

var level = levelOne,
    levels = [levelOne, levelTwo],
    currentLevel = 0;

function changeLevel() {
    counterClick = 0;

    currentLevel++;
    level = levels[currentLevel];

    if (levels.length === currentLevel) return;

    document.getElementById("current-level").innerText = currentLevel + 1;

    drawLevel(level);
}


var counterClick = 0;


document.getElementById('game').addEventListener('click', function (event) {
    if (event.target.className.indexOf('blocks__block') === -1) return false;

    if (level[counterClick]['id'] !== event.target.id) {
        alert('game lost');
    } else if (counterClick === level.length - 1) {
        document.getElementById(level[counterClick]['id']).classList.add(level[counterClick]['color']);
        setTimeout(function() {
            document.getElementById(level[counterClick - 1]['id']).classList.remove(level[counterClick - 1]['color']);
        }, 300);
        setTimeout(function () {
            alert('you win');
            changeLevel();
        }, 1000);
    } else {
        document.getElementById(level[counterClick]['id']).classList.add(level[counterClick]['color']);
        document.getElementById(level[counterClick]['id']).classList.add('show_color');
        setTimeout(function() {
            document.getElementById(level[counterClick - 1]['id']).classList.remove(level[counterClick - 1]['color']);
            document.getElementById(level[counterClick]['id']).classList.remove('show_color');
        }, 300);
        counterClick += 1;
    }
});





function drawLevel(level) {

    var delay = 500;

    for (var i = 0; i < level.length; i++) (function (i) {
        setTimeout(function() {
            document.getElementById(level[i]['id']).classList.add(level[i]['color']);

            setTimeout(function () {
                document.getElementById(level[i]['id']).classList.remove(level[i]['color']);
            }, delay * (i + 1));
        }, delay * (i + 1));
    }(i));

}
drawLevel(level);