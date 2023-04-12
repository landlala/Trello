import {useSetRecoilState} from "recoil";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {Droppable} from "react-beautiful-dnd";
import {IToDo, toDoState} from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Form = styled.form`
  input {
    width: 100%;
  }
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${props => 
    props.isDraggingOver 
    ? "#dfe6e9" 
    : props.isDraggingFromThis
    ? "#b2bec3"
    : "transparent"};
  transition: background-color 0.3s ease-in-out;
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