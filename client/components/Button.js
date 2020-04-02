import React from 'react'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AssessmentIcon from '@material-ui/icons/Assessment'
import PublishIcon from '@material-ui/icons/Publish'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {socket} from './Room'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: '100%'
  }
}))

export function MyButton(props) {
  const classes = useStyles()
  if (props.icon === 'home') {
    return (
      <Button
        variant="contained"
        color={props.color}
        className={classes.button}
        startIcon={<HomeIcon />}
      >
        {props.text}
      </Button>
    )
  } else if (props.icon === 'home2') {
    return (
      <Button
        variant="contained"
        color={props.color}
        className={classes.button}
        startIcon={<HomeIcon />}
        onClick={() =>
          confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to leave the game?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  socket.emit('left game', {
                    playerName: props.playerName,
                    roomId: localStorage.roomId
                  })
                  props.history.replace('/home')
                }
              },
              {
                label: 'Cancel'
              }
            ]
          })
        }
      >
        {props.text}
      </Button>
    )
  } else if (props.icon === 'game') {
    return (
      <Button
        variant="contained"
        color={props.color}
        className={classes.button}
        startIcon={<VideogameAssetIcon />}
      >
        {props.text}
      </Button>
    )
  } else if (props.icon === 'shop') {
    return (
      <Button
        variant="contained"
        color={props.color}
        className={classes.button}
        startIcon={<ShoppingCartIcon />}
      >
        {props.text}
      </Button>
    )
  } else if (props.icon === 'deck') {
    return (
      <Button
        variant="contained"
        color={props.color}
        className={classes.button}
        startIcon={<ViewCarouselIcon />}
      >
        {props.text}
      </Button>
    )
  } else if (props.icon === 'logout') {
    return (
      <Button
        variant="contained"
        color={props.color}
        className={classes.button}
        endIcon={<ExitToAppIcon />}
      >
        {props.text}
      </Button>
    )
  } else if (props.icon === 'stats') {
    return (
      <Button
        variant="contained"
        color={props.color}
        className={classes.button}
        startIcon={<AssessmentIcon />}
      >
        {props.text}
      </Button>
    )
  } else {
    return (
      <Button
        variant="contained"
        color={props.color}
        className={classes.button}
      >
        {props.text}
      </Button>
    )
  }
}
