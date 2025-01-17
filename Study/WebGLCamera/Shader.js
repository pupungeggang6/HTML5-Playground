const vShaderSource = `#version 300 es
    in vec4 a_position;
    uniform mat4 u_camera_translate;
    uniform mat4 u_camera_rotate;
    uniform mat4 u_camera_proj;

    void main() {
        vec4 final_position = a_position;
        final_position *= u_camera_translate * u_camera_rotate;
        final_position *= u_camera_proj;
        gl_Position = final_position;
    }
`

const fShaderSource = `#version 300 es
    precision highp float;
    uniform vec3 u_color;
    out vec4 color;

    void main() {
        color = vec4(u_color, 1.0);
    }
`
