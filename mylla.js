var board = ['', '', '', '', '', '', '', '', '']
var winStates = {
        tLtR: [0, 1, 2],
        mLmR: [3, 4, 5],
        bLbR: [6, 7, 8],
        tLbL: [0, 3, 6],
        tMbM: [1, 4, 7],
        tRbR: [2, 5, 8],
        tLbR: [0, 4, 8],
        tRbL: [2, 4, 6]
    } //every possible win condition in tic tac toe (t = top, m = middle, b = bottom, L = left, R = right, M = Middle; tLtR = topLeft to top right)
var win = false
var counter = 0
window.addEventListener('load', function() {
    for (var i = 0; i < 9; i++) {
        var name = 'square' + i
        document.getElementById(name).addEventListener('click', function(event) {
            if (!win) {
                addX(event)
            }
        })
    }
})
draw = async function(player, id) {
    if (counter % 2 == 1) {
        document.getElementById('currentPlayer').innerHTML = 'current player is X'
    } else {
        document.getElementById('currentPlayer').innerHTML = 'current player is O'
    }
    var square = document.getElementById(id)
    var position = parseInt(id.slice(id.length - 1))
    updateGrid(player, position)
    if (square.innerHTML == '') {
        counter++
        if (player == 'X') {
            square.innerHTML = '<div id="x-topLeft"></div><div id="x-topRight"></div>'
            var topLeft = document.getElementById('x-topLeft')
            var topRight = document.getElementById('x-topRight')
            topLeft.style.animationName = 'topLeft'
            topRight.style.animationName = 'topRight'
        } else {

            square.innerHTML = '<div id="container"><div id="halfclip"><div class="halfcircle" id="clipped"></div></div><div class="halfcircle" id="fixed"></div></div>'
            await new Promise(r => setTimeout(r, 1000)); //wait for the circle drawing animation to end before turning it off and adding a static circle to that grid
            square.innerHTML = '<div id="circle"></div>'
        }
        checkwinner(player)
    }
}


updateGrid = function(player, position) {
    board[position] = player
}
addX = async function(event) {
    var id = event.target.id

    if (counter < 9 && !win) {

        if (counter % 2 == 1 && event.currentTarget.innerHTML.length == 0) {
            draw('O', id)

        } else if (event.currentTarget.innerHTML.length != 0) {

        } else if (counter % 2 == 0) {
            draw('X', id)
        } else {}
    }
}

checkwinner = function(player) {
    if (!win) {
        for (var stateName of Object.keys(winStates)) {
            var state = winStates[stateName]
            win = true
            for (var j of state) {
                if (board[j] != player) {
                    win = false
                }

            }
            if (win) {
                document.getElementById('currentPlayer').innerHTML = player + ' is the winner!'
                console.log(player + ' is the winner!')
                var line = document.getElementById('line')
                line.classList.add(stateName)

                document.getElementById('box').style.animationName = 'boxDone'
                break
            }
        }
        if (counter == 9 && !win) {
            document.getElementById('currentPlayer').innerHTML = 'draw!'
            return
        }
    }
}

reset = function() {
    document.getElementById('line').classList = ''
    counter = 0
    board = ['', '', '', '', '', '', '', '', '']
    win = false
    document.getElementById('box').style.animationName = ''

    document.getElementById('currentPlayer').innerHTML = 'current player is X'
    for (var i = 0; i < 9; i++) {
        var name = 'square' + i
        document.getElementById(name).innerHTML = ''
    }
}
randomPlayer = function() {
    if (counter % 2 == 1) {
        var p = 'O'
    } else {
        var p = 'X'
    }
    var available = []
    for (var i in board) {
        if (board[i] == '') {
            available.push(i)
        }
    }
    if (available.length > 0 && !win) {
        var index = Math.floor(Math.random() * available.length);
        var id = 'square' + available[index]
        console.log(id)
        draw(p, id)
    }
}