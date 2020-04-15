import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ControlPointIcon from '@material-ui/icons/ControlPoint'
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import PublishIcon from '@material-ui/icons/Publish'
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo'
import ReactTooltip from 'react-tooltip'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: '100%'
  },
  button2: {
    margin: theme.spacing(1)
  }
}))

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
      <div>
        <a data-tip data-for="deleteDeck">
          <IconButton
            classes={classes.button2}
            onClick={() =>
              confirmAlert({
                title: 'Confirm',
                message:
                  'Are you sure you want to permanently delete this deck?',
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
        </a>
        <ReactTooltip id="deleteDeck" place="bottom" type="dark" effect="solid">
          <span className="toolTip">Delete Deck</span>
        </ReactTooltip>
      </div>
    )
  } else if (props.text === 'canDraw') {
    return (
      <div>
        <a data-tip data-for="Draw">
          <IconButton
            classes={classes.button1}
            onClick={() => props.drawCard(props.player.deck, props.user)}
          >
            <PublishIcon
              fontSize="large"
              style={{
                color: '#D38411',
                filter: 'drop-shadow(0px 1px 2px #000)'
              }}
            />
          </IconButton>
        </a>
        <ReactTooltip id="Draw" place="top" type="dark" effect="solid">
          <span className="toolTip">Draw Card</span>
        </ReactTooltip>
      </div>
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
      <div>
        <a data-tip data-for="End">
          <IconButton
            classes={classes.button1}
            onClick={() => {
              props.endTurn(
                props.gameId,
                props.gameState,
                props.player,
                props.user
              )

              window.KEY = Math.random()
            }}
          >
            <SlowMotionVideoIcon
              fontSize="large"
              style={{
                color: '#D38411',
                filter: 'drop-shadow(0px 1px 2px #000)'
              }}
            />
          </IconButton>
        </a>
        <ReactTooltip id="End" place="top" type="dark" effect="solid">
          <span className="toolTip">End Turn</span>
        </ReactTooltip>
      </div>
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
