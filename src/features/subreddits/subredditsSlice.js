import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSub: "Popular",
  sortBy: "Hot",
  menulist: [
    {name: "popular"},
    {name: "all"},
  ],
  subredditlist: [
    {name: "eyebleach"},
    {name: "perfectloops"},
    {name: "blessedimages"},
    {name: "worldnews"},
    {name: "casualuk"},
    {name: "explainlikeimfive"},
    {name: "gifs"},
    {name: "ama"},
    {name: "shittyfoodporn"},
    {name: "askreddit"},
  ]
};

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
      changeCurrentSub(state, action) {
        state.currentSub = action.payload;
      },
      changeSortBy(state, action) {
        state.sortBy = action.payload;
      }
    }
  });

export const { changeCurrentSub, changeSortBy } = subredditsSlice.actions;

export const selectMenu = (state) => state.subreddits.menulist;
export const selectSubreddits = (state) => state.subreddits.subredditlist;


//REMEMBER TO DO THIS TO USE YOUR SLICE DUMMY!!!!
export default subredditsSlice.reducer;