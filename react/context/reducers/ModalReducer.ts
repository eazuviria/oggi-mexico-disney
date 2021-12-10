export const ModalReducer = (state: ModalContext, action: any) => {
  switch (action.type) {
    case 'SET_COLORS':
      return {
        ...state,
        colors: action.payload
      }
    case 'SET_SELECTED_COLOR':
      return {
        ...state,
        selectedColor: action.payload
      }
    case 'SET_AVAILABLES_SKUS_PER_COLOR':
      return {
        ...state,
        availableSkusPerColor: action.payload
      }
    case 'SET_SELECTED_SIZE':
      return {
        ...state,
        selectedSize: action.payload
      }
    default:
      return state;
  }
}