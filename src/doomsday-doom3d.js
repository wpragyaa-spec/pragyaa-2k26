import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
// Procedural texture generators
function createBrushedMetalNormalTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(128, 128, 255)'; // Neutral flat normal
    ctx.fillRect(0, 0, 256, 256);
    const imgData = ctx.getImageData(0, 0, 256, 256);
    const data = imgData.data;
    // Add micro-fine striations in horizontal direction
    for (let y = 0; y < 256; y++) {
        const rowNoise = (Math.sin(y * 1.2) * 12 + (Math.random() - 0.5) * 16) | 0;
        for (let x = 0; x < 256; x++) {
            const idx = (y * 256 + x) * 4;
            const grain = ((Math.random() - 0.5) * 18 + rowNoise) | 0;
            data[idx] = Math.min(255, Math.max(0, 128 + grain)); // R (tangent X)
            data[idx + 1] = Math.min(255, Math.max(0, 128 + grain / 3)); // G (tangent Y)
            data[idx + 2] = 255; // B (normal Z)
        }
    }
    ctx.putImageData(imgData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
}
function createCapeFabricTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a2216';
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = '#05160d';
    ctx.lineWidth = 1;
    for (let i = 0; i < 128; i += 3) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(128, i);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 128);
        ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}
export function initDoom3D(backContainer, frontContainer) {
    try {
        const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
        // Scene & Cameras
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 10, 4000);
        camera.position.set(0, 0, 1200);
        // Two renderers: back canvas (Layer 1) and front canvas (Layer 2)
        const backRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isHeadless, powerPreference: 'high-performance' });
        const frontRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isHeadless, powerPreference: 'high-performance' });
        const pixelRatio = isHeadless ? 1 : Math.min(window.devicePixelRatio || 1, 2);
        [backRenderer, frontRenderer].forEach((r) => {
            r.setPixelRatio(pixelRatio);
            r.outputColorSpace = THREE.SRGBColorSpace;
            r.toneMapping = THREE.ACESFilmicToneMapping;
            r.toneMappingExposure = 1.15;
            r.setSize(window.innerWidth, window.innerHeight);
            r.domElement.style.position = 'absolute';
            r.domElement.style.inset = '0';
            r.domElement.style.width = '100%';
            r.domElement.style.height = '100%';
            r.domElement.style.pointerEvents = 'none';
        });
        backContainer.innerHTML = '';
        backContainer.appendChild(backRenderer.domElement);
        frontContainer.innerHTML = '';
        frontContainer.appendChild(frontRenderer.domElement);
        // Studio Environment map using RoomEnvironment
        const pmremGenerator = new THREE.PMREMGenerator(backRenderer);
        scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
        pmremGenerator.dispose();
        // Studio Lighting
        const keyLight = new THREE.DirectionalLight(0xdff5eb, 2.4);
        keyLight.position.set(250, 400, 500);
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0x4ee899, 2.8);
        rimLight.position.set(-350, 300, -350);
        scene.add(rimLight);
        const hemiLight = new THREE.HemisphereLight(0x224433, 0x09140e, 1.2);
        scene.add(hemiLight);
        // Core Materials
        const normalMap = createBrushedMetalNormalTexture();
        const capeTexture = createCapeFabricTexture();
        const matTitanium = new THREE.MeshStandardMaterial({
            color: 0x98a8b8,
            metalness: 0.92,
            roughness: 0.22,
            normalMap,
            normalScale: new THREE.Vector2(0.35, 0.35),
        });
        const matTitaniumDark = new THREE.MeshStandardMaterial({
            color: 0x3d4b56,
            metalness: 0.88,
            roughness: 0.38,
            normalMap,
            normalScale: new THREE.Vector2(0.2, 0.2),
        });
        const matGoldTrim = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.95,
            roughness: 0.18,
        });
        const matEmeraldCape = new THREE.MeshStandardMaterial({
            color: 0x0a2618,
            roughness: 0.85,
            metalness: 0.06,
            map: capeTexture,
        });
        const matEmeraldCore = new THREE.MeshStandardMaterial({
            color: 0x00ff88,
            emissive: 0x00ff88,
            emissiveIntensity: 2.8,
            roughness: 0.2,
            metalness: 0.1,
        });
        const matEyeGlow = new THREE.MeshBasicMaterial({
            color: 0x00ffaa,
        });
        // Root Group
        const doomRig = new THREE.Group();
        scene.add(doomRig);
        // --- 1. HEAD & UPPER BODY (Layer 1: Behind Sphere) ---
        const bodyGroup = new THREE.Group();
        bodyGroup.layers.set(1);
        doomRig.add(bodyGroup);
        // Torso / Armored Chestplate
        const chestGeom = new THREE.CylinderGeometry(150, 120, 240, 8);
        const chestMesh = new THREE.Mesh(chestGeom, matTitaniumDark);
        chestMesh.position.set(0, -60, -220);
        chestMesh.rotation.y = Math.PI / 8;
        bodyGroup.add(chestMesh);
        // Pectoral armor plates
        const plateGeom = new THREE.BoxGeometry(75, 95, 20);
        const leftPlate = new THREE.Mesh(plateGeom, matTitanium);
        leftPlate.position.set(-45, -20, -115);
        leftPlate.rotation.set(-0.15, -0.15, 0.05);
        bodyGroup.add(leftPlate);
        const rightPlate = new THREE.Mesh(plateGeom, matTitanium);
        rightPlate.position.set(45, -20, -115);
        rightPlate.rotation.set(-0.15, 0.15, -0.05);
        bodyGroup.add(rightPlate);
        // Cape Mantle / Draped Cowl (Emerald green)
        const capeGeom = new THREE.CylinderGeometry(230, 280, 220, 16, 1, true, -Math.PI * 0.85, Math.PI * 1.7);
        const capeMesh = new THREE.Mesh(capeGeom, matEmeraldCape);
        capeMesh.position.set(0, -50, -210);
        capeMesh.rotation.y = Math.PI * 0.15;
        bodyGroup.add(capeMesh);
        // Gold Lion Cape Brooches & Chain
        const broochGeom = new THREE.CylinderGeometry(22, 22, 10, 16);
        const leftBrooch = new THREE.Mesh(broochGeom, matGoldTrim);
        leftBrooch.rotation.x = Math.PI / 2;
        leftBrooch.position.set(-110, 30, -120);
        bodyGroup.add(leftBrooch);
        const rightBrooch = new THREE.Mesh(broochGeom, matGoldTrim);
        rightBrooch.rotation.x = Math.PI / 2;
        rightBrooch.position.set(110, 30, -120);
        bodyGroup.add(rightBrooch);
        // Connecting Gold Chain across chest
        const chainCurve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-105, 28, -115), new THREE.Vector3(0, -15, -100), new THREE.Vector3(105, 28, -115));
        const chainGeom = new THREE.TubeGeometry(chainCurve, 20, 4, 8, false);
        const chainMesh = new THREE.Mesh(chainGeom, matGoldTrim);
        bodyGroup.add(chainMesh);
        // --- HEAD GROUP (Tracks mouse & rotation) ---
        const headGroup = new THREE.Group();
        headGroup.position.set(0, 150, -200);
        bodyGroup.add(headGroup);
        // Latverian Hood
        const hoodGeom = new THREE.SphereGeometry(95, 18, 16, 0, Math.PI * 2, 0, Math.PI * 0.75);
        const hoodMesh = new THREE.Mesh(hoodGeom, matEmeraldCape);
        hoodMesh.scale.set(1.08, 1.25, 1.22);
        hoodMesh.position.set(0, 20, -10);
        headGroup.add(hoodMesh);
        // Doctor Doom Titanium Mask
        const maskGeom = new THREE.SphereGeometry(68, 16, 16, 0, Math.PI, 0, Math.PI);
        const maskMesh = new THREE.Mesh(maskGeom, matTitanium);
        maskMesh.scale.set(0.92, 1.22, 0.95);
        maskMesh.rotation.y = -Math.PI / 2;
        maskMesh.position.set(0, 5, 20);
        headGroup.add(maskMesh);
        // Angular Brow Ridge
        const browGeom = new THREE.BoxGeometry(86, 14, 18);
        const browMesh = new THREE.Mesh(browGeom, matTitanium);
        browMesh.position.set(0, 25, 78);
        browMesh.rotation.x = 0.2;
        headGroup.add(browMesh);
        // Glowing Emerald Eye Slits
        const eyeGeom = new THREE.BoxGeometry(18, 5, 8);
        const leftEye = new THREE.Mesh(eyeGeom, matEyeGlow);
        leftEye.position.set(-24, 15, 82);
        leftEye.rotation.z = -0.15;
        headGroup.add(leftEye);
        const rightEye = new THREE.Mesh(eyeGeom, matEyeGlow);
        rightEye.position.set(24, 15, 82);
        rightEye.rotation.z = 0.15;
        headGroup.add(rightEye);
        // Mouth Grill (Horizontal titanium slats)
        const grillGroup = new THREE.Group();
        for (let i = 0; i < 4; i++) {
            const slat = new THREE.Mesh(new THREE.BoxGeometry(40 - i * 4, 3, 6), matTitaniumDark);
            slat.position.set(0, -25 - i * 6, 75 - i * 3);
            grillGroup.add(slat);
        }
        headGroup.add(grillGroup);
        // Rivets on mask cheekbones
        const rivetGeom = new THREE.SphereGeometry(2.5, 6, 6);
        [-38, 38].forEach((rx) => {
            [-5, 5, 15].forEach((ry) => {
                const rivet = new THREE.Mesh(rivetGeom, matGoldTrim);
                rivet.position.set(rx, ry, 70);
                headGroup.add(rivet);
            });
        });
        // --- 2. GAUNTLET FOREARM & WRIST (Layer 1: Behind Sphere) ---
        const gauntletArmGroup = new THREE.Group();
        gauntletArmGroup.layers.set(1);
        doomRig.add(gauntletArmGroup);
        // Massive armored forearm bracer rising from bottom
        const armGeom = new THREE.CylinderGeometry(95, 130, 480, 8);
        const armMesh = new THREE.Mesh(armGeom, matTitanium);
        armMesh.position.set(0, -320, -50);
        armMesh.rotation.x = 0.22;
        gauntletArmGroup.add(armMesh);
        // Outer Arm Ridge Armor Plates
        const ridgeGeom = new THREE.BoxGeometry(40, 360, 25);
        const leftRidge = new THREE.Mesh(ridgeGeom, matTitaniumDark);
        leftRidge.position.set(-90, -310, -35);
        leftRidge.rotation.x = 0.22;
        leftRidge.rotation.z = -0.08;
        gauntletArmGroup.add(leftRidge);
        const rightRidge = new THREE.Mesh(ridgeGeom, matTitaniumDark);
        rightRidge.position.set(90, -310, -35);
        rightRidge.rotation.x = 0.22;
        rightRidge.rotation.z = 0.08;
        gauntletArmGroup.add(rightRidge);
        // Gold Trim Cuff Rings at wrist
        const wristCuffGeom = new THREE.TorusGeometry(88, 7, 8, 24);
        const wristCuff = new THREE.Mesh(wristCuffGeom, matGoldTrim);
        wristCuff.position.set(0, -95, 0);
        wristCuff.rotation.x = Math.PI / 2 + 0.22;
        gauntletArmGroup.add(wristCuff);
        // Emerald Conduit Energy Tubes running along forearm
        const conduitCurveL = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-75, -500, -70),
            new THREE.Vector3(-85, -280, -25),
            new THREE.Vector3(-60, -95, 5),
        ]);
        const conduitGeomL = new THREE.TubeGeometry(conduitCurveL, 20, 5, 8, false);
        const conduitMeshL = new THREE.Mesh(conduitGeomL, matEmeraldCore);
        gauntletArmGroup.add(conduitMeshL);
        const conduitCurveR = new THREE.CatmullRomCurve3([
            new THREE.Vector3(75, -500, -70),
            new THREE.Vector3(85, -280, -25),
            new THREE.Vector3(60, -95, 5),
        ]);
        const conduitGeomR = new THREE.TubeGeometry(conduitCurveR, 20, 5, 8, false);
        const conduitMeshR = new THREE.Mesh(conduitGeomR, matEmeraldCore);
        gauntletArmGroup.add(conduitMeshR);
        // --- 3. PALM & BASE (Layer 1: Behind Sphere) ---
        const handGroup = new THREE.Group();
        handGroup.layers.set(1);
        doomRig.add(handGroup);
        // Solid Sculpted Palm Base
        const palmBaseGeom = new THREE.CylinderGeometry(130, 95, 65, 8);
        const palmBaseMesh = new THREE.Mesh(palmBaseGeom, matTitanium);
        palmBaseMesh.position.set(0, -45, 0);
        palmBaseMesh.scale.set(1.15, 1, 0.95);
        handGroup.add(palmBaseMesh);
        // Central Incursion Vortex Core in palm
        const coreRimGeom = new THREE.TorusGeometry(48, 6, 8, 24);
        const coreRim = new THREE.Mesh(coreRimGeom, matGoldTrim);
        coreRim.position.set(0, -12, 0);
        coreRim.rotation.x = Math.PI / 2;
        handGroup.add(coreRim);
        const vortexCoreGeom = new THREE.CylinderGeometry(42, 42, 8, 24);
        const vortexCoreMesh = new THREE.Mesh(vortexCoreGeom, matEmeraldCore);
        vortexCoreMesh.position.set(0, -14, 0);
        handGroup.add(vortexCoreMesh);
        // Arcane Energy Rings around the palm core
        const arcaneRingGeom = new THREE.TorusGeometry(65, 2, 4, 32);
        const arcaneRing1 = new THREE.Mesh(arcaneRingGeom, matEmeraldCore);
        arcaneRing1.position.set(0, -10, 0);
        arcaneRing1.rotation.x = Math.PI / 2;
        handGroup.add(arcaneRing1);
        // Palm Emerald PointLight shining upward into the timeline sphere
        const palmPointLight = new THREE.PointLight(0x00ff88, 3.2, 500, 1.8);
        palmPointLight.position.set(0, 10, 0);
        handGroup.add(palmPointLight);
        // Thumb (Curves on the left flank, in Layer 1)
        const thumbGroup = new THREE.Group();
        thumbGroup.position.set(-110, -35, -20);
        thumbGroup.rotation.set(-0.25, 0.45, -0.65);
        handGroup.add(thumbGroup);
        const thumbSeg1 = new THREE.Mesh(new THREE.BoxGeometry(26, 60, 28), matTitanium);
        thumbSeg1.position.set(0, 25, 0);
        thumbGroup.add(thumbSeg1);
        const thumbSeg2 = new THREE.Mesh(new THREE.BoxGeometry(22, 55, 24), matTitanium);
        thumbSeg2.position.set(0, 75, 12);
        thumbSeg2.rotation.x = 0.35;
        thumbGroup.add(thumbSeg2);
        const thumbClaw = new THREE.Mesh(new THREE.ConeGeometry(12, 40, 4), matGoldTrim);
        thumbClaw.position.set(0, 115, 28);
        thumbClaw.rotation.set(0.7, 0, 0);
        thumbGroup.add(thumbClaw);
        // --- 4. ARTICULATED FRONT FINGERS (Layer 2: In Front of Sphere) ---
        // The front fingers curl upward and wrap over the bottom and front rim of the timeline sphere!
        const frontFingersGroup = new THREE.Group();
        frontFingersGroup.layers.set(2);
        doomRig.add(frontFingersGroup);
        const fingerConfigs = [
            { name: 'index', x: -65, z: 75, len1: 68, len2: 52, len3: 36, rotX: 0.38, rotY: -0.15, rotZ: 0.22, curl: 0.42 },
            { name: 'middle', x: -20, z: 92, len1: 76, len2: 58, len3: 38, rotX: 0.45, rotY: -0.02, rotZ: 0.05, curl: 0.48 },
            { name: 'ring', x: 28, z: 86, len1: 72, len2: 54, len3: 36, rotX: 0.42, rotY: 0.12, rotZ: -0.12, curl: 0.45 },
            { name: 'pinky', x: 74, z: 66, len1: 58, len2: 44, len3: 32, rotX: 0.35, rotY: 0.25, rotZ: -0.28, curl: 0.38 },
        ];
        const fingerBoneRefs = [];
        fingerConfigs.forEach((cfg) => {
            const root = new THREE.Group();
            root.position.set(cfg.x, -32, cfg.z);
            root.rotation.set(cfg.rotX, cfg.rotY, cfg.rotZ);
            root.layers.set(2);
            frontFingersGroup.add(root);
            // Knuckle joint stud (Gold accent)
            const knuckle = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 24, 8), matGoldTrim);
            knuckle.rotation.z = Math.PI / 2;
            knuckle.layers.set(2);
            root.add(knuckle);
            // Proximal phalange (Beveled titanium armor plate)
            const p1 = new THREE.Mesh(new THREE.BoxGeometry(22, cfg.len1, 22), matTitanium);
            p1.position.set(0, cfg.len1 / 2, 0);
            p1.layers.set(2);
            root.add(p1);
            // Intermediate phalange
            const mid = new THREE.Group();
            mid.position.set(0, cfg.len1, 0);
            mid.rotation.x = -cfg.curl;
            mid.layers.set(2);
            root.add(mid);
            const midKnuckle = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 20, 8), matGoldTrim);
            midKnuckle.rotation.z = Math.PI / 2;
            midKnuckle.layers.set(2);
            mid.add(midKnuckle);
            const p2 = new THREE.Mesh(new THREE.BoxGeometry(19, cfg.len2, 19), matTitanium);
            p2.position.set(0, cfg.len2 / 2, 0);
            p2.layers.set(2);
            mid.add(p2);
            // Distal phalange with menacing Latverian claw
            const tip = new THREE.Group();
            tip.position.set(0, cfg.len2, 0);
            tip.rotation.x = -cfg.curl * 1.25;
            tip.layers.set(2);
            mid.add(tip);
            const p3 = new THREE.Mesh(new THREE.BoxGeometry(16, cfg.len3 * 0.7, 16), matTitanium);
            p3.position.set(0, (cfg.len3 * 0.7) / 2, 0);
            p3.layers.set(2);
            tip.add(p3);
            const claw = new THREE.Mesh(new THREE.ConeGeometry(8, cfg.len3 * 0.6, 4), matGoldTrim);
            claw.position.set(0, cfg.len3 * 0.7 + (cfg.len3 * 0.6) / 2, 0);
            claw.rotation.y = Math.PI / 4;
            claw.layers.set(2);
            tip.add(claw);
            // Claw tip emerald conduit node
            const emitter = new THREE.Mesh(new THREE.SphereGeometry(3.5, 6, 6), matEmeraldCore);
            emitter.position.set(0, cfg.len3 * 0.7, 8);
            emitter.layers.set(2);
            tip.add(emitter);
            fingerBoneRefs.push({
                root,
                mid,
                tip,
                baseRotX: cfg.rotX,
                baseCurl: cfg.curl,
            });
        });
        // Make sure all children of Layer 1 have layers = 1, and Layer 2 have layers = 2
        bodyGroup.traverse((obj) => obj.layers.set(1));
        gauntletArmGroup.traverse((obj) => obj.layers.set(1));
        handGroup.traverse((obj) => obj.layers.set(1));
        frontFingersGroup.traverse((obj) => obj.layers.set(2));
        // Enable layer masks on cameras
        const backCamera = camera.clone();
        backCamera.layers.disableAll();
        backCamera.layers.enable(1);
        const frontCamera = camera.clone();
        frontCamera.layers.disableAll();
        frontCamera.layers.enable(2);
        // Initial positioning state
        let targetPalmWorldY = -120;
        let sphereRadiusWorld = 220;
        let targetModelScale = 1;
        function resize(vw, vh, sphereCenterY, sphereDiameter) {
            const aspect = vw / vh;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
            backCamera.aspect = aspect;
            backCamera.updateProjectionMatrix();
            frontCamera.aspect = aspect;
            frontCamera.updateProjectionMatrix();
            backRenderer.setSize(vw, vh);
            frontRenderer.setSize(vw, vh);
            // Compute 3D world coordinate of timeline sphere center
            const fovRad = THREE.MathUtils.degToRad(camera.fov);
            const visibleHeightAtDist = 2 * Math.tan(fovRad / 2) * camera.position.z;
            const unitsPerPixel = visibleHeightAtDist / vh;
            const dyPixels = vh / 2 - sphereCenterY;
            const sphereWorldY = dyPixels * unitsPerPixel;
            sphereRadiusWorld = (sphereDiameter / 2) * unitsPerPixel;
            // Scale model proportionally to the sphere diameter
            // Base diameter in 3D units was ~440 units
            targetModelScale = Math.max(0.65, Math.min(1.45, (sphereRadiusWorld * 2) / 410));
            doomRig.scale.set(targetModelScale, targetModelScale, targetModelScale);
            // Position palm right beneath the sphere bottom
            targetPalmWorldY = (sphereWorldY - sphereRadiusWorld * 0.94) / targetModelScale;
            handGroup.position.set(0, targetPalmWorldY, 0);
            frontFingersGroup.position.set(0, targetPalmWorldY, 0);
            // Arm and wrist extend downward
            gauntletArmGroup.position.set(0, targetPalmWorldY, 0);
            // Head and upper body loom behind the sphere
            const headLoomY = (sphereWorldY + sphereRadiusWorld * 0.72) / targetModelScale;
            bodyGroup.position.set(0, headLoomY, 0);
        }
        // Interactive mouse rotation & animation loop
        let curRotX = 0;
        let curRotY = 0;
        let curRotZ = 0;
        let curHeadRotX = 0;
        let curHeadRotY = 0;
        let globalTime = 0;
        function update(sx, sy, isDragging, scrollP, delta, pointerNormX, pointerNormY) {
            globalTime += delta;
            // Subtle organic breathing motion
            const breath = Math.sin(globalTime * 1.6) * 0.015;
            const energyPulse = Math.sin(globalTime * 3.8);
            // Target rotations derived from timeline sphere rotation angles (sx = pitch, sy = yaw)
            const radPitch = THREE.MathUtils.degToRad(sx);
            const radYaw = THREE.MathUtils.degToRad(sy);
            // Hand banks and tilts to support the rotating timeline sphere
            const targetRotY = radYaw * 0.32 + pointerNormX * 0.12;
            const targetRotX = radPitch * 0.38 - pointerNormY * 0.15 + breath;
            const targetRotZ = -radYaw * 0.10 + pointerNormX * 0.08;
            curRotX = THREE.MathUtils.damp(curRotX, targetRotX, 9, delta);
            curRotY = THREE.MathUtils.damp(curRotY, targetRotY, 9, delta);
            curRotZ = THREE.MathUtils.damp(curRotZ, targetRotZ, 9, delta);
            handGroup.rotation.set(curRotX, curRotY, curRotZ);
            frontFingersGroup.rotation.set(curRotX, curRotY, curRotZ);
            // Arm responds with slight lagged kinematic leverage
            gauntletArmGroup.rotation.y = THREE.MathUtils.damp(gauntletArmGroup.rotation.y, curRotY * 0.65, 7, delta);
            gauntletArmGroup.rotation.z = THREE.MathUtils.damp(gauntletArmGroup.rotation.z, curRotZ * 0.65, 7, delta);
            gauntletArmGroup.rotation.x = THREE.MathUtils.damp(gauntletArmGroup.rotation.x, curRotX * 0.5, 7, delta);
            // Head tracks the sphere rotation and mouse cursor
            const targetHeadY = radYaw * 0.14 + pointerNormX * 0.22;
            const targetHeadX = radPitch * 0.12 - pointerNormY * 0.16;
            curHeadRotX = THREE.MathUtils.damp(curHeadRotX, targetHeadX, 6, delta);
            curHeadRotY = THREE.MathUtils.damp(curHeadRotY, targetHeadY, 6, delta);
            headGroup.rotation.set(curHeadRotX, curHeadRotY, 0);
            // Fingers flex dynamically when dragging / rotating
            const flexBonus = (isDragging ? 0.18 : 0) + Math.abs(curRotX) * 0.15;
            fingerBoneRefs.forEach((f, idx) => {
                const fingerWave = Math.sin(globalTime * 2.2 + idx * 0.6) * 0.04;
                f.mid.rotation.x = THREE.MathUtils.damp(f.mid.rotation.x, -(f.baseCurl + flexBonus + fingerWave), 10, delta);
                f.tip.rotation.x = THREE.MathUtils.damp(f.tip.rotation.x, -(f.baseCurl * 1.25 + flexBonus * 1.3), 10, delta);
            });
            // Palm core and arcane rings animate
            arcaneRing1.rotation.z += delta * 1.4;
            palmPointLight.intensity = 2.4 + energyPulse * 0.8 + (isDragging ? 1.4 : 0);
            matEmeraldCore.emissiveIntensity = 2.2 + energyPulse * 0.9 + (isDragging ? 1.0 : 0);
            // Fade model during deep scroll if requested
            const opacity = Math.max(0.05, 1 - scrollP * 0.65);
            backRenderer.domElement.style.opacity = opacity.toFixed(3);
            frontRenderer.domElement.style.opacity = opacity.toFixed(3);
            // Render both synced layers
            backRenderer.render(scene, backCamera);
            frontRenderer.render(scene, frontCamera);
        }
        function dispose() {
            try {
                normalMap.dispose();
                capeTexture.dispose();
                backRenderer.dispose();
                frontRenderer.dispose();
                if (backRenderer.domElement.parentElement) {
                    backRenderer.domElement.parentElement.removeChild(backRenderer.domElement);
                }
                if (frontRenderer.domElement.parentElement) {
                    frontRenderer.domElement.parentElement.removeChild(frontRenderer.domElement);
                }
            }
            catch (err) { }
        }
        return {
            update,
            resize,
            dispose,
        };
    }
    catch (err) {
        console.error('Failed to initialize 3D Doctor Doom model:', err);
        return null;
    }
}