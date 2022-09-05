import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import RootRef from '@material-ui/core/RootRef'
import List from '@material-ui/core/List'
import ListItemCustom from './ListItemCustom'
import Typography from '@material-ui/core/Typography'
import ModelOpen from './model/ModelOpen'
const Column = ({ column }) => {
  return (
    <div
      style={{
        backgroundColor: 'gray',
        margin: 10,
        padding: 20,
        color: 'white',
      }}
    >
      <Typography variant={'h4'}>
        {column.id}
        <ModelOpen tableName={column.id} />
      </Typography>
      <table>
        <tr>
          <th style={{ paddingLeft: '10px' }}>Title</th>
          <th style={{ paddingLeft: '10px' }}>Description</th>
          <th style={{ paddingLeft: '15px' }}>Status</th>
        </tr>
      </table>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <RootRef rootRef={provided.innerRef}>
            <List >
              {column.list.map((itemObject, index) => {
                return <ListItemCustom key={index} index={index} itemObject={itemObject} />
              })}
              {provided.placeholder}
            </List>
          </RootRef>
        )}
      </Droppable>
    </div>
  )
}

export default Column
