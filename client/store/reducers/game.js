import player from './player'
import opponent from './opponent'
import data from './gameData'
import {combineReducers} from 'redux'

export default combineReducers({player, opponent, data})
