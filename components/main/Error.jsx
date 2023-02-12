import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const history = useNavigate();
    return (
        <div style={{textAlign:center}}>
            <button onClick={() => history('/home')}>GO TO MAIN PAGE</button>
            Dldldld
        </div>
    );
};

export default Error;