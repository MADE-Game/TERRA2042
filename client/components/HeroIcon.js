import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
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

export function HeroIconButton(props) {
  const classes = useStyles()
  if (props.text === 'BUY') {
    return (
      <IconButton
        classes={classes.button1}
        onClick={() => props.drawCard(props.player.deck, props.user)}
      >
        <PublishIcon fontSize="large" />
      </IconButton>
    )
  } else if (props.text === 'deleteFromDeck') {
    return (
      <IconButton
        classes={classes.button1}
        onClick={() => props.drawCard(props.player.deck, props.user)}
      >
        <PublishIcon fontSize="large" />
      </IconButton>
    )
  }
}
