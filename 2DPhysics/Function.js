function programInit() {
    player = new Player()
}

function loopProgram() {
    player.move()

    renderInit()
    player.render()
}
