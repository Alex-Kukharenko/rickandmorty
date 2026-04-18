import { useSearchParams } from 'react-router-dom'
import styles from './Episodes.module.css'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { Card } from '../components/Card/Card'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { mergeUniqueById } from '../../utils/merge'
import { sortByDate } from '../../utils/sort'
import { selectDataRequest } from '../../utils/selectors'

export function Episodes() {
  const [page, setPage] = useState(1)
  const [eps, setEps] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const sort = searchParams.get('sort') || 'asc'

  const [loading, error, result, hasMore] = useFetch(
    'https://rickandmortyapi.com/api/episode',
    { page },
    selectDataRequest,
  )

  const observer = useRef()
  const isLoadingRef = useRef()

  useEffect(() => {
    if (!loading && !error) {
      isLoadingRef.current = false
    }
  }, [loading, error])

  useEffect(() => {
    if (!result) return

    setEps((prev) => {
      const merged = mergeUniqueById(prev, result)
      if (merged.length === 0) return prev
      return merged
    })
  }, [result])

  const sorted = useMemo(() => sortByDate(eps, sort), [eps, sort])

  const lastNodeRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      if (!node) return

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingRef.current) {
          isLoadingRef.current = true
          setPage((prev) => prev + 1)
        }
      })
      observer.current.observe(node)
    },
    [hasMore],
  )

  const handleSort = useCallback(
    (value) => {
      setEps([])
      setSearchParams({ sort: value })
      setPage(1)
    },
    [setSearchParams],
  )

  return (
    <div>
      <PageHeader title="Эпизоды" sort={sort} onSort={handleSort} />

      <div className={styles.grid}>
        {sorted.map((ep, index) => (
          <Card
            className={styles.epCard}
            key={ep.id}
            ref={sorted.length >= 5 && index === sorted.length - 5 ? lastNodeRef : undefined}
            to={`/episodes/${ep.id}`}
            title={<p>Название: {ep.name}</p>}
            subtitle={<p>Дата выхода: {ep.air_date}</p>}
            icon={'📺'}
            meta={
              <>
                <p>Эпизод: {ep.episode} </p>
                <p>Создано: {new Date(ep.created).toLocaleDateString('ru-RU')}</p>
              </>
            }
          />
        ))}
      </div>
    </div>
  )
}

