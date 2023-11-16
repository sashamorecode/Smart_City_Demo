import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import {
  DndContext,
  closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import SortableItem from './SortableItem'
import Button from 'react-bootstrap/Button';
import { func } from 'prop-types'



const sourceData = [{id:"Solar", content:"Solar", usage: "5%", className:"card"}, 
  {id:"Wind", content:"Wind", usage: "10%", className:"card"},
  {id:"Coal", content:"Coal", usage: "20%", className:"card"},
  {id:"Gas", content:"Gas", usage: "30%", className:"card"},
  {id:"Oil", content:"Oil", usage: "35%" , className:"card"}];
const correctOrder = ["Oil", "Gas", "Coal", "Wind", "Solar"];
function App() {
  const [energySources, setEnergySources] = useState(sourceData);

  return (
    <>
    <div><h1>Smart City Demo</h1></div>
    
    <h2>Energy Sources</h2>
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Container className='p-1' style={{"width": "50%","height": "50%"}} align="center" >
        <p>sort energy sources by usage in Aachen</p>
        <SortableContext
          items={energySources}
          strategy={verticalListSortingStrategy}
        >
          {energySources.map((source) => <SortableItem key={source.id} id={source.id} percentage={source.usage} className={source.className} />)}
        </SortableContext>
      </Container>
    </DndContext>
    <Button variant="outline-primary" onClick={checkOrder}>Check</Button>{' '}
    </>
  );
  
  function handleDragEnd(event) {
    const {active, over} = event
    if (active.id !== over.id) {
      setEnergySources((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
      
    }
  }

  function checkOrder(){
    const newEnergySources = energySources.map((item, index) => {
      if (item.id === correctOrder[index]) {
        item.className = "correct";
        return { ...item, className: "correct" };
      } else {
        return { ...item, className: "incorrect" };
      }
    });
    setEnergySources(newEnergySources);
  }
}



export default App
