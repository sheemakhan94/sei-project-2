import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './styles/style.scss'
import Sound from 'react-sound'


class App extends React.Component {
  constructor() {
    super()
    this.state = { tracks: '', randomSet: [] }

    this.winFunction = this.winFunction.bind(this)
    this.reset = this.reset.bind(this)
    this.playingSong = ''
    this.trackName = ''
    this.result = ''
    this.scoreCounter = 0
    this.questionCounter = 0
    this.filteredTracks = []
    this.unPlayed = false
    this.categories = {
      hipHop: '31021',
      pop: '31061',
      OldSkoolRnB: '30811',
      RnB: '30881'
    }




  }

  randomAreaFunction() {
    const randAreaArr = ['1/1', '1/2', '2/1', '2/2']
    const randArr = randAreaArr[Math.floor(Math.random() * 4)]
    return randArr
  }


  getAnswers(questionCounter) {
    questionCounter = this.questionCounter
    const randomArr = []


    this.trackName = this.state.tracks[questionCounter].artist.name
    this.filteredTracks = this.state.tracks.filter(track =>
      track.artist.name !== this.trackName)

    this.playingSong = this.state.tracks[questionCounter].preview

    randomArr[0] = this.filteredTracks[Math.floor(Math.random() * 10 )].artist.name
    randomArr[1] = this.filteredTracks[Math.floor(Math.random() * 10) + 11].artist.name
    randomArr[2] = this.filteredTracks[Math.floor(Math.random() * 5) + 19].artist.name

    this.setState( { randomSet: randomArr })
  }


  winFunction(e) {

    this.unPlayed = true
    console.log(e.target.innerText)
    const clickedAnswer = e.target.innerText
    if(clickedAnswer === this.trackName && this.unPlayed) {
      this.result = 'CORRECT'
      console.log(this.trackName)
      this.scoreCounter += 1
      this.questionCounter +=1

      this.getAnswers(this.questionCounter)
      this.scoreCounter = this.scoreCounter
      this.unPlayed = false
    } else {
      console.log(this.trackName)
      this.scoreCounter += 0
      this.questionCounter +=1

      this.getAnswers(this.questionCounter)
      this.result = 'WRONG'
      this.scoreCounter = this.scoreCounter
      this.unPlayed = false
    }
    console.log(this.questionCounter)
    if(this.questionCounter === 24) {
      console.log(this.questionCounter, 'GAME OVER')
      this.gameOver(this.scoreCounter)
    }



  }

  gameOver(scoreCounter) {

    scoreCounter = this.scoreCounter
    let result = ''
    if (scoreCounter < 10) {
      result = ` Game over. Oh dear! You scored ${scoreCounter} out of 25, that is really very
    disappointing. Reset to try again or browse our categories here.`
      this.result = result
    } else if  (scoreCounter < 15) {
      result =` Game over. You scored ${scoreCounter} out of 25, not bad but not good either. Reset to try again or browse our categories here.`
      this.result = result
    } else if  (scoreCounter < 20) {
      result =` Game over. You scored ${scoreCounter} out of 25, good job, you should be pleased but you could still do better. Reset to try again or browse our categories here.`
      this.result = result
    } else if (scoreCounter < 25) {
      result =` Game over. You scored ${scoreCounter} out of 25, well-bloody-done, you should be very proud. You must be quite the music buff. Browse our categories here and see if you know as much about other genres.`
      this.result = result
    }

    console.log('result', this.result)
    document.querySelector('.reset').style.display = 'block'


  }

  reset() {

    this.trackName = ''
    this.result = ''
    this.scoreCounter = 0
    this.questionCounter = 0
    this.filteredTracks = []
    this.unPlayed = false
    this.setState({ tracks: '', randomSet: [] })
    this.componentDidMount()
  }


  componentDidMount() {

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/radio/${this.categories.RnB}/tracks`)

      .then(res => this.setState( { tracks: res.data.data },   () => this.getAnswers(), () => this.randomAreaFunction()))
      .catch(err => console.log(err))



  }



  render() {

    if (!this.state.tracks) return null

    return (
      <main>

        <h1> Who dat? </h1>
        <Sound
          url={this.playingSong}
          playStatus={Sound.status.PLAYING}


        />
        <div className = "grid-container">
          <button  onClick={this.winFunction} className="answerWrongOne">
            <h3>{this.state.randomSet[0]}</h3>
          </button>
          <button  onClick={this.winFunction} className="answerRight" style={{gridArea: this.randomAreaFunction() }}>
            <h3>{this.trackName}</h3>
          </button>
          <button onClick={this.winFunction} className="answerWrongTwo">
            <h3>{this.state.randomSet[1]}</h3>
          </button>
          <button  onClick={this.winFunction} className="answerWrongThree">
            <h3>{this.state.randomSet[2]}</h3>
          </button>
        </div>

        <h1 className="score">{this.scoreCounter}</h1>

        <h2 className="result">{this.result}</h2>
        <button onClick={this.reset} className = "reset">
          <h2 >reset</h2>
        </button>
      </main>

    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)



// switch(scoreCounter) {
//   case scoreCounter < 5 :
//     result = ` Game over. Oh dear! You scored ${scoreCounter} out of 25, that is really very
// disappointing. Reset to try again or browse our categories here.`
//     this.result = result
//     break
//   case (scoreCounter < 15):
//     result =` Game over. You scored ${scoreCounter} out of 25, not bad but not good either. Reset to try again or browse our categories here.`
//     this.result = result
//     break
//   case (scoreCounter < 20):
//     result =` Game over. You scored ${scoreCounter} out of 25, good job, you should be pleased but you could still do better. Reset to try again or browse our categories here.`
//     this.result = result
//     break
//   case (scoreCounter < 25):
//     result =` Game over. You scored ${scoreCounter} out of 25, well-bloody-done, you should be very proud. You must be quite the music buff. Browse our categories here and see if you know as much about other genres.`
//     this.result = result
// }
