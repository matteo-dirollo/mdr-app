import React, { useRef } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
// import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import './styles.css';
import ChangeEditorState from './plugins/ChangeEditorState';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import EmoticonPlugin from './plugins/EmoticonPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { readOnlyEditorConfig } from './themes/readOnlyEditorConfig';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import Placeholder from './Placeholder';

function PlainEditor({stateInstance}) {
  const editorInstanceRef = useRef(null);

  return (
    <LexicalComposer initialConfig={readOnlyEditorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          {/* <ChangeEditorState
            stateInstance={stateInstance}
            editorInstanceRef={editorInstanceRef}
          /> */}
          
          <HistoryPlugin />
          <TreeViewPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <EmoticonPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}

export default PlainEditor;
