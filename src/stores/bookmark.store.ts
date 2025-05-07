
import { BookMark,BookMarkList} from '../utils/bookmarks'

export const useBookMarkListStore = defineStore("app", () => {

    const list = reactive<BookMark[]>([])
    // const { data: count } = useBrowserLocalStorage("count", 0)
    // const { data: name } = useBrowserLocalStorage("name", "John Doe")
  
    // You should probably use chrome.storage API instead of localStorage since localStorage history can be cleared by the user.
    // See https://developer.chrome.com/docs/extensions/reference/api/storage
  
    
    function addBookMark(bookMark:BookMark){
        list.push(bookMark)
    }
    function updateBookMark(bookMark:BookMark){
        list[list.indexOf(bookMark)] = bookMark
    }
    function removeBookMark(bookMark:BookMark){
        list.splice(list.indexOf(bookMark),1)
    }
    return {
      addBookMark,
      updateBookMark,
      removeBookMark,
      list
    }
  })
  