import React from "react";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging: boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${props => props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${props => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
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
          {toDoText}
        </Card>
      }
    </Draggable>
  );
}

export default DraggableCard;