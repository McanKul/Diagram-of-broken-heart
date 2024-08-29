import React from 'react';
import myData from '../ehb_lectures.course_spy.json';
import Semester from './box';
import MySvg from './my_svg';
import { Provider } from './context'; // Oluşturduğunuz ThemeContext'i import edin

let data = myData;
const App = () => {
  return (
    <Provider>
      <div className="App">
        {[...Array(8)].map((_, i) => (
          <Semester data={data} index={i} />
        ))}
      </div>
      <MySvg data={data} />
    </Provider>
  );
}

export default App;
