import React ,{useState,useContext} from 'react';
import myData from '../ehb_lectures.course_spy.json';
import preData from "../ehb_lectures.elective_spy.json"
import { my_context } from './context';


function Box(props) {
   const { setTheme,dersler } = useContext(my_context);

   const findpreq = (element) =>{
      setTheme(element);
   }
   return (
      props.lesson.code !== "ELECTIVE" ?
         <div className={dersler.includes(props.lesson.code)?'box active':'box'} id={`box${props.lesson.code}`} key={`box${props.lesson.code}`} onClick={()=>findpreq(props.lesson)}>
            <p>{props.lesson.name}</p>
         </div> :
         
            <ElecBox lesson={props.lesson} data={props.data}/>
         
   )
}

function Semester(props) {
   return (
      <div className='semesters' key={`semester${props.index}`}>
         {myData.map((lesson, index) =>
            (lesson.semester === props.index + 1) ? (
               <Box lesson={lesson} data={props.data}/>
            ) : null
         )}
      </div>
   )
}


function ElecBox(prompt) {
   const [less,setLesson] = useState(prompt.lesson);
   const changeLesson = (value)=>{
      setLesson(value);
      prompt.data.map((lesson,index)=>{
         if(less.name===lesson.name){
            prompt.data[index]=value;
         }
         return;
      })
   }
   const {setTheme,dersler } = useContext(my_context);

   const findpreq = (element) =>{
      setTheme(element);
      console.log(element.code)
   }
   return (
      <>
         <div className={dersler.includes(less.code)?'box elecBox dropdown active':'box elecBox dropdown'} id={`box${less.code}`} name={`${less.code}`} onClick={()=>findpreq(less)}>
            <p id={`${less.name}`}>{less.name}</p>
            <ul className='selecticive_lesson' key={prompt.lesson.name}>
               {preData.map((lesson) => (
                  lesson.name === prompt.lesson.name ? lesson.course_list.map((preq) => (
                     <li key={preq.code} name={preq.name} id={`drop${preq.code}`} onClick={()=>changeLesson(preq)}>
                        {preq.name}
                     </li>
                  )) : null
               ))}
            </ul>
         </div>
      </>
   );
}
export default Semester;