/**
 * 3D Particle System for Hero Section
 * Creates an interactive particle network using Three.js
 * Particles respond to mouse movement and create connecting lines
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        particleCount: 100,
        particleSize: 2,
        particleColor: 0x6366f1,
        lineColor: 0x818cf8,
        lineOpacity: 0.3,
        connectionDistance: 150,
        particleSpeed: 0.5,
        mouseInfluence: 50,
        animationSpeed: 0.001
    };

    // Scene setup
    let scene, camera, renderer, particles, particleGeometry, particleMaterial;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    /**
     * Initialize the 3D particle system
     */
    function init() {
        const container = document.getElementById('particlesContainer');
        if (!container) return;

        // Create scene
        scene = new THREE.Scene();

        // Setup camera
        camera = new THREE.PerspectiveCamera(
            75,
            container.offsetWidth / container.offsetHeight,
            1,
            10000
        );
        camera.position.z = 500;

        // Create renderer
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Create particles
        createParticles();

        // Event listeners
        document.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);

        // Start animation
        animate();
    }

    /**
     * Create particle system
     */
    function createParticles() {
        particleGeometry = new THREE.BufferGeometry();
        const positions = [];
        const velocities = [];

        // Generate random particle positions and velocities
        for (let i = 0; i < CONFIG.particleCount; i++) {
            const x = Math.random() * 2000 - 1000;
            const y = Math.random() * 2000 - 1000;
            const z = Math.random() * 2000 - 1000;

            positions.push(x, y, z);

            // Random velocities for particle movement
            velocities.push(
                (Math.random() - 0.5) * CONFIG.particleSpeed,
                (Math.random() - 0.5) * CONFIG.particleSpeed,
                (Math.random() - 0.5) * CONFIG.particleSpeed
            );
        }

        particleGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3)
        );

        // Store velocities for animation
        particleGeometry.userData.velocities = velocities;

        // Create particle material
        particleMaterial = new THREE.PointsMaterial({
            color: CONFIG.particleColor,
            size: CONFIG.particleSize,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        // Create particle system
        particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Create lines between nearby particles
        createConnections();
    }

    /**
     * Create lines connecting nearby particles
     */
    function createConnections() {
        const positions = particleGeometry.attributes.position.array;
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = [];

        // Check distance between all particle pairs
        for (let i = 0; i < CONFIG.particleCount; i++) {
            for (let j = i + 1; j < CONFIG.particleCount; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                // Create line if particles are close enough
                if (distance < CONFIG.connectionDistance) {
                    linePositions.push(
                        positions[i * 3],
                        positions[i * 3 + 1],
                        positions[i * 3 + 2],
                        positions[j * 3],
                        positions[j * 3 + 1],
                        positions[j * 3 + 2]
                    );
                }
            }
        }

        lineGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(linePositions, 3)
        );

        const lineMaterial = new THREE.LineBasicMaterial({
            color: CONFIG.lineColor,
            transparent: true,
            opacity: CONFIG.lineOpacity,
            blending: THREE.AdditiveBlending
        });

        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        // Store for updates
        scene.userData.lines = lines;
    }

    /**
     * Update particle connections
     */
    function updateConnections() {
        const positions = particleGeometry.attributes.position.array;
        const linePositions = [];

        for (let i = 0; i < CONFIG.particleCount; i++) {
            for (let j = i + 1; j < CONFIG.particleCount; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < CONFIG.connectionDistance) {
                    linePositions.push(
                        positions[i * 3],
                        positions[i * 3 + 1],
                        positions[i * 3 + 2],
                        positions[j * 3],
                        positions[j * 3 + 1],
                        positions[j * 3 + 2]
                    );
                }
            }
        }

        if (scene.userData.lines) {
            scene.userData.lines.geometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(linePositions, 3)
            );
            scene.userData.lines.geometry.attributes.position.needsUpdate = true;
        }
    }

    /**
     * Animation loop
     */
    function animate() {
        requestAnimationFrame(animate);

        // Update particle positions
        updateParticles();

        // Update connections between particles
        if (Math.random() > 0.95) { // Update connections less frequently for performance
            updateConnections();
        }

        // Rotate particle system
        particles.rotation.y += CONFIG.animationSpeed;

        // Camera follows mouse with smooth easing
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    /**
     * Update particle positions based on velocities
     */
    function updateParticles() {
        const positions = particleGeometry.attributes.position.array;
        const velocities = particleGeometry.userData.velocities;

        for (let i = 0; i < CONFIG.particleCount; i++) {
            const idx = i * 3;

            // Update positions
            positions[idx] += velocities[idx];
            positions[idx + 1] += velocities[idx + 1];
            positions[idx + 2] += velocities[idx + 2];

            // Boundary check - wrap around
            if (Math.abs(positions[idx]) > 1000) {
                positions[idx] = -positions[idx];
            }
            if (Math.abs(positions[idx + 1]) > 1000) {
                positions[idx + 1] = -positions[idx + 1];
            }
            if (Math.abs(positions[idx + 2]) > 1000) {
                positions[idx + 2] = -positions[idx + 2];
            }
        }

        particleGeometry.attributes.position.needsUpdate = true;
    }

    /**
     * Mouse move handler
     */
    function onMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * CONFIG.mouseInfluence / windowHalfX;
        mouseY = (event.clientY - windowHalfY) * CONFIG.mouseInfluence / windowHalfY;
    }

    /**
     * Window resize handler
     */
    function onWindowResize() {
        const container = document.getElementById('particlesContainer');
        if (!container) return;

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(container.offsetWidth, container.offsetHeight);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
