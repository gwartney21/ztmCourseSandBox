import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './logo.css'
 
const Logo = ()=>{
    return (
        <div className="ma4 mt0" style={{width:'150px'}}>
            <Tilt>
                <div className="pa3" style={{ height: '150px', width: '150px'}}>
                    <img style={{paddingTop:'5px'}}alt="logo" src={brain}></img>
                </div>
             </Tilt>
        </div>
    );
}

export default Logo;