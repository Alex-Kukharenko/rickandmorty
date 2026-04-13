import { useSearchParams } from 'react-router-dom'
import locations from '../../data/location.json'
import styles from './Locations.module.css'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { Card } from '../components/Card/Card'

export function Locations() {
  const [searchParams, setSearchParams] = useSearchParams()

  const sort = searchParams.get('sort') || 'asc'

  const sorted = [...locations].sort((a, b) => {
    return sort === 'asc'
      ? new Date(a.created) - new Date(b.created)
      : new Date(b.created) - new Date(a.created)
  })

  return (
    <div className={styles.categoryPage}>
      <PageHeader
        title="Локации"
        sort={sort}
        onSort={(value) => setSearchParams({ sort: value })}
      />

      <div className={styles.grid}>
        {sorted.map((loc) => (
          <Card
            className={styles.locCard}
            key={loc.id}
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
    </div>
  )
}
