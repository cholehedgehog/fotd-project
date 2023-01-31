import { RaceContext } from "../context/RaceContext";
import { useContext } from "react";

export const useRacesContext = () => {
    const context = useContext(RaceContext)

    if (!context) {
        throw Error('useRaceContext must be used inside an RacesContextProvider')
    }

    return context
}