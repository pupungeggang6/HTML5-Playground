function glInit() {
    vShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vShader, vShaderSource)
    gl.compileShader(vShader)
    fShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fShader, fShaderSource)
    gl.compileShader(fShader)
    program = gl.createProgram()
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)

    lColor = gl.getUniformLocation('u_color')
    lPosition = gl.getAttribLocation('a_position')

    vao = gl.createVertexArray()
    vbt = gl.createBuffer()
    vbl = gl.createBuffer()

    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbt)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbl)
}

function renderInit() {
}

function render() {
}
