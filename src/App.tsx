import React, { ReactElement } from 'react'
import './App.css'
import Cats from '../src/cats/cats.component'

const App: React.FC = (): ReactElement => {
    return (
        <div>
            <Cats />
        </div>
    )
}

export default App
