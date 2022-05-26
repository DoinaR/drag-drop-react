import React, { useState, useEffect } from 'react'
import { VscListFilter } from 'react-icons/vsc'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'

import Select from 'react-select'
import DndPlaylist from './DndPlaylist'
import data from '../data'

import GridPlaylist from './GridPlaylist'
import Layout from './Layout'
import { orderBy } from 'lodash'

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
]

export default function Playlist() {
  const [gridView, setGridView] = useState(false)
  const [playlistData, setPlaylistData] = useState(data)
  const [sortFilter, setSortFilter] = useState(null)

  useEffect(() => {
    if (sortFilter?.value === 'newest') {
      setPlaylistData(orderBy(playlistData, 'released', 'desc'))
    } else if (sortFilter?.value === 'oldest') {
      setPlaylistData(orderBy(playlistData, 'released', 'asc'))
    } else {
      setPlaylistData(orderBy(playlistData, 'position'))
    }
  }, [sortFilter])

  return (
    <Layout>
      <div style={{ height: '60px', marginBottom: '25px' }}>
        <h1>Drag&Drop</h1>
      </div>
      <div className='layout-filter'>
        <div className='sort'>
          {gridView && (
            <Select
              options={SORT_OPTIONS}
              value={sortFilter}
              onChange={setSortFilter}
              placeholder='Sort by release date'
              isClearable
            />
          )}
        </div>
        <VscListFilter
          onClick={() => setGridView(false)}
          className={`${!gridView ? 'active' : null}`}
        />
        <BsFillGrid3X3GapFill
          onClick={() => setGridView(true)}
          className={`${gridView ? 'active' : null}`}
        />
      </div>

      {gridView ? (
        <GridPlaylist playlistData={playlistData} />
      ) : (
        <DndPlaylist playlistData={playlistData} />
      )}
    </Layout>
  )
}
