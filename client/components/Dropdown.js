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
  const [className, setClass] = React.useState('')

  const onDeckChange = event => {
    setDeck(event.target.value)
  }
  const onClassChange = event => {
    setClass(event.target.value)
  }
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>{props.label}</InputLabel>
        {props.label === 'Deck' ? (
          <Select value={name} onChange={onDeckChange}>
            {props.items.map(item => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        ) : (
          // drowndown for classes
          <Select value={className} onChange={onClassChange}>
            {props.items.map(item => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </div>
  )
}

export default Dropdown
