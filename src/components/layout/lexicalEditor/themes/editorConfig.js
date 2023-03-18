import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { EmoticonNode } from '../nodes/EmoticonNode';
import { ImageNode } from '../nodes/ImageNode';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import ExampleTheme from './ExampleTheme';
import { MentionNode } from '../nodes/MentionNode';
import { EmojiNode } from '../nodes/EmojiNode';
import { KeywordNode } from '../nodes/KeywordNode';

export const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    EmoticonNode,
    ImageNode,
    MentionNode,
    EmojiNode,
    KeywordNode
  ],
};
