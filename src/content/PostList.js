import React from 'react'
import Post from './Post'
/*
    userName: String!
    description: String!
    image: String!
    tags: [String!]
    likes: [String!]
*/
      
const PostList = () => {
  const posts = [
    {
      userName: "kalle_anka",
      description: "This is the description",
      image: 'https://i.imgur.com/QHFtJ6Cm.jpeg',
      tags: ['dog', 'cute', 'puppy'],
      likes: ['amund', 'kostas', 'lovely_lady'],
      comments: [{user: 'tom', text: 'wow'}, {user: 'name', text: 'comment text'}]
    },
    {
      userName: "lovely_lady",
      description: "This is the description",
      image: 'https://i.imgur.com/2DQiFy3m.jpeg',
      tags: ['cats', 'funny'],
      likes: ['amund', 'kostas', 'lovely_lady'],
      comments: [{user: 'tommy', text: 'no words...'}, {user: 'name', text: 'comment text'}]
    },
    {
      userName: "ron_perlman",
      description: "Cat that looks like Ron Perlman",
      image: 'https://i.imgur.com/k3e964Zm.jpeg',
      tags: ['cats', 'funny'],
      likes: ['amund', 'kostas', 'lovely_lady'],
      comments: [{user: 'sara', text: 'coool'}, {user: 'name', text: 'comment text'}]
    }
  ];

    return (
      <div>
        {posts.map(item => <Post item={item} />)}
      </div>
    )
}

export default PostList
