
// uniform float iTime;                 
// uniform sampler2D ichannel0;
// uniform sampler2D ichannel1;

varying float iCountdown;
varying float iDelayTime;
varying vec2 vUv;
// varying float mask;
// varying vec3 img;

void main()
{
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = vec4(position, 1.0);
}


