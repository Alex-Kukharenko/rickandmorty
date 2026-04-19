import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '@components'
import { PageHeader } from '@components'
import { useFetch } from '@hooks'
import { mergeUniqueById } from '@utils'
import { selectDataRequest } from '@utils'
import { sortByDate } from '@utils'
import { SimpleGrid, Alert } from '@mantine/core'
import { Spinner } from '@/components'

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
    <div>
      <PageHeader title="Локации" sort={sort} onSort={handleSort} />

      {error && (
        <Alert color="red" title="Ошибка загрузки" mb="md">
          Не удалось загрузить локации. Попробуйте позже.
        </Alert>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
        {sorted.map((loc, index) => (
          <Card
            key={loc.id}
            ref={sorted.length >= 5 && index === sorted.length - 5 ? lastNodeRef : undefined}
            to={`/locations/${loc.id}`}
            title={loc.name}
            subtitle={<p>Тип: {loc.type}</p>}
            icon={'🌍'}
            meta={
              <>
                <p>Измерение: {loc.dimension}</p>
                <p>Создано: {new Date(loc.created).toLocaleDateString('ru-RU')}</p>
              </>
            }
          />
        ))}
      </SimpleGrid>

      {loading && <Spinner />}
    </div>
  )
}
