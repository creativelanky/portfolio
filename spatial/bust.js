/* The chrome bust of me, in real 3D (three.js): on the normal home, the About page and the room's home wall.
   · the model (img/bust.glb) is made from my photos; every element with data-bust gets its own view of it
   · data-paint: a front view of the bust wearing a headband, eyes and a chain, projected onto it (see below)
   · data-finish="mirror": polished chrome with a stronger iridescent film, like a CVD coating; otherwise satin silver
   · data-yaw: which way it faces when you're not pointing at it (radians; negative turns it to its right, toward the page's text)
   · it turns its head toward the cursor anywhere on the page, and eases back when the cursor leaves
   · on a phone it follows your finger across it, and sways a little on its own
   · if WebGL or the model can't load, whatever sits underneath (the dust portrait) stays */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const gltfs = {};   /* one load per model file, shared by every bust on the page */
document.querySelectorAll('[data-bust]').forEach(box => start(box).catch(() => {}));

async function start(box){
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(studio(), .02).texture;
  /* a warm key from the upper left and a cool rim from behind, so the chrome has edges to catch */
  const key = new THREE.DirectionalLight(0xfff1e0, 2.2); key.position.set(-2, 3, 3); scene.add(key);
  const rim = new THREE.DirectionalLight(0xc9d6ff, 2.6); rim.position.set(2.5, 1.5, -3); scene.add(rim);

  const camera = new THREE.PerspectiveCamera(26, 1, .1, 50);
  camera.position.set(0, 0, 4.6);

  const src = box.getAttribute('data-src');
  gltfs[src] = gltfs[src] || new GLTFLoader().loadAsync(src);
  const model = (await gltfs[src]).scene.clone(true);
  const MIRROR = box.getAttribute('data-finish') === 'mirror', YAW = +box.getAttribute('data-yaw') || 0;
  /* data-strength: how much of the painting the bare silver takes (0…1); data-frame: where the bust sits in the 1024px painting, l,r,t,b */
  const STRENGTH = box.hasAttribute('data-strength') ? +box.getAttribute('data-strength') : .45;
  const FRAME = (box.getAttribute('data-frame') || '222,802,90,935').split(',').map(n => +n / 1024);
  /* data-hair: the hair, in the painting's pixels: top y of the face, the face's left and right x, and how far down the sides go.
     Everything there turns metallic purple all the way round, back included, since the painting only shows the front */
  const HAIR = box.hasAttribute('data-hair') ? box.getAttribute('data-hair').split(',').map(n => +n / 1024) : null;
  /* glossy silver: shiny, with a clear coat, but softer than a mirror and only a hint of the iridescent film.
     mirror: polished chrome under a thicker rainbow film */
  const chrome = new THREE.MeshPhysicalMaterial(MIRROR ? {
    color: 0xf4f4f6, metalness: 1, roughness: .09,
    iridescence: .7, iridescenceIOR: 1.75, iridescenceThicknessRange: [160, 560],
    clearcoat: .6, clearcoatRoughness: .08, envMapIntensity: 1.35
  } : {
    color: 0xeeeef1, metalness: .9, roughness: .15,
    iridescence: .3, iridescenceIOR: 1.6, iridescenceThicknessRange: [200, 480],
    clearcoat: .7, clearcoatRoughness: .08, envMapIntensity: 1.3
  });
  /* centre it and scale it to a fixed height */
  model.updateMatrixWorld(true);
  const b = new THREE.Box3().setFromObject(model), size = b.getSize(new THREE.Vector3()), mid = b.getCenter(new THREE.Vector3());
  /* the headband, eyes and iced-out chain are painted on: a front view of the bust wearing them (img/bust-paint.jpg) is
     projected onto the model from the front, like a slide projector, and fades back to bare silver as the surface turns away */
  const paintSrc = box.getAttribute('data-paint');
  const paint = paintSrc ? await new THREE.TextureLoader().loadAsync(paintSrc) : null;
  if (paint) { paint.colorSpace = THREE.SRGBColorSpace; paint.anisotropy = 4; chrome.map = paint; }
  if (paint) chrome.onBeforeCompile = sh => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nattribute float front;\nattribute float hair;\nvarying float vFront;\nvarying float vHair;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvFront = front;\nvHair = hair;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vFront;\nvarying float vHair;')
      .replace('#include <map_fragment>', `
        vec3 paintC = pow( texture2D( map, vMapUv ).rgb, vec3( .8 ) );
        float paintSat = max( paintC.r, max( paintC.g, paintC.b ) ) - min( paintC.r, min( paintC.g, paintC.b ) );
        /* coloured parts take the paint fully; the silver takes only STRENGTH of it, so its baked shadows don't stack too much on the live ones */
        diffuseColor.rgb = mix( diffuseColor.rgb, paintC, vFront * mix( ${STRENGTH.toFixed(2)}, 1., smoothstep( .12, .35, paintSat ) ) );
        diffuseColor.rgb = mix( diffuseColor.rgb, vec3( .42, .2, .86 ), vHair );`)
      /* where the paint has colour (the purple hair and band) it is tinted metal: a little less metallic, a little softer */
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
        float paintSoft = smoothstep( .12, .35, paintSat ) * vFront;
        roughnessFactor = mix( mix( roughnessFactor, .22, paintSoft ), .14, vHair );`)
      .replace('#include <metalnessmap_fragment>', `#include <metalnessmap_fragment>
        metalnessFactor = mix( mix( metalnessFactor, .55, smoothstep( .12, .35, paintSat ) * vFront ), .8, vHair );`);
  };
  /* where the paint lands: the bust's box, matched to where the bust sits in the 1024px painting */
  const IMG = { l: FRAME[0], r: FRAME[1], t: FRAME[2], b: FRAME[3] };
  const v = new THREE.Vector3(), n = new THREE.Vector3(), nm = new THREE.Matrix3();
  model.traverse(o => {
    if (!o.isMesh) return;
    o.material = chrome;
    const g = o.geometry; if (!g.attributes.normal) g.computeVertexNormals();
    if (!paint || g.attributes.front) return;   /* clones share geometry: project once */
    nm.getNormalMatrix(o.matrixWorld);
    const P = g.attributes.position, N = g.attributes.normal, uv = new Float32Array(P.count * 2), fr = new Float32Array(P.count), hr = new Float32Array(P.count);
    for (let i = 0; i < P.count; i++) {
      v.fromBufferAttribute(P, i).applyMatrix4(o.matrixWorld); n.fromBufferAttribute(N, i).applyMatrix3(nm).normalize();
      uv[i * 2] = IMG.l + (v.x - b.min.x) / size.x * (IMG.r - IMG.l);
      uv[i * 2 + 1] = 1 - IMG.b + (v.y - b.min.y) / size.y * (IMG.b - IMG.t);
      fr[i] = THREE.MathUtils.smoothstep(n.z, -.3, .4);   /* front, top and sides take it; only the back of the head stays bare */
      if (HAIR) {   /* the painting's pixel under this point, top-down */
        const px = uv[i * 2], py = 1 - uv[i * 2 + 1], ss = THREE.MathUtils.smoothstep;
        const above = 1 - ss(py, HAIR[0] - .012, HAIR[0] + .012);
        const side = (1 - ss(py, HAIR[3] - .02, HAIR[3] + .02)) * Math.max(1 - ss(px, HAIR[1] - .012, HAIR[1] + .012), ss(px, HAIR[2] - .012, HAIR[2] + .012));
        const back = (1 - ss(py, HAIR[3] + .05, HAIR[3] + .09)) * (1 - ss(n.z, -.02, .22));   /* the back and sides of the head, above the ears */
        const temple = (1 - ss(py, HAIR[0] + .08, HAIR[0] + .12)) * (1 - ss(n.z, .35, .55));   /* the temples, which face sideways */
        hr[i] = Math.max(above, side, back, temple);
      }
    }
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); g.setAttribute('front', new THREE.BufferAttribute(fr, 1)); g.setAttribute('hair', new THREE.BufferAttribute(hr, 1));
  });
  model.position.sub(mid);
  const pivot = new THREE.Group(); pivot.add(model); pivot.scale.setScalar(1.72 / Math.max(size.x, size.y, size.z)); pivot.position.y = -.06;
  scene.add(pivot);

  box.appendChild(renderer.domElement);
  box.classList.add('on');   /* hides the dust portrait underneath */

  function size2(){ const w = box.clientWidth, h = box.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  size2(); addEventListener('resize', size2);

  /* where it should look: -1…1 across the page, 0 when the cursor is away */
  const aim = { x: 0, y: 0 }, now = { x: 0, y: 0 };
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    aim.x = e.clientX / innerWidth * 2 - 1; aim.y = e.clientY / innerHeight * 2 - 1;
  });
  document.addEventListener('pointerleave', () => { aim.x = aim.y = 0; });
  box.addEventListener('touchmove', e => {
    const r = box.getBoundingClientRect(), t = e.touches[0];
    aim.x = (t.clientX - r.left) / r.width * 2 - 1; aim.y = (t.clientY - r.top) / r.height * 2 - 1;
  }, { passive: true });
  box.addEventListener('touchend', () => { aim.x = aim.y = 0; });

  let shown = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { shown = es[0].isIntersecting; }).observe(box);
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (!shown) return;
    const t = clock.getElapsedTime(), k = REDUCE ? 1 : .06;
    now.x += (aim.x - now.x) * k; now.y += (aim.y - now.y) * k;
    const sway = REDUCE ? 0 : Math.sin(t * .5) * .06;
    pivot.rotation.y = YAW + now.x * .75 + sway;       /* up to about 43° to either side */
    pivot.rotation.x = now.y * .22;
    renderer.render(scene, camera);
  });
}

/* what the chrome reflects: a photo studio. Chrome is only as good as its surroundings, so this has contrast to mirror —
   a bright sky fading to a dark floor, two tall softboxes either side and a long strip light overhead */
function studio(){
  const env = new THREE.Scene();
  const g = new THREE.SphereGeometry(20, 48, 24), col = [], c = new THREE.Color(), pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / 20;   /* -1 floor … 1 sky */
    if (y > .05) c.setRGB(.82 + y * .12, .83 + y * .12, .86 + y * .12);
    else c.setRGB(.05 + (y + 1) * .1, .05 + (y + 1) * .1, .07 + (y + 1) * .11);
    col.push(c.r, c.g, c.b);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  env.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
  function light(w, h, x, y, z, k, tint){
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(tint || 0xffffff).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
  }
  light(3, 9, -7, 1, 5, 4);            /* key softbox, front left */
  light(2.4, 8, 7.5, .5, 3, 2.6, 0xdfe7ff);   /* fill, front right, a little cool */
  light(12, 1.2, 0, 9, -2, 5);         /* strip overhead */
  light(2, 7, 5, 1, -7, 3, 0xffe6cf);  /* warm rim behind */
  return env;
}
