import { Particles } from 'react-tsparticles'
import { particlesConfig } from './particles-config/particles-config'


export const ParticleAnimation = () => {
    return (
        <>
            <Particles params={particlesConfig}/>
        </>
    )
}
