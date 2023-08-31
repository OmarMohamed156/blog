import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Navbar from '../components/shared/Navbar';
import { GetServerSideProps, GetStaticProps } from 'next';
import { Container, Flex, Grid, Skeleton, createStyles } from '@mantine/core';
import NoData from '../components/shared/NoData';
import { BlogCard } from '../components/shared/BlogCard';

interface Props {
  title: string;
  data: Post[];
}

export default function HomePage({ data }: Props) {
  if (data?.length === 0 || !data) {
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
          padding: '2rem',
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

export const getServerSideProps: GetServerSideProps = async () => {
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
      props: {
        data: data?.length > 0 ? data?.slice(0, 10) : [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: [],
      },
    };
  }
};