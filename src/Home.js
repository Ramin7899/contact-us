import './assets/min_file/home.min.css';
import Navbar from './components/navbar/Navbar';
import './assets/min_file/main.min.css';
import Contacts from './components/contact/contacts';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Contacts />
    </div>
  );
}
export default App;
