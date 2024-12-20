import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'ITEM';

const DragDrop = () => {
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' },
  ]);

  const [inProcessItems, setInProcessItems] = useState([
    { id: 4, text: 'Task 4' },
  ]);

  const [completedItems, setCompletedItems] = useState([
    { id: 5, text: 'Task 5' },
  ]);

  const moveItem = (draggedId, sourceBox, targetBox) => {
    const sourceItems = sourceBox === 'todo' ? todoItems : sourceBox === 'inProcess' ? inProcessItems : completedItems;
    const targetItems = targetBox === 'todo' ? todoItems : targetBox === 'inProcess' ? inProcessItems : completedItems;

    const draggedItem = sourceItems.find(item => item.id === draggedId);
    const newSourceItems = sourceItems.filter(item => item.id !== draggedId);
    const newTargetItems = [...targetItems, draggedItem];

    // Update the correct state based on source and target
    if (sourceBox === 'todo') {
      setTodoItems(newSourceItems);
      setTargetState(targetBox, newTargetItems);
    } else if (sourceBox === 'inProcess') {
      setInProcessItems(newSourceItems);
      setTargetState(targetBox, newTargetItems);
    } else {
      setCompletedItems(newSourceItems);
      setTargetState(targetBox, newTargetItems);
    }
  };

  const setTargetState = (targetBox, newTargetItems) => {
    if (targetBox === 'todo') {
      setTodoItems(newTargetItems);
    } else if (targetBox === 'inProcess') {
      setInProcessItems(newTargetItems);
    } else {
      setCompletedItems(newTargetItems);
    }
  };

  const DraggableItem = ({ item, sourceBox, targetBox }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemType,
      item: { id: item.id, sourceBox },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        className={`bg-gray-200 p-3 my-2 border border-gray-300 rounded-md cursor-pointer transition-transform duration-200 ease-in-out ${
          isDragging ? 'opacity-50 scale-105' : ''
        }`}
      >
        {item.text}
      </div>
    );
  };

  const DropTarget = ({ children, targetBox }) => {
    const [, drop] = useDrop({
      accept: ItemType,
      drop: (item) => moveItem(item.id, item.sourceBox, targetBox),
    });

    return (
      <div
        ref={drop}
        className="min-h-[300px] max-w-[400px] p-6 border-2 border-dashed border-gray-300 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out hover:border-blue-500 focus:border-blue-500 focus:outline-none"
      >
        {children}
      </div>
    );
  };

  return (
    <div className="flex gap-8 justify-center">
      {/* To-Do Box */}
      <DropTarget targetBox="todo">
        <h2 className="text-xl font-bold text-center mb-4">To-Do</h2>
        {todoItems.map(item => (
          <DraggableItem key={item.id} item={item} sourceBox="todo" targetBox="inProcess" />
        ))}
      </DropTarget>

      {/* In-Process Box */}
      <DropTarget targetBox="inProcess">
        <h2 className="text-xl font-bold text-center mb-4">In-Process</h2>
        {inProcessItems.map(item => (
          <DraggableItem key={item.id} item={item} sourceBox="inProcess" targetBox="completed" />
        ))}
      </DropTarget>

      {/* Completed Box */}
      <DropTarget targetBox="completed">
        <h2 className="text-xl font-bold text-center mb-4">Completed</h2>
        {completedItems.map(item => (
          <DraggableItem key={item.id} item={item} sourceBox="completed" targetBox="todo" />
        ))}
      </DropTarget>
    </div>
  );
};

export default DragDrop;
