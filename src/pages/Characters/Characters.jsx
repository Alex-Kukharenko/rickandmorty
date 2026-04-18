import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './Characters.module.css'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { Card, statusColor } from '../components/Card/Card'
import { selectDataRequest } from '../../utils/selectors'
import { sortByDate } from '../../utils/sort'
import { mergeUniqueById } from '../../utils/merge'
import { useFetch } from '../../hooks/useFetch'
import { Spinner } from '../components/Spinner/Spinner'

export function Characters() {
  const [page, setPage] = useState(1)
  const [chars, setChars] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const sort = searchParams.get('sort') || 'asc'

  const [loading, error, result, hasMore] = useFetch(
    'https://rickandmortyapi.com/api/character',
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

    setChars((prev) => {
      const merged = mergeUniqueById(prev, result)
      if (merged.length === 0) return prev
      return merged
    })
  }, [result])

  const sorted = useMemo(() => sortByDate(chars, sort), [chars, sort])

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
      setChars([])
      setSearchParams({ sort: value })
      setPage(1)
    },
    [setSearchParams],
  )
  return (
    <div className={styles.wrapper}>
      <PageHeader title="Персонажи" sort={sort} onSort={handleSort} />
      {error && <div className={styles.error}>Ошибка загрузки</div>}
      <div className={styles.grid}>
        {sorted.map((char, index) => (
          <Card
            key={char.id}
            ref={sorted.length >= 5 && index === sorted.length - 5 ? lastNodeRef : undefined}
            to={`/characters/${char.id}`}
            image={char.image}
            title={char.name}
            subtitle={<p>Пол: {char.gender}</p>}
            meta={
              <>
                <div className={styles.subTitle}>
                  <span className={`${styles.statusDot} ${statusColor(char.status)}`} />
                  <p>{char.status}</p>
                </div>
                <p>Вид: {char.species}</p>
                {char.type && <p>Тип: {char.type}</p>}
              </>
            }
          />
        ))}
      </div>
      {loading && <Spinner />}
    </div>
  )
}

