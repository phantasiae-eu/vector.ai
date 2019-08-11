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
                onClick={(): void => setLightbox(true)}
                className="cat_wrap"
                key={props.index.toString()}
            >
                <p className="title">{props.cat.title}</p>
                {props.links[props.index] ? (
                    <iframe
                        src={props.links[props.index]}
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
                    mainSrc={
                        'https://media0.giphy.com/media/CjmvTCZf2U3p09Cn0h/480w_s.jpg?cid=6c0483a8187fdbd0ac0de3c85acb4d59133199a970b60495&rid=480w_s.jpg'
                    }
                    onCloseRequest={(): void => setLightbox(false)}
                />
            )}
        </React.Fragment>
    )
}

export default Cat
