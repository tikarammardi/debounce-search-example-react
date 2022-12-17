import { useRef } from 'react';
import { useState } from 'react';
import './App.css';
import debounce from 'debounce';

function App() {
const [isLoading, setIsLoading] = useState(false);
const [products, setProducts] = useState([]);
const searchQuery = useRef('')


const handleSearch = debounce(async () => {
  try {
    const query = searchQuery.current.value;

    if(!query.length){
      setProducts([])
      return
    }

    setIsLoading(true)


    const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=5`);
    const data = await response.json();

    setProducts(data.products);

    setIsLoading(false)
  } catch (error) {
    setIsLoading(false)
  }
},1000)


  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span> React
        </p>
        <p className="small">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type='text' ref={searchQuery} onChange={handleSearch}/>

        {!isLoading ? <ul>
          {!!products.length && products.map(product=>{
            return <li key={product.id} style={{border: '2px solid green'}}>
              <p>Title: {product.title}</p>
              <p>Price: ${product.price}</p>
            </li>
          })}
        </ul> : <p>Please wait ...</p>

        }
      </header>
    </div>
  );
}

export default App;
