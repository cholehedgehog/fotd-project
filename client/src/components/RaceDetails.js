import React from 'react'
import { useRacesContext } from '../hooks/useRacesContext'
// date fns
import { formatDistanceToNow } from 'date-fns'

function RaceDetails({ race }) {
  const { dispatch } = useRacesContext()

  const handleClick = async () => {
    const response = await fetch('/Race/' + race._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_RACE', payload: json })
    }
  }

  return (
    <div className="raceDetails">
      <h4>{race.raceName}</h4>
      <p>{race.kind}</p>
      <p>{formatDistanceToNow(new Date(race.createdAt), { addSuffix: true })}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  )
}

export default RaceDetails