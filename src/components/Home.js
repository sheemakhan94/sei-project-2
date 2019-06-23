import React, { Component } from 'react'
import Dashboard from './Dashboard'

import Quiz from './Quiz'
import Footer from './Footer'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categoryChoices: ['hiphop', 'pop', 'the80s', 'the70s', 'the90s',
        'disney', 'rock', 'indie', 'rnb' ],
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
    this.chooseAgain = this.chooseAgain.bind(this)

  }

  //click function that sets state as the numerical string end-point for deezer get request
  // that corresponds with the chosen genre
  getCategoryUrl(choice) {
    this.setState( { strForInterpol: this.state.categoryStrings[choice] })
    this.hideButtons()
  }
  //hides original choice buttons and displays quiz
  hideButtons() {
    document.querySelector('.choiceButtons').style.display = 'none'
    document.querySelector('.chooseAgain').style.display = 'block'
    document.querySelector('.quiz').style.display = 'block'
  }
  //shows original choice button and hides quiz
  chooseAgain() {
    document.querySelector('.chooseAgain').style.display = 'none'
    document.querySelector('.choiceButtons').style.display = 'block'
    document.querySelector('.quiz').style.display = 'none'
  }

  render() {

    return (
      <main>
        <div className="title">
          <h1>Who Dat?</h1>
        </div>
        <div className="subtitle">
          <h3>Do you know who singz dat?</h3>
        </div>
        <button className="chooseAgain"
          onClick={this.chooseAgain}>
          Choose a different category
        </button>
        <div className = "choiceButtons">
          <Dashboard />
          <div className="choose">
            <h2>Choose a category</h2>
          </div>
          <div className="catButtons">
            {
              this.state.categoryChoices.map(choice => (
                <button className="card"
                  key={choice}
                  onClick={() => this.getCategoryUrl(choice)}>
                  {choice}
                </button>
              ))
            }
          </div>
        </div>
        <div className="quiz">
          {this.state.strForInterpol && <Quiz
            strForInterpol={this.state.strForInterpol}
          />}
        </div>
        <footer>
          <Footer />
        </footer>
      </main>
    )
  }
}

export default Home
