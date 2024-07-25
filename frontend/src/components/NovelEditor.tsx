import { Editor } from "novel";
import { type Editor as TipTapEditor } from "@tiptap/core";
import { Card, CardContent } from "../../@/components/ui/card";
 
type NovelEditorProps = {
  setContent: any;
};

export const NovelEditor = ({setContent}:NovelEditorProps)=>{
  return <Card className="">
           <CardContent>
           <Editor
                  defaultValue={{
                  type: "doc",
                  content: [],
                  // content: content as JSONContent[] | undefined,
                  }}
                  onDebouncedUpdate={(editor?: TipTapEditor) => {
                  setContent(editor?.getHTML());
                  }}
                  disableLocalStorage={true}
                  className="rounded-md border shadow-none"
              />
          </CardContent>
      </Card>

}