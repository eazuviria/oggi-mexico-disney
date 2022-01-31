export const GeneralReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_LOAD_STYLE':
            return {
                ...state,
                loadStyle: action.payload
            }
        default:
            return state;
    }
}