import { useEffect, useRef, useState } from 'react';

const ARTWORKS = [
  '/art/01-hydrangea-rain.jpg',
  '/art/02-garden-window.jpg',
  '/art/03-clover-stone.jpg',
  '/art/04-blue-wall.jpg',
  '/art/05-night-bloom.jpg',
  '/art/06-open-window.jpg',
  '/art/07-fence-rain.jpg',
];

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uMap;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    vec4 texel = texture2D(uMap, vUv);
    float edgeX = smoothstep(0.0, 0.14, vUv.x) * smoothstep(0.0, 0.14, 1.0 - vUv.x);
    float edgeY = smoothstep(0.0, 0.18, vUv.y) * smoothstep(0.0, 0.18, 1.0 - vUv.y);
    float feather = pow(edgeX * edgeY, 0.72);
    vec3 lifted = mix(texel.rgb, vec3(0.96, 0.95, 0.88), 0.12);
    vec3 toned = mix(lifted, lifted * vec3(0.94, 1.0, 0.91), 0.10);
    gl_FragColor = vec4(toned, texel.a * feather * uOpacity);
  }
`;

export function ArtBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let cleanup = () => undefined;

    void import('three').then(async (THREE) => {
      if (disposed) return;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: innerWidth > 767, powerPreference: 'high-performance' });
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 50);
      const loader = new THREE.TextureLoader();
      const geometry = new THREE.PlaneGeometry(9.8, 5.45, 1, 1);
      const textures = await Promise.all(ARTWORKS.map((src) => loader.loadAsync(src)));
      if (disposed) {
        textures.forEach((texture) => texture.dispose());
        geometry.dispose();
        renderer.dispose();
        return;
      }

      renderer.setClearColor(0x07080a, 0);
      renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 768 ? 1.25 : 1.75));
      renderer.setSize(innerWidth, innerHeight, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      camera.position.z = 6;

      const xOffsets = [-1.55, 1.5, -0.75, 1.35, -1.35, 0.85, 0];
      const meshes = textures.map((texture, index) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        const material = new THREE.ShaderMaterial({
          uniforms: { uMap: { value: texture }, uOpacity: { value: 0 } },
          vertexShader,
          fragmentShader,
          transparent: true,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(xOffsets[index], index % 2 ? -0.1 : 0.18, -index * 3.15);
        mesh.rotation.set((index % 2 ? -1 : 1) * 0.018, (index % 2 ? -1 : 1) * 0.045, (index % 3 - 1) * 0.012);
        scene.add(mesh);
        return mesh;
      });

      let scrollTarget = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      let scrollCurrent = scrollTarget;
      let pointerX = 0;
      let pointerY = 0;
      let frame = 0;

      const resize = () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 768 ? 1.25 : 1.75));
        renderer.setSize(innerWidth, innerHeight, false);
      };
      const onScroll = () => {
        scrollTarget = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      };
      const onPointer = (event: PointerEvent) => {
        pointerX = event.clientX / innerWidth - 0.5;
        pointerY = event.clientY / innerHeight - 0.5;
      };
      const render = () => {
        frame = 0;
        if (document.visibilityState === 'hidden') return;
        scrollCurrent += (scrollTarget - scrollCurrent) * 0.055;
        camera.position.z = 6 - scrollCurrent * 21;
        camera.position.x += (pointerX * 0.34 - camera.position.x) * 0.045;
        camera.position.y += (-pointerY * 0.18 - camera.position.y) * 0.045;
        meshes.forEach((mesh, index) => {
          const distance = camera.position.z - mesh.position.z;
          const focus = Math.max(0, 1 - Math.abs(distance - 5.4) / 5.2);
          mesh.material.uniforms.uOpacity.value = focus * (innerWidth < 768 ? 0.32 : 0.42);
          mesh.rotation.y += ((index % 2 ? -1 : 1) * pointerX * 0.055 - mesh.rotation.y) * 0.025;
          mesh.position.y = (index % 2 ? -0.1 : 0.18) + Math.sin(scrollCurrent * 8 + index) * 0.12;
          const scale = 1 + focus * 0.055;
          mesh.scale.set(scale, scale, 1);
        });
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };
      const onVisibility = () => {
        if (document.visibilityState === 'visible' && !reduced && frame === 0) frame = requestAnimationFrame(render);
        if (document.visibilityState === 'hidden') {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      };

      addEventListener('resize', resize, { passive: true });
      addEventListener('scroll', onScroll, { passive: true });
      if (!reduced) addEventListener('pointermove', onPointer, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      setReady(true);
      if (reduced) {
        camera.position.z = 6 - scrollTarget * 21;
        meshes.forEach((mesh) => {
          const distance = camera.position.z - mesh.position.z;
          const focus = Math.max(0, 1 - Math.abs(distance - 5.4) / 5.2);
          mesh.material.uniforms.uOpacity.value = focus * 0.36;
        });
        renderer.render(scene, camera);
      }
      else frame = requestAnimationFrame(render);

      cleanup = () => {
        cancelAnimationFrame(frame);
        removeEventListener('resize', resize);
        removeEventListener('scroll', onScroll);
        removeEventListener('pointermove', onPointer);
        document.removeEventListener('visibilitychange', onVisibility);
        meshes.forEach((mesh) => mesh.material.dispose());
        textures.forEach((texture) => texture.dispose());
        geometry.dispose();
        renderer.dispose();
      };
    }).catch(() => setReady(false));

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div className={`art-scene ${ready ? 'is-ready' : ''}`} aria-hidden="true">
    <div className="art-scene-fallback" />
    <canvas ref={canvasRef} />
    <div className="art-scene-shade" />
  </div>;
}
