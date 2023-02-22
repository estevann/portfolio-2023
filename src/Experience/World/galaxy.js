import * as THREE from 'three'
import Experience from '../Experience'
import galaxyVertexShader from '../Shaders/Galaxy/galaxy.vs.glsl'
import galaxyFragmentShader from '../Shaders/Galaxy/galaxy.fs.glsl'

export default class galaxy
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setModel()
        this.setStencilBuffer()
    }

    setModel()
    {
        // Galaxy

        this.parameters = {}
        this.parameters.count = 40000
        this.parameters.size = 48.5
        this.parameters.radius = 6
        this.parameters.branches = 7
        this.parameters.spin = 0.1
        this.parameters.randomness = 0.92
        this.parameters.randomnessPower = 4
        this.parameters.insideColor = '#FF5E19'
        this.parameters.outsideColor = '#5C18D4'

        this.geometry = null
        this.material = null
        this.points = null

        const generateGalaxy = () =>
        {
            if(this.points !== null)
            {
                this.geometry.dispose()
                this.material.dispose()
                this.scene.remove(this.points)
            }

            /**
             * Geometry
             */
            this.geometry = new THREE.BufferGeometry()

            const positions = new Float32Array(this.parameters.count * 3)
            const colors = new Float32Array(this.parameters.count * 3)
            const scales = new Float32Array(this.parameters.count * 1)
            const randomness = new Float32Array(this.parameters.count * 3)

            const insideColor = new THREE.Color(this.parameters.insideColor)
            const outsideColor = new THREE.Color(this.parameters.outsideColor)

            for(let i = 0; i < this.parameters.count; i++)
            {
                const i3 = i * 3

                // Position
                const radius = Math.random() * this.parameters.radius

                const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2

                positions[i3    ] = Math.cos(branchAngle) * radius
                positions[i3 + 1] = 0
                positions[i3 + 2] = Math.sin(branchAngle) * radius

                // Randomness

                const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
                const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
                const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius

                randomness[i3 + 0] = randomX    
                randomness[i3 + 1] = randomY
                randomness[i3 + 2] = randomZ    

                // Color
                const mixedColor = insideColor.clone()
                mixedColor.lerp(outsideColor, radius / this.parameters.radius)

                colors[i3    ] = mixedColor.r
                colors[i3 + 1] = mixedColor.g
                colors[i3 + 2] = mixedColor.b

                // Scales

                scales[i] = Math.random()
            }

            this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
            this.geometry.setAttribute('aScale', new THREE.BufferAttribute(colors, 1))
            this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))

            /**
             * Material
             */
            this.material = new THREE.ShaderMaterial({
                vertexShader: galaxyVertexShader,
                fragmentShader: galaxyFragmentShader,
                uniforms: {
                    uTime: {value: 0},
                    uSize: {value: 60}
                },
                side: THREE.DoubleSide,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true
            })

            /**
             * Points
             */
            this.points = new THREE.Points(this.geometry, this.material)
            this.points.position.set(-1.5, 3.5, -15.0)
            this.points.rotation.x = 1

            this.scene.add(this.points)
        }
        
        generateGalaxy()
    }

    setStencilBuffer()
    {
        this.stencilRef = 1
        this.stencilBlockRef = 0

        this.stencilGeometry = new THREE.BoxGeometry(13, 8.2, 20)
        this.stencilMaterial = new THREE.MeshStandardMaterial({
            wireframe: true
        })
        this.stencilBlockMaterial = new THREE.MeshStandardMaterial({
            side: THREE.FrontSide
        })
        this.stencilMesh = new THREE.Mesh(this.stencilGeometry, this.stencilMaterial)
        this.stencilMesh.position.set(-1.5, 3.5, -15)
        this.stencilMaterial.depthWrite = false
        this.stencilMaterial.stencilWrite = true
        this.stencilMaterial.stencilRef = this.stencilRef
        this.stencilMaterial.colorWrite = false
        this.stencilMaterial.stencilFunc = THREE.AlwaysStencilFunc
        this.stencilMaterial.stencilZPass = THREE.ReplaceStencilOp
        this.scene.add(this.stencilMesh)

        this.stencilBlock = new THREE.PlaneGeometry(18, 12)
        this.stencilBlockUp = new THREE.Mesh(this.stencilBlock, this.stencilBlockMaterial)
        this.stencilBlockUp.position.set(0, 11.8, -5)
        this.stencilBlockMaterial.colorWrite = false
        this.stencilBlockMaterial.stencilRef = this.stencilBlockRef
        this.stencilBlockMaterial.stencilZPass = THREE.IncrementWrapStencilOp;

        this.stencilBlock = new THREE.PlaneGeometry(18, 18)
        this.stencilBlockRight = new THREE.Mesh(this.stencilBlock, this.stencilBlockMaterial)
        this.stencilBlockRight.position.set(10, 6, -5)

        this.scene.add(this.stencilBlockUp, this.stencilBlockRight)
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.0001
        // this.points.material.stencilWrite = true
        this.points.material.stencilRef = this.stencilRef
        this.points.material.stencilFunc = THREE.EqualStencilFunc
        this.points.material.autoClearColor = false
    }
}