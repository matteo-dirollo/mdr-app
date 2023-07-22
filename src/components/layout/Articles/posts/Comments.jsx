import { Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { deleteComment } from './postsSlice';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import _ from 'lodash';
import { getAuthentication } from '../../../auth/authSlice';

const Comments = ({ articleId, comments }) => {
  const dispatch = useDispatch();
  const authenticated = getAuthentication();

  const handleDelete = commentId => {
    try {
      dispatch(deleteComment({ postId: articleId, commentId }));
    } catch (error) {
      console.log(error);
    }
  };

  const sortedComments = _.orderBy(comments, 'timestamp', 'desc');

  const renderComments = sortedComments.map((comment, index) => {
    return (
      <Box key={index} mb={2}>
        <CommentItem comment={comment} handleDelete={handleDelete} />
      </Box>
    );
  });

  return (
    <Box>
      {authenticated ? <CommentForm articleId={articleId} /> : null}
      {comments ? renderComments : null}
    </Box>
  );
};

export default Comments;
