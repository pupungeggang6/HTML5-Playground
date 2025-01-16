function vShaderSource = `#version 300 es
    in vec4 a_position;

    void main() {
        gl_Position = a_position;
    }
`

function fShaderSource = `#version 300 es
    precision highp float;
    uniform u_color;
    out vec4 color;

    void main() {
        color = vec4(u_color, 1.0);
    }
`
