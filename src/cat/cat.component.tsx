import React, { ReactElement } from 'react'
import { CatProps } from './cat.model'
import { BallBeat } from 'react-pure-loaders'
import './cat.css'

const Cat: React.FC<CatProps> = (props: CatProps): ReactElement => (
    <div
        onClick={(): void => console.log('mensola')}
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
)

export default Cat
