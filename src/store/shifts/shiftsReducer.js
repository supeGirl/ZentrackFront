import {createSlice} from '@reduxjs/toolkit'
import {
  deleteShiftRequest,
  getShiftsRequest,
  loadAllShiftsRequest,
  logClockIn,
  saveShiftRequest,
  startShiftRequest,
  stopShiftRequest,
  updateShiftRequest,
} from './shifts.action'
import {initialState} from './shifts.types'

const shiftsSlice = createSlice({
  name: 'shifts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logClockIn, (state, action) => {
        state.currentShift.startTime = action.payload
      })

      .addCase(getShiftsRequest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getShiftsRequest.fulfilled, (state, action) => {
        state.loading = false
        state.all = action.payload
      })
      .addCase(getShiftsRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(loadAllShiftsRequest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadAllShiftsRequest.fulfilled, (state, action) => {
        state.loading = false
        state.all = action.payload
      })
      .addCase(loadAllShiftsRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(startShiftRequest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(startShiftRequest.fulfilled, (state, action) => {
        state.loading = false
        state.currentShift.startTime = action.payload.startTime
      })
      .addCase(startShiftRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(stopShiftRequest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(stopShiftRequest.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(stopShiftRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(saveShiftRequest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(saveShiftRequest.fulfilled, (state, action) => {
        state.loading = false
        state.all.push(action.payload)
        state.currentShift = {startTime: {}, endTime: {}}
      })
      .addCase(saveShiftRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(updateShiftRequest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateShiftRequest.fulfilled, (state, action) => {
        state.loading = false
        state.all = state.all.map((shift) => {
          const isUpdated = shift._id === action.payload.shift._id

          return isUpdated ? action.payload.shift : shift
        })
      })
      .addCase(updateShiftRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(deleteShiftRequest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteShiftRequest.fulfilled, (state, action) => {
        state.loading = false
        state.all = state.all.filter((shift) => shift._id !== action.payload)
      })
      .addCase(deleteShiftRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const shiftsReducer = shiftsSlice.reducer
