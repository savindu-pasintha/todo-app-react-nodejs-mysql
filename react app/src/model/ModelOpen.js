import React from 'react'
/*
//import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
*/
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'

export default function ModelOpen(props) {
  const [open, setOpen] = React.useState(false)
  const [msg, setMsg] = React.useState({ text: '', color: 'white' })
  const [id, setId] = React.useState()
  const [title, setTitle] = React.useState()
  const [description, setDescription] = React.useState()
  const [status, setStatus] = React.useState()

  const save = async ({ id, title, description, status, task }) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json') //json/application text/plain
    myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:5000')
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: { id: id, title: title, description: description, status: status },
      redirect: 'follow',
    }
    if (task == 'save') {
      if (title && description && status) {
        await fetch('http://localhost:5000/jiraboar/save', requestOptions)
          .then((res) => {
            if (res) {
              setMsg({ text: 'Saved Successfuly ..!', color: 'green' })
            } else {
              setMsg({ text: 'Connot Save ..!', color: 'red' })
            }
          })
          .catch((err) => {
            setMsg({ text: 'Connot Save ..!', color: 'red' })
          })
      } else {
        setMsg({ text: 'Please Enter ..!', color: 'red' })
      }
    }

    if (task == 'update') {
      if (title && description && status) {
        await fetch('http://localhost:5000/jiraboar/update', requestOptions)
          .then((res) => {
            if (res) {
              setMsg({ text: 'Updated Successfuly ..!', color: 'green' })
            } else {
              setMsg({ text: 'Connot Update ..!', color: 'red' })
            }
          })
          .catch((err) => {
            setMsg({ text: 'Connot Update ..!', color: 'red' })
          })
      } else {
        setMsg({ text: 'Please Enter ..!', color: 'red' })
      }
    }
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    setId(props?.data?.id)
    setTitle(props?.data?.title)
    setDescription(props?.data?.description)
    setStatus(props?.data?.status)
  }, [])

  return (
    <div>
      {props?.type == 'edit' ? (
        <button
          onClick={handleClickOpen}
          style={{ width: '30px', height: '30px', borderRadius: '25%' }}
        >
          ✏️
        </button>
      ) : (
        <Button
          style={{ backgroundColor: 'white', border: '2px solid black' }}
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          +{' '}
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Ticket ({props?.tableName || props?.type})
          <span style={{ color: msg?.color }}> {msg?.text}</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="id"
            type="email"
            fullWidth
            value={id}
            disabled={true}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            label="Title ..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            label="Description ..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            label="Status ..."
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          {props?.type == 'edit' ? (
            <Button
              onClick={(e) =>
                save({
                  id: id,
                  title: title,
                  description: description,
                  status: status,
                  task: 'update',
                })
              }
              color="primary"
            >
              Update
            </Button>
          ) : (
            <Button
              onClick={(e) =>
                save({
                  id: id,
                  title: title,
                  description: description,
                  status: status,
                  task: 'save',
                })
              }
              color="primary"
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}
