import './App.css';
import Header from './components/Header/Header';
import TeslaBattery from './containers/TeslaBattery';

function App() {

  const counterDefaultVal = {
    speed: {
      title: "Speed",
      unit: "mph",
      step: 5,
      min: 45,
      max: 70
    },
    temperature: {
      title: "Outside Temperature",
      unit: "°",
      step: 10,
      min: -10,
      max: 40
    }
  }

  return (
    <div>
      <Header />   
      <TeslaBattery counterDefaultVal={counterDefaultVal} />   
    </div>
  );
}

export default App;
