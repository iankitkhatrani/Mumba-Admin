import { createSlice } from "@reduxjs/toolkit";

export const CurrentPageDataSlice = createSlice({
    name: "CurrentPage",
    initialState: {
        value:"Dashboard",
    },
    reducers: {

        AddCurrentPage: (state, action) => {
            const newData = action.payload;

            if (newData !== "") {
                state.value = action.payload;
            }

        },
    },
});

export const { AddCurrentPage } = CurrentPageDataSlice.actions;
export default CurrentPageDataSlice.reducer;

