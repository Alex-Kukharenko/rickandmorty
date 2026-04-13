import { useSearchParams } from 'react-router-dom'
import episodes from '../../data/episode.json'
import styles from './Episodes.module.css'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { Card } from '../components/Card/Card'

export function Episodes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const sort = searchParams.get('sort') || 'asc'

  const sorted = [...episodes].sort((a, b) => {
    return sort === 'asc'
      ? new Date(a.created) - new Date(b.created)
      : new Date(b.created) - new Date(a.created)
  })

  return (
    <div>
      <PageHeader
        title="Эпизоды"
        sort={sort}
        onSort={(value) => setSearchParams({ sort: value })}
      />

      <div className={styles.grid}>
        {sorted.map((ep) => (
          <Card
            className={styles.epCard}
            key={ep.id}
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
