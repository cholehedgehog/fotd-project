import React, { useState } from 'react'
import { useRacesContext } from '../hooks/useRacesContext'

export const RaceForm = () => {
    const { dispatch } = useRacesContext()
    const [raceName, setRaceName] = useState('')
    const [kind, setKind] = useState('')
    const [boon, setBoon] = useState('')
    const [curse, setCurse] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const race = { raceName, kind, boon, curse }

        const response = await fetch('/Race', {
            method: 'POST',
            body: JSON.stringify(race),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setRaceName('')
            setKind('')
            setBoon('')
            setCurse('')
            setError(null)
            setEmptyFields([])
            console.log('new race added', json)
            dispatch({ type: 'CREATE_RACES', payload: json })
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new Race</h3>

            <label>Race Name:</label>
            <input
                type="text"
                onChange={(e) => setRaceName(e.target.value)}
                value={raceName}
                className={emptyFields.includes('raceName') ? 'error' : ''}
            />

            <label>Kind:</label>
            <input
                type="text"
                onChange={(e) => setKind(e.target.value)}
                value={kind}
                className={emptyFields.includes('kind') ? 'error' : ''}
            />

            <label>Boon:</label>
            <input
                type="text"
                onChange={(e) => setBoon(e.target.value)}
                value={boon}
            />

            <label>Curse:</label>
            <input
                type="text"
                onChange={(e) => setCurse(e.target.value)}
                value={curse}
            />

            <button>Add Race</button>

            {error && <div className='error'>{error}</div>}

        </form>
    )
}
