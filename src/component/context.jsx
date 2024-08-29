import React, { createContext, useState, useEffect } from 'react';
import myData from '../ehb_lectures.course_spy.json';

// Context'i oluştur
const my_context = createContext();

// Rekürsif olarak tüm ön şartları almak için yardımcı fonksiyon
const getAllPrerequisites = (code, data, visited = new Set()) => {
  const prerequisites = [];
  const queue = [code];
  
  while (queue.length > 0) {
    const currentCode = queue.shift();
    if (!visited.has(currentCode)) {
      visited.add(currentCode);
      
      const lesson = data.find(l => l.code === currentCode);
      if (lesson) {
        prerequisites.push(currentCode);
        if (lesson.prerequisite) {
          lesson.prerequisite.forEach(preReq => {
            if (!visited.has(preReq)) {
              queue.push(preReq);
            }
          });
        }
      }
    }
  }
  
  return prerequisites;
};



function Provider({ children }) {
  const [theme, setTheme] = useState(null);
  const [dersler, setders] = useState([]);
  const [isdata , setdata] = useState(false);
  useEffect(() => {
    if (theme) {
      const allPrerequisites = getAllPrerequisites(theme.code, myData);
      setders(allPrerequisites);
    }
  }, [theme]);

  return (
    <my_context.Provider value={{ theme, setTheme, dersler,isdata,setdata}}>
      {children}
    </my_context.Provider>
  );
}

export { Provider, my_context };
