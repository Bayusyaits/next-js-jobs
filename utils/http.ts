class Http {
    generateHeaders(contentType: string) {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': contentType,
            Accept: contentType,
            'Accept-Language': 'id'
        }
        return headers
    }
        /**
         * how to use
         * http.get()
         */
    async get(url: string, params: any) {
        let uri = url
        const esc = encodeURIComponent
        let headers = this.generateHeaders('application/json')
        if (params && params.headers) {
            headers = {...headers,
                ...params.headers
            }
            delete params.headers
        }
        if (params) {
            const query = Object.keys(params)
                .map((k) => `${esc(k)}=${esc(params[k])}`)
                .join('&')

            let operator = '?'
            if (uri && uri.indexOf('?') !== -1) {
                operator = '&'
            }
            uri = `${url}${operator}${query}`
        }
        const res = await fetch (uri)
        return res.json()

    }
}
export default new Http()
