import { useDraggable, DndContext, useDroppable } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import "./OffsetMatching.css";
import { Container } from "react-bootstrap";



function OffsetMatchingGame() {
    const Buildings = [
        { name: "Dom", text: "Dom", carbon: 300 },
        { name: "Rathaus",text: "Rathaus", carbon: 600 },
        { name: "Random Building",text: "Random Building", carbon: 400 },
    ];
    
    const CarbonOffsets = [
        { name: "4 Football Fields", text: "4 Football Fields",carbon: -300 },
        { name: "Westpark", text: "Westpark", carbon: -600 },
        { name: "Random Offset", text: "Random Offset", carbon: -400 },
    ];
    const [activeBuildings, setActiveBuildings] = useState(Buildings);
    return (
        <Container>
            <DndContext onDragEnd={handelDragEnd} modifiers={[restrictToWindowEdges]}>
                <h1>Offset Matching Game</h1>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", }}>
                    <div style={{ flex: 1, display:"flex", flexDirection:"column"}}>
                        {activeBuildings.map((building) => (
                            <Building
                                key={building.name}
                                id={building.name}
                                className="building"
                                carbon={building.carbon}
                                text={building.text}
                            />
                        ))}
                    </div>
                    <div style={{flex: 1}}>
                    </div>
                    <div style={{ flex: 1, display:"flex", flexDirection:"column", justifyContent:"center"}}>
                        {CarbonOffsets.map((offset) => (
                            <Offset
                                key={offset.name}
                                id={offset.name}
                                class="offset"
                                text={offset.text}
                            />
                        ))
                        }
                    </div>
                </div>

                <div>

                </div>
            </DndContext>
        </Container>
    );
    
    function handelDragEnd(event) {
        const { active, over } = event;
        const building = Buildings.find((building) => building.name === active.id);
        const offset = CarbonOffsets.find((offset) => offset.name === over.id);
        if (building && building.carbon + offset.carbon === 0) {
            setActiveBuildings((items) => {
                const newItems = [...items];
                const index = newItems.findIndex((item) => item.name === building.name);
                newItems[index] = { ...newItems[index], 
                    text: "correct " + building.name + " releses " + building.carbon + " kg of Co2 and " + offset.name + " offsets " + offset.carbon, };
                return newItems;
            });
            console.log(activeBuildings);
        }
        else {
            setActiveBuildings((items) => {
                const newItems = [...items];
                const index = newItems.findIndex((item) => item.name === building.name);
                newItems[index] = { ...newItems[index], 
                    text: "Wrong " + building.name + " releses " + building.carbon + " kg of Co2 and " + offset.name + " offsets " + offset.carbon };
                return newItems;
            });
            console.log(activeBuildings);
        }

    }   

    function Building(props) {
        const { attributes, listeners, setNodeRef, transform, transition } =
            useDraggable({ id: props.id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };
        const text = props.text;
        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <Card body>
                    {text}
                </Card>
            </div>
        );
    }

    function Offset(props) {
        const { attributes, listeners, setNodeRef, transform, transition } =
            useDroppable({ id: props.id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };
        
        const text = props.text;
        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <Card body>
                    {text}
                </Card>
            </div>
        );
    }
}

export default OffsetMatchingGame;
