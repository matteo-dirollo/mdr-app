import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { addComment, selectAllPosts } from './postsSlice';
import * as Yup from 'yup';
import TextareaInput from '../../forms/TextareaInput';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

const Comments = ({ comments }) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const { articleId } = useParams();
  const article = _.find(posts, { id: articleId });

  //   const currentUser = getCurrentUserFromState();
  const validationSchema = Yup.object({
    comment: Yup.string()
      .required('Comment is required')
      .min(14, 'Comment must be at least 14 characters long'),
  });
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    try {
      console.log(values, article.id);
      dispatch(addComment({ postId: article.id, comment: values.comment }));
      resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Box>
      {comments && comments.length > 0
        ? comments.map((comment, index) => (
            <Flex key={index} alignItems="center" mb={2}>
              <Avatar
                size="sm"
                name={comment.user.displayName}
                src={comment.user.photoURL}
              />
              <Box ml={2}>
                <Text fontSize='sm' fontWeight="bold">{comment.user.displayName}</Text>
                <Text fontSize={'xs'}>{comment.comment}</Text>
              </Box>
            </Flex>
          ))
        : null}
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form>
            <TextareaInput name="comment" />
            {errors.comment && (
              <Text color="red.300" fontSize="sm">
                {errors.comment}
              </Text>
            )}
            <Button
              isLoading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              colorScheme="teal"
              my={5}
            >
              Add Comment
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Comments;
