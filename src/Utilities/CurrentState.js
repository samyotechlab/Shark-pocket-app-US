import { state } from "../Service/Home";
// import { setStateList, setVisible, setMessage } from "../Store/Actions/StateList";
export const stateList = async () => {
    try {
        const response = await state();
        // console.log("response", response)  
        checkCurrentState(response.data)
    } catch (error) {
        console.log("error", error)
    }
}

export async function checkCurrentState(states) {
    try {
      const response = await fetch("http://ip-api.com/json");
      const data = await response.json();
      const currentState = data.regionName;
    //   console.log("Current State:", currentState);
      const isStateInList = states.some((state) => state.name === currentState);
        // console.log("Is State in List:", isStateInList);
        return isStateInList;
    } catch (error) {
      console.error("Error fetching current state:", error);
    }
  }