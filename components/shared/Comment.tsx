import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  rem,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  },

  body: {
    // paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}));

interface CommentHtmlProps {
  body: string;
  username: string;
}

export function Comment({ body, username }: CommentHtmlProps) {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" m={15} className={classes.comment}>
      <Group>
        {/* <Avatar src={author.image} alt={author.name} radius="xl" /> */}
        <div>
          <Text fz="sm">{username?.split('@')[0]}</Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: body }} />
      </TypographyStylesProvider>
    </Paper>
  );
}
