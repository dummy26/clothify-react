import { useQuery } from "@tanstack/react-query"
import api from "../../api"
import { reactQueryConstants } from "../../constants"

const getColors = async () => {
    const { data } = await api.get("/clothes/colors")
    return data
}

export default function useColors() {
    return useQuery([`colors`], getColors, {
        staleTime: reactQueryConstants.oneMinuteInMilliSeconds,
    })
}
