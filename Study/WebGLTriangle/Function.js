function glInit() {
    shader.vertex = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(shader.vertex, vertexShaderSource)
    gl.compileShader(shader.vertex)
    shader.fragment = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(shader.fragment, fragmentShaderSource)
    gl.compileShader(shader.fragment)
    program = gl.createProgram()
    gl.attachShader(program, shader.vertex)
    gl.attachShader(program, shader.fragment)
    gl.linkProgram(program)

    ul.color = gl.getUniformLocation(program, 'u_color')
    al.color = gl.getAttribLocation(program, 'a_color')
    al.vertex = gl.getAttribLocation(program, 'a_position')

    vao = gl.createVertexArray() 
    vbo = gl.createBuffer()
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    gl.vertexAttribPointer(al.vertex, 3, gl.FLOAT, false, 6 * 4, 0)
    gl.enableVertexAttribArray(al.vertex)
    gl.vertexAttribPointer(al.color, 3, gl.FLOAT, false, 6 * 4, 3 * 4)
    gl.enableVertexAttribArray(al.color)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bindVertexArray(vao)
}

function render() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.lineWidth(2)

    gl.useProgram(program)
    gl.bindVertexArray(vao)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}
