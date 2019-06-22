import React, { Component } from 'react'

import Quiz from './Quiz'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categoryChoices: ['hiphop', 'pop', 'the80s', 'the70s', 'the90s', 'disney', 'rock', 'indie', 'rnb' ],
      strForInterpol: '',
      categoryStrings: {
        hiphop: '31021',
        pop: '31061',
        the80s: '38305',
        the90s: '38315',
        disney: '38335',
        the70s: '38295',
        rock: '42222',
        indie: '30771',
        rnb: '30811'
      }
    }
    this.getCategoryUrl = this.getCategoryUrl.bind(this)
  }

  getCategoryUrl(choice) {
    // console.log(this.state.categoryStrings[choice])
    this.setState( { strForInterpol: this.state.categoryStrings[choice] })

  }

  // pass this in the url for the request???

  render() {
    console.log('from the render', this.state)
    return (
      <main>
        <div className="title">
          <h1>Who Dat?</h1>
        </div>
        <div className="subtitle">
          <h3>Do you know who singz dat?</h3>
        </div>
        
        <div className="choose">
          <h2>Choose a category</h2>
        </div>
        <div>
          {
            this.state.categoryChoices.map(choice => (
              <button className="card"
                key={choice}
                onClick={() => this.getCategoryUrl(choice)}
              >
                {choice}
              </button>
            ))
          }
        </div>
        {this.state.strForInterpol && <Quiz
          strForInterpol={this.state.strForInterpol}
        />}
      </main>
    )
  }
}

export default Home
