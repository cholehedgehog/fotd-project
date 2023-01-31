import { createContext, useReducer } from "react";

export const RaceContext = createContext()

export const raceReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RACES':
            return {
                races: action.payload
            }
        case 'CREATE_RACES':
            return {
                races: [action.payload, ...state.races]
            }
        case 'DELETE_RACE':
            return {
                races: state.races.filter((r) => r._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const RaceContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(raceReducer, {
        races: null
    })

    return (
        <RaceContext.Provider value={{...state, dispatch}}>
            {children}
        </RaceContext.Provider>
    )
}