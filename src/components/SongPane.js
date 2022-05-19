import React from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

const SongPane = ({ visible, data, closePane }) => {
  return (
    <SlidingPane
      className='sliding-pane'
      isOpen={visible}
      title={data?.title}
      width={window.innerWidth < 600 ? '100%' : '500px'}
      onRequestClose={closePane}
    >
      {data && (
        <div className='song-details'>
          <div className='song-details__thumb'>
            <img src={data?.thumb} alt={data?.title} />
          </div>
          <div className='song-details__info'>
            <div className='song-details__info-box'>
              <div>{data?.artist}</div>
              <div>{data?.released}</div>
            </div>
            <div>{data?.description}</div>
          </div>
        </div>
      )}
    </SlidingPane>
  )
}

export default SongPane
