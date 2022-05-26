import * as React from 'react'

export default function GridPlaylist({ playlistData }) {
  return (
    <div className='grid-container'>
      {playlistData.map((item) => (
        <div key={item.id} className='grid-container__item'>
          <div>
            <img src={item.thumb} alt={item.title} width='100%' />
          </div>
          <div className='grid-container-title'>{item.title}</div>
          <div>{item.artist}</div>
          <div>{item.released}</div>
          <div className='lyrics'>{item.description}</div>
        </div>
      ))}
    </div>
  )
}
