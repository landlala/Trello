import {useSetRecoilState} from "recoil";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {Droppable} from "react-beautiful-dnd";
import {IToDo, toDoState} from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  padding-top: 10px;
  border-radius: 10px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  border: 2px solid white;
`;

const Title = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Sigmar&display=swap');
  font-family: 'Sigmar', cursive;
  color: black;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
`;
 
const Form = styled.form`
  height: 30px;
  input {
    width: 100%;
    height: 100%;
    border: none;
    text-align: center;
  }
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${props => 
    props.isDraggingOver 
    ? "#b2bec3"
    : props.isDraggingFromThis
    ? "#dfe6e9"
    : "transparent"};
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
  flex-grow: 1;  
`;

interface IBoardProps {
  boardId: string;
  toDos: IToDo[];
}

interface IForm {
  toDo: string;
}

function Board({boardId, toDos}: IBoardProps) {
  const setToDo = useSetRecoilState(toDoState);
  const {register, setValue, handleSubmit} = useForm<IForm>();
  const onValid = ({toDo}: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDo(allBoards =>  {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit = {handleSubmit(onValid)}>
        <input
          {...register("toDo", {required: true})}
          type = "text"
          placeholder = {`add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId = {boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver = {info.isDraggingOver}
            isDraggingFromThis = {Boolean(info.draggingFromThisWith)}
            ref = {magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) =>
              <DraggableCard
                key = {toDo.id}
                index = {index}
                toDoId = {toDo.id}
                toDoText = {toDo.text}
              />
            )}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;