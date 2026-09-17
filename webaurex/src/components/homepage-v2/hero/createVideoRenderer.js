import { vertexShader, fragmentShader } from "./shaders";

// One video element, one texture, one draw call. No second decoder or 3D dependency.
export default function createVideoRenderer(canvas, video) {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, powerPreference: "low-power" });
  if (!gl) return null;

  const resources = [];
  function compile(type, source) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Could not create hero shader");
    resources.push(["deleteShader", shader]);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("Hero shader compilation failed");
    return shader;
  }

  function dispose() {
    resources.reverse().forEach(([method, resource]) => gl[method](resource));
    resources.length = 0;
  }

  try {
    const program = gl.createProgram();
    if (!program) throw new Error("Could not create hero program");
    resources.push(["deleteProgram", program]);
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShader));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentShader));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Hero shader linking failed");
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    resources.push(["deleteBuffer", buffer]);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    resources.push(["deleteTexture", texture]);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.uniform1i(gl.getUniformLocation(program, "u_video"), 0);

    const uniforms = Object.fromEntries(["resolution", "videoSize", "velocity", "radius", "time", "motion"].map((name) => [name, gl.getUniformLocation(program, `u_${name}`)]));
    uniforms.trail = gl.getUniformLocation(program, "u_trail[0]");
    let previousTime = -1;
    let width = 1;
    let height = 1;

    return {
      resize(w, h) {
        width = w;
        height = h;
        // Avoid rendering a full 4K canvas on large/high-density screens.
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5, 1920 / w);
        canvas.width = Math.max(1, Math.round(w * dpr));
        canvas.height = Math.max(1, Math.round(h * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
      },
      draw({ trail, velocity, time, coarse, reduced }) {
        if (video.readyState < 2 || gl.isContextLost()) return false;
        if (video.currentTime !== previousTime) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
          previousTime = video.currentTime;
        }
        gl.uniform2f(uniforms.resolution, width, height);
        gl.uniform2f(uniforms.videoSize, video.videoWidth, video.videoHeight);
        gl.uniform3fv(uniforms.trail, trail);
        gl.uniform2f(uniforms.velocity, velocity.x, velocity.y);
        gl.uniform1f(uniforms.radius, coarse ? Math.min(155, width * .3) : Math.min(260, Math.max(180, width * .17)));
        gl.uniform1f(uniforms.time, time);
        gl.uniform1f(uniforms.motion, reduced ? 0 : 1);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        return true;
      },
      dispose,
    };
  } catch {
    dispose();
    return null;
  }
}
