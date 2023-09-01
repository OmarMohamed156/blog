import { createStyles, Paper, Text, Title, Button, rem } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  card: {
    minHeight: rem(350),
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.2,
    marginTop: theme.spacing.xs,
  },

  category: {
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  link: {
    textDecoration: 'none',
  },
  authorName: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: 12,
  },
}));

interface ArticleCardImageProps {
  post: Post;
}

export function BlogCard({ post }: ArticleCardImageProps) {
  const { classes } = useStyles();

  return (
    <Link className={classes.link} href={`/posts/${post.id}`}>
      <Paper shadow="md" p="xl" radius="md" className={classes.card}>
        <div>
          <Title order={5} className={classes.title}>
            {post.title}
          </Title>
          <Text size="sm" mt={15} className={classes.authorName}>
            {post.user?.name}
          </Text>
        </div>
        <Text size="sm" mt={15} className={classes.category}>
          {post.body}
        </Text>
      </Paper>
    </Link>
  );
}
