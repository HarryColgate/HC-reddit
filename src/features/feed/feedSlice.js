import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchFeed = createAsyncThunk(
    'feed/fetchFeed',
    async (inputs) => {
        const {selectedSubreddit, filter} = inputs;
        const res = await fetch(`https://www.reddit.com/r/${selectedSubreddit}/${filter}.json`)
        const json = await res.json()
        return json.data.children.map(subreddit => subreddit.data)
    }
)


const initialState = {
    feed: [],
    selectedSubreddit: "popular",
    filter: "hot",
    isLoading: false,
    error: false,
}

const feedSlice =  createSlice({
    name: 'feed',
    initialState: initialState,
    reducers: {
        setSelectedSubreddit(state, action) {
            state.selectedSubreddit = action.payload;
        },
        setFilter(state, action) {
            state.filter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFeed.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })
        builder.addCase(fetchFeed.fulfilled, (state, action) => {
            state.feed = action.payload;
            state.isLoading = false;
            state.error = false;
        })
        builder.addCase(fetchFeed.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})

export const { setSelectedSubreddit, setFilter } = feedSlice.actions;
export default feedSlice.reducer;