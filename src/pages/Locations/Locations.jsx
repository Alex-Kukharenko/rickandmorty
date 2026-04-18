import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './Locations.module.css'
import { selectDataRequest } from '../../utils/selectors'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { Card } from '../components/Card/Card'
import { useFetch } from '../../hooks/useFetch'
import { Spinner } from '../components/Spinner/Spinner'
import { mergeUniqueById } from '../../utils/merge'
import { sortByDate } from '../../utils/sort'

export function Locations() {
  const [page, setPage] = useState(1)
  const [locs, setLocs] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const sort = searchParams.get('sort') || 'asc'

  const [loading, error, result, hasMore] = useFetch(
    'https://rickandmortyapi.com/api/location',
    { page },
    selectDataRequest,
  )

  const observer = useRef()
  const isLoadingRef = useRef(false)

  useEffect(() => {
    if (!loading && !error) {
      isLoadingRef.current = false
    }
  }, [loading, error])

  useEffect(() => {
    if (!result) return
    setLocs((prev) => {
      const merged = mergeUniqueById(prev, result)
      if (merged.length === 0) return prev
      console.log(merged.length)
      return merged
    })
  }, [result])

  const sorted = useMemo(() => sortByDate(locs, sort), [locs, sort])

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
      setLocs([])
      setSearchParams({ sort: value })
      setPage(1)
    },
    [setSearchParams],
  )

  return (
    <div className={styles.categoryPage}>
      <PageHeader title="Локации" sort={sort} onSort={handleSort} />
      {error && <div className={styles.error}>Ошибка загрузки</div>}

      <div className={styles.grid}>
        {sorted.map((loc, index) => (
          <Card
            className={styles.locCard}
            key={loc.id}
            ref={sorted.length >= 5 && index === sorted.length - 5 ? lastNodeRef : undefined}
            to={`/locations/${loc.id}`}
            title={loc.name}
            subtitle={<p>Тип: {loc.type}</p>}
            icon={'🌍'}
            meta={
              <>
                <p>Измерение: {loc.dimension} </p>
                <p>Создано: {new Date(loc.created).toLocaleDateString('ru-RU')}</p>
              </>
            }
          />
        ))}
      </div>
      {loading && <Spinner />}
    </div>
  )
}

