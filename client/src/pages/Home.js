import React, { useEffect } from 'react'
import { useRacesContext } from '../hooks/useRacesContext'

// components
import RaceDetails from '../components/RaceDetails'
import { RaceForm } from '../components/RaceForm'

function Home() {
  const { races, dispatch } = useRacesContext()

  useEffect(() => {
    const fetchRaces = async () => {
      const response = await fetch('/Race')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_RACES', payload: json })
      }
    }

    fetchRaces()
  }, [dispatch])

  return (
    <div>
      <div className='races'>
        {races && races.map((race) => (
          <RaceDetails key={race._id} race={race} />
        ))}
      </div>
      <RaceForm />
    </div>
  )
}

export default Home