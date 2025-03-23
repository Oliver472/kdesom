import React, { useEffect } from 'react'
import {useAppDispatch, useAppSelector } from './hooks/hooks'
import {HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/login/Login';
import Game from './components/Game';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {app} from './firebase/firebaseConfig'


function App() {
    const isGameActive = useAppSelector((state) => state.gameState.gameActive)
    const dispatch = useAppDispatch()
    const auth = getAuth(app);
    const [isUserSignedIn, setIsUserSignedIn] = React.useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUserSignedIn(true);
            } else {
                setIsUserSignedIn(false);
            }
        });
        return onAuthStateChanged
    }, []);

    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    {isUserSignedIn ? (
                        <>
                            <Route path="/game" element={<Game/>}/>
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Login/>}/>
                        </>
                    ) }
                    <Route path="*" element={<Login/>}/>
                </Routes>
            </HashRouter>
        </div>

    )
}

export default App
