import axios from 'axios'
import { useEffect, useState } from 'react'

export function useFetch(url, params, selector) {
  const [state, setState] = useState({
    loading: false,
    error: false,
    result: null,
    hasMore: false,
  })

  useEffect(() => {
    if (!url) return
    let cancelled = false
    const source = axios.CancelToken.source()

    setState((prev) => ({ ...prev, loading: true, error: false }))

    axios({ method: 'GET', url, params, cancelToken: source.token })
      .then((res) => {
        if (cancelled) return
        setState({
          loading: false,
          error: false,
          result: selector(res.data),
          hasMore: !!res.data.info?.next,
        })
      })
      .catch((e) => {
        if (cancelled || axios.isCancel(e)) return
        setState((prev) => ({ ...prev, loading: false, error: true }))
      })

    return () => {
      cancelled = true
      source.cancel()
    }
  }, [url, JSON.stringify(params)])

  return [state.loading, state.error, state.result, state.hasMore]
}
