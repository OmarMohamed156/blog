import React from 'react';

type Props = {
  post: Post;
};

export default function Post({ post }: Props) {
  console.log(post);
  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <h1
        style={{
          fontWeight: 900,
        }}
      >
        {post.title}
      </h1>
      <p>{post.body}</p>
      <p>{post.user?.name}</p>
      {/* {post?.comments?.map((comment: Comment) => (
        <div key={comment.id}>
          <p>{comment.name}</p>
          <p>{comment.body}</p>
        </div>
      ))} */}
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  const { id } = params;
  const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await postRes.json();
  const userRes = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await userRes.json();
  const user = users.find((user: User) => user.id === post.userId);
  const commetsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
  const comments = await commetsRes.json();

  // add user name and image to comments

  return {
    props: {
      post: {
        ...post,
        user,
        comments,
      },
    },
  };
}
