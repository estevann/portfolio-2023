import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        //Options
        this.sources = sources
        

        //Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.manager = new THREE.LoadingManager()

        this.manager.onStart = () => 
        {
            console.log('loading manager started');
        }

        this.manager.onProgress = (url, loaded, total) =>
        {
            console.log(`loading file ${url} + ${loaded} of ${total}`);
        }

        this.manager.onError = (url) =>
        {
            console.log(`error loading ${url}`);
        }

        this.manager.onLoad = () =>
        {
            console.log('loading complete');
        }


        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.manager)
        this.loaders.textureLoader = new THREE.TextureLoader(this.manager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.manager)
        this.dracoLoader = new DRACOLoader(this.manager);
        this.dracoLoader.setDecoderPath( 'draco/' );
        this.loaders.gltfLoader.setDRACOLoader( this.dracoLoader );



    }


    startLoading()
    {



        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }



            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }

            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }

        }
    }

    sourceLoaded(source, file)
    {


        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}