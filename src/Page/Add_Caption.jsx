/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, Circle, Rect, Triangle, Polygon, Textbox } from 'fabric';
import { PiCircleDuotone, PiRectangleDuotone, PiTriangleDuotone } from 'react-icons/pi';
import * as fabric from 'fabric';
import { useParams } from 'react-router-dom';

const Add_Caption = () => {
  const { id } = useParams();
  const imageUrl = decodeURIComponent(id); // Decode the URL
  console.log(imageUrl);
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });
      setCanvas(fabricCanvas);

      return () => fabricCanvas.dispose();
    }
  }, []);

  const imageAdd = () => {
    // const url =
    //   'https://images.unsplash.com/photo-1613142007379-7a4571c12d26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0OTc0OTd8MHwxfHNlYXJjaHw4fHxzZHxlbnwwfHx8fDE3MjQ3ODM5OTB8MA&ixlib=rb-4.0.3&q=80&w=400';

    fetch(imageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then(blob => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = (e) => {
          const imgUrl = e.target.result;
          const imageElement = document.createElement('img');
          imageElement.src = imgUrl;
          imageElement.onload = function () {
            const image = new fabric.Image(imageElement, { crossOrigin: 'Anonymous' });
            canvas && canvas.add(image);
            canvas && canvas.renderAll();
          };
        };
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    if (canvas) {
      imageAdd();
    }
  }, [canvas]);

  const addText = () => {
    const addTextOnCanvas = new fabric.Textbox(text, {
      left: 100,
      top: 100,
      fill: 'black',
    });
    canvas.add(addTextOnCanvas);
  };

  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case 'circle':
        shape = new fabric.Circle({
          radius: 50,
          fill: 'red',
          left: 100,
          top: 100,
        });
        break;
      case 'rectangle':
        shape = new fabric.Rect({
          width: 100,
          height: 60,
          fill: 'green',
          left: 150,
          top: 150,
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: 'blue',
          left: 150,
          top: 150,
        });
        break;
      case 'polygon':
        shape = new fabric.Polygon([ 
          { x: 200, y: 0 },
          { x: 250, y: 50 },
          { x: 200, y: 100 },
          { x: 150, y: 50 }
        ], {
          fill: 'yellow',
          left: 100,
          top: 100,
        });
        break;
      default:
        break;
    }
    if (shape) {
      canvas.add(shape);
      canvas.renderAll();
    }
  };

  const downloadImage = () => {
    const dataURL = canvas.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'modified-image.png';
    link.click();
  };

  return (
    <div className="mx-4 my-10 h-[100vh] ">
        <div className='flex mb-3'>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20rem] p-2.5"
            placeholder="Enter text here"
            required
          />
          <button onClick={addText} className="bg-blue-500 text-white p-2 rounded ml-3">
            Add Text
          </button>
        </div>
        <canvas id="imageCanvas" ref={canvasRef} className="border w-[30rem] h-96"></canvas>
        <div className='flex'>
          <PiRectangleDuotone onClick={() => addShape('rectangle')} className='text-[100px]' />
          <PiTriangleDuotone onClick={() => addShape('triangle')} className='text-[100px]' />
          <PiCircleDuotone onClick={() => addShape('circle')} className='text-[100px]' />
      <button onClick={downloadImage} className="bg-purple-500 h-11 text-white p-2 rounded mt-3">
        Download Image
      </button>
        </div>
    </div>
  );
};

export default Add_Caption;
