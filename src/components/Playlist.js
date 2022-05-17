import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { VscThreeBars } from 'react-icons/vsc'
import { range, orderBy } from 'lodash'

import playlistData from '../data'

export default function Playlist() {
  const [playlist, setPlaylist] = useState(playlistData)

  const listRenderer = orderBy(playlist, 'position').map((item) => (
    <Draggable
      draggableId={item.id.toString()}
      index={item.position}
      key={item.id}
    >
      {(provided) => (
        <div
          className='list-container__item'
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <a {...provided.dragHandleProps} className='handle'>
            <VscThreeBars />
          </a>
          <div>
            <img src={item.thumb} width='100%' alt={item.title} />
          </div>
          <div>
            {item.position} - {item.title}
          </div>
          <div>{item.artist}</div>
          <div>{item.released}</div>
        </div>
      )}
    </Draggable>
  ))

  const onDragEnd = (result) => {
    console.log(result)
    const { destination, source } = result

    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const directionOfDrag =
      destination.index > source.index ? 'GREATER' : 'LESS'
    console.log(directionOfDrag)
    let affectedRange
    if (directionOfDrag === 'GREATER') {
      affectedRange = range(source.index, destination.index + 1)
    } else if (directionOfDrag === 'LESS') {
      affectedRange = range(destination.index, source.index)
    }

    // console.log("AFFECTED RANGE", affectedRange);
    const reOrderedPlaylist = playlist.map((song) => {
      if (song.id === parseInt(result.draggableId)) {
        song.position = result.destination.index
        // console.log("CONDITION 1", song);
        return song
      } else if (affectedRange.includes(song.position)) {
        if (directionOfDrag === 'GREATER') {
          song.position = song.position - 1
          // console.log("CONDITION 2.1", song);
          return song
        } else if (directionOfDrag === 'LESS') {
          song.position = song.position + 1
          // console.log("CONDITION 2.2", song);
          return song
        }
      } else {
        // console.log("CONDITION 3", song);
        return song
      }
    })
    setPlaylist(reOrderedPlaylist)
  }

  return (
    <div className='list-container'>
      <div>
        <h1>Drag&Drop</h1>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'PLAYLIST'}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {listRenderer}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
