import { useDraggable, DndContext, useDroppable } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import "./OffsetMatching.css";
import { CardTitle, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function OffsetMatchingGame() {
    const Buildings = [
        { name: "Dom", text: "", carbon: 300, img: "https://zva-igelbank.s3.eu-central-1.amazonaws.com/1024x1024_max/3b6dc3fea9304caf1043486ce94551b9.jpg?v=1" },
        { name: "Rathaus",text: "", carbon: 600, img: "https://www.baukunst-nrw.de/img/objekte/XL/641_133903.jpg" },
        { name: "Random Building",text: "", carbon: 400, img: "https://images2.fanpop.com/image/photos/9800000/random-cool-buildings-random-9869312-500-549.jpg" },
    ];
    
    const CarbonOffsets = [
        { name: "4 Football Fields", text: "4 Football Fields",carbon: -300, img: "https://www.francisfields.com/wp-content/uploads/cropped-Rainbow-Pictures-copy-v.4-scaled-1.jpg" },
        { name: "Westpark", text: "Westpark", carbon: -600, img: "https://unser-aachen.eu/wp-content/uploads/2018/07/westpark03.jpg" },
        { name: "Random Offset", text: "Random Offset", carbon: -400, img: "https://research.reading.ac.uk/research-blog/wp-content/uploads/sites/72/2023/10/Sycamore_Gap_The_Tree.jpg" },
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
                                img={building.img}
                            />
                        ))}
                    </div>
                    <div style={{flex: 1}}>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <h3>-- Drag and Drop --</h3>
                    </div>
                    <div style={{ flex: 1, display:"flex", flexDirection:"column", justifyContent:"center"}}>
                        {CarbonOffsets.map((offset) => (
                            <Offset
                                key={offset.name}
                                id={offset.name}
                                class="offset"
                                text={offset.text}
                                img={offset.img}
                            />
                        ))
                        }
                    </div>
                </div>

                <div>
                    <Button as = {Link} to = "/" onClick={() => setActiveBuildings(Buildings)}>Home</Button>
                    <Button onClick={() => setActiveBuildings(Buildings)}>Reset</Button>
                </div>
            </DndContext>
            
        </Container>
    );
    
    function handelDragEnd(event) {
        const { active, over } = event;
        if (over === null || active === null) {
            return;
        }
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
                <Card body className="offSetGameCard">
                    <img className="building-img"
                        src={props.img}
                    >
                    </img>
                    <CardTitle >{props.id}</CardTitle>
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
                <Card body className="offSetGameCard">
                <img className="building-img"
                    src={props.img}
                >
                </img>
                <CardTitle >{props.id}</CardTitle>

                </Card>
            </div>
        );
    }
}

export default OffsetMatchingGame;
