import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { Draggable } from 'react-beautiful-dnd'
/*import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  EditIcon,
  DeleteIcon,
} from '@chakra-ui/icons'*/
import ModelOpen from './model/ModelOpen'
const ListItemCustom = ({ itemObject, index }) => {
  return (
    <Draggable draggableId={itemObject.id} key={itemObject.id} index={index}>
      {(provided) => (
        <ListItem
          key={itemObject.id}
          role={undefined}
          dense
          button
          ContainerComponent="li"
          ContainerProps={{ ref: provided.innerRef }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItemText
            sytles={{ fontFamily: 'Quicksand' }}
            primary={`${itemObject.id}) ${itemObject.title}`}
          />{' '}
          <ListItemText
            sytles={{ fontFamily: 'Quicksand' }}
            primary={`${itemObject.description}`}
          />
          <ListItemText
            sytles={{ fontFamily: 'Quicksand' }}
            primary={`${itemObject.status}`}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="comments"
              question-uid={itemObject.id}
            >
              <ModelOpen key={index} type="edit" data={itemObject} />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="comments"
              question-uid={itemObject.id}
            >
              <button
                style={{ width: '30px', height: '30px', borderRadius: '25%' }}
              >
                -
              </button>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </Draggable>
  )
}

export default ListItemCustom
