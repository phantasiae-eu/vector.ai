import React, { ReactElement } from 'react'
import './App.css'
import Cats from '../src/cats/cats.component'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const App: React.FC = (): ReactElement => {
    return (
        <div>
            <Cats />
        </div>
    )
}

export default App
