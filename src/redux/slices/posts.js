import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostSkeleton } from "../../components/Post/Skeleton";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags');
    return data;
});

const initialState = {
    posts: {
        items:[],
        status: 'loading',
    } ,
    tags:{
        items:[],
        status: 'loading',
    },

};

const postSlice = createSlice({//===============================================Создаем slice для постов
    name:'posts',
    initialState,
    reducers:{},
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },[fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status ='succeeded';
        },[fetchPosts.rejected]: (state, action) => {
            state.posts.items = [];
            state.posts.status = 'failed';
        },
        [fetchTags.pending]: (state, action) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },[fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status ='succeeded';
        },[fetchTags.rejected]: (state, action) => {
            state.tags.items = [];
            state.tags.status = 'failed';
        },
    },
});

export const postsReducer = postSlice.reducer;