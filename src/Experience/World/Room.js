import * as THREE from 'three'
import Experience from '../Experience.js'
import HautChaise from './hautChaise.js'
import Poussin from './Poussin.js'
import CoffeeSteam from './CoffeeSteam.js'
import lights from './lights.js'
import galaxy from './galaxy.js'
import Controls from '../World/Controls.js'
import Screens from './Screens.js'

export default class Room
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('ready', () =>
        {
            // Setup
            this.setRoom()
            this.setHautChaise()
            this.setPoussin()
            this.setCoffeeSteam()
            this.setlights()
            this.setGalaxy()
            this.setScreens()
            this.controls = new Controls()
        })
    }

    setRoom()
    {
        this.roomModel = {}
        this.roomModel.group = this.resources.items.room.scene
        this.roomModel.model = this.resources.items.room.scene
        this.roomModel.texture = this.resources.items.baked
        this.roomModel.texture.encoding = THREE.sRGBEncoding
        this.roomModel.texture.flipY = false
        this.roomModel.material = new THREE.MeshBasicMaterial({
            map: this.roomModel.texture,
            side: THREE.DoubleSide,
            depthTest: true,
            depthWrite: true,
            transparent: true
        })

        this.roomModel.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.material = this.roomModel.material
            }
        })
        this.scene.add(this.roomModel.model)
    }

    setHautChaise()
    {
        this.HautChaise = new HautChaise()
    }

    setPoussin()
    {
        this.Poussin = new Poussin()
    }

    setCoffeeSteam()
    {
        this.CoffeeSteam = new CoffeeSteam()
    }

    setlights()
    {
        this.lights = new lights()
    }

    setGalaxy()
    {
        this.galaxy = new galaxy()
    }

    setScreens()
    {
        this.leftPcScreen = new Screens(
            this.roomModel.group.getObjectByName('screenGauche'),
            '/assets/blender.mp4'
        )
        this.rightPcScreen = new Screens(
            this.roomModel.group.getObjectByName('screenDroite'),
            '/assets/webflow.mp4'
        )
        this.television = new Screens(
            this.roomModel.group.getObjectByName('screenTele'),
            '/assets/repos.mp4'
        )
    }

    update()
    {
        if(this.HautChaise)
        this.HautChaise.update()

        if(this.Poussin)
        this.Poussin.update()

        if(this.CoffeeSteam)
        this.CoffeeSteam.update()

        if(this.galaxy)
        this.galaxy.update()

        if(this.screens)
        this.screens.update()

        if(this.controls)
        this.controls.update()
    }
}