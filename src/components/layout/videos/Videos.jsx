import React, { useEffect, useState } from 'react';
import youtube from '../../../apis/youtube';
import ModalVideo from 'react-modal-video';
import { ModalStyle } from './ModalVideoStyle';
import { Box, Flex, Image, Link } from '@chakra-ui/react';
import LoadingSpinner from '../loader/LoadingSpinner'

const Videos = () => {
  const [loading, setLoading] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideoList = async () => {
      const { data } = await youtube.get('/playlistItems', {
        params: {
          playlistId: 'PLbet66nL_ksjn2zpeSgtV3gxF4Azpqzut',
        },
      });
      setVideoList(data.items);
      setLoading(true);
    };
    fetchVideoList();
  }, []);

  const renderVideoList = videoList.map(item => {
    const videoItem = item.snippet;
    //const videoSrc = `https://youtu.be/${videoItem.resourceId.videoId}`;

    const onVideoClick = () => {
      setSelectedVideo(videoItem.resourceId.videoId);
      setOpen(true);
    };
    return (
      <React.Fragment key={videoItem.position}>
        <ModalStyle>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId={selectedVideo}
            onClose={() => setOpen(false)}
          />
        </ModalStyle>
        <Box my={2} display='flex'>
          <Link as="a" onClick={onVideoClick}>
            <Box mr='3' w='150px'>
              <Image objectFit='contain' src={videoItem.thumbnails.standard.url} alt="" />
            </Box>
          </Link>
          <Link my='auto' maxW='200px' h='30px' src={videoItem.thumbnails.standard.url} onClick={onVideoClick} fontSize='sm'>{videoItem.title}</Link>
        </Box>
      </React.Fragment>
    );
  });

  return <Flex flexDirection='column'>{loading ? renderVideoList : <LoadingSpinner />}</Flex>;
};

export default Videos;
