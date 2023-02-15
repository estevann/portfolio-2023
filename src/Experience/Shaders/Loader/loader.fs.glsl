uniform float iTime;                 
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform float iCountdown;
uniform float iDelayTime;

varying vec2 vUv;


void main(void)
{
	vec2 p = -2.0 + 2.0 *vUv;

    // Time varying pixel color
    vec3 col = texture(iChannel0, vUv).rgb;
    float grey = dot(col, vec3(1,1,1)) / 3.0;    
    vec3 img = texture(iChannel2, vUv).rgb;
    
    vec2 uv0 = (vUv*2.0 - 1.0) * 0.5;
    float length0 = sqrt(dot(uv0, uv0));
    float time = fract(iTime / 2.0) * iDelayTime;
    float mask = 1.0 - clamp(length0 * 20.0 - (time*(grey*0.5+0.5)),0.0,1.0);
 
    // background	 
    vec3 bgimg = texture(iChannel2, vUv).rgb;
    mask *= dot(vec3(1.0), vec3(1.0/3.0));
    
    gl_FragColor.rgb = (1.0-mask) * img + mask * bgimg;
    gl_FragColor.a = iCountdown - mask;
}