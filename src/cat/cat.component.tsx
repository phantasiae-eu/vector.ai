import React, { ReactElement, useState } from 'react'
import { CatProps } from './cat.model'
import { BallBeat } from 'react-pure-loaders'
import './cat.css'
import Lightbox from 'lightbox-react'

const Cat: React.FC<CatProps> = (props: CatProps): ReactElement => {
    const [lightbox, setLightbox] = useState(false)
    return (
        <React.Fragment>
            <div
                onDoubleClick={(): void => setLightbox(true)}
                className="cat_wrap"
                key={props.index.toString()}
            >
                <p className="title">{props.cat.title}</p>
                {props.links[props.index].gif ? (
                    <iframe
                        src={props.links[props.index].gif}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        sandbox={'allow-scripts allow-same-origin'}
                        title={`frame - ${props.index}`}
                    />
                ) : (
                    <BallBeat color={'red'} loading={true} />
                )}
                <div className="overlay" />
            </div>
            {lightbox && (
                <Lightbox
                    mainSrc={props.links[props.index].jpeg}
                    onCloseRequest={(): void => setLightbox(false)}
                />
            )}
        </React.Fragment>
    )
}

export default Cat
