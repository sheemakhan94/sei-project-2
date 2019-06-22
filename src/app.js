import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import './styles/style.scss'


import Home from './components/Home'
import Quiz from './components/Quiz'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <main>
          <nav>
            <Link to="/quiz">Quiz</Link>
            <Link to="/">Home</Link>
          </nav>
          <Switch>
            <Route exact path="/quiz" component={Quiz}/>
            <Route exact path="/" component={Home}/>
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
