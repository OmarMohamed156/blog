import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { createStyles } from '@mantine/core';
import { Comment } from '../../components/shared/Comment';

type Props = {
  post: Post;
  dehydratedState: any;
};

const useStyles = createStyles((theme) => ({
  container: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '2rem',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? '#fff' : theme.colors.dark[7],
  },
}));

export default function Post({}: Props) {
  const { classes } = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useQuery('post', async () => {
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await postRes.json();
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await userRes.json();
    const user = users.find((user: User) => user.id === post.userId);
    const commetsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    const comments = await commetsRes.json();
    const commentsWithUser = comments.map((comment: Comment) => {
      return {
        ...comment,
      };
    });
    const data = {
      ...post,
      user,
      comments: commentsWithUser,
    };
    return data;
  });

  console.log(data);

  if (isLoading) {
    return <div className={classes.loading}>Loading...</div>;
  }

  // // @ts-ignore
  // console.log(error?.message);

  if (error) {
    // @ts-ignore
    return <div className={classes.error}>{error?.message} Post</div>;
  }

  return (
    <div className={classes.container}>
      <h1
        style={{
          fontWeight: 900,
        }}
      >
        {data?.title}
      </h1>
      <p>by: {data?.user?.name}</p>
      <p>{data?.body}</p>

      <h2>Comments</h2>

      {data?.comments?.map((comment: Comment) => (
        <Comment username={comment.email} key={comment.id} body={comment.body} />
        // <div key={comment.id}>
        //   <p>{comment.name}</p>
        //   <p>{comment.body}</p>
        // </div>
      ))}
    </div>
  );
}

// export async function getServerSideProps({ params }: any) {
//   const { id } = params;

//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery('post', async () => {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
//     const data = await response.json();
//     return data;
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };

//   const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
//   const post = await postRes.json();
//   const userRes = await fetch(`https://jsonplaceholder.typicode.com/users`);
//   const users = await userRes.json();
//   const user = users.find((user: User) => user.id === post.userId);
//   const commetsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
//   const comments = await commetsRes.json();

//   // add user name and image to comments

//   return {
//     props: {
//       post: {
//         ...post,
//         user,
//         comments,
//       },
//     },
//   };
// }
