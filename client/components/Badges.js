import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import MailIconTwoToneIcon from '@material-ui/icons/MailTwoTone'
import StyleIconTwoToneIcon from '@material-ui/icons/StyleTwoTone'
import GroupIconTwoToneIcon from '@material-ui/icons/GroupTwoTone'
import SvgIcon from '@material-ui/core/SvgIcon'

function DeckIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M.6 6.4C.5 6.2.4 6 .5 5.7c0-.2.2-.4.4-.6S13.6.6 14.2.4c.7-.2 1.3-.5 2-.4 1.3.1 6.9 5.3 7 5.5s.3.5.2.8c-.2.6-1.1.8-1.6 1-2.3.7-10.9 4-13 4.5-.6.2-1.6.2-2.3-.4-.6-.6-5.8-4.9-5.9-5z" />
      <path d="M22.9 7.6c-.6.2-1.3.4-1.9.7-3.7 1.3-7.4 2.6-11.1 4-.9.3-1.9.5-2.8.2-.6-.2-1.1-.6-1.5-1C3.9 10 2.2 8.6.5 7.2c0 .3-.1.5.1.8l.2.2c1 .8 1.9 1.6 2.9 2.4.9.8 1.8 1.6 2.8 2.3 1 .6 2.2.4 3.3.1 1.1-.4 2.2-.8 3.4-1.2 2.4-.9 4.9-1.7 7.3-2.6.4-.1.8-.3 1.1-.4.6-.2 1.2-.3 1.7-.6l.1-.1v-.7c-.1.1-.3.2-.5.2z" />
      <path d="M22.9 9.4c-.6.2-1.3.4-1.9.7-3.7 1.3-7.4 2.6-11.1 4-.9.2-1.9.4-2.8.1-.6-.2-1.1-.6-1.5-1-1.7-1.4-3.4-2.8-5.1-4.3 0 .3-.1.5.1.8.1.1.1.2.2.2 1 .8 1.9 1.6 2.9 2.4.9.8 1.8 1.6 2.8 2.3 1 .6 2.2.4 3.3.1 1.1-.4 2.2-.8 3.4-1.2 2.4-.9 4.9-1.7 7.3-2.6.4-.1.8-.3 1.1-.4.6-.2 1.2-.3 1.7-.6l.1-.1v-.7c-.1.1-.3.2-.5.3z" />
      <path d="M22.9 11.1c-.6.2-1.3.4-1.9.7-3.7 1.3-7.4 2.6-11.1 4-.9.2-1.9.4-2.8.1-.6-.2-1.1-.6-1.5-1-1.7-1.4-3.4-2.8-5.1-4.3 0 .3-.1.5.1.8.1.1.1.2.2.2 1 .8 1.9 1.6 2.9 2.4.9.8 1.8 1.6 2.8 2.3 1 .6 2.2.4 3.3.1 1.1-.4 2.2-.8 3.4-1.2 2.4-.9 4.9-1.7 7.3-2.6.4-.1.8-.3 1.1-.4.6-.2 1.2-.3 1.7-.6l.1-.1v-.7c-.1.1-.3.2-.5.3z" />
      <path d="M22.9 12.7c-.6.2-1.3.4-1.9.7-3.7 1.3-7.4 2.6-11.1 4-.9.2-1.9.4-2.8.1-.6-.2-1.1-.6-1.5-1-1.7-1.4-3.4-2.8-5.1-4.3 0 .3-.1.5.1.8.1.1.1.2.2.2 1 .8 1.9 1.6 2.9 2.4.9.8 1.8 1.6 2.8 2.3 1 .6 2.2.4 3.3.1 1.1-.4 2.2-.8 3.4-1.2 2.4-.9 4.9-1.7 7.3-2.6.4-.1.8-.3 1.1-.4.6-.2 1.2-.3 1.7-.6l.1-.1v-.7c-.1.2-.3.2-.5.3z" />
    </SvgIcon>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

export function BadgeOne(props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Badge
        badgeContent={props.content}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        showZero
        color="secondary"
      >
        {props.name === 'opponentDeck' || props.name === 'playerDeck' ? (
          <DeckIcon style={{color: '#fff'}} />
        ) : (
          ''
        )}

        {/* {props.name === 'playerSettlers' ? (
          <GroupIcon style={{color: '#fff'}} />
        ) : (
          ''
        )}
        {props.content < 15 ? (<GroupIcon style={{color: '#fff'}} />) : ('')} */}

        {props.name === 'playerSettlers' ? (
          props.content < 10 ? (
            <GroupIconTwoToneIcon
              className="shadowpulse"
              style={{
                color: '#EA474F',
                filter: 'drop-shadow(0px 0px 5px #C41A1C)'
              }}
            />
          ) : (
            <GroupIconTwoToneIcon style={{color: '#fff'}} />
          )
        ) : (
          // <GroupIcon style={{color: '#fff'}} />
          ''
        )}

        {props.name === 'opponentHand' ? (
          <StyleIconTwoToneIcon
            style={{color: '#fff', filter: 'drop-shadow(0px 0px 5px #fff)'}}
          />
        ) : (
          ''
        )}
      </Badge>
    </div>
  )
}

export function BadgeTwo(props) {
  const classes = useStyles()
  console.log(props)
  return (
    <div className={classes.root}>
      <Badge badgeContent={4} color="secondary">
        <MailIconTwoToneIcon />
      </Badge>
    </div>
  )
}
