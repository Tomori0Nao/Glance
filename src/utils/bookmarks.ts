import { url } from "inspector";
import { isHomePage } from "./common";

enum BookMarkType{
  homepage,
  other
}
interface BookMark {
  title: string;
  url: string;
  id: string;
  type: BookMarkType;
}

interface BookMarkList {
  data: BookMark[];
}

// check if the bookmark is a folder and if it has children
// push its children to the array
function getBookmarks(bookmarks: BookMark[], bookmarkTreeNode: chrome.bookmarks.BookmarkTreeNode[]) {
  if (bookmarkTreeNode.length > 0) {
    for (let i = 0; i < bookmarkTreeNode.length; i++) {
      if (bookmarkTreeNode[i].url == null) {
        chrome.bookmarks.getChildren(bookmarkTreeNode[i].id, (children) => {
          chrome.runtime.sendMessage({ action: { type: "getBookmarks" }, message: children })
          getBookmarks(bookmarks, children)
        })
      } else {
          bookmarks.push({
            title: bookmarkTreeNode[i].title,
            url: bookmarkTreeNode[i].url!,
            id: bookmarkTreeNode[i].id,
            type:isHomePage(bookmarkTreeNode[i].url!) ? BookMarkType.homepage : BookMarkType.other
          }
          )
      }
    }
  }
}
export type {
  BookMark,
  BookMarkList,
}
export { getBookmarks, BookMarkType }