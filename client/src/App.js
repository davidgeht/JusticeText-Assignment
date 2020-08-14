import React, {Suspense, lazy ,useEffect, useState } from 'react';
// import TextItem from './components/Textitem';
import Header from './components/header';
import './App.css';
import JTpic from "./assets/Justice.webp";
// i addded a lazy loader this allows the page to load and before the TextItem fetches all 90 paragraphs
const TextItem = lazy(()=>import("./components/Textitem"));
// const DATA_SIZE_HALF = "half"
const DATA_SIZE_FULL = "full"
const DATA_SIZE_HALF = "half"

const INTERVAL_TIME = 2000

/** Application entry point */
function App() {

  const [data, setData] = useState([])
  const [value, setValue] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  

  /** DO NOT CHANGE THE FUNCTION BELOW */
  useEffect(() => {
    setInterval(() => {
      // Find random bucket of words to highlight
      setValue(Math.floor(Math.random() * 10))
    }, INTERVAL_TIME)
  }, [])
  /** DO NOT CHANGE THE FUNCTION ABOVE */

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("/api/dataIdList?datasize=" + DATA_SIZE_FULL)
      let list = await response.json()

      let dataItems = await Promise.all (list.map(async id => {
        return (await fetch("/api/dataItem/" + id)).json()
      }))
     
      setData(dataItems)
    }
    
    fetchData()
  }, [])

  const handleChange = e => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="App">
     <Header/>
      <div className="SearchBar">
        <h1 className="SBTitle">Search For Related Words</h1>
        <input type="text" placeholder="Search text" value={searchInput} onChange={handleChange}/>
        <img src={JTpic} style={{height:'420.984px',width:'600px'}}></img>
      </div>
     <Suspense fallback={<h1>Loading...</h1>}>
     {
       data.map((row, i) => {
        return (<p key={`p${i}`}>
          {row.map((textitem, j) => {
            if (searchInput.length > 0 && textitem.text.search(searchInput) === -1) {
              return null;
            }

            return (
             
            <>
              
              <TextItem key={`${i}${j}`} value={value} data={textitem} />
          
            </>)
          })}
        </p>)
       })
     }
     </Suspense>
    </div>
  );
}

export default App;
