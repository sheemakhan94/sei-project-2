import React from 'react'
import axios from 'axios'
import Sound from 'react-sound'


class Quiz extends React.Component {
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
  }

  componentDidMount() {
    this.getData()
  }


  //get request to set state with an array of 25 tracks according to genre picked by user.
  getData() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/radio/${this.props.strForInterpol}/tracks`)

      .then(res => this.setState( { tracks: res.data.data },   () => this.getAnswers(), () => this.randomAreaFunction()))
      .catch(err => console.log(err))
  }

  //resets/updates if user picks a category that is different
  componentDidUpdate(prevProps) {
    if (this.props.strForInterpol !== prevProps.strForInterpol) {
      this.getData()
      this.reset()
    }
  }

  //function to generate random grid area for correct answer so that it changes position.
  randomAreaFunction() {
    const randAreaArr = ['1/1', '1/2', '2/1', '2/2']
    const randArr = randAreaArr[Math.floor(Math.random() * 4)]
    return randArr
  }

  //function to generate song that plays (the correct answer) and also three random songs
  // from the tracks array once the playing song has been filtered out the array.
  getAnswers(questionCounter) {
    if (!this.state.tracks) return null
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

  //game logic, increments points if guess is correct and keeps track to number of questions answered.
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

  //result displayed to user based on score and displays reset button
  gameOver(scoreCounter) {

    scoreCounter = this.scoreCounter
    let result = ''
    if (scoreCounter < 10) {
      result = ` Game over. Oh dear! You scored ${scoreCounter} out of 25, that is really very
    disappointing. Reset to try again or choose a different category.`
      this.result = result
    } else if  (scoreCounter < 15) {
      result =` Game over. You scored ${scoreCounter} out of 25, not bad but not good either. Reset to try again or pick a different category.`
      this.result = result
    } else if  (scoreCounter < 20) {
      result =` Game over. You scored ${scoreCounter} out of 25, good job, you should be pleased but you could still do better. Reset to try again or pick a different category.`
      this.result = result
    } else if (scoreCounter < 25) {
      result =` Game over. You scored ${scoreCounter} out of 25, well-bloody-done, you should be very proud. You must be quite the music buff. Test yourself and try another category!`
      this.result = result
    }
    document.querySelector('.reset').style.display = 'block'


  }

  //reset function
  reset() {
    this.trackName = ''
    this.result = ''
    this.scoreCounter = 0
    this.questionCounter = 0
    this.filteredTracks = []
    this.unPlayed = false
    this.setState({ tracks: '', randomSet: [] })
    this.getData()
  }

  render() {
    if (!this.state.tracks) return null
    return (
      <main>
        <Sound
          url={this.playingSong}
          playStatus={Sound.status.PLAYING}
        />
        <div className = "grid-container" id="choice">
          <button  onClick={this.winFunction} className="One">
            {this.state.randomSet[0]}
          </button>
          <button  onClick={this.winFunction} className="Two"
            style={{gridArea: this.randomAreaFunction() }}>
            {this.trackName}
          </button>
          <button onClick={this.winFunction} className="Three">
            {this.state.randomSet[1]}
          </button>
          <button  onClick={this.winFunction} className="Four">
            {this.state.randomSet[2]}
          </button>
        </div>
        <h1 className="score">{this.scoreCounter}</h1>
        <section className = "resultSection">
          <h2 className="result">{this.result}</h2>
          <button onClick={this.reset} className = "reset">
            <h2 >reset</h2>
          </button>
        </section>

      </main>


    )
  }
}


export default Quiz
