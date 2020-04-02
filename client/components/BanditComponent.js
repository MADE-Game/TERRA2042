import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {connect} from 'react-redux'
import {
  banditDecrementThunk,
  banditEngage
} from '../store/thunksAndActionCreators'
import {toast} from 'react-toastify'
// import ReactConfirmAlert from 'react-confirm-alert';

class BanditComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  // const [open, setOpen] = React.useState(false);
  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }
  render() {
    const open = this.state.open
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            if (!this.props.banditUsed && this.props.isMyTurn) {
              this.handleClickOpen()
            } else {
              // eslint-disable-next-line no-alert
              toast.warning('You can only use bandit power once per turn', {
                position: toast.POSITION.TOP_CENTER
              })
            }
          }}
        >
          Bandit Power
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Bandit Raid</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              At the cost of 2 settlers, enable a fighter to attack that has
              been deactivated, or kill 4 settlers in your enemies settlement.
              You must click on a fighter after closing the window to activate
              their attack ability
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.handleClose()
                this.props.banditAttackEngaged()
              }}
              color="primary"
            >
              Enable a Fighter to Attack
            </Button>
            <Button
              onClick={() => {
                this.handleClose()
                this.props.banditDecrement(
                  this.props.player,
                  this.props.opponent
                )
              }}
              color="primary"
              autoFocus
            >
              Kill Opponent Settlers
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    banditDecrement: (player, opponent) =>
      dispatch(banditDecrementThunk(player, opponent)),
    banditAttackEngaged: () => dispatch(banditEngage())
  }
}
const mapStateToProps = state => {
  return {
    player: state.game.player,
    opponent: state.game.opponent,
    banditUsed: state.game.player.banditUsed,
    isMyTurn: state.game.data.localTurn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BanditComponent)
