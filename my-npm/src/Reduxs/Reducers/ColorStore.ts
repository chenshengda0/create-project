const initState = {
    axis: [0, 0],
    rgb: "",
    hex: "",
    gray: "",
};

export default function ColorStore(state=initState, action:any){
    switch(true){
        case action.type === SET_COLOR_STORE:
            return {
                ...state,
                ...action.data,
            }
        default: 
            return state;
    }
}