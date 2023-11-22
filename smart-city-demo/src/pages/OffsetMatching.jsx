import { useDraggable, DndContext, useDroppable } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import "./OffsetMatching.css";
import { CardTitle, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import BackIcon from "./backButton";
import { View } from "react";
function OffsetMatchingGame() {
    const Buildings = [
        
        {
            name: "Rathaus",
            text: "", carbon: 2, img: "https://www.baukunst-nrw.de/img/objekte/XL/641_133903.jpg"
        },
        {
            name: "Super C",
            text: "", carbon: 3, img: "https://dam.destination.one/606337/c5a08a062a77e212198726c07d394c88c5ad336abf03e740b973b868edc75e3c/super-c-aachen.jpg"
        },
        {
            name: "Theatre",
            text: "", carbon: 1, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Aachen_Theatre.jpg/450px-Aachen_Theatre.jpg"
        },
    ];

    const CarbonOffsets = [
        {
            name: "Stadt Park x 2", className: "offSetGameCard",
            text: "Stadt Park x 2", carbon: -1, img: "https://dam.destination.one/658678/9ace0ad701589c21710db036498bb9a7a070536117e21c83b1b960a6dd5c634e/.jpg"
        },
        {
            name: "West Park x 2", isCompleate: true, className: "offSetGameCard",
            text: "West Park x 2", carbon: -2, img: "https://unser-aachen.eu/wp-content/uploads/2018/07/westpark03.jpg"
        },
        {
            name: "Stadt Park x 27", className: "offSetGameCard",
            text: "Stadt Park x 27", carbon: -3, img: "https://dam.destination.one/658674/ff3b438e87f905bdd5afd46cfb1c8bcefb88d01a8a59236d70d2c56465b5146c/.jpg"
        },
    ];
    const [activeBuildings, setActiveBuildings] = useState(Buildings);
    const [curResText, setCurResText] = useState("Drag and Drop");
    const [activeOffsets, setActiveOffsets] = useState(CarbonOffsets);
    return (
        <div style={{
            backgroundImage: "url(https://i.postimg.cc/ydYh4D8S/00005-3904468259-transformed.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            scrollBehavior: "off",
        }}>
            <Container className="offsetGameRoot">
                <div className="backButtonDiv">
                    <BackIcon />
                </div>
                <div style={{height:"3vh"}}/>
                
                <div>
                    <DndContext onDragEnd={handelDragEnd} modifiers={[restrictToWindowEdges]}>
                <div>
                    <h1 style={{flex:1}}>Drag each facility to the area of trees required to compensate its carbon offset</h1>
                </div>
                <div className="rowDiv" style={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <div style={{ flexGrow: 2, flexShrink:1, display: "flex", flexDirection: "column", alignItems:"center" }}>
                        {activeBuildings.map((building) => (
                            <Building
                                key={building.name}
                                id={building.name}
                                className="building"
                                carbon={building.carbon}
                                text={building.text}
                                state={building.state}
                                img={building.img}
                            />
                        ))}
                    </div>
                    <div style={{ flexGrow:1, flexShrink:2, alignContent:"center"}}>
                       
                        <Container style={{ height: "100%", minWidth:"13vw"}}>
                            <h3>
                                {TypeWrite(curResText, 45)}
                            </h3>
                        </Container>
                    </div>
                    <div style={{ flexGrow: 2, flexShrink:1, display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {activeOffsets.map((offset) => (
                            <Offset
                                key={offset.name}
                                id={offset.name}
                                class="offset"
                                text={offset.text}
                                img={offset.img}
                                className={offset.className}
                            />
                        ))
                        }
                    </div>
                </div>

                <div>
                    
                    <Button className="projButton back" onClick={() => {
                        setActiveBuildings(Buildings)
                        setActiveOffsets(CarbonOffsets)
                        setCurResText("Drag and Drop")
                    }}>Reset</Button>
                </div>
                </DndContext>
                </div>

            </Container>
        </div>
    );

    function handelDragEnd(event) {
        const { active, over } = event;
        if (over === null || active === null) {
            return;
        }
        const building = Buildings.find((building) => building.name === active.id);
        const offset = activeOffsets.find((offset) => offset.name === over.id);
        setCurResText("")
        if (building && building.carbon + offset.carbon === 0) {
            setCurResText("Correct " + offset.name + " offsets " + building.name);
            setActiveBuildings((items) => {
                const newItems = [...items];
                const index = newItems.findIndex((item) => item.name === building.name);
                newItems[index] = {
                    ...newItems[index],
                    text: building.carbon + " kg of Co2", state: "correct"
                };
                return newItems;
            });
            setActiveOffsets((items) => {
                const newItems = [...items];
                const index = newItems.findIndex((item) => item.name === offset.name);
                newItems[index] = {
                    ...newItems[index],
                    children: active, className: "offSetGameCardCorrect"
                };
                return newItems;
            });
        }
        else {
            setCurResText("Wrong " + offset.name + " dose not offset " + building.name);
            setActiveBuildings((items) => {
                const newItems = [...items];
                const index = newItems.findIndex((item) => item.name === building.name);
                newItems[index] = {
                    ...newItems[index],
                    state: "false"
                };
                return newItems;
            });
            console.log(activeBuildings);
        }


    }

    function TypeWrite(text, speed) {
        if (activeBuildings.filter((building) => building.state === "correct").length === activeBuildings.length) {
            text = text + ', Good Job You Finished the Game';
        }
        const [displayText, setDisplayText] = useState('');
        useEffect(() => {
            setDisplayText('')
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prevText => prevText + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, speed);

            return () => {
                clearInterval(typingInterval);
            };
        }, [text, speed]);

        return displayText;
    }

    function Building(props) {
        const { attributes, listeners, setNodeRef, transform, transition } =
            useDraggable({ id: props.id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            zIndex: 1,
            opacity: props.state === "correct" ? 0 : 1,
        };
        let classN = "DragMe"
        if (props.state === "correct") {
            classN = "DontDragMe"
        }
        const text = props.text;

        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={classN}>
                <Card body className="offSetGameCard">
                    <img className="building-img"
                        src={props.img}
                    >
                    </img>
                    <CardTitle >{props.id}</CardTitle>
                    {props.children}
                </Card>
            </div>
        );
    }



    function Offset(props) {
        const { attributes, listeners, setNodeRef, isOver } =
            useDroppable({ id: props.id });
        const style = {
            transform: isOver ? "scale(1.1)" : "scale(1)",
            opacity: isOver ? 1 : 0.8,
            
        };

        const text = props.text;
        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <Card body className={props.className}>
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
