
import React from "react";
import Counter from "./components/Basic_Project/Counter";
import ExpanseTracker from "./components/Basic_Project/ExpanseTracker";
import StopWatch from "./components/Basic_Project/StopWatch";
import RandomQuoteGenerator from "./components/Basic_Project/RandomQuoteGenerator";
import BlogPost from "./components/Medium_Project/BlogPost";
import DragDrop from "./components/Medium_Project/DragDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100 text-black">
      {/* <Counter /> */}
      {/* <ExpanseTracker /> */}
      {/* <StopWatch /> */}
      {/* <RandomQuoteGenerator /> */}
      {/* <BlogPost /> */}


      <DndProvider backend={HTML5Backend}>
        <DragDrop />
      </DndProvider>



    </div>
  );
}

export default App;
