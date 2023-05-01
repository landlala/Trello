import React from "react";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging: boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${props => props.isDragging ? "#00b894" : props.theme.cardColor};
  box-shadow: ${props => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

const Text = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Sigmar&display=swap');
  font-family: 'Sigmar', cursive;
  font-size: 15px;
  font-weight: 60;
`;

interface ICardProps {
  index: number;
  toDoId: number;
  toDoText: string;
}

function DraggableCard({index, toDoId, toDoText}: ICardProps) {
  return (
    <Draggable draggableId = {toDoId + ""} index = {index}>
      {(magic, info) => 
        <Card
          isDragging = {info.isDragging}
          ref = {magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <Text>{toDoText}</Text>
        </Card>
      }
    </Draggable>
  );
}

export default React.memo(DraggableCard);