import React from 'react';


import CSSStyle from './Loading.module.css';
import loading from '../../assets/loading.gif';

function Loding() {
    return (
        <div className={CSSStyle.root}>
            <img src={loading} alt="loading..."/>
        </div>
    )
}

export default Loding
