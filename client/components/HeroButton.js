/* eslint-disable complexity */
import React from 'react'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import IconButton from '@material-ui/core/IconButton'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {toast} from 'react-toastify'
import ReactTooltip from 'react-tooltip'

export function myHeroButton(props) {
  if (props.text !== 'disableHero') {
    return (
      <div>
        <a data-tip data-for="Hero">
          <IconButton
            onClick={() => {
              if (props.text === 'cultistDraw') {
                if (props.canDraw) {
                  props.cultistDraw(props.player.deck, props.player)
                } else {
                  toast.warning('Not your turn!', {
                    position: toast.POSITION.TOP_CENTER
                  })
                }
              } else if (props.text === 'metalHeadSummon') {
                if (props.canDraw) {
                  if (!props.metalHeadUsed) {
                    props.metalHeadSummon(props.player)
                  } else {
                    toast.warning(
                      'You can only use Metalhead power once per turn',
                      {
                        position: toast.POSITION.TOP_CENTER
                      }
                    )
                  }
                } else {
                  toast.warning('Not your turn!', {
                    position: toast.POSITION.TOP_CENTER
                  })
                }
              } else if (props.text === 'medicHeal') {
                if (props.canDraw) {
                  props.engagedHeal()
                } else {
                  toast.warning('Not your turn!', {
                    position: toast.POSITION.TOP_CENTER
                  })
                }
              } else {
                return ''
              }
            }}
          >
            <FlashOnIcon
              fontSize="large"
              style={{
                color: '#D38411',
                filter: 'drop-shadow(0px 1px 2px #000)'
              }}
            />
          </IconButton>
        </a>
        <ReactTooltip id="Hero" place="right" type="dark" effect="solid">
          {props.text === 'medicHeal' ? (
            <span className="toolTip">
              Medic: Restore up to 3 health points to a minion.
            </span>
          ) : (
            ''
          )}
          {props.text === 'cultistDraw' ? (
            <span className="toolTip">
              Cultist: Draw an extra card at the cost of 2 Settlers
            </span>
          ) : (
            ''
          )}
          {props.text === 'metalHeadSummon' ? (
            <span className="toolTip">
              Metalhead: Summon a 1/1 Minion at the cost of 1 Settler
            </span>
          ) : (
            ''
          )}
          {props.text === 'Bandit' ? (
            <span className="toolTip">Bandit : tbd </span>
          ) : (
            ''
          )}
        </ReactTooltip>
      </div>
    )
  } else if (props.text === 'disableHero') {
    return (
      <IconButton disabled>
        <FlashOnIcon
          fontSize="large"
          style={{filter: 'drop-shadow(0px 1px 2px #000)'}}
        />
      </IconButton>
    )
  }
}

export function PassiveHero(props) {
  if (props.text === 'Hoarder') {
    return (
      <div>
        <a data-tip data-for="Hoarder">
          <IconButton>
            <FlashOnIcon
              fontSize="large"
              style={{
                color: '#D38411',
                filter: 'drop-shadow(0px 1px 2px #000)'
              }}
            />
          </IconButton>
        </a>
        <ReactTooltip id="Hoarder" place="right" type="dark" effect="solid">
          <span className="toolTip">
            Hoarder <i>(passive)</i> : Gives players a 1 in 4 chance to draw 2
            cards instead of 1
          </span>
        </ReactTooltip>
      </div>
    )
  } else if (props.text === 'Forager') {
    return (
      <div>
        <a data-tip data-for="Forager">
          <IconButton>
            <FlashOnIcon
              fontSize="large"
              style={{
                color: '#D38411',
                filter: 'drop-shadow(0px 1px 2px #000)'
              }}
            />
          </IconButton>
        </a>
        <ReactTooltip id="Forager" place="right" type="dark" effect="solid">
          <span className="toolTip">
            Forager <i>(passive)</i> : Gives players 2 settlers instead of 1 at
            the end of each turn
          </span>
        </ReactTooltip>
      </div>
    )
  } else if (props.text === 'disableHero') {
    return (
      <IconButton disabled>
        <FlashOnIcon
          fontSize="large"
          style={{filter: 'drop-shadow(0px 1px 2px #000)'}}
        />
      </IconButton>
    )
  }
}
