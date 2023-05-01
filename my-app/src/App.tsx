import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import Board from "./Components/Board";
import {toDoState} from "./atoms";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 700px;
  margin: 0 auto;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
`;

function App() {
  const [toDo, setToDo] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const {source, destination} = info;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      setToDo(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        sourceBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
    }
    if (source.droppableId !== destination.droppableId) {
      setToDo(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  
  return (
    <DragDropContext onDragEnd = {onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDo).map(boardId => <Board key = {boardId} boardId = {boardId} toDos = {toDo[boardId]} />)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;