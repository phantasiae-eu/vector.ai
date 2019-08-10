import React, { ReactElement, useEffect, useState } from 'react'
import catsData from '../data/cats'
import axios from 'axios'
import { key } from '../secretConfig'
import './styles/react-grid-layout.css'
import './styles/react-resizable.css'
import GridLayout from 'react-grid-layout'
import { Layout } from './cats.model'
import { Cat } from '../data/cats.model'
import { BallBeat } from 'react-pure-loaders'

const Cats: React.FC = (): ReactElement => {
    const [links, setLinks] = useState(catsData.map((): string => ''))
    useEffect((): void => {
        const fetchData = async (): Promise<string[]> => {
            const response = await axios(
                `https://api.giphy.com/v1/gifs/search?q=cat&limit=5&api_key=${key}`
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return response.data.data.map((data: any): string[] => {
                return data.embed_url
            })
        }
        fetchData().then((data: string[]): void => setLinks(data))
    }, [])
    const layout: Layout[] = catsData.map(
        (cat: Cat, index: number): Layout => {
            const position: number = index - Math.floor(index / 3) * 3
            return {
                i: index.toString(),
                x: position,
                y: 0,
                w: 1,
                h: 1,
            }
        }
    )
    return (
        <div style={{ width: '100%' }}>
            <GridLayout
                className="layout"
                layout={layout}
                cols={3}
                width={600}
                isResizable={false}
                rowHeight={150}
            >
                {catsData.map(
                    (cat: Cat, index: number): ReactElement => (
                        <div
                            onClick={(): void => console.log('mensola')}
                            style={{
                                backgroundColor: 'transparent',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: '1px',
                                borderColor: 'grey',
                                borderStyle: 'solid',
                            }}
                            key={index.toString()}
                        >
                            <p
                                style={{
                                    margin: '0',
                                    position: 'absolute',
                                    color: 'white',
                                    top: '0',
                                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                    width: '100%',
                                }}
                            >
                                {cat.title}
                            </p>
                            {links[index] ? (
                                <iframe
                                    src={links[index]}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    sandbox={'allow-scripts allow-same-origin'}
                                ></iframe>
                            ) : (
                                <BallBeat color={'#123abc'} loading={true} />
                            )}
                            <div
                                style={{
                                    zIndex: 1,
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '187px',
                                    height: '150px',
                                    backgroundColor: 'transparent',
                                    top: '75px',
                                }}
                            ></div>
                        </div>
                    )
                )}
            </GridLayout>
        </div>
    )
}

export default Cats
