import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './App.css'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
function App() {

const onDragEnd=()=>{

}
  return (

    <>
<TextField id="standard-basic" label="Library" variant="standard" />
<Button variant="contained" endIcon={<SendIcon />}>
  Send
</Button>





     <DragDropContext onDragEnd={onDragEnd}>
<Droppable droppableId="List">
{provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
          </div>
        )}
</Droppable>

     </DragDropContext>
    </>
  )
}

export default App
