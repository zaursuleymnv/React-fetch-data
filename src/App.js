import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react'

function App() {

  const [resourceType, setResourceType] = useState('posts')
  const [items, setItems] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  console.log('render');

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then(response => response.json())
      .then(json => setItems(json))

  }, [resourceType])

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
            <div className="btn-group mt-5" role="group">
              <button onClick={() => setResourceType('posts')} type="button" className="btn btn-primary">Posts</button>
              <button onClick={() => setResourceType('users')} type="button" className="btn btn-primary">Users</button>
              <button onClick={() => setResourceType('comments')} type="button" className="btn btn-primary">Comments</button>
            </div>
            <h1 className='mb-3'>{resourceType}</h1>
            {
              items.map(item => {
                return <pre>{JSON.stringify(item)}</pre>
              })
            }
            <h1 className="window-width mt-5">
              {windowWidth}
            </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
