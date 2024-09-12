import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { generateJSON } from "@tiptap/html";

function createText(text: string, bold?: boolean) {
  return {
    text: text,
    bold: bold !== undefined && bold === true ? true : false,
  };
}
function transferToMainStruct(dest: any, source: any) {
  for (var i = 0; i < source.length; i++) {
    dest.push(source[i]);
  }
}
function doesMarksIncludeBold(marks: any) {
  if (marks) {
    for (var i = 0; i < marks.length; i++) {
      if (marks[i].type && marks[i].type === "bold") {
        return true;
      }
    }
  }
  return false;
}
function iterateOverContent(content: any, isRoot: boolean) {
  var ret: any = [];
  for (var i = 0; i < content.length; i++) {
    if (content[i].type === "paragraph") {
      if (content[i].content) {
        var tmp = iterateOverContent(content[i].content, false);
        if (isRoot === false) {
          ret.push(createText("\n"));
        }
        // Very important since we want inline styling
        ret.push({ text: tmp });
      }
    } else if (content[i].type === "text") {
      ret.push(
        createText(content[i].text, doesMarksIncludeBold(content[i].marks))
      );
    } else if (content[i].type === "bulletList") {
      var tmp = iterateOverContent(content[i].content, true);
      ret.push({ ul: tmp });
    } else if (content[i].type === "orderedList") {
      var tmp = iterateOverContent(content[i].content, true);
      ret.push({ ol: tmp });
    } else if (content[i].type === "listItem") {
      var tmp = iterateOverContent(content[i].content, isRoot);
      transferToMainStruct(ret, tmp);
    } else {
      console.log("Not Handled", content[i].type);
      ret.push(createText("Not Handled:" + JSON.stringify(content[i])));
    }
  }
  return ret;
}

export function generatePDFFromHTML(html: any) {
  if (html) {
    var cleanHTML = generateJSON(html, [
      Bold,
      Paragraph,
      Document,
      Text,
      BulletList,
      OrderedList,
      ListItem,
    ]);
    if (cleanHTML && cleanHTML.content) {
      var pdfData = iterateOverContent(cleanHTML.content, false);
      return pdfData;
    }
  }
  return { text: "Error. Redo this narrative." + JSON.stringify(html) };
}
