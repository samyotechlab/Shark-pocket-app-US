import { state } from "../Service/Home";
// import { setStateList, setVisible, setMessage } from "../Store/Actions/StateList";
// export const stateList = async () => {
//   console.log("stateList called");
//     try {
//         const response = await state();
//         console.log("response stateeee--->", response)
//         checkCurrentState(response.data)
//     } catch (error) {
//         console.log("error", error)
//     }
// }

// export async function checkCurrentState(states) {
//     try {
//       const response = await fetch("http://ip-api.com/json");
//       console.log("response ip-api--->", response)
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       console.log("data ip-api--->", data)
//       const currentState = data.regionName;
//       console.log("currentState ip-api--->", currentState)
//       const isStateInList = states.some((state) => state.name === currentState);
//       console.log("isStateInList ip-api--->", isStateInList)
//         return isStateInList;
//     } catch (error) {
//       console.error("Error fetching current state:", error);
//     }
//   }
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
