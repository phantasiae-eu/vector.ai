import React, { ReactElement, useEffect, useState } from 'react'
import catsData from '../data/cats'
import axios, { AxiosResponse } from 'axios'
import { key } from '../secretConfig'
import GridLayout from 'react-grid-layout'
import { Layout, Links, PlaceHolder } from './cats.model'
import { Cat } from '../data/cats.model'
import CatBox from '../cat/cat.component'

const Cats: React.FC = (): ReactElement => {
    const [links, setLinks] = useState(
        catsData.map((): Links => ({ jpeg: '', gif: '' }))
    )
    useEffect((): void => {
        const fetchData = async (): Promise<Links[]> => {
            const response: AxiosResponse = await axios(
                `https://api.giphy.com/v1/gifs/search?q=cat&limit=5&api_key=${key}`
            )
            return response.data.data.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (data: any): Links => {
                    const jpegObj = Object.values(
                        data.images
                    ).pop() as PlaceHolder
                    return { jpeg: jpegObj.url, gif: data.embed_url }
                }
            )
        }
        fetchData().then((data: Links[]): void => setLinks(data))
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
            <h3 style={{ textIndent: '10px' }}>
                Double click the cat to open the Lightbox{' '}
            </h3>
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
                        <div key={index.toString()}>
                            <CatBox links={links} cat={cat} index={index} />
                        </div>
                    )
                )}
            </GridLayout>
        </div>
    )
}

export default Cats
