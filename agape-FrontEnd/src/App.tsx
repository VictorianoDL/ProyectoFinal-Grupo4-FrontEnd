import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { BrowserRouter } from 'react-router-dom'
import Main from './Components/Main/Main'

import { UserProvider } from "./Context/UserContext";

function App() {

    return (
        <>
            <UserProvider>
                <BrowserRouter>
                    <Header></Header>
                    <Main></Main>
                    <Footer></Footer>
                </BrowserRouter> 
            </UserProvider>
        </>
    )
}

export default App
