const vertexShaderSource = `#version 300 es
    in vec4 a_position;
    in vec3 a_color;
    out vec3 p_color;
    void main() {
        gl_Position = a_position;
        p_color = a_color;
    }
`

const fragmentShaderSource = `#version 300 es
    precision highp float;
    in vec3 p_color;
    out vec4 outColor;
    uniform vec4 u_color;

    void main() {
        outColor = vec4(p_color, 1.0);
    }
`
