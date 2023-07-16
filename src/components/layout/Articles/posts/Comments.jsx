import { Avatar, Box, Button, Flex, Text, Link } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  addComment,
  deleteComment,
  fetchComments,
  selectAllPosts,
} from './postsSlice';
import * as Yup from 'yup';
import TextareaInput from '../../forms/TextareaInput';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useEffect } from 'react';
import {
  appLoaded,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../../../store/asyncSlice';
// import { fetchUserById, getUsersFromState } from '../../../auth/authSlice';

const Comments = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const { articleId } = useParams();
  const article = _.find(posts, { id: articleId });
  const comments = article?.comments ? Object.values(article.comments) : [];
  // const users = useSelector(getUsersFromState);

  // console.log(users);

  useEffect(() => {
    dispatch(fetchComments(article));
  }, [dispatch, article]);
  //   const currentUser = getCurrentUserFromState();
  const validationSchema = Yup.object({
    comment: Yup.string().required('Comment is required'),
    // .min(5, 'Comment must be at least 14 characters long'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(asyncActionStart());
    try {
      console.log(values);
      // Delete the postId later, we don't need it
      dispatch(addComment({ postId: articleId, comment: values.comment }));
      resetForm();
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    } finally {
      dispatch(fetchComments(articleId));
      setSubmitting(false);
      dispatch(asyncActionFinish());
      dispatch(appLoaded());
    }
  };

  const handleDelete = commentId => {
    try {
      console.log('Deleting comment', commentId);
      dispatch(deleteComment({ postId: articleId, commentId }));
    } catch (error) {
      console.log(error);
    }
  };

  const renderComments = comments.map((comment, index) => {
    // dispatch(fetchUserById(comment.uid));
    // const user = users.find(user => user.uid === comment.uid);
    // const displayName = user?.displayName || 'Unknown User';
    // const photoURL = user?.photoURL || ''; // Provide a default value if photoURL is not available
    console.log(comment);
    return (
      <Box key={index} mb={2}>
        <Flex alignItems="center">
          <Avatar size="sm" name={''} src={''} />
          <Box ml={2}>
            <Text fontSize="sm" fontWeight="bold">
              {''}
            </Text>
            <Text fontSize={'xs'}>{comment.comment}</Text>
          </Box>
        </Flex>
        <Box ml={10}>
          {/* <Link as="button" type="submit">Modify</Link> */}
          <Link
            as="button"
            type="submit"
            onClick={() => handleDelete(comment.id)}
            fontSize={'xs'}
          >
            Delete
          </Link>
        </Box>
      </Box>
    );
  });

  return (
    <Box>
      {comments ? renderComments : null}
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
