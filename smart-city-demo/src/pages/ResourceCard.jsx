import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { Card } from "react-bootstrap";

export default function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const className = props.className;
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card body className={className}>
        {cardContent()}
      </Card>
    </div>
  );

  function cardContent() {
    if (props.className === "correct") {
      return (
        <>
        {props.id} {props.percentage}
        </>
      );
    }else {
      return (
        <>
        {props.id}
        </>
      );

    }
  }
}
