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
  if (props.className === "correct") {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card body className={className}>
          {props.id} {props.percentage}
        </Card>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card body className={className}>
        {props.id}
      </Card>
    </div>
  );
}
