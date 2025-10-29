import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { BrowserRouter } from 'react-router-dom'
import Main from './Components/Main/Main'

import { UserProvider } from "./Context/UserContext";
import { AuthProvider } from './Context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

    return (
        <>
            <GoogleOAuthProvider clientId="29401246921-5uaog6gt89m2dpeadg8absqcuem7n5v6.apps.googleusercontent.com">
                <UserProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <Header></Header>
                            <Main></Main>
                            <Footer></Footer>
                        </BrowserRouter> 
                    </AuthProvider>
                </UserProvider>
            </GoogleOAuthProvider>
        </>
    )
}

export default App
