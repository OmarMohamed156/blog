import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  TextInput,
  Textarea,
  createStyles,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import blogValidationSchema from '../../Validators/blog';

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
}));
export default function CreatePost() {
  const { classes } = useStyles();

  const handleSubmit = (values: Values) => {
    console.log(values, 'values');
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
      {({ values, errors, handleChange, handleBlur }) => (
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
              <Flex direction="row" justify="flex-end">
                <Button color="violet" w={240} type="submit">
                  Submit
                </Button>
              </Flex>
            </Form>
          </Box>
        </>
      )}
    </Formik>
  );
}
