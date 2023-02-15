import Experience from "../Experience";
import * as THREE from 'three'

export default class Screens
{
    constructor(_mesh, _sourcePath)
    {
        this.Experience = new Experience()
        this.resources = this.Experience.resources
        this.time = this.Experience.time
        this.sizes = this.Experience.sizes
        this.scene = this.Experience.scene
        this.room = this.Experience.room

        this.mesh = _mesh
        this.sourcePath = _sourcePath

        this.setModel()

    }

    setModel()
    {
        this.model = {}

        this.model.element = document.createElement("video")
        this.model.element.muted = true
        this.model.element.loop = true
        this.model.element.controls = true
        this.model.element.playsInline = true
        this.model.element.autoplay = true
        this.model.element.src = this.sourcePath
        this.model.element.play()

        this.model.texture = new THREE.VideoTexture(this.model.element)
        this.model.texture.encoding = THREE.sRGBEncoding

        this.model.material = new THREE.MeshBasicMaterial({
            map: this.model.texture
        })

        
        this.model.mesh = this.mesh
        this.model.mesh.material = this.model.material
    }

    update()
    {

    }
}
