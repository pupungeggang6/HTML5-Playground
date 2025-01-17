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
    
    lPosition = gl.getAttribLocation(program, 'a_position')
    lColor = gl.getUniformLocation(program, 'u_color')
    lCameraRotate = gl.getUniformLocation(program, 'u_camera_rotate')
    lCameraTranslate = gl.getUniformLocation(program, 'u_camera_translate')
    lCameraProj = gl.getUniformLocation(program, 'u_camera_proj')
    
    vaot = gl.createVertexArray()
    vaol = gl.createVertexArray()
    vaoh = gl.createVertexArray()
    vbot = gl.createBuffer()
    vbol = gl.createBuffer()
    vboh = gl.createBuffer()

    gl.bindVertexArray(vaot)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbot)
    gl.vertexAttribPointer(lPosition, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(lPosition)

    gl.bindVertexArray(vaol)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbol)
    gl.vertexAttribPointer(lPosition, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(lPosition)

    gl.bindVertexArray(vaoh)
    gl.bindBuffer(gl.ARRAY_BUFFER, vboh)
    gl.vertexAttribPointer(lPosition, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(lPosition)

    matrixCameraRotate = matrixIdentity()
    matrixCameraTranslate = matrixIdentity()
    //matrixCameraProj = glOrtho(-1.6, 1.6, -1, 1, 0.01, 2.01)
    matrixCameraProj = gluPerspective(cameraPerspective.fovy, cameraPerspective.aspect, cameraPerspective.zNear, cameraPerspective.zFar)
}

function renderInit() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.lineWidth(2)
}

function render() {
    gl.useProgram(program)
    gl.bindVertexArray(vaot)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbot)
    
    matrixCameraRotate = getCameraRotate(cameraRotate.x, cameraRotate.y)
    matrixCameraTranslate = getCameraTranslate(cameraTranslate.x, cameraTranslate.y, cameraTranslate.z)
    gl.uniformMatrix4fv(lCameraRotate, false, matrixCameraRotate)
    gl.uniformMatrix4fv(lCameraTranslate, false, matrixCameraTranslate)
    gl.uniformMatrix4fv(lCameraProj, false, matrixCameraProj)

    gl.uniform3f(lColor, 1.0, 1.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, planeData, gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    gl.uniform3f(lColor, 0.0, 0.0, 0.0)
    gl.bufferData(gl.ARRAY_BUFFER, originPlane, gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, 6)

    gl.bindVertexArray(vaol)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbol)
    gl.uniform3f(lColor, 1.0, 0.0, 0.0)
    for (let i = 0; i < 41; i++) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-5.0, 0.0, -5.0 + 0.25 * i, 5.0, 0.0, -5.0 + 0.25 * i]), gl.STATIC_DRAW)
        gl.drawArrays(gl.LINES, 0, 2)
    }
    gl.uniform3f(lColor, 0.0, 0.0, 1.0)
    for (let i = 0; i < 41; i++) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-5.0 + 0.25 * i, 0.0, -5.0, -5.0 + 0.25 * i, 0.0, 5.0]), gl.STATIC_DRAW)
        gl.drawArrays(gl.LINES, 0, 2)
    }

    gl.bindVertexArray(vaoh)
    gl.bindBuffer(gl.ARRAY_BUFFER, vboh)
    gl.uniformMatrix4fv(lCameraRotate, false, matrixIdentity())
    gl.uniformMatrix4fv(lCameraTranslate, false, matrixIdentity())
    gl.uniformMatrix4fv(lCameraProj, false, glOrtho(-1.6, 1.6, -1, 1, -1, 1))

    if (keyPressed['Up'] === true) {
        gl.uniform3f(lColor, 0.0, 1.0, 0.0)
    } else {
        gl.uniform3f(lColor, 1.0, 1.0, 1.0)
    }

    gl.bufferData(gl.ARRAY_BUFFER, buttonForwardPos, gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, 6)

    if (keyPressed['Left'] === true) {
        gl.uniform3f(lColor, 0.0, 1.0, 0.0)
    } else {
        gl.uniform3f(lColor, 1.0, 1.0, 1.0)
    }

    gl.bufferData(gl.ARRAY_BUFFER, buttonLeftPos, gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, 6)

    if (keyPressed['Down'] === true) {
        gl.uniform3f(lColor, 0.0, 1.0, 0.0)
    } else {
        gl.uniform3f(lColor, 1.0, 1.0, 1.0)
    }

    gl.bufferData(gl.ARRAY_BUFFER, buttonBackwardPos, gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, 6)

    if (keyPressed['Right'] === true) {
        gl.uniform3f(lColor, 0.0, 1.0, 0.0)
    } else {
        gl.uniform3f(lColor, 1.0, 1.0, 1.0)
    }

    gl.bufferData(gl.ARRAY_BUFFER, buttonRightPos, gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}
