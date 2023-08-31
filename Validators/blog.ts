import * as yup from 'yup';

const blogValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(100, 'Title must be less than 100 characters'),
  author: yup.string().required('Author is required'),
  content: yup
    .string()
    .required('Content is required')
    .min(50, 'Content must be at least 50 characters'),
});

export default blogValidationSchema;
