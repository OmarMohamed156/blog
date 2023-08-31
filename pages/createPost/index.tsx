import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Loader,
  Flex,
  Group,
  TextInput,
  Textarea,
  createStyles,
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from 'react-query';
import blogValidationSchema from '../../Validators/blog';
import { useForm } from '@mantine/form';

interface Values {
  content: string;
  title: string;
  author: string;
}
const useStyles = createStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingBlock: rem(50),
    [theme.fn.smallerThan('md')]: {
      paddingInline: rem(30),
    },
    [theme.fn.largerThan('md')]: {
      paddingInline: rem(100),
    },
  },
  errorMessage: {
    color: theme.colors.red[7],
  },
  NotificationMessageContainer: {},
  notificationMessage: {
    position: 'absolute',
    width: 'fit-content',
    top: 80,
    [theme.fn.largerThan('md')]: {
      zIndex: 9999,
    },
  },
}));
export default function CreatePost() {
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const createPostMutation = useMutation(
    (newPost: Values) =>
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json()),
    {
      // Invalidate the cache when the mutation is successful
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        notifications.show({
          title: 'Success',
          color: 'green',
          message: 'Post submitted successfully!',
        });
      },
      onError: () => {
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'Failed to submit post.',
        });
      },
    }
  );

  const handleSubmit = async (values: Values) => {
    setLoading(true);
    await createPostMutation.mutateAsync(values).then(() => {
      setLoading(false);
    });
    queryClient.invalidateQueries('posts');
  };

  return (
    <Formik
      initialValues={{
        content: '',
        title: '',
        author: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={blogValidationSchema}
    >
      {({ values, errors, handleChange, handleReset, handleBlur, isSubmitting }) => (
        <>
          <Box>
            <Form className={classes.formContainer}>
              <TextInput
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
                name="title"
                id="title"
                withAsterisk
                label="Title"
                placeholder="Blog Title"
              />
              {errors.title && (
                <ErrorMessage className={classes.errorMessage} name="title" component="div" />
              )}
              <TextInput
                value={values.author}
                onBlur={handleBlur}
                onChange={handleChange}
                id="author"
                name="author"
                withAsterisk
                label="Author"
                placeholder="Author Name"
              />
              <ErrorMessage className={classes.errorMessage} name="author" component="div" />
              <Textarea
                value={values.content}
                onBlur={handleBlur}
                onChange={handleChange}
                name="content"
                minRows={24}
                id="content"
                withAsterisk
                label="Content"
                placeholder="Content goes here"
              />
              <ErrorMessage className={classes.errorMessage} name="content" component="div" />
              <Flex gap={10} direction="row" justify="flex-end">
                <Button disabled={loading} color="violet" w={240} type="submit">
                  {loading ? <Loader size="sm" /> : 'Submit'}
                </Button>
              </Flex>
            </Form>
          </Box>
        </>
      )}
    </Formik>
  );
}
