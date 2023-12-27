'use client'

import { Posts } from '@/types/posts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from 'next-auth';
import React, { FC } from 'react'
import NoPostMessage from '../NoPostMessage';
import { Card, CardHeader } from '../ui/card';
import Image from 'next/image';
import ProfileHover from '../profileHover';
import PostGridCard from './post-grid-card';
import PostGridLoading from '../Loading/PostGridLoading';
import FetchDataError from '../FetchDataError';

interface PostsProps {
  tag?: string | null
  fw?: boolean | null
  published?: boolean | null
}

const PostGrid: FC<PostsProps> = ({ tag, fw, published }) => {


  const { data: dataPosts, status } = useQuery<Posts[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get('/api/posts');
      return response.data
    },
  });

  const filteredPosts = dataPosts?.filter(
    post => post.published === published && post.Tag.name === tag
  );

  return (
    <div>
      {filteredPosts?.length === 0 ? (
        <NoPostMessage />
      ) : (
        <>
          {status === 'pending' && <PostGridLoading />}
          {status === 'error' && <FetchDataError />}
          {status !== 'pending' && status !== 'error' && (
            <div className='grid grid-cols-2 gap-3 my-3'>
              {filteredPosts?.map((post) => (
                <PostGridCard
                  key={post.id}
                  post={post}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>

  )
}

export default PostGrid