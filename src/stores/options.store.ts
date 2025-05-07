export const useOptionsStore = defineStore("options", () => {
  const { isDark, toggleDark } = useTheme()

  const { data: profile } = useBrowserSyncStorage<{
    name: string
    age: number
  }>("profile", {
    name: "Mario",
    age: 24,
  })

  const { data: others } = useBrowserLocalStorage<{
    awesome: boolean
    counter: number
  }>("options", {
    awesome: true,
    counter: 0,
  })

  const { data: api_config } = useBrowserLocalStorage<{
    api_key:  string
    url: string,
    model: string,
    app_id: string,
    firecrawl_url: string
  }>("options", {
    api_key: "jjj",
    url: 'ttt',
    app_id: 'aaa',
    model: 'bbb',
    firecrawl_url:'ffff'

  })

function setApiConfig(api_key: string, url: string, model: string, app_id: string, firecrawl_url: string) {
  api_config.value.api_key = api_key
  api_config.value.url = url
  api_config.value.model = model
  api_config.value.app_id = app_id
  api_config.value.firecrawl_url = firecrawl_url
}

  return {
    isDark,
    toggleDark,
    profile,
    others,
    api_config,
    setApiConfig
  }
})
