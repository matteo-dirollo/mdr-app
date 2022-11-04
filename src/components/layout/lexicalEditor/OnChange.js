import { $getRoot, $getSelection } from "lexical";
export default function onChange(editorState, editor) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();
      const stringifiedEditorState = JSON.stringify(
        editor.getEditorState().toJSON()
      );
  
      const newEditorState = editor.parseEditorState(stringifiedEditorState);
        
        console.log(newEditorState)
   
    });}