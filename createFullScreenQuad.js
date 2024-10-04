export function createFullScreenQuad(resolution) {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
        vertexShader: `
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec2 resolution;

            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
            }

            float noise(vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);

                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));

                vec2 u = f * f * (3.0 - 2.0 * f);

                return mix(a, b, u.x) +
                       (c - a) * u.y * (1.0 - u.x) +
                       (d - b) * u.x * u.y;
            }

            void main() {
                vec2 st = gl_FragCoord.xy / resolution.xy * 3.0;
                float n = noise(st + vec2(time * 0.1, time * 0.1));
                vec3 color = vec3(n);
                gl_FragColor = vec4(color, 0.5); // Adjust alpha for blending
            }
        `,
        uniforms: {
            time: { value: 0 },
            resolution: { value: resolution }
        },
        transparent: true // Allow for blending
    });

    const quad = new THREE.Mesh(geometry, material);
    quad.frustumCulled = false;

    return quad;
}
