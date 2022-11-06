import React, { useRef } from 'react';
import { Box, Button, Flex, Stack, useToast } from '@chakra-ui/react';
import { CheckboxContainer, CheckboxControl } from 'formik-chakra-ui';
import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import MyTextInput from '../../auth/MyTextInput';
import FileUploadInput from '../forms/FileUploadInput';
import EditorBubbles from '../lexicalEditor/plugins/EditorBubbles';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { editorConfig } from '../lexicalEditor/themes/editorConfig'; 
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import TreeViewPlugin from '../lexicalEditor/plugins/TreeViewPlugin';
import ToolbarPlugin from '../lexicalEditor/plugins/ToolbarPlugin';

import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

import ListMaxIndentLevelPlugin from '../lexicalEditor/plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from '../lexicalEditor/plugins/CodeHighlightPlugin';
import AutoLinkPlugin from '../lexicalEditor/plugins/AutoLinkPlugin';
import Placeholder from '../lexicalEditor/Placeholder';
import OnChange from '../lexicalEditor/OnChange';
import '../lexicalEditor/styles.css';

const AddPostForm = () => {
  const toast = useToast();
  const editorInstanceRef = useRef(null);
  
  

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
    editor: editorInstanceRef,
    img: [],
    tags: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    // img: Yup.mixed().required('Required'),
    tags: Yup.array().min(1),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const currentStringifiedEditorState = JSON.stringify(
      editorInstanceRef.current.getEditorState()
    );
    alert(
      JSON.stringify({ ...values, currentStringifiedEditorState }, null, 2)
    );
    // dispatch(postAdded());
    console.log(values);
    toastSuccess();
    setSubmitting(false);
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
            <Box my={5}>
              <LexicalComposer initialConfig={editorConfig}>
                <div className="editor-container">
                  <ToolbarPlugin />
                  <div className="editor-inner">
                    <RichTextPlugin
                      contentEditable={
                        <ContentEditable className="editor-input" />
                      }
                      placeholder={<Placeholder />}
                    />
                    <EditorBubbles editorInstanceRef={editorInstanceRef} />
                    <OnChangePlugin onChange={OnChange} />
                    <HistoryPlugin />
                    <TreeViewPlugin />
                    <AutoFocusPlugin />
                    <CodeHighlightPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <AutoLinkPlugin />
                    <ListMaxIndentLevelPlugin maxDepth={7} />
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                  </div>
                </div>
              </LexicalComposer>
            </Box>
            <Box>
              <FileUploadInput
                setFieldValue={setFieldValue}
                name="img"
                label="Image"
              />
            </Box>

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

            <Stack>
              <Button onClick={handleReset} colorScheme="gray">
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
