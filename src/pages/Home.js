import store from 'store';
import React, { useEffect, useState } from 'react';
import RestUtils from '../utils/RestUtils'
import Header from '../components/Header';
import Regalo from '../assets/regalo.png'

function Home(props) {
  
  const [startUrl, setStartUrl] = useState(RestUtils.getAuthUrl())

  useEffect( () => {
    let auth = store.get('access-token')
    if(auth) {
      setStartUrl('/summary')
    }
  }, [])


  return (
  <div>
    <Header />
    <div className="main-div">
      <div className="info-main container">
        <p className="info-title">
          Tus necesidades y deseos, ahora colaborativos 💛 
        </p>
        <a className="start-button" href={startUrl}>
          <div className="start-div">
            Comenzar
          </div>
        </a>
      </div>
      <div className="gift">
        <img src={Regalo}/>
      </div>
    </div>
  </div>)
}

export default Home;