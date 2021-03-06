import React from 'react'
import { List, Row } from 'hbm-react-components'

const methodAvatar = <span className='Method-avatar'>M</span>

const createMethodRow = (method, icon, onFocus) => (
  <Row
    avatar={methodAvatar}
    primary={method.path}
    secondary='Method'
    icon={icon}
    key={method.path}
    onFocus={onFocus}
	/>
)

const stateAvatar = <span className='State-avatar'>S</span>

const createStateRow = (state, icon, onFocus) => (
  <Row
    avatar={stateAvatar}
    primary={state.path}
    secondary={'State / ' + JSON.stringify(state.value)}
    icon={icon}
    key={state.path}
    onFocus={onFocus}
	/>
)

const StateAndMethodList = ({statesAndMethods, iconCreator, onSelect}) => {
  const rows = statesAndMethods
    .sort((a, b) => {
      return a.path - b.path
    })
    .map((stateOrMethod) => {
      if (typeof stateOrMethod.value === 'undefined') {
        const method = stateOrMethod
        return createMethodRow(method, iconCreator(method.path), () => { onSelect(method) })
      } else {
        const state = stateOrMethod
        return createStateRow(state, iconCreator(state.path), () => { onSelect(state) })
      }
    })

  return (
    <List>
      {rows}
    </List>
  )
}

export default StateAndMethodList
