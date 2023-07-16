import React, { useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Stack,
  useToast,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  FormLabel,
} from '@chakra-ui/react';
import { CheckboxContainer, CheckboxControl } from 'formik-chakra-ui';
import { Form, Formik } from 'formik';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import * as Yup from 'yup';
import MyTextInput from '../../../auth/MyTextInput';

import EditorBubbles from '../../lexicalEditor/plugins/EditorBubbles';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { editorConfig } from '../../lexicalEditor/themes/editorConfig';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import TreeViewPlugin from '../../lexicalEditor/plugins/TreeViewPlugin';
import ToolbarPlugin from '../../lexicalEditor/plugins/ToolbarPlugin';

import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

import ListMaxIndentLevelPlugin from '../../lexicalEditor/plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from '../../lexicalEditor/plugins/CodeHighlightPlugin';
import AutoLinkPlugin from '../../lexicalEditor/plugins/AutoLinkPlugin';
import Placeholder from '../../lexicalEditor/Placeholder';
import '../../lexicalEditor/styles.css';
import { TRANSFORMERS } from '@lexical/markdown';
import EmoticonPlugin from '../../lexicalEditor/plugins/EmoticonPlugin';

// import {$generateHtmlFromNodes} from '@lexical/html';

import { useDispatch } from 'react-redux';
import { addNewPost } from './postsSlice';
import { FiFile } from 'react-icons/fi';
import ImagesPlugin from '../../lexicalEditor/plugins/ImagesPlugin';
import YouTubePlugin from '../../lexicalEditor/plugins/YoutubePlugin';
import AutoEmbedPlugin from '../../lexicalEditor/plugins/AutoembedPlugin';
import FigmaPlugin from '../../lexicalEditor/plugins/FigmaPlugin';
import TwitterPlugin from '../../lexicalEditor/plugins/TwitterPlugin';

const AddPostForm = () => {
  const toast = useToast();
  const editorInstanceRef = useRef(null);
  const dispatch = useDispatch();
  const textColor = useColorModeValue('gray.700', 'gray.100');

  const toastSuccess = () => {
    toast({
      title: 'Post added.',
      description: 'You can see it in the blog',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const initialValues = {
    title: '',
    editor: {},
    img: null,
    tags: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    img: Yup.mixed().required(),
    tags: Yup.array().min(1),
  });

  const onSavePost = values => {
    if (values) {
      dispatch(addNewPost(values));
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    onSavePost(values);
    toastSuccess();
    setSubmitting(false);
    // console.log(values.editor)
  };

  return (
    <Flex maxW="full" overflow="hidden">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          isSubmitting,
          isValid,
          dirty,
          setFieldValue,
          handleBlur,
          handleReset,
          errors,
        }) => (
          <Form>
            <Box>
              <MyTextInput label="Title" name="title" />
            </Box>
            <Box my={8}>
              <LexicalComposer initialConfig={editorConfig}>
                <Box
                  sx={{
                    '.other:h2': {
                      fontSize: '18px',
                      color: textColor,
                      marginBottom: '7px',
                    },
                  }}
                  className="editor-container"
                >
                  <ToolbarPlugin />
                  <Box className="editor-inner">
                    <RichTextPlugin
                      contentEditable={
                        <ContentEditable className="editor-input" />
                      }
                      placeholder={<Placeholder />}
                      ErrorBoundary={LexicalErrorBoundary}
                    />
                    <EditorBubbles editorInstanceRef={editorInstanceRef} />
                    <OnChangePlugin
                      onChange={(editorState, editor) => {
                        editorState.read(() => {
                          setFieldValue('editor', editorState);
                        });
                      }}
                    />
                    <HistoryPlugin />
                    <TreeViewPlugin />
                    <AutoEmbedPlugin />
                    <AutoFocusPlugin />
                    <CodeHighlightPlugin />
                    <YouTubePlugin />
                    <ImagesPlugin />
                    <FigmaPlugin />
                    <TwitterPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <AutoLinkPlugin />
                    <EmoticonPlugin />
                    <ListMaxIndentLevelPlugin maxDepth={7} />
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                  </Box>
                </Box>
              </LexicalComposer>
            </Box>
            <br />
            <Box>
              <FormLabel>Image</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={FiFile} />
                </InputLeftElement>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target;
                    setFieldValue('img', file.files[0]);
                  }}
                  name="img"
                  label="Image"
                  sx={{
                    '::file-selector-button': {
                      height: 10,
                      padding: 0,
                      mr: 8,
                      background: 'none',
                      border: 'none',
                      fontWeight: 'bold',
                    },
                  }}
                />
              </InputGroup>
            </Box>
            <br />
            <CheckboxContainer name="tags" label="Tags">
              <CheckboxControl name="tags" value="Design">
                Design
              </CheckboxControl>
              <CheckboxControl name="tags" value="Art">
                Art
              </CheckboxControl>
              <CheckboxControl name="tags" value="Video">
                Video
              </CheckboxControl>
              <CheckboxControl name="tags" value="Web">
                Web
              </CheckboxControl>
              <CheckboxControl name="tags" value="Digital Art">
                Digital Art
              </CheckboxControl>
              <CheckboxControl name="tags" value="3D">
                3D
              </CheckboxControl>
              <CheckboxControl name="tags" value="Architecture">
                Architecture
              </CheckboxControl>
              <CheckboxControl name="tags" value="Product Design">
                Product Design
              </CheckboxControl>
            </CheckboxContainer>
            <br />
            <Stack>
              <Button
                onClick={() => {
                  handleReset();
                }}
                colorScheme="gray"
              >
                Reset
              </Button>
              <Button
                isLoading={isSubmitting}
                disable={!isValid || !dirty || isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                Add
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default AddPostForm;
