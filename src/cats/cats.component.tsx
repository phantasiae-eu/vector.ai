import React, { ReactElement, useEffect, useState } from 'react'
import catsData from '../data/cats'
import axios from 'axios'
import { key } from '../secretConfig'
import GridLayout from 'react-grid-layout'
import { Layout } from './cats.model'
import { Cat } from '../data/cats.model'
import CatBox from '../cat/cat.component'

const Cats: React.FC = (): ReactElement => {
    const [links, setLinks] = useState(catsData.map((): string => ''))
    useEffect((): void => {
        const fetchData = async (): Promise<string[]> => {
            const response = await axios(
                `https://api.giphy.com/v1/gifs/search?q=cat&limit=5&api_key=${key}`
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return response.data.data.map((data: any): string[] => {
                console.log(Object.values(data.images).pop())
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
