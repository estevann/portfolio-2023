import * as THREE from 'three'
import Experience from '../Experience'

export default class lights
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.setModel()
    }

    setModel()
    {
        // Models
        this.lightsModel = {}

        this.lightsModel.group = this.resources.items.lights.scene
        this.scene.add(this.lightsModel.group)

        // Materials
        this.etagereDroite = this.lightsModel.group.getObjectByName('emissiveEtagereDroite')
        this.etagereGauche = this.lightsModel.group.getObjectByName('emissiveEtagereGauche')
        this.fenetre = this.lightsModel.group.getObjectByName('emissiveFenetre')

        this.etagereDroite.material = new THREE.MeshBasicMaterial({color: 'white'})
        this.etagereGauche.material = new THREE.MeshBasicMaterial({color: 'white'})
        this.fenetre.material = new THREE.MeshBasicMaterial({color: '#FF5E19'})
        
    }
}