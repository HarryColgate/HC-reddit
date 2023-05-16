import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSub: "Popular",
  sortBy: "Hot",
  menulist: [
    {name: "popular"},
    {name: "all"},
  ],
  subredditlist: [
    {name: "pics"},
    {name: "oldschoolcool"},
    {name: "blessedimages"},
    {name: "catsstandingup"},
    {name: "casualuk"},
    {name: "wallpapers"},
    {name: "art"},
    {name: "trebuchetmemes"},
    {name: "comedyheaven"},
    {name: "cozyplaces"}
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