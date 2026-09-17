export const vertexShader = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

export const fragmentShader = `
  precision mediump float;
  uniform sampler2D u_video;
  uniform vec2 u_resolution;
  uniform vec2 u_videoSize;
  uniform vec3 u_trail[7];
  uniform vec2 u_velocity;
  uniform float u_radius;
  uniform float u_time;
  uniform float u_motion;
  varying vec2 v_uv;

  void main() {
    float screenAspect = u_resolution.x / u_resolution.y;
    float videoAspect = u_videoSize.x / u_videoSize.y;
    vec2 cover = vec2(min(1.0, screenAspect / videoAspect), min(1.0, videoAspect / screenAspect));
    vec2 uv = (v_uv - 0.5) * cover + 0.5;
    vec2 pixel = vec2(v_uv.x, 1.0 - v_uv.y) * u_resolution;

    // A continuous field of trailing lenses, softly warped at the boundary.
    // All colours and highlights come from the same video texture.
    float field = 0.0;
    vec2 flow = vec2(0.0);
    vec2 wave = vec2(sin(pixel.y * .011 + u_time * .65), cos(pixel.x * .009 - u_time * .58));
    wave += .36 * vec2(sin(pixel.y * .023 - pixel.x * .008 - u_time * .8), cos(pixel.x * .019 + pixel.y * .007 + u_time * .75));
    for (int i = 0; i < 7; i++) {
      float age = float(i);
      float radius = u_radius * (1.0 - age * .065);
      vec2 delta = (pixel - u_trail[i].xy + wave * 11.0 * u_motion) / radius;
      vec2 direction = u_velocity / (length(u_velocity) + .001);
      delta -= direction * dot(delta, direction) * min(length(u_velocity) * .16, .36) * u_motion;
      float influence = exp(-dot(delta, delta) * 2.7) * u_trail[i].z * (.48 - age * .05);
      field += influence;
      flow += delta * influence;
    }
    float contour = sin(pixel.x * .021 + pixel.y * .012 + u_time) * .035;
    contour += cos(pixel.y * .028 - pixel.x * .006 - u_time * .7) * .025;
    float reveal = smoothstep(.10, .82, field + contour * u_motion);
    float edge = reveal * (1.0 - reveal);
    vec2 leadDelta = (pixel - u_trail[0].xy) / u_radius;
    float leadDistance = length(leadDelta + wave * .035 * u_motion);
    float lensRing = exp(-pow((leadDistance - .63) / .13, 2.0)) * u_trail[0].z;
    vec2 displacement = (flow * 19.0 + normalize(leadDelta + vec2(.001)) * lensRing * 12.0 + wave * edge * 5.0) * u_motion;
    vec2 refractedUV = clamp(uv + vec2(displacement.x, -displacement.y) / u_resolution * cover, .001, .999);
    vec3 original = texture2D(u_video, refractedUV).rgb;
    float luminance = dot(original, vec3(.2126, .7152, .0722));
    vec3 quiet = vec3(luminance) * vec3(.97, .97, 1.0);
    vec3 colour = mix(quiet, original, reveal);

    // Local optical bloom picks up bright details instead of painting a green disk.
    vec2 spread = cover * 5.0 / u_resolution;
    vec3 bloom = texture2D(u_video, clamp(refractedUV + vec2(spread.x, 0.), .001, .999)).rgb;
    bloom += texture2D(u_video, clamp(refractedUV - vec2(spread.x, 0.), .001, .999)).rgb;
    bloom += texture2D(u_video, clamp(refractedUV + vec2(0., spread.y), .001, .999)).rgb;
    bloom += texture2D(u_video, clamp(refractedUV - vec2(0., spread.y), .001, .999)).rgb;
    bloom = max(bloom * .25 - .36, 0.0);
    colour += bloom * reveal * .42 + vec3(.78, .81, .86) * (edge * .07 + lensRing * .035);
    gl_FragColor = vec4(colour, 1.0);
  }
`;
