// Sample code if using extensionpay.com


import { BookMark, BookMarkType } from '../utils/bookmarks'
import { getRandomNumber } from '../utils/common'
import { ApiConfig, isApiConfigEmpty } from '../utils/options-page'
const api_config = reactive<ApiConfig>({ api_key: "", url: "", model: "", app_id: "", firecrawl_url: "" })
const bookMarkList = reactive<BookMark[]>([])
chrome.runtime.onInstalled.addListener(async (opt) => {
  // Check if reason is install or update. Eg: opt.reason === 'install' // If extension is installed.
  // opt.reason === 'update' // If extension is updated.
  if (opt.reason === "install") {
    chrome.tabs.create({
      active: true,
      // Open the setup page and append `?type=install` to the URL so frontend
      // can know if we need to show the install page or update page.
      url: chrome.runtime.getURL("src/ui/setup/index.html#/setup/install"),
    })
    readBookMarks().then(() => {
      console.log("bookMarkList: " + bookMarkList)
    })


    // Scrape a website
    const header = new Headers({
      "Content-Type": "application/json",
    })

    return
  }
}


)

self.onerror = function (message, source, lineno, colno, error) {
  console.info("Error: " + message)
  console.info("Source: " + source)
  console.info("Line: " + lineno)
  console.info("Column: " + colno)
  console.info("Error object: " + error)
}

console.info("hello world from background")

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Received message:", request)
  // console.log("Received data:",request["data"])
  if (bookMarkList.length == 0) {
    readBookMarks().then(() => {
      console.log("bookMarkList: " + bookMarkList)
    })
  }
  if (request["action"]["type"] === 'READ_LIST') {
    getRandonBookMarks(10, bookMarkList.length).then((bookMarkListTemp) => {
      const respense = { action: { type: "READ_LIST_FINISHED", message: "success" }, data: bookMarkListTemp }
      sendResponse(respense)
      console.log("bookMarkList Temp: " + bookMarkListTemp);

    }).catch((error) => {
      console.log("error: " + error);

      // sendResponse("error!!!"+error)
    })
  }
  if (request["action"]["type"] === 'config') {
    api_config.api_key = request["message"]["api_key"]
    api_config.url = request["message"]["url"]
    api_config.model = request["message"]["model"]
    api_config.app_id = request["message"]["app_id"]
    api_config.firecrawl_url = request["message"]["firecrawl_url"]
    console.log("api_config firecrawl_url: " + api_config.firecrawl_url);
  }
  console.log("api_config: " + api_config);

  return true
})

async function readBookMarks() {
  // 读取特定文件夹的书签
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getChildren('0', (bookmarkItems) => {
      getBookmarks(bookMarkList, bookmarkItems)
      console.log({ type: "READ_LIST", data: bookMarkList })
    })
    resolve(bookMarkList)
  })
}
async function getRandonBookMarks(num: number, max: number) {
  // 读取特定文件夹的书签
  return new Promise((resolve, reject) => {
    let indexList = getRandomNumber(num, max)
    // console.log("bookMarkList in getRandonBookMarks: " + bookMarkList)
    console.log("indexList: " + indexList);


    if (bookMarkList.length > 0) {
      let bookMarkListTemp: BookMark[] = []

      if (bookMarkList.length < num) {
        console.log("bookMarkList.length > num");

        bookMarkListTemp = bookMarkList.slice(0, num)
      }
      else {
        console.log("bookMarkList.length <= num");

        indexList.forEach((index) => {
          console.log("index: " + index, "bookmarkList[index]: " + bookMarkList[index]);
          bookMarkListTemp.push(bookMarkList[index])
        })
      }
      console.log({ type: "bookMarkListTemp", message: bookMarkListTemp });
      const header = new Headers({
        "Content-Type": "application/json",
      })

      let fetchList: Promise<Response>[] = []
      bookMarkListTemp.forEach((bookMark) => {
        if (bookMark.type === BookMarkType.homepage) {
          
        } else {
          fetchList.push(fetch(bookMark.url,
            { method: 'POST', headers: header, body: JSON.stringify({ url: bookMark.url, formats: ["markdown"] }) }))
          console.log("url: " + bookMark.url);
        }
      })
      console.log("fetchList: " + fetchList);
      Promise.all(fetchList).then((responses) => {
        console.log("responses: " + responses);
        responses.forEach((response) => {
          response.json().then((data) => {
            console.log("data: " + data["data"]["markdown"]);
          })
        })
      }).catch((error) => {
        console.log("error: " + error);
      })
      resolve(bookMarkListTemp)
    }
    else {
      reject("bookMarkList is empty")
    }
  })
}

export { }
