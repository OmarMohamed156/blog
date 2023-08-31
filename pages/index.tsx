import { GetServerSideProps, GetStaticProps } from 'next';
import { Grid, Container } from '@mantine/core';
import NoData from '../components/shared/NoData';
import { BlogCard } from '../components/shared/BlogCard';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

interface Props {
  title: string;
  res: {
    data: Post[];
    error?: string | null;
  };
}

export default function HomePage({ res: { data, error } }: Props) {
  if (data?.length === 0 || error) {
    return (
      <>
        <NoData />
      </>
    );
  }

  return (
    <>
      <main

        style={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem',
        }}
      >
        <Grid>
          {data?.map((post) => (
            <Grid.Col key={post.id} xs={12} md={6} lg={3}>
              <BlogCard post={post} />
            </Grid.Col>
          ))}
        </Grid>
      </main>
    </>
  );
}

const fetchData = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const postsRes = await res.json();

    const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await usersRes.json();

    const data = postsRes.map((post: Post) => {
      const user = users.find((user: User) => user.id === post.userId);
      return {
        ...post,
        user,
      };
    });

    return {
      data: data?.slice(0, 4),
      error: null,
    };
  } catch (error: any) {
    return {
      data: [],
      error: error?.message,
    };
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('postsData', fetchData);

  const res: any = dehydrate(queryClient)?.queries[0]?.state?.data;
  return {
    props: {
      res,
    },
  };
};
