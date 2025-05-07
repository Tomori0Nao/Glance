import { log } from "console"

interface Color {
  color: string
}
// '/', '/blog', '/about', '/zh', '/en', '/zh/about', '/en/about'
// '/zh/blog', '/en/blog', '/zh/blog/about', '/en/blog/about'
// '/blogs','/news','/articles','/articles/','/latest', '/latest/', '/articles/about', '/articles/about/'
// let pathnameList = ["/", "/blog", "/blog/", "/about", "/about/", "/zh", "/zh/", "/en", "/en/", "/zh/about",
//  "/zh/about/", "/en/about", "/en/about/", "/zh/blog", "/zh/blog/", "/en/blog", "/en/blog/", "/zh/blog/about", 
//  "/zh/blog/about/", "/en/blog/about", "/en/blog/about/", "/blogs", "/blogs/", "/news", "/news/", "/articles", 
//  "/articles/", "/articles/about", "/articles/about/", "/latest", "/latest/"]


// reg match
// */cn */cn/ */en-cn  */en-cn/ */blog-cn  */blog-cn/ */news-cn  */news-cn/ */articles-cn  */articles-cn/ */latest-cn  */latest-cn/ */about-cn  */about-cn/ */blogs-cn  */blogs-cn/ */zh-cn  */zh-cn/ */en-cn  */en-cn/ */blog-cn  */blog-cn/ */news-cn  */news-cn/ */articles-cn  */articles-cn/ */latest-cn  */latest-cn/ */about-cn  */about-cn/ */blogs-cn  */blogs-cn/ */zh  */zh/ */en */en/ */blog */blog/ */news */news/ */articles */articles/ */latest */latest/ */about */about/ */blogs */blogs/ 
const HOMEPAGE_REGEX = /^\/(cn|en-cn|blog-cn|news-cn|articles-cn|latest-cn|about-cn|blogs-cn|zh-cn|en-cn|blog-cn|news-cn|articles-cn|latest-cn|about-cn|blogs-cn|zh|en|blog|news|articles|latest|about|blogs)\/?$/


function getRandomNumber(num: number, max: number): number[] {
  let arr: number[] = []
  for (let i = 0; i < num; i++) {
    arr.push(getRandomSecureInt(0, max))
    // chrome.runtime.sendMessage({type: "GET_BOOKMARKS",message: {arr,num}})
  }
  return arr
}
function getRandomSecureInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const array = new Uint32Array(1);
  self.crypto.getRandomValues(array);
  return Math.floor(array[0] / (0xFFFFFFFF + 1) * (max - min + 1)) + min;
}


function getListItemColor(colorList: Color[]): string {
  return colorList[getRandomSecureInt(0, colorList.length - 1)].color
}
// judge if the url is homepage
function isHomePage(url: string): boolean {
  // url parse
  const urlObj = new URL(url)
  // console.log(urlObj.pathname+"  pathname");
  if (HOMEPAGE_REGEX.test(urlObj.pathname) || urlObj.pathname === "/") {
    // console.log("homepage "+url);
    return true
  } else {
    // console.log("not homepage "+url);
    
    return false
  }
}
interface conmmonResponese {
  // type: string,
  action: {
    type: string
  }
  message: string
  data: []
}

export { getRandomNumber, getRandomSecureInt, getListItemColor,isHomePage }
export type { conmmonResponese, Color }