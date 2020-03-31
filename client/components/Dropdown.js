import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const Dropdown = props => {
  const classes = useStyles()
  const [name, setDeck] = React.useState('')

  const onChange = event => {
    setDeck(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Deck</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={name}
          onChange={onChange}
        >
          {props.decks.map(deck => (
            <MenuItem value={deck} key={deck}>
              {deck}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Dropdown
