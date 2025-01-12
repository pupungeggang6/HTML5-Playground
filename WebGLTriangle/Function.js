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
    vbo = gl.createBuffer()
    bc = gl.createBuffer() 
}

function renderInit() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.lineWidth(2)

    gl.useProgram(program)
    gl.enableVertexAttribArray(al.vertex)
    gl.enableVertexAttribArray(al.color)
}

function drawTriangle() {
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.vertexAttribPointer(al.vertex, 3, gl.FLOAT, false, 0, 0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([a, 0.8, 0.0, -0.8, -0.8, 0.0, 0.8, -0.8, 0.0]), gl.STATIC_DRAW)

    gl.bindBuffer(gl.ARRAY_BUFFER, bc)
    gl.vertexAttribPointer(al.color, 3, gl.FLOAT, false, 0, 0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0]), gl.STATIC_DRAW)
    
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}
