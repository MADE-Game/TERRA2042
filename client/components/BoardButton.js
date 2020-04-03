import React from 'react'
import Badge from '@material-ui/core/Badge'
import {withStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PeopleIcon from '@material-ui/icons/People'
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda'
import PanToolIcon from '@material-ui/icons/PanTool'

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))(Badge)

export function CustomizedBadges(props) {
  if (props.text === 'settlers') {
    return (
      <IconButton>
        <StyledBadge badgeContent={props.settlerCount} color="secondary">
          <PeopleIcon />
        </StyledBadge>
      </IconButton>
    )
  } else if (props.text === 'deckCount') {
    return (
      <IconButton>
        <StyledBadge badgeContent={props.deckCount} color="secondary">
          <ViewAgendaIcon />
        </StyledBadge>
      </IconButton>
    )
  } else if (props.text === 'handCount') {
    return (
      <IconButton>
        <StyledBadge badgeContent={props.handCount} color="secondary">
          <PanToolIcon />
        </StyledBadge>
      </IconButton>
    )
  }
}
