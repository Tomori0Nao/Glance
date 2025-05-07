interface ApiConfig {
    api_key:  string
    url: string,
    model: string,
    app_id: string,
    firecrawl_url: string
}

function isApiConfigEmpty(apiConfig: ApiConfig): boolean {
    return apiConfig.api_key === "" || apiConfig.url === "" || apiConfig.model === "" || apiConfig.app_id === "" || apiConfig.firecrawl_url === ""
}
export type { ApiConfig}
export { isApiConfigEmpty }