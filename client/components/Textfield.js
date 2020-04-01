import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      width: '100%'
    }
  }
  // inputText2: {
  //   fontSize: '10px',
  //   padding: '1vh'
  // }
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
      // <form className={classes.root} noValidate autoComplete="off">
      <TextField
        placeholder="Room Number"
        id="outlined-basic"
        variant="filled"
      />
      // </form>
    )
  } else if (props.name === 'username') {
    return (
      // <form className={classes.root} noValidate autoComplete="off">
      <TextField placeholder="Username" id="outlined-basic" variant="filled" />
      // </form>
    )
  } else if (props.name === 'password') {
    return (
      // <form className={classes.root} noValidate autoComplete="off">
      <TextField placeholder="Password" id="outlined-basic" variant="filled" />
      // </form>
    )
  }
}
