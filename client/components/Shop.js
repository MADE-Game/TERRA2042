import React from 'react'
import {Link} from 'react-router-dom'

const dummyArr = [
  'https://pluspng.com/img-png/logo-javascript-png-java-script-js-logo-format-ai-javascript-logo-vector-png-213.png',
  'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png',
  'https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png',
  'https://www.stickpng.com/assets/images/5848309bcef1014c0b5e4a9a.png',
  'https://www.stickpng.com/assets/images/584815fdcef1014c0b5e497a.png',
  'https://angular.io/assets/images/logos/angular/angular.png',
  'https://www.stickpng.com/assets/images/5848152fcef1014c0b5e4967.png',
  'https://cdn.freebiesupply.com/logos/large/2x/socket-io-logo-png-transparent.png',
  'https://www.stickpng.com/assets/images/58480979cef1014c0b5e4901.png'
]

export const Shop = () => {
  return (
    <div id="shop">
      <Link to="/home">
        <button type="button" className="buttonStyle1">
          Home
        </button>
      </Link>
      <div id="shop-cards">
        {Array(20)
          .fill(1)
          .map((item, idx) => {
            return <Card key={item} num={idx + 1} />
          })}
      </div>
    </div>
  )
}

const Card = ({num}) => {
  return (
    <div
      id="card"
      className="card"
      style={{
        fontSize: 12,
        fontWeight: 'bold'
      }}
    >
      <div>
        <p
          style={{
            textAlign: 'right',
            paddingRight: '1em'
          }}
        >
          Cost: 1
        </p>
      </div>
      <img src={`/images/monsters/${num}.png`} style={{width: '11vh'}} />
      <h2
        style={{
          textAlign: 'center'
        }}
      >
        {name}
      </h2>
      <div
        className="stats"
        style={{
          // paddingRight: '1em',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <span>~ attack ~</span>
        <span>~ health ~</span>
        <br />
      </div>
      <button type="button" className="buttonStyle1">
        Buy
      </button>
    </div>
  )
}
