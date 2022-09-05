import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column'
import ModelOpen from './model/ModelOpen'
//import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAllJSDocTags } from 'typescript'
const App = () => {
  const classes = useStyles()
  /*
    TODO: It's really important how you structure your data!!!
      each column has to have a unique id, each item has to have a unique id and ideally consecutive else funky things happen
      each droppable has to have a unique id, each draggable also - cannot stress this enough because that is the only way
      the framework knows how what went from which list
    */
  const cinitialColumns = {
    todo: {
      id: 'Todo', //todo
      list: [
        {
          id: '1',
          text: 'text1',
          title: 't1',
          description: 'd1',
          status: 's1',
        },
        {
          id: '2',
          text: 'text2',
          title: 't2',
          description: 'd1',
          status: 's1',
        },
        {
          id: '3',
          text: 'text3',
          title: 't3',
          description: 'd1',
          status: 's1',
        },
      ],
    },
    doing: {
      id: 'In Progress', //"doing"
      list: [
        {
          id: '4',
          text: 'text4',
          title: 't4',
          description: 'd1',
          status: 's1',
        },
        {
          id: '5',
          text: 'text5',
          title: 't5',
          description: 'd1',
          status: 's1',
        },
        {
          id: '6',
          text: 'text6',
          title: 't6',
          description: 'd1',
          status: 's1',
        },
      ],
    },
    qa: {
      id: 'QA Ready', //
      list: [
        {
          id: '7',
          text: 'text7',
          title: 't7',
          description: 'd1',
          status: 's1',
        },
        {
          id: '8',
          text: 'text8',
          title: 't8',
          description: 'd1',
          status: 's1',
        },
        {
          id: '9',
          text: 'text9',
          title: 't9',
          description: 'd1',
          status: 's1',
        },
      ],
    },
    done: {
      id: 'Done', //
      list: [
        {
          id: '10',
          text: 'text10',
          title: 't10',
          description: 'd1',
          status: 's1',
        },
        {
          id: '11',
          text: 'text11',
          title: 't11',
          description: 'd1',
          status: 's1',
        },
        {
          id: '12',
          text: 'text12',
          title: 't12',
          description: 'd1',
          status: 's1',
        },
      ],
    },
  }

  const [initialColumns, setInitialColumns] = useState(cinitialColumns)
  const [columns, setColumns] = useState(initialColumns)
  const [columnss, setColumnss] = useState([])
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json') //json/application text/plain
    myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:5000')
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }
    await fetch('http://localhost:5000/jiraboar/tickets', requestOptions)
      .then((response) => response.json())
      .then((res) => {
        // setInitialColumns(res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onDragEnd = ({ source, destination }) => {
    setColumnss((p) => [...p, { a: source.index, b: destination.index }])
    // console.log(columnss)
    var start = ''
    var end = ''
    if (destination === undefined || destination === null) return null

    if (source.droppableId == 'Done') {
      start = columns['done']
    }
    if (source.droppableId == 'In Progress') {
      start = columns['doing']
    }
    if (source.droppableId == 'Todo') {
      start = columns['todo']
    }
    if (source.droppableId == 'QA Ready') {
      start = columns['qa']
    }

    if (destination.droppableId == 'Done') {
      end = columns['done']
    }
    if (destination.droppableId == 'In Progress') {
      end = columns['doing']
    }
    if (destination.droppableId == 'Todo') {
      end = columns['todo']
    }
    if (destination.droppableId == 'QA Ready') {
      end = columns['qa']
    }
    console.log(start, end)
    // Make sure we have a valid destination
    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return null
    }
    // Set start and end variables
    console.log(start, end)
    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx) => idx !== source.index)
      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index])
      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      }

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }))
      return null
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index)
      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      }
      // Make a new end list array
      const newEndList = end.list
      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index])
      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      }
      // Update the state
      /*setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }))
      */
      console.log(columns)

      var col = {}
      Object.keys(columns).map((item) => {
        if (item.id != newStartCol.id && item.id != newEndCol.id) {
          col.push(item)
        }
      })
      col.push({
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      })
      setColumns(col)

      return null
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container direction={'row'} justify={'center'}>
        {Object.values(columns).map((column) => {
          //console.log(column)
          return (
            <Grid item style={{ width: `25%` }}>
              <Column column={column} key={column.id} />
            </Grid>
          )
        })}
      </Grid>
    </DragDropContext>
  )
}

export default App

const useStyles = makeStyles((theme) => ({}))
