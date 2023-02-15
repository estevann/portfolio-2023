import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { gsap,ScrollTrigger } from "gsap/all"

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        this.setInstance()
        this.setOrbitControls()
        this.setCamera()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            45,
            this.sizes.width / this.sizes.height,
            0.1,    
            100
        )
        this.instance.position.set(-1.5, 3.5, -16)
        // this.instance.position.set(9.42, 10.7, 11.81)
        this.scene.add(this.instance)

        const gridSize = 20
        const divisions = 20
        const gridHelper = new THREE.GridHelper(gridSize, divisions)
        // this.scene.add(gridHelper)

        this.axisHelper = new THREE.AxesHelper(8)
        // this.scene.add(this.axisHelper)

        // // Debug

        // if(this.debug)
        // {
        // this.cameraFolder = this.debug.ui.addFolder('Camera')
        // this.cameraFolder.add(this.instance.position, 'x').min(0).max(20).step(1).name('cameraX')
        // this.cameraFolder.add(this.instance.position, 'y').min(0).max(20).step(1).name('cameraY')
        // this.cameraFolder.add(this.instance.position, 'z').min(0).max(20).step(1).name('cameraZ')
        // }


    }

    setCamera()
    {
        this.cameraTest = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100)
        this.cameraTest.position.set(-1.5, 3.5, -15)
        this.scene.add(this.cameraTest)

        this.cameraHelper = new THREE.CameraHelper(this.cameraTest)
        // this.scene.add(this.cameraHelper)

        // const timeline = gsap.timeline()
        // let animationFinished = false

        // timeline.to(this.instance.position, {
        //     x: -1.5,
        //     y: 2.5,
        //     z: -2.5,
        //     duration: 8,
        //     ease: "slow",
        //     onUpdate: () => {
        //         this.instance.lookAt(-1.5, 3.5, -18)
        //         this.controls.target = new THREE.Vector3(-1.5, 3, -18)
        //     }
        // })

        // .to(this.instance.position, {
        //     x: 9.42,
        //     y: 10.7,
        //     z: 11.81,
        //     duration: 2,
        //     ease: "slow",
        //     onUpdate: () => {
        //         this.instance.lookAt(-2, 2.5, 0)
        //         this.controls.target.set(-2, 2.5, -2)
        //     }
        // })

    }

    setOrbitControls()
    {
            this.controls = new OrbitControls(this.instance, this.canvas)
            this.controls.enableDamping = true
            this.controls.dampingFactor = 0.03
            this.controls.minAzimuthAngle = Math.PI * 0.005
            this.controls.maxAzimuthAngle = Math.PI * 0.5
            this.controls.minPolarAngle = Math.PI * 0.09
            this.controls.maxPolarAngle = Math.PI * 0.45
            this.controls.minDistance = 6
            this.controls.maxDistance = 43
            // this.controls.maxDistance = 55
            this.controls.enablePan = true
            // this.controls.enablePan = false
            this.controls.enableZoom = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
        this.cameraHelper.matrixWorldNeedsUpdate = true
        this.cameraHelper.position.copy(this.cameraTest.position)
        this.cameraHelper.rotation.copy(this.cameraTest.rotation)
        this.cameraHelper.update()
    }
}