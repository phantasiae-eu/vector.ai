import { Cat } from '../data/cats.model'
import { Links } from '../cats/cats.model'

export interface CatProps {
    index: number
    cat: Cat
    links: Links[]
}
