import React from 'react'
import {useDrag} from 'react-dnd'
import {ItemTypes} from '../dnd/types'

const DisplayCard = props => {
  const {name, attack, health, imageUrl, cost} = props.card
  const [{isDragging}, drag] = useDrag({
    item: {
      type: ItemTypes.DECK_CARD,
      id: props.card._id,
      name: props.card.name
    },
    collect: monitor => {
      return {
        isDragging: !!monitor.isDragging()
      }
    }
  })
  return (
    <div style={{marginBottom: '3vh'}}>
      <div ref={drag}>
        <div
          className="collectionCard"
          style={{
            // marginRight: '1.75vh',
            fontWeight: 'bold',
            cursor: 'move'
          }}
        >
          <div
            style={{
              marginTop: '-1vh',
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minWidth: '12vh',
              minHeight: '20vh',
              display: 'flex',
              flexDirection: 'column',
              color: '#fff',
              justifyContent: 'space-between'
            }}
          >
            <h3
              style={{
                textAlign: 'center',
                margin: 0,
                color: '#fff'
              }}
            >
              {cost}
            </h3>
            <h3 style={{textAlign: 'center', paddingTop: '7.5vh'}}>{name}</h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}
            >
              <h3 style={{margin: 0}}>{attack}</h3>

              <h3 style={{margin: 0}}>{health}</h3>
            </div>
          </div>
        </div>
      </div>
      {props.isDeck ? (
        <button type="button" onClick={props.handleRemove}>
          X
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default DisplayCard
