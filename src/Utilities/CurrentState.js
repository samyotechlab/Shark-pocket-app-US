import { state } from "../Service/Home";
export const stateList = async () => {

    try {
        const response = await state();
        return checkCurrentState(response.data); 
    } catch (error) {
        console.log("error", error);
    }
};

export async function checkCurrentState(states) {
    try {
        const response = await fetch("http://ip-api.com/json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const currentState = data.regionName;
        const isStateInList = states.some((state) => state.name === currentState);
        return isStateInList;
    } catch (error) {
        console.error("Error fetching current state:", error);
    }
}
