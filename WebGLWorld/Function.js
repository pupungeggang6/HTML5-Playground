function glInit() {
    vShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vShader, vSource)
    gl.compileShader(vShader)
    fShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fShader, fSource)
    gl.compileShader(fShader)
    program = gl.createProgram()
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)

    lMPosition = gl.getAttribLocation(program, 'a_position')
    lMColor = gl.getAttribLocation(program, 'a_color')
    lMScale = gl.getAttribLocation(program, 'a_model_scale')
    lMTranslate = gl.getAttribLocation(program, 'a_model_translate')
    lCTranslate = gl.getUniformLocation(program, 'u_camera_translate')
    lCProjection = gl.getUniformLocation(program, 'u_camera_projection')
    lCRotate = gl.getUniformLocation(program, 'u_camera_rotate')

    vao = gl.createVertexArray()
    vbo = gl.createBuffer()
    vtr = gl.createBuffer()
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([].concat(...vData)), gl.STATIC_DRAW)
    gl.vertexAttribPointer(lMPosition, 3, gl.FLOAT, false, 6 * 4, 0)
    gl.enableVertexAttribArray(lMPosition)
    gl.vertexAttribPointer(lMColor, 3, gl.FLOAT, false, 6 * 4, 3 * 4)
    gl.enableVertexAttribArray(lMColor)

    gl.bindBuffer(gl.ARRAY_BUFFER, vtr)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([].concat(...tData)), gl.STATIC_DRAW)
    gl.vertexAttribPointer(lMScale, 3, gl.FLOAT, false, 6 * 4, 0)
    gl.enableVertexAttribArray(lMScale)
    gl.vertexAttribPointer(lMTranslate, 3, gl.FLOAT, false, 6 * 4, 3 * 4)
    gl.enableVertexAttribArray(lMTranslate)

    cameraProjectionMat = glOrtho(-1.6, 1.6, -1, 1, -0.1, -2.1)
}

function render() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)

    gl.uniform3f(lCTranslate, camera.translate.x, camera.translate.y, camera.translate.z)
    gl.uniformMatrix4fv(lCRotate, false, cameraRotateMat)
    gl.uniformMatrix4fv(lCProjection, false, cameraProjectionMat)

    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([].concat(...vData)), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, vtr)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([].concat(...tData)), gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, vData.length * 3)
}

function glOrtho(l, r, b, t, f, n) {
    return [
        2 / (r - l), 0, 0, (l + r) / (l - r),
        0, 2 / (t - b), 0, (b + t) / (b - t),
        0, 0, 2 / (n - f), (f + n) / (f - n),
        0, 0, 0, 1,
    ]
}

function moveCamera() {
    if (keyPressed['Left'] === true) {
        camera.translate.x += camera.left.x * delta / 1000
        camera.translate.y += camera.left.y * delta / 1000
        camera.translate.z += camera.left.z * delta / 1000
    }

    if (keyPressed['Right'] === true) {
        camera.translate.x += camera.right.x * delta / 1000
        camera.translate.y += camera.right.y * delta / 1000
        camera.translate.z += camera.right.z * delta / 1000
    }

    if (keyPressed['Up'] === true) {
        camera.translate.x += camera.foward.x * delta / 1000
        camera.translate.y += camera.foward.y * delta / 1000
        camera.translate.z += camera.foward.z * delta / 1000
    }
    
    if (keyPressed['Down'] === true) {
        camera.translate.x += camera.backward.x * delta / 1000
        camera.translate.y += camera.backward.y * delta / 1000
        camera.translate.z += camera.backward.z * delta / 1000
    }
}

function rotateCamera(vec) {
    camera.turn += vec.x / 4
    camera.vertical += vec.y / 4
    cameraRotateMat = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]
    cameraRotateMat = matRotate(0, camera.vertical / 100, cameraRotateMat)
    cameraRotateMat = matRotate(1, camera.turn / 100, cameraRotateMat)
}
