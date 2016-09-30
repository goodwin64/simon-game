/**
 * Created by Sergio on 30.09.2016.
 */

var level = levelOne;

var counterClick = 0;


document.getElementById('game').addEventListener('click', function (event) {
    if (event.target.className.indexOf('blocks__block') === -1) return false;

    if (level[counterClick]['id'] !== event.target.id) {
        alert('game lost');
    } else if (counterClick === level.length - 1) {
        alert('you win');
        counterClick = 0;
    } else {
        counterClick += 1;
    }

});





function drawLevel(level) {

    var delay = 500;

    for (var i = 0; i < level.length; i++) (function (i) {
        setTimeout(function() {
            document.getElementById(level[i]['id']).style.backgroundColor = level[i]['color'];

            setTimeout(function () {
                document.getElementById(level[i]['id']).style.backgroundColor = '';
            }, delay * (i + 1));
        }, delay * (i + 1));
    }(i));

}
drawLevel(level);