import React, { useEffect, useState ,useContext} from 'react';
import "../App.css"
import { my_context } from './context';
function MySvg(props) {


   const [coords, setCoords] = useState([]);
   const [desCoords, setDesCoords] = useState([]);


   const calculateCoords = () => {
      const boxes = Array.from(document.getElementsByClassName('box'));
      const newCoords = boxes.map(box => {
         const rect = box.getBoundingClientRect();
         return {
            id: box.id,
            x: rect.left + rect.width / 2 + window.scrollX,
            y: rect.top + rect.height + window.scrollY
         };
      });
      setCoords(newCoords);
   };

   const calculateDesCoords = () => {
      const boxes = Array.from(document.getElementsByClassName('box'));
      const newCoords = boxes.map(box => {
         const rect = box.getBoundingClientRect();
         return {
            id: box.id,
            x: rect.left + rect.width / 2 + window.scrollX,
            y: rect.top + window.scrollY
         };
      });
      setDesCoords(newCoords);
   };
   const {data ,setdata} = useContext(my_context)
   useEffect(() => {
      calculateCoords();
      calculateDesCoords();
      const handleResize = () => {
         calculateCoords();
         calculateDesCoords();
      };
      window.addEventListener('resize', handleResize);
      setdata(false)
      return () => {
         window.removeEventListener('resize', handleResize);
      };
      
   }, [data]);

   const getCoordById = (id) => {
      return coords.find(coord => coord.id === id);
   };

   const getDesCoordById = (id) => {
      return desCoords.find(coord => coord.id === id);
   };


   const {dersler} = useContext(my_context);
   return (
      <svg height="100%" width="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
         <defs>
            <marker
               id="arrowhead"
               markerWidth="10"
               markerHeight="7"
               refX="5"
               refY="3.5"
               orient="auto"
               markerUnits="strokeWidth"
            >
               <polygon points="0 0, 10 3.5, 0 7" className='arrowHead'/>
            </marker>
            <marker
               id="arrowheadactive"
               markerWidth="20"
               markerHeight="14"
               refX="10"
               refY="7"
               orient="auto"
               markerUnits="userSpaceOnUse"
            >
               <polygon points="0 0, 20 7, 0 14" className='arrowHead active'/>
            </marker>
         </defs>
         {props.data.map((lesson) => (
            lesson.prerequisite.map((prereq) => {
               const startCoord = getCoordById(`box${prereq}`);
               const endCoord = getDesCoordById(`box${lesson.code}`);
               if (startCoord && endCoord) {
                  return (
                     <>

                        <path
                           className={dersler.includes(`${lesson.code}`)?'arrows active':'arrows'}
                           id={`path${prereq}${lesson.code}`}
                           key={`${prereq}-${lesson.code}`}
                           d={`M ${startCoord.x} ${startCoord.y} 
                              C ${startCoord.x} ${(startCoord.y + (endCoord.y - startCoord.y) / 2)}, 
                              ${(startCoord.x + (endCoord.x - startCoord.x) / 2)} ${(startCoord.y + (endCoord.y - startCoord.y) / 10)}, 
                              ${endCoord.x} ${endCoord.y}`}
                           markerEnd={dersler.includes(`${lesson.code}`)?'url(#arrowheadactive)':'url(#arrowhead)'}
                           fill='none'
                           
                        />
                     </>
                  );
               }
               return null;
            })))}
      </svg>

   )
}

export default MySvg;