import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaffModel } from "../../models/StaffModel";

interface StaffState {
  [id:number] :StaffModel
}

const initialState: StaffState = {
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaffData: (state, action: PayloadAction<StaffModel[]>) => {
      action.payload.forEach(staff=>{
        state[staff.id] = staff;
      })
    },
  },
});

export const { setStaffData } = staffSlice.actions;
export default staffSlice.reducer;
