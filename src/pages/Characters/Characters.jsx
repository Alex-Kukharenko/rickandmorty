import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, statusColor } from '@components'
import { PageHeader } from '@components'
import { Spinner } from '@components'
import { useFetch } from '@hooks'
import { mergeUniqueById } from '@utils'
import { selectDataRequest } from '@utils'
import { sortByDate } from '@utils'
import styles from './Characters.module.css'

import { SimpleGrid, Badge, Group, Alert } from '@mantine/core'

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

      {error && (
        <Alert color="red" title="Ошибка загрузки">
          Не удалось загрузить персонажей. Попробуйте позже.
        </Alert>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
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
                <Group gap={6}>
                  <Badge color={statusColor(char.status)} size="lg" variant="dot">
                    {char.status}
                  </Badge>
                </Group>
                <p>Вид: {char.species}</p>
                {char.type && <p>Тип: {char.type}</p>}
              </>
            }
          />
        ))}
      </SimpleGrid>
      {loading && <Spinner />}
    </div>
  )
}
