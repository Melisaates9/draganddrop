import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useState } from "react";
import { nanoid } from "nanoid";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Modal from "@mui/material/Modal";
interface Listitem {
  id: string;
  text: string;
}
function App() {
  const [open, setOpen] = useState<boolean>(false);

  const [todo, setTodo] = useState<string>("");
  const [toDoList, settoDoList] = useState<Listitem[]>([]);
  const [editTodo,seteditTodo]=useState<string>("")
  const [selectedid,setselectedid]=useState<string>("")



  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items = [...toDoList]; // Mevcut listeyi bir kopya olarak alıyoruz.
    const [reorderedItem] = items.splice(result.source.index, 1); // Öğeyi eski konumundan çıkar.
    items.splice(result.destination.index, 0, reorderedItem); // Öğeyi yeni konumuna ekle.
    settoDoList(items); // Güncellenmiş listeyi state'e kaydet.
  };
  function addTodo() {
    if (todo.trim().length > 0) {
      const toDoid = nanoid();
      const newTodo = {
        id: toDoid,
        text: todo,
      };
      settoDoList([...toDoList, newTodo]);
      setTodo("");
    } else {
      alert("lütfen boşluğu doldurunuz...");
    }
  }
  function deletebutton(id: string) {
    settoDoList((toDos) => toDos.filter((todo) => todo.id !== id));
  }

  function openeditmodal(id: string, text: string) {
    setOpen(true);
    seteditTodo(text);
    setselectedid(id)

  }
  function handleClose() {
    setOpen(false);
  }

  function handleEdit (){
const selectedTodo=toDoList.filter((todo)=>todo.id==selectedid)
selectedTodo[0].text=editTodo
setOpen(false)

  }
  return (
    <>
      <Box
        sx={{ justifyContent: "center", display: "flex", marginTop: "100px" }}
      >
        <TextField
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          id="standard-basic "
          label="Library"
          variant="standard"
        />
        <Button
          onClick={addTodo}
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ bgcolor: "#2087c3eb", color: "white" }}
        >
          Send
        </Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="List">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {toDoList.map(({ id, text }: Listitem, index: number) => (
                <Draggable draggableId={id} key={id} index={index}>
                  {(provided) => (
                    <Box
                      sx={{
                        justifyContent: "center",
                        display: "flex",
                        border: "0.5px solid",
                        marginTop: "10px",
                      }}
                    >
                      <Box
                        sx={{}}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {text}
                        <Box sx={{ gap: "10px", display: "flex" }}>
                          <Button
                            variant="outlined"
                            startIcon={<EditNoteIcon />}
                            sx={{ bgcolor: "#2087c3eb", color: "white" }}
                            onClick={() => openeditmodal(id, text)}
                          >
                            edit
                          </Button>
                          <Button
                            onClick={() => deletebutton(id)}
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            sx={{ bgcolor: "#2087c3eb", color: "white" }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            gap:"7px",display:"flex"
          }}
        >
          <TextField 
          value={editTodo} onChange={(e)=>seteditTodo(e.target.value)}
          
          />
          <Button onClick={handleEdit}
            variant="contained"
            sx={{ bgcolor: "#2087c3eb", color: "white" }}
          >
            Edited
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default App;
