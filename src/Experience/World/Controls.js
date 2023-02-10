import * as THREE from 'three'
import Experience from "../Experience"
import {gsap} from 'gsap'
import loaderVertexShader from '../Shaders/Loader/loader.vs.glsl'
import loaderFragmentShader from '../Shaders/Loader/loader.fs.glsl'



export default class Controls
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera


        this.replacementCurve = new THREE.Vector3(0, 0, 0)
        this.lookAt = new THREE.Vector3(0, 0, 0)
        this.lookAtEnding = new THREE.Vector3(-2, 3, 0)
        this.progress = 0
        gsap.utils.clamp(0, 0.99, this.progress)

        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()

        this.fade()
        this.setPath()
        this.mouseClick()
    }

    fade()
    {
        // this.overlayGeometry = new THREE.PlaneGeometry(this.sizes.width, this.sizes.height)
        // this.overlayMaterial = new THREE.ShaderMaterial({
        //     vertexShader: loaderVertexShader,
        //     fragmentShader: loaderFragmentShader
        // })
        // this.overlay = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)
        // this.scene.add(this.overlay)
    }

    setPath()
    {


    // Créer chemin

    this.pathCamera = new THREE.CatmullRomCurve3( [
        new THREE.Vector3( -1.5, 3.5, -26 ),
        new THREE.Vector3( -1.5, 3.5, -18 ),
        // new THREE.Vector3( -1.5, 4.5, -15 ),
        // new THREE.Vector3( 0, 2.5, -15 ),
        new THREE.Vector3( -1, 3.5, -2 ),
        // new THREE.Vector3( , 4.2, -3.2 ),
        new THREE.Vector3( 2.4, 3.5, 9 )
        ] );

    this.pathCamera.visible = false
    this.pathPoints = this.pathCamera.getPoints( 50 );
    this.geometry = new THREE.BufferGeometry().setFromPoints( this.pathPoints );
    this.pathMaterial = new THREE.LineBasicMaterial( { transparent: true} );
    this.pathObject = new THREE.Line( this.geometry, this.pathMaterial );
    // this.scene.add(this.pathObject)

    }

    mouseClick()
    {

        // this.isOrbitControlsEnabled = false;

        // // Écoutez les événements de clic sur la scène 3D
        // this.experience.room.roomModel.model.addEventListener('click', function () {
        // // Activez les OrbitControls
        // this.isOrbitControlsEnabled = true;
        // // Défini le curseur en mode grab
        // document.body.style.cursor = 'grab';
        // });

        // // // Écoutez les événements de clic en dehors de la scène 3D
        // // document.addEventListener('click', function (event) {
        // // // Si l'utilisateur a cliqué en dehors de la scène 3D
        // // if (!this.experience.room.roomModel.model.contains(event.target)) {
        // //     // Désactivez les OrbitControls
        // //     this.isOrbitControlsEnabled = false;
        // //     // Défini le curseur en mode default
        // //     document.body.style.cursor = 'default';
        // // }
        // // });

        // // Écoutez les événements de survol sur la scène 3D
        // this.experience.room.roomModel.model.addEventListener('mouseover', function () {
        // // Défini le curseur en mode pointer
        // document.body.style.cursor = 'pointer';
        // });

        // // Écoutez les événements de survol en dehors de la scène 3D
        // this.experience.room.roomModel.model.addEventListener('mouseout', function () {
        // // Si les OrbitControls ne sont pas activés
        // if (!this.isOrbitControlsEnabled) {
        //     // Défini le curseur en mode default
        //     document.body.style.cursor = 'default';
        // }
        // });

    }

    update()
    {  

        if(this.progress < 0.02)
        {
            this.progress += 0.0007
            this.pathCamera.getPointAt(this.progress + 0.000001, this.replacementCurve)
            this.pathCamera.getPointAt(this.progress, this.lookAt)

            this.camera.instance.position.copy(this.replacementCurve)
            this.camera.instance.lookAt(this.lookAt)
            this.camera.controls.target.copy(this.lookAt)
            this.camera.controls.enabled = false

        } else if(this.progress >= 0.02 & this.progress < 0.18) {

            this.progress += 0.0025
            this.pathCamera.getPointAt(this.progress + 0.01, this.replacementCurve)
            this.pathCamera.getPointAt(this.progress, this.lookAt)

            this.camera.instance.position.copy(this.replacementCurve)
            this.camera.instance.lookAt(this.lookAt)
            this.camera.controls.target.copy(this.lookAt)
            this.camera.controls.enabled = false

        } else if(this.progress >= 0.18 & this.progress < 0.98) {

            this.progress += 0.007
            this.pathCamera.getPointAt(this.progress + 0.001, this.replacementCurve)
            this.pathCamera.getPointAt(this.progress, this.lookAt)

            this.camera.instance.position.copy(this.replacementCurve)
            this.camera.instance.lookAt(this.lookAt)
            this.camera.controls.target.copy(this.lookAt)
            this.camera.controls.enabled = false
            

        } else if(this.progress >= 0.98) {
            gsap.to(this.camera.controls.target, {x:0.4, y: 2.5, z: 2.5, duration: 4.5})
            this.camera.controls.enableZoom = false
            this.camera.controls.enabled = true
        }

        // this.raycaster.setFromCamera( this.pointer, this.camera.instance)
	    // this.intersects = this.raycaster.intersectObjects( this.experience.room.roomModel.model.children)

        // window.addEventListener('mousemove', (event) => {
        //     this.pointer.x = event.clientX / this.sizes.width - 0.5
        //     this.pointer.y = event.clientY / this.sizes.height - 0.5
        // })

        // if( this.intersects.length > 0 && this.progress >= 0.98 ) {
        //     window.addEventListener('click', (event) => {
        //         this.camera.controls.enableZoom = true
        //         gsap.to(this.camera.controls.target, {x:4.4, y: 0.5, z: 0.5, duration: 4.5})
        //     })
        // } else {

        // }

    }
}