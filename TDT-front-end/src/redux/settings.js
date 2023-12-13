import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openArticleDialog:false,
  openProfile:false,
}
export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleDialog(state,action){
            if(!state.openProfile)
                state.openArticleDialog = action.payload ? action.payload : !state.openArticleDialog;
        },
        toggleProfileDialog(state,action){
            if(!state.openArticleDialog)
                state.openProfile = action.payload ? action.payload : !state.openProfile;
        },
    },
})
  
// Action creators are generated for each case reducer function
export const { toggleDialog, toggleProfileDialog } = settingsSlice.actions;
export default settingsSlice.reducer;