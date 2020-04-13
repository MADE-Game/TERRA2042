import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ControlPointIcon from '@material-ui/icons/ControlPoint'
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import SvgIcon from '@material-ui/core/SvgIcon'
import PublishIcon from '@material-ui/icons/Publish'
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo'
import FlashOnIcon from '@material-ui/icons/FlashOn'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: '100%'
  },
  button2: {
    margin: theme.spacing(1)
  }
}))

function DrawIcon(props) {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M-360.8,313.4c-0.6,0.2-1.2,0.4-1.8,0.7c-3.5,1.2-6.9,2.4-10.4,3.7c-0.8,0.2-1.8,0.4-2.6,0.1c-0.6-0.2-1-0.6-1.4-0.9
		c-1.6-1.3-3.2-2.6-4.8-4c0,0.3-0.1,0.5,0.1,0.7c0.1,0.1,0.1,0.2,0.2,0.2c0.9,0.7,1.8,1.5,2.7,2.2c0.8,0.7,1.7,1.5,2.6,2.1
		c0.9,0.6,2.1,0.4,3.1,0.1c1-0.4,2.1-0.7,3.2-1.1c2.2-0.8,4.6-1.6,6.8-2.4c0.4-0.1,0.7-0.3,1-0.4c0.6-0.2,1.1-0.3,1.6-0.6l0.1-0.1
		v-0.7C-360.4,313.3-360.6,313.3-360.8,313.4z"
        />
        <g>
          <g>
            <path
              d="M-360.7,308.6c-0.6,0.2-1.2,0.4-1.8,0.7c-3.5,1.2-6.9,2.4-10.4,3.7c-0.8,0.3-1.8,0.5-2.6,0.2c-0.6-0.2-1-0.6-1.4-0.9
				c-1.6-1.4-3.2-2.7-4.8-4c0,0.3-0.1,0.5,0.1,0.7l0.2,0.2c0.9,0.7,1.8,1.5,2.7,2.2c0.8,0.7,1.7,1.5,2.6,2.1
				c0.9,0.6,2.1,0.4,3.1,0.1c1-0.4,2.1-0.7,3.2-1.1c2.2-0.8,4.6-1.6,6.8-2.4c0.4-0.1,0.7-0.3,1-0.4c0.6-0.2,1.1-0.3,1.6-0.6l0.1-0.1
				v-0.7C-360.3,308.5-360.5,308.6-360.7,308.6z"
            />
            <path
              d="M-360.7,310.3c-0.6,0.2-1.2,0.4-1.8,0.7c-3.5,1.2-6.9,2.4-10.4,3.7c-0.8,0.2-1.8,0.4-2.6,0.1c-0.6-0.2-1-0.6-1.4-0.9
				c-1.6-1.3-3.2-2.6-4.8-4c0,0.3-0.1,0.5,0.1,0.7c0.1,0.1,0.1,0.2,0.2,0.2c0.9,0.7,1.8,1.5,2.7,2.2c0.8,0.7,1.7,1.5,2.6,2.1
				c0.9,0.6,2.1,0.4,3.1,0.1c1-0.4,2.1-0.7,3.2-1.1c2.2-0.8,4.6-1.6,6.8-2.4c0.4-0.1,0.7-0.3,1-0.4c0.6-0.2,1.1-0.3,1.6-0.6l0.1-0.1
				V310C-360.3,310.1-360.5,310.2-360.7,310.3L-360.7,310.3z"
            />
            <path
              d="M-360.7,311.9c-0.6,0.2-1.2,0.4-1.8,0.7c-3.5,1.2-6.9,2.4-10.4,3.7c-0.8,0.2-1.8,0.4-2.6,0.1c-0.6-0.2-1-0.6-1.4-0.9
				c-1.6-1.3-3.2-2.6-4.8-4c0,0.3-0.1,0.5,0.1,0.7c0.1,0.1,0.1,0.2,0.2,0.2c0.9,0.7,1.8,1.5,2.7,2.2c0.8,0.7,1.7,1.5,2.6,2.1
				c0.9,0.6,2.1,0.4,3.1,0.1c1-0.4,2.1-0.7,3.2-1.1c2.2-0.8,4.6-1.6,6.8-2.4c0.4-0.1,0.7-0.3,1-0.4c0.6-0.2,1.1-0.3,1.6-0.6l0.1-0.1
				v-0.7C-360.3,311.7-360.5,311.8-360.7,311.9L-360.7,311.9z"
            />
            <path
              d="M-360.4,303.5c-0.1-0.2-3.7-3.6-5.7-4.8l1.1,1.3h-3.3v4.5c0,0.7-0.7,1.4-1.4,1.4h-3.6c-0.7,0-1.4-0.7-1.4-1.4v-3.9
				c-3.3,1.1-6.7,2.3-6.8,2.4c-0.2,0.2-0.4,0.4-0.4,0.6c-0.1,0.3,0,0.5,0.1,0.7c0.1,0.1,5,4.1,5.5,4.7c0.7,0.6,1.6,0.6,2.1,0.4
				c2-0.5,10-3.6,12.1-4.2c0.5-0.2,1.3-0.4,1.5-0.9C-360.1,303.9-360.3,303.7-360.4,303.5L-360.4,303.5z"
            />
            <path
              d="M-361.5,305.6L-361.5,305.6c-0.9,0.3-2.9,0.9-5,1.7c-3,1.1-6.2,2.2-7.3,2.5c-0.3,0.1-0.6,0.1-0.8,0.1
				c-0.7,0-1.3-0.2-1.8-0.7c-0.4-0.4-2.6-2.2-4-3.5c-0.6,0.2-0.8,0.3-0.8,0.4c-0.2,0.2-0.4,0.4-0.4,0.6c-0.1,0.3,0,0.5,0.1,0.7
				c0.1,0.1,5,4.1,5.5,4.7c0.7,0.6,1.6,0.6,2.1,0.4c2-0.5,10-3.6,12.1-4.2c0.5-0.2,1.3-0.4,1.5-0.9c0.1-0.3-0.1-0.6-0.2-0.7
				C-360.4,306.6-360.9,306.2-361.5,305.6z"
            />
          </g>
          <path
            d="M-366,299.6c0-0.1-4.7-4.8-4.7-4.8c-0.4-0.4-0.9-0.4-1.3,0l-4.8,4.8h2.7v0.3v1.1v3.6c0,0.6,0.4,0.9,0.9,0.9h3.6
			c0.5,0,0.9-0.4,0.9-0.9v-3.3v-1.4v-0.3H-366z"
          />
        </g>
      </g>
    </SvgIcon>
  )
}

function EndTurnIcon(props) {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M-363.3,298.8c0.8-0.3,1.5-0.6,2.2-0.9c0.5-0.2,1-0.4,1.5-0.6c0.2-0.1,0.3-0.1,0.5,0.1c0.1,0.2,0,0.3-0.1,0.5
		c-1.9,2.5-3.8,4.9-5.7,7.4c-0.2,0.3-0.4,0.3-0.6,0c-1.9-2.5-3.8-4.9-5.7-7.4c-0.1-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.1,0.5-0.1
		c1.1,0.4,2.2,0.9,3.4,1.3c0.1,0,0.2,0.1,0.3,0.1c0,0,0.1,0,0.1,0c0-1.3,0.1-2.6-0.2-3.9c-0.4-1.5-1.2-2.7-2.7-3.3
		c-0.8-0.3-1.6-0.4-2.4-0.4c-3.1,0-6.2,0-9.3,0c-0.5,0-1,0-1.5,0c0-1.2,0-2.4,0-3.7c0.2,0,0.4,0,0.6,0c3.4,0,6.8,0,10.1,0
		c1.6,0,3.2,0.3,4.7,1.1c2.1,1.2,3.4,3.1,4,5.4c0.3,1,0.4,2.1,0.3,3.1C-363.3,297.6-363.3,298.1-363.3,298.8z"
        />
        <path
          d="M-365.1,311c-1.9,0-3.7,0-5.6,0c-0.4,0-0.5-0.1-0.5-0.5c0-0.7,0-1.3,0-2c0-0.5,0.1-0.5,0.5-0.5c2.4,0,4.9,0,7.3,0
		c1.3,0,2.5,0,3.8,0c0.5,0,0.5,0.1,0.5,0.5c0,0.7,0,1.3,0,2c0,0.4-0.1,0.5-0.5,0.5C-361.4,311-363.3,311-365.1,311z"
        />
      </g>
    </SvgIcon>
  )
}

export function MyIconButton(props) {
  const classes = useStyles()
  if (props.text === 'BUY') {
    return (
      <Button
        onClick={() => props.handleClick(props.card._id, props.card.cost)}
        variant="contained"
        className={classes.button}
        startIcon={<ControlPointIcon />}
      >
        {props.text}
      </Button>
    )
  } else if (props.text === 'deleteFromDeck') {
    return (
      <Button
        onClick={props.handleRemove}
        variant="contained"
        className={classes.button2}
        startIcon={<DeleteIcon />}
      >
        DELETE
      </Button>
    )
  } else if (props.text === 'deleteDeck') {
    return (
      <IconButton
        classes={classes.button2}
        onClick={() =>
          confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to permanently delete this deck?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  props.removeCollection(props.collection._id)
                  props.handleChangeState(props.collection._id.toString())
                }
              },
              {
                label: 'Cancel'
              }
            ]
          })
        }
        sizesmall
      >
        <DeleteIcon />
      </IconButton>
    )
  } else if (props.text === 'canDraw') {
    return (
      <IconButton
        classes={classes.button1}
        onClick={() => props.drawCard(props.player.deck, props.user)}
      >
        <PublishIcon
          fontSize="large"
          style={{color: '#D38411', filter: 'drop-shadow(0px 1px 2px #000)'}}
        />
      </IconButton>
    )
  } else if (props.text === 'cantDraw') {
    return (
      <IconButton classes={classes.button1} disabled>
        <PublishIcon
          fontSize="large"
          style={{filter: 'drop-shadow(0px 1px 2px #000)'}}
        />
      </IconButton>
    )
  } else if (props.text === 'endTurn') {
    return (
      <IconButton
        classes={classes.button1}
        onClick={() => {
          props.endTurn(props.gameId, props.gameState, props.player, props.user)

          window.KEY = Math.random()
        }}
      >
        <SlowMotionVideoIcon
          fontSize="large"
          style={{color: '#D38411', filter: 'drop-shadow(0px 1px 2px #000)'}}
        />
      </IconButton>
    )
  } else if (props.text === 'cantEnd') {
    return (
      <IconButton classes={classes.button1} disabled>
        <SlowMotionVideoIcon
          fontSize="large"
          style={{filter: 'drop-shadow(0px 1px 2px #000)'}}
        />
      </IconButton>
    )
  }
}
