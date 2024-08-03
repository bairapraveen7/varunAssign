import logo from './logo.svg';
import './App.css';
import { Student } from './Components/Student';
import { Library } from './Components/Library';
import { Book } from './Components/Book';

function App() {
  return (
    <div className="App">
       <Student />
       <Book />
       <Library />
    </div>
  );
}

export default App;
