function playerMove() {
    if (keyPressed['Up'] === true) {
        cameraTranslate.x += direction.forward.x * delta / 1000
        cameraTranslate.z += direction.forward.z * delta / 1000
    }
    if (keyPressed['Left'] === true) {
        cameraTranslate.x += direction.left.x * delta / 1000
        cameraTranslate.z += direction.left.z * delta / 1000
    }
    if (keyPressed['Down'] === true) {
        cameraTranslate.x += direction.backward.x * delta / 1000
        cameraTranslate.z += direction.backward.z * delta / 1000
    }
    if (keyPressed['Right'] === true) {
        cameraTranslate.x += direction.right.x * delta / 1000
        cameraTranslate.z += direction.right.z * delta / 1000
    }
}

function rotateCamera(x, y) {
    cameraRotate.y += -x / 1000 * 2.5
    cameraRotate.x += -y / 1000 * 2.5
}
