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
    this.trackName = ''
    this.scoreCounter = 0
    this.filteredTracks = []
    this.unPlayed = false
    this.categories = {
      hipHop: '31021',
      pop: '31061'
    }




  }


  getRandomTrack() {

    const randomNum = Math.floor(Math.random() * 25)
    this.trackName = this.state.tracks[randomNum].artist.name

    return this.state.tracks[randomNum].preview
  }



  randomAreaFunction() {
    const randAreaArr = ['1/1', '1/2', '2/1', '2/2']
    const randArr = randAreaArr[Math.floor(Math.random() * 4)]
    // console.log('random', randArr)
    return randArr
  }


  getRandomAnswers() {
    const randomArr = []
    randomArr[0] = this.state.tracks[Math.floor(Math.random() * 10)].artist.name
    randomArr[1] = this.state.tracks[Math.floor(Math.random() * 5) + 3].artist.name
    randomArr[2] = this.state.tracks[Math.floor(Math.random() * 10) + 10].artist.name
    this.setState( { randomSet: randomArr })
  }

  winFunction(e) {

    this.unPlayed = true
    console.log(e.target.innerText)
    const clickedAnswer = e.target.innerText
    if(clickedAnswer === this.trackName && this.unPlayed) {
      console.log('CORRECT')
      this.scoreCounter += 1
      this.getRandomTrack()
      this.getRandomAnswers()
      this.scoreCounter = this.scoreCounter
      this.unPlayed = false
    } else {
      this.scoreCounter += 0
      this.getRandomTrack()
      this.getRandomAnswers()
      console.log('WRONG')
      this.scoreCounter = this.scoreCounter
      this.unPlayed = false
    }



  }



  componentDidMount() {

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/radio/${this.categories.hipHop}/tracks`)

      .then(res => this.setState( { tracks: res.data.data }, () => this.getRandomAnswers(), () => this.filterTracks(), () => this.randomAreaFunction()))
      .catch(err => console.log(err))
    // this.getRandomAnswers()


  }



  render() {

    if (!this.state.tracks) return null
    console.log(this.scoreCounter)
    return (
      <main>

        <h1> Who dat? </h1>
        <Sound
          url={this.getRandomTrack()}
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

        <h1>{this.scoreCounter}</h1>






      </main>





    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
