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

function OffsetMatchingGame() {
    const Buildings = [
        {
            name: "Dom",
            text: "", carbon: 300, img: "https://zva-igelbank.s3.eu-central-1.amazonaws.com/1024x1024_max/3b6dc3fea9304caf1043486ce94551b9.jpg?v=1"
        },
        {
            name: "Rathaus",
            text: "", carbon: 600, img: "https://www.baukunst-nrw.de/img/objekte/XL/641_133903.jpg"
        },
        {
            name: "Random Building",
            text: "", carbon: 400, img: "https://images2.fanpop.com/image/photos/9800000/random-cool-buildings-random-9869312-500-549.jpg"
        },
    ];

    const CarbonOffsets = [
        {
            name: "4 Football Fields", className: "offSetGameCard",
            text: "4 Football Fields", carbon: -300, img: "https://www.francisfields.com/wp-content/uploads/cropped-Rainbow-Pictures-copy-v.4-scaled-1.jpg"
        },
        {
            name: "Westpark", isCompleate: true, className: "offSetGameCard",
            text: "Westpark", carbon: -600, img: "https://unser-aachen.eu/wp-content/uploads/2018/07/westpark03.jpg"
        },
        {
            name: "Random Offset", className: "offSetGameCard",
            text: "Random Offset", carbon: -400, img: "https://research.reading.ac.uk/research-blog/wp-content/uploads/sites/72/2023/10/Sycamore_Gap_The_Tree.jpg"
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
                <DndContext onDragEnd={handelDragEnd} modifiers={[restrictToWindowEdges]}>
                    <h1>Offset Matching Game</h1>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", }}>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems:"center" }}>
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
                        <div style={{ flex: 1 }}>
                            <Container style={{ height: "100%", width: "100%" }}>
                                <h3>
                                    {TypeWrite(curResText, 45)}
                                </h3>
                            </Container>
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            setCurResText("Correct " + building.name + " : " + building.carbon + "kg CO2");
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
            setCurResText("Wrong " + building.name + " dose not match " + offset.name);
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
            text = text + "\n\nGood Job You Finished the Game";
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
        const text = props.text;

        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
