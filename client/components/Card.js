import React from 'react'
import {ItemTypes} from '../dnd/types'
import {useDrag, useDrop} from 'react-dnd'
import {
  playerAttackCard,
  medicHealPower,
  clearAttackThunk
} from '../store/thunksAndActionCreators'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Card = props => {
  const [{isDragging}, drag] = useDrag({
    item: {
      type: props.player === 'hero' ? ItemTypes.CARD : ItemTypes.ENEMY_CARD,
      card: props.card,
      inHand: props.inHand,
      player: props.player
    },
    collect: monitor => {
      return {
        isDragging: !!monitor.isDragging()
      }
    }
  })
  const [{isOver, canDrop, item}, drop] = useDrop({
    accept: props.player === 'hero' ? ItemTypes.ENEMY_CARD : ItemTypes.CARD,

    drop: () => {
      if (!props.isMyTurn) {
        //CHAT LOG OPPORTUNITY
        return toast.warning("It's not your turn!", {
          position: toast.POSITION.TOP_CENTER
        })
      } else if (item.card.attackOccurred) {
        toast.warning("This fighter can't attack until next turn", {
          position: toast.POSITION.TOP_CENTER
        })
      } else if (props.player === 'enemy' && !props.inHand && !item.inHand) {
        console.log('attack!')
        props.attackCard(item.card, props.card)
      }
    },

    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem()
    })
  })

  const {name, attack, health, imageUrl, cost} = props.card
  return (
    <div ref={drop}>
      <div
        ref={drag}
        onClick={() => {
          if (!props.healUsed) {
            if (props.healEngaged === true) {
              console.log('Healed!')
              props.medicHeal(props.card)
            }
          } else {
            toast.warning('Heal has already been used this round', {
              position: toast.POSITION.TOP_CENTER
            })
          }
          if (props.banditAttackEngaged) {
            props.clearAttack(props.card)
          }
        }}
      >
        <div
          ref={drag}
          onClick={() => {
            if (!props.healUsed) {
              if (props.healEngaged === true) {
                console.log('Healed!')
                props.medicHeal(props.card)
              }
            } else {
              // eslint-disable-next-line no-alert
              alert('heal has already been used this turn!')
            }
            if (props.banditAttackEngaged) {
              props.clearAttack(props.card)
            }
          }}
        >
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
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  attackCard: (attacker, defender) =>
    dispatch(playerAttackCard(attacker, defender)),
  medicHeal: fighter => dispatch(medicHealPower(fighter)),
  clearAttack: fighter => dispatch(clearAttackThunk(fighter))
})

const mapState = state => ({
  isMyTurn: state.game.data.isMyTurn,
  healUsed: state.game.player.healUsed,
  banditAttackEngaged: state.game.player.banditAttackEngaged
})

export default connect(mapState, mapDispatch)(Card)
