import React from 'react'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

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
