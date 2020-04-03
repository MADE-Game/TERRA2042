import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      width: '100%'
    }
  }
}))

export default function Textfield(props) {
  const classes = useStyles()
  if (props.name === 'room number') {
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          placeholder="Room Number"
          id="outlined-basic"
          variant="outlined"
        />
      </form>
    )
  } else if (props.name === 'email') {
    return (
      <TextField
        placeholder="Room Number"
        id="outlined-basic"
        variant="filled"
      />
    )
  } else if (props.name === 'username') {
    return (
      <TextField placeholder="Username" id="outlined-basic" variant="filled" />
    )
  } else if (props.name === 'password') {
    return (
      <TextField placeholder="Password" id="outlined-basic" variant="filled" />
    )
  }
}
