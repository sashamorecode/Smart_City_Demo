import { Button, Container } from "react-bootstrap";
import { useState, View } from "react";
import Card from "react-bootstrap/Card";
import { arrayMove } from "@dnd-kit/sortable";
import { Link } from "react-router-dom";

const applianceData = [
  { name: "Light Bulb", wattage: 60, state: "hidden" },
  { name: "Television", wattage: 200, state: "hidden" },
  { name: "Refrigerator", wattage: 150, state: "hidden" },
  { name: "Computer", wattage: 100, state: "hidden" },
  { name: "Microwave", wattage: 1000, state: "hidden" },
  { name: "Hair Dryer", wattage: 1500, state: "hidden" },
  { name: "Air Conditioner", wattage: 5000, state: "hidden" },
  { name: "Electric Car", wattage: 10000, state: "hidden" },
];

function PickTheLargestGame() {
  const [energyConsumers, setEnergyConsumers] = useState(applianceData);

  return (
    <>
      <h1>Which consumes more?</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ flex: 1 }}>
          <OptionTile
            name={energyConsumers[0].name}
            wattage={energyConsumers[0].wattage}
            state={energyConsumers[0].state}
            index={0}
          />
        </div>
        <div style={{ flex: 1 }}>
          <OptionTile
            name={energyConsumers[1].name}
            wattage={energyConsumers[1].wattage}
            state={energyConsumers[1].state}
            index={1}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outline-primary" as={Link} to="/">
          Home
        </Button>
        <Button variant="outline-primary" onClick={replaceRevealed}>
          Next
        </Button>
      </div>
    </>
  );

  function OptionTile(props) {
    if (props.state === "correct") {
      return (
        <Button
          onClick={() => handelButtonClick(props.index, props.state)}
          style={{ width: "50rem", height: "20rem", margin: "auto" }}
          className="correct"
        >
          <div>
            <p style={{ fontSize: 20 }}>
              Correct a {props.name} consumes {props.wattage} watts, 
              which is less energy than a {energyConsumers[(props.index +1) %2].name}{" "}
              {" "}
            </p>
          </div>
        </Button>
      );
    }

    if (props.state === "wrong") {
      return (
        <Button
          onClick={() => handelButtonClick(props.index, props.state)}
          style={{ width: "50rem", height: "20rem", margin: "auto" }}
          className="incorrect"
        >
          <div>
            <p style={{ fontSize: 20 }}>
              Wrong a {props.name} consumes {props.wattage} watts, less energy than a {energyConsumers[(props.index +1) %2].name}{" "}
            </p>
          </div>
        </Button>
      );
    }
    return (
      <Button
        onClick={() => handelButtonClick(props.index, props.state)}
        style={{ width: "50rem", height: "20rem", margin: "auto" }}
      >
        <div>
          <p style={{ fontSize: 20 }}>{props.name}</p>
        </div>
      </Button>
    );
  }
  function replaceRevealed() {
    const revealedIndex = energyConsumers.findIndex(
      (item) => item.state === "correct" || item.state === "wrong"
    );
    setEnergyConsumers((items) => {
      items[revealedIndex].state = "hidden";
      return arrayMove(
        items,
        revealedIndex,
        Math.floor(Math.random() * energyConsumers.length)
      );
    });
  }

  function handelButtonClick(index, state) {
    if (state === "correct") {
    }
    if (state === "hidden") {
      if (
        energyConsumers[index].wattage >=
        energyConsumers[(index + 1) % 2].wattage
      ) {
        setEnergyConsumers((items) => {
          items[(index + 1) % 2].state = "correct";
          return [...items];
        });
        console.log("correct", index, (index + 1) % 2);
      } else {
        setEnergyConsumers((items) => {
          items[index].state = "wrong";
          return [...items];
        });
        console.log("wrong");
      }
    }

    console.log("button clicked", index, state);
  }
}

export default PickTheLargestGame;
