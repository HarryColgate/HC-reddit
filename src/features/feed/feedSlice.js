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

export const fetchComments = createAsyncThunk(
    'feed/fetchComments',
    async (permalink) => {
        const res = await fetch(`https://www.reddit.com${permalink}.json`)
        const json = await res.json()
        return json[1].data.children.map(comments => comments.data)
    }
)


const initialState = {
    feed: [],
    comments: [],
    selectedSubreddit: "popular",
    selectedPost: "",
    filter: "hot",
    activeArray: [],
    isLoading: false,
    error: false,
    commentsIsLoading: false,
    commentsIsError: false
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
        },
        resetArray(state) {
            for (let i = 0; i< state.feed.length; i++) {
                state.activeArray[i] = false;
            }
        },
        changeHidden(state, action) {
            state.activeArray[action.payload] = !state.activeArray[action.payload];
        },
        changeSelectedPost(state, action) {
            state.selectedPost = action.payload.slice(0, -1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFeed.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })
        builder.addCase(fetchFeed.fulfilled, (state, action) => {
            state.feed = action.payload;
            const newArr = [];
            for (let i = 0; i < action.payload.length; i++) {
                newArr.push(false);
            }
            state.activeArray = newArr;
            state.isLoading = false;
            state.error = false;
        })
        builder.addCase(fetchFeed.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
        builder.addCase(fetchComments.pending, (state) =>{
            state.commentsIsLoading = true;
            state.commentsIsError = false;
        })
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.commentsIsLoading = false;
            state.commentsIsError = false;
        })
        builder.addCase(fetchComments.rejected, (state) => {
            state.commentsIsLoading = false;
            state.commentsIsError = true;
        })
    }
})

export const { setSelectedSubreddit, setFilter, changeHidden, resetArray, changeSelectedPost } = feedSlice.actions;
export default feedSlice.reducer;