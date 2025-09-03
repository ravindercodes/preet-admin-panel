import React from 'react'
import infoImage from '../../../images/small-logo.png'
const LoginInfo = () => {
  return (
    <div className='position-relative z-2'>
          <div className='cardWidth'>
          <div className='carousal_card d-flex gap-1 position-relative'>
                <div className='carousal_content'>
                    <h4>Empowering Digital Futures
                    </h4>
                    <p>Transform your career with professional computer training at Preet Institute. Learn from industry experts and gain practical skills for today's digital world..</p>
                </div>
                <div className='carousal_image'>
                    <img src={infoImage} alt="carosual-image" className='img-fluid'/>
                </div>
                
            </div>
          
          </div>
    </div>
  )
}

export default LoginInfo