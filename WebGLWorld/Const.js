const vSource = `#version 300 es
    in vec4 a_position;
    in vec3 a_color;
    in vec4 a_model_rotate;
    in vec3 a_model_scale;
    in vec3 a_model_translate;
    
    uniform mat4 u_camera_rotate;
    uniform vec3 u_camera_translate;
    uniform mat4 u_camera_projection;

    out vec3 p_color;

    void main() {
        vec4 final_position = vec4(a_position);
        mat4 model_scale = mat4(1.0);
        mat4 model_translate = mat4(1.0);
        mat4 camera_translate = mat4(1.0);

        model_scale[0][0] = a_model_scale[0];
        model_scale[1][1] = a_model_scale[1];
        model_scale[2][2] = a_model_scale[2];
        model_translate[0][3] = a_model_translate[0];
        model_translate[1][3] = a_model_translate[1];
        model_translate[2][3] = a_model_translate[2];
        camera_translate[0][3] = -u_camera_translate[0];
        camera_translate[1][3] = -u_camera_translate[1];
        camera_translate[2][3] = -u_camera_translate[2];

        final_position *= model_scale; 
        final_position *= model_translate;
        final_position *= u_camera_rotate;
        final_position *= camera_translate;
        final_position *= u_camera_projection;

        gl_Position = final_position;
        p_color = a_color;
    }
`

const fSource = `#version 300 es
    precision highp float;
    in vec3 p_color;
    out vec4 u_color;

    void main() {
        u_color = vec4(p_color, 1.0);
    }
`

const vCuboid = []
