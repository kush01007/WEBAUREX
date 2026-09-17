"use client";

import { useEffect, useRef } from "react";
import styles from "./SignatureScene.module.css";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (value) => value * value * (3 - 2 * value);

export default function CrystalCanvas() {
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const shell = sceneRef.current;
    const canvas = canvasRef.current;
    const section = shell.closest("section");
    const progressLabel = section.querySelector("[data-signature-progress]");
    const progressBar = section.querySelector("[data-signature-progress-bar]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let cleanup = () => {};

    if (reducedMotion.matches) {
      section.style.setProperty("--signature-progress", "1");
      progressLabel.textContent = "100";
      return undefined;
    }

    async function buildScene() {
      try {
        const [THREE, environmentModule] = await Promise.all([
          import("three"),
          import("three/addons/environments/RoomEnvironment.js"),
        ]);
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = .86;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(31, 1, .1, 100);
        camera.position.set(0, .2, 10.5);

        const pmrem = new THREE.PMREMGenerator(renderer);
        const room = new environmentModule.RoomEnvironment();
        const environment = pmrem.fromScene(room, .04).texture;
        scene.environment = environment;
        scene.environmentIntensity = .18;
        room.dispose();
        pmrem.dispose();

        const crystal = new THREE.Group();
        crystal.position.y = .15;
        scene.add(crystal);

        const glass = new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: true,
          uniforms: {
            uTime: { value: 0 },
            uPointer: { value: new THREE.Vector2() },
          },
          vertexShader: `
            varying vec3 vWorldNormal;
            varying vec3 vWorldPosition;
            void main() {
              vec4 worldPosition = modelMatrix * vec4(position, 1.0);
              vWorldPosition = worldPosition.xyz;
              vWorldNormal = normalize(mat3(modelMatrix) * normal);
              gl_Position = projectionMatrix * viewMatrix * worldPosition;
            }
          `,
          fragmentShader: `
            uniform float uTime;
            uniform vec2 uPointer;
            varying vec3 vWorldNormal;
            varying vec3 vWorldPosition;
            void main() {
              vec3 normal = normalize(vWorldNormal);
              vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
              float facing = clamp(abs(dot(normal, viewDirection)), 0.0, 1.0);
              float fresnel = pow(1.0 - facing, 2.35);
              vec3 spectrum = .5 + .5 * cos(6.28318 * (vec3(0.02, .35, .68) + fresnel * .52 + uTime * .012 + uPointer.x * .04));
              float facet = pow(max(0.0, dot(normal, normalize(vec3(-.28, .72, .62)))), 18.0);
              vec3 base = mix(vec3(.018, .024, .045), vec3(.09, .12, .18), facing);
              vec3 color = base + spectrum * fresnel * .3 + vec3(.72, .86, 1.0) * facet * .42;
              gl_FragColor = vec4(color, .9);
            }
          `,
        });
        const chrome = new THREE.MeshPhysicalMaterial({ color: 0x141922, metalness: 1, roughness: .09, clearcoat: 1, envMapIntensity: .28, iridescence: .3, flatShading: true });
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xcfe5ff, transparent: true, opacity: .34 });

        const coreGeometry = new THREE.OctahedronGeometry(1.82, 1);
        const core = new THREE.Mesh(coreGeometry, glass);
        core.scale.set(.82, 1.42, .82);
        crystal.add(core);
        const coreEdges = new THREE.LineSegments(new THREE.EdgesGeometry(coreGeometry, 13), edgeMaterial);
        coreEdges.scale.copy(core.scale);
        crystal.add(coreEdges);

        const innerGeometry = new THREE.IcosahedronGeometry(.7, 1);
        const inner = new THREE.Mesh(innerGeometry, chrome);
        inner.scale.set(.78, 1.42, .78);
        crystal.add(inner);

        const shardBlueprints = [
          { end: [-1.2, 1.15, .15], start: [-5.4, 3.8, 1.8], scale: [.42, 1.15, .38], rotation: [.2, .35, -.42] },
          { end: [1.18, 1.02, -.05], start: [5.6, 3.1, -1.4], scale: [.46, 1.05, .42], rotation: [-.15, -.28, .48] },
          { end: [-1.3, -.9, .08], start: [-5.2, -3.4, -1.6], scale: [.48, 1.08, .42], rotation: [-.25, .45, .62] },
          { end: [1.32, -.88, .12], start: [5.1, -3.6, 1.7], scale: [.43, 1.12, .4], rotation: [.35, -.4, -.55] },
          { end: [0, 1.88, -.1], start: [.3, 6.1, -2.2], scale: [.5, 1.02, .46], rotation: [.5, .2, .08] },
          { end: [.03, -1.9, .05], start: [-.4, -6.2, 2.1], scale: [.48, 1.05, .44], rotation: [-.42, -.18, 3.08] },
        ];
        const shards = shardBlueprints.map((blueprint, index) => {
          const geometry = new THREE.TetrahedronGeometry(.94, 0);
          const mesh = new THREE.Mesh(geometry, index % 3 === 1 ? chrome : glass);
          mesh.scale.set(...blueprint.scale);
          mesh.userData.end = new THREE.Vector3(...blueprint.end);
          mesh.userData.start = new THREE.Vector3(...blueprint.start);
          mesh.userData.endQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(...blueprint.rotation));
          mesh.userData.startQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(blueprint.rotation[0] + 1.8, blueprint.rotation[1] - 1.4, blueprint.rotation[2] + 1.2));
          mesh.position.copy(mesh.userData.start);
          mesh.quaternion.copy(mesh.userData.startQuaternion);
          crystal.add(mesh);
          return mesh;
        });

        const cyanLight = new THREE.PointLight(0x72e8ff, 38, 18, 1.7);
        cyanLight.position.set(-4, 2, 5);
        scene.add(cyanLight);
        const violetLight = new THREE.PointLight(0xc58cff, 29, 18, 1.7);
        violetLight.position.set(4, -1, 4);
        scene.add(violetLight);
        const rimLight = new THREE.DirectionalLight(0xffffff, 1.1);
        rimLight.position.set(0, 5, -3);
        scene.add(rimLight);
        scene.add(new THREE.AmbientLight(0xffffff, .07));

        const gridGeometry = new THREE.PlaneGeometry(19, 15, 38, 30);
        const gridMaterial = new THREE.ShaderMaterial({
          transparent: true,
          wireframe: true,
          depthWrite: false,
          uniforms: {
            uTime: { value: 0 },
            uPointer: { value: new THREE.Vector2() },
            uOpacity: { value: .18 },
          },
          vertexShader: `
            uniform float uTime;
            uniform vec2 uPointer;
            varying float vWave;
            void main() {
              vec3 p = position;
              float nearPointer = 1.0 - smoothstep(0.0, 5.0, distance(p.xy, uPointer * vec2(5.0, 3.0)));
              float wave = sin(p.x * .75 + uTime * .38) * .12 + cos(p.y * .62 - uTime * .28) * .09;
              p.z += wave * (.35 + nearPointer * 1.2);
              vWave = nearPointer;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }
          `,
          fragmentShader: `
            uniform float uOpacity;
            varying float vWave;
            void main() {
              vec3 silver = mix(vec3(.34, .35, .4), vec3(.64, .76, .86), vWave);
              gl_FragColor = vec4(silver, uOpacity + vWave * .12);
            }
          `,
        });
        const grid = new THREE.Mesh(gridGeometry, gridMaterial);
        grid.rotation.x = -Math.PI * .5;
        grid.position.set(0, -2.55, -1.4);
        scene.add(grid);

        const particleCount = window.innerWidth < 700 ? 48 : 90;
        const particlePositions = new Float32Array(particleCount * 3);
        for (let index = 0; index < particleCount; index += 1) {
          particlePositions[index * 3] = (Math.random() - .5) * 13;
          particlePositions[index * 3 + 1] = (Math.random() - .5) * 8;
          particlePositions[index * 3 + 2] = (Math.random() - .5) * 6 - 1;
        }
        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
        const particlesMaterial = new THREE.PointsMaterial({ color: 0xcad9ee, size: .025, transparent: true, opacity: .5, depthWrite: false });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        const pointerTarget = new THREE.Vector2();
        const pointerCurrent = new THREE.Vector2();
        let dragging = false;
        let touchX = 0;
        let touchRotation = 0;
        let visible = false;
        let frame = 0;
        let lastProgressText = -1;
        const timer = new THREE.Timer();
        timer.connect(document);

        function resize() {
          const rect = shell.getBoundingClientRect();
          const mobile = rect.width < 700;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.7));
          renderer.setSize(rect.width, rect.height, false);
          camera.aspect = rect.width / Math.max(1, rect.height);
          camera.fov = mobile ? 39 : 31;
          camera.position.z = mobile ? 11.8 : 10.5;
          camera.updateProjectionMatrix();
        }

        function updatePointer(event) {
          const rect = canvas.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
          if (event.pointerType === "touch" && dragging) {
            touchRotation += (event.clientX - touchX) * .008;
            touchX = event.clientX;
          } else {
            pointerTarget.set(clamp(x, -1, 1), clamp(y, -1, 1));
          }
        }

        function pointerDown(event) {
          if (event.pointerType !== "touch") return;
          dragging = true;
          touchX = event.clientX;
          canvas.setPointerCapture?.(event.pointerId);
        }

        function pointerUp(event) {
          dragging = false;
          canvas.releasePointerCapture?.(event.pointerId);
        }

        function pointerLeave() {
          if (!dragging) pointerTarget.set(0, 0);
        }

        function render(timestamp) {
          if (!visible || disposed) { frame = 0; return; }
          frame = requestAnimationFrame(render);
          timer.update(timestamp);
          const time = timer.getElapsed();
          const bounds = section.getBoundingClientRect();
          const distance = Math.max(1, section.offsetHeight - window.innerHeight);
          const rawProgress = clamp(-bounds.top / distance);
          const assembly = ease(clamp(rawProgress / .64));
          const progressText = Math.round(rawProgress * 100);

          if (progressText !== lastProgressText) {
            lastProgressText = progressText;
            progressLabel.textContent = String(progressText).padStart(2, "0");
            section.style.setProperty("--signature-progress", String(rawProgress));
            progressBar.style.transform = `scaleY(${rawProgress})`;
          }

          pointerCurrent.lerp(pointerTarget, .055);
          crystal.rotation.y += ((pointerCurrent.x * .48 + touchRotation + time * .075) - crystal.rotation.y) * .065;
          crystal.rotation.x += ((-pointerCurrent.y * .24 + Math.sin(time * .3) * .035) - crystal.rotation.x) * .06;
          crystal.rotation.z = Math.sin(time * .24) * .025;
          crystal.position.y = .12 + Math.sin(time * .55) * .08;
          core.scale.set(.82 * (.72 + assembly * .28), 1.42 * (.72 + assembly * .28), .82 * (.72 + assembly * .28));
          coreEdges.scale.copy(core.scale);
          inner.rotation.y = -time * .22;
          inner.rotation.x = time * .11;

          shards.forEach((shard, index) => {
            shard.position.lerpVectors(shard.userData.start, shard.userData.end, assembly);
            shard.quaternion.slerpQuaternions(shard.userData.startQuaternion, shard.userData.endQuaternion, assembly);
            if (assembly > .98) shard.rotation.y += Math.sin(time * .5 + index) * .0008;
          });

          camera.position.x += (pointerCurrent.x * .58 - camera.position.x) * .045;
          camera.position.y += ((window.innerWidth < 700 ? .05 : .2) + pointerCurrent.y * .34 - camera.position.y) * .045;
          camera.lookAt(0, 0, 0);
          cyanLight.position.x = -3.8 + pointerCurrent.x * 2.2;
          cyanLight.position.y = 1.8 + pointerCurrent.y * 1.8;
          violetLight.position.x = 3.8 - pointerCurrent.x * 1.6;
          gridMaterial.uniforms.uTime.value = time;
          gridMaterial.uniforms.uPointer.value.lerp(pointerCurrent, .09);
          glass.uniforms.uTime.value = time;
          glass.uniforms.uPointer.value.lerp(pointerCurrent, .09);
          grid.rotation.z = pointerCurrent.x * .018;
          particles.rotation.y = time * .012;

          renderer.render(scene, camera);
        }

        const visibilityObserver = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !frame) {
            timer.reset();
            render();
          } else if (!visible && frame) {
            cancelAnimationFrame(frame);
            frame = 0;
          }
        }, { rootMargin: "150px" });
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(shell);
        visibilityObserver.observe(section);
        canvas.addEventListener("pointermove", updatePointer, { passive: true });
        canvas.addEventListener("pointerdown", pointerDown, { passive: true });
        canvas.addEventListener("pointerup", pointerUp, { passive: true });
        canvas.addEventListener("pointercancel", pointerUp, { passive: true });
        canvas.addEventListener("pointerleave", pointerLeave);
        resize();
        shell.dataset.ready = "true";

        cleanup = () => {
          visibilityObserver.disconnect();
          resizeObserver.disconnect();
          cancelAnimationFrame(frame);
          canvas.removeEventListener("pointermove", updatePointer);
          canvas.removeEventListener("pointerdown", pointerDown);
          canvas.removeEventListener("pointerup", pointerUp);
          canvas.removeEventListener("pointercancel", pointerUp);
          canvas.removeEventListener("pointerleave", pointerLeave);
          scene.traverse((object) => {
            object.geometry?.dispose?.();
            if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
            else object.material?.dispose?.();
          });
          environment.dispose();
          timer.dispose();
          renderer.dispose();
        };
      } catch {
        shell.dataset.fallback = "true";
      }
    }

    // Keep Three.js out of the hero's critical path; load shortly before this
    // section can enter the viewport.
    const bootstrapObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      bootstrapObserver.disconnect();
      buildScene();
    }, { rootMargin: "800px" });
    bootstrapObserver.observe(section);

    return () => {
      disposed = true;
      bootstrapObserver.disconnect();
      cleanup();
    };
  }, []);

  return (
    <div ref={sceneRef} className={styles.scene} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.fallbackCrystal}><i /><i /><i /><i /></div>
      <span className={styles.interactionHint}>Move to refract · Drag to rotate</span>
    </div>
  );
}
