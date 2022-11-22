import React, { useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import './styles.css';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import EmoticonPlugin from './plugins/EmoticonPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { editorConfig } from './themes/editorConfig';

function PlainEditor({ stateInstance }) {

  const [newEditorConfig] = useState({
    ...editorConfig,
    editable: false,
    editorState: stateInstance,
  });

  return (
    <LexicalComposer initialConfig={newEditorConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
          />

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
