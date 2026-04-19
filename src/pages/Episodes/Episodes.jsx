import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '@components'
import { PageHeader } from '@components'
import { Spinner } from '@components'
import { useFetch } from '@hooks'
import { mergeUniqueById } from '@utils'
import { selectDataRequest } from '@utils'
import { sortByDate } from '@utils'
import { SimpleGrid, Alert } from '@mantine/core'

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

      {error && (
        <Alert color="red" title="Ошибка загрузки" mb="md">
          Не удалось загрузить эпизоды. Попробуйте позже.
        </Alert>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
        {sorted.map((ep, index) => (
          <Card
            key={ep.id}
            ref={sorted.length >= 5 && index === sorted.length - 5 ? lastNodeRef : undefined}
            to={`/episodes/${ep.id}`}
            title={<p>Название: {ep.name}</p>}
            subtitle={<p>Дата выхода: {ep.air_date}</p>}
            icon={'📺'}
            meta={
              <>
                <p>Эпизод: {ep.episode}</p>
                <p>Создано: {new Date(ep.created).toLocaleDateString('ru-RU')}</p>
              </>
            }
          />
        ))}
      </SimpleGrid>

      {loading && <Spinner />}
    </div>
  )
}
