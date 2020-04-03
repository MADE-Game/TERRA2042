import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ControlPointIcon from '@material-ui/icons/ControlPoint'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: '100%'
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
  }
}
