import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from '../axios';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
  const dispatch = useDispatch();
  const {posts, tags} = useSelector(state => state.posts);
  const isPostsLoading =posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(()=>{
    dispatch(fetchPosts());
    dispatch(fetchTags());
  },[]);

  console.log(posts);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items ).map((obj, index) => isPostsLoading ? (
          <Post key={index} isLoading={true}/>
        ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable
            />
          ),
          )};
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Валерий Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Асылбек Мухаммедов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'Это тестовый комментарий',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
