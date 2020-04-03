import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ControlPointIcon from '@material-ui/icons/ControlPoint'
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

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
      <IconButton
        classes={classes.button3}
        onClick={() =>
          confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to permanently delete this deck?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  props.removeCollection(props.collection._id)
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
        {<DeleteIcon />}
      </IconButton>
    )
  }
}
