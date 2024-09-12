// TODO: Fix this. This is very bad pracitce but some of the inputs to convert a tiptap html are not typed
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { generateJSON } from "@tiptap/html";

function createText(text: string, size: number, bold?: boolean) {
  return {
    text: text,
    bold: bold !== undefined && bold === true ? true : false,
    fontSize: size * 0.75,
  };
}
function transferToMainStruct(dest: Array<any>, source: Array<any>) {
  for (let i = 0; i < source.length; i++) {
    dest.push(source[i]);
  }
}

function doesMarksIncludeBold(marks: Array<{ type: string }>) {
  if (marks) {
    for (let i = 0; i < marks.length; i++) {
      if (marks[i].type && marks[i].type === "bold") {
        return true;
      }
    }
  }
  return false;
}

function iterateOverContent(content: any, isRoot: boolean, size: number) {
  const ret: any = [];
  for (let i = 0; i < content.length; i++) {
    if (content[i].type === "paragraph") {
      if (content[i].content) {
        const tmp = iterateOverContent(content[i].content, false, size);
        if (isRoot === false) {
          ret.push(createText("\n", size));
        }
        // Very important since we want inline styling
        ret.push({ text: tmp });
      }
    } else if (content[i].type === "text") {
      ret.push(
        createText(
          content[i].text,
          size,
          doesMarksIncludeBold(content[i].marks)
        )
      );
    } else if (content[i].type === "bulletList") {
      const tmp = iterateOverContent(content[i].content, true, size);
      ret.push({ ul: tmp });
    } else if (content[i].type === "orderedList") {
      const tmp = iterateOverContent(content[i].content, true, size);
      ret.push({ ol: tmp });
    } else if (content[i].type === "listItem") {
      const tmp = iterateOverContent(content[i].content, isRoot, size);
      transferToMainStruct(ret, tmp);
    } else {
      console.log("Not Handled", content[i].type);
      ret.push(createText("Not Handled:" + JSON.stringify(content[i]), size));
    }
  }
  return ret;
}

export function generatePDFFromHTML(html: any, size: number) {
  if (html) {
    const cleanHTML = generateJSON(html, [
      Bold,
      Paragraph,
      Document,
      Text,
      BulletList,
      OrderedList,
      ListItem,
    ]);
    if (cleanHTML && cleanHTML.content) {
      const pdfData = iterateOverContent(cleanHTML.content, false, size);
      return pdfData;
    }
  }
  return { text: "Error. Redo this narrative." + JSON.stringify(html) };
}
