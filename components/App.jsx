import React from 'react';
import './app.less'
import { useDispatch, useSelector } from 'react-redux';
import Main from './main/Main';
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom';
import Card from './card/Card';
import Error from './main/Error';

const App = () => {
    const dispatch = useDispatch()
    return (
        <BrowserRouter>
            <div className='container'>
            <Routes>
                <Route exact path='/' element={<Main/>}/>
                <Route path='/card/:username/:reponame' element={<Card/>}/>
                <Route path='/card/:username/:reponame' element={<Error/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;