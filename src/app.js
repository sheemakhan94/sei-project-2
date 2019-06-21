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
    this.playingSong = ''
    this.trackName = ''
    this.result = ''
    this.scoreCounter = 0
    this.filteredTracks = []
    this.unPlayed = false
    this.categories = {
      hipHop: '31021',
      pop: '31061',
      OldSkoolRnB: '30811',
      RnB: '30881'
    }




  }


  // getRandomTrack() {
  //
  //   const randomNum = Math.floor(Math.random() * 25)
  //   this.trackName = this.state.tracks[randomNum].artist.name
  //   this.filteredTracks = this.state.tracks.filter(track =>
  //     track.artist.name !== this.trackName
  //   )
  //   // console.log(this.trackName)
  //
  //   // console.log(this.filteredTracks)
  //   return this.state.tracks[randomNum].preview
  // }



  randomAreaFunction() {
    const randAreaArr = ['1/1', '1/2', '2/1', '2/2']
    const randArr = randAreaArr[Math.floor(Math.random() * 4)]
    // console.log('random', randArr)
    return randArr
  }


  // componentHas(nextProps, nextState) {
  //
  //   console.log(nextProps, nextState)
  // }
  //
  // componentDidUpdate() {
  //   filteredTracks = this.filteredTracks
  //   const randomArr = []
  //
  //   randomArr[0] = filteredTracks[Math.floor(Math.random() * 10 )].artist.name
  //
  //   randomArr[1] = filteredTracks[Math.floor(Math.random() * 10) + 11].artist.name
  //   randomArr[2] = filteredTracks[Math.floor(Math.random() * 5) + 19].artist.name
  //
  //   this.setState( { randomSet: randomArr })
  // }


  getAnswers() {


    const randomNum = Math.floor(Math.random() * 25)
    this.trackName = this.state.tracks[randomNum].artist.name
    this.filteredTracks = this.state.tracks.filter(track =>
      track.artist.name !== this.trackName)

    this.playingSong = this.state.tracks[randomNum].preview


    const randomArr = []

    randomArr[0] = this.filteredTracks[Math.floor(Math.random() * 10 )].artist.name

    randomArr[1] = this.filteredTracks[Math.floor(Math.random() * 10) + 11].artist.name
    randomArr[2] = this.filteredTracks[Math.floor(Math.random() * 5) + 19].artist.name

    this.setState( { randomSet: randomArr })
  }



  // getRandomAnswers() {
  //   const randomArr = []
  //   randomArr[0] = this.state.tracks[Math.floor(Math.random() * 10)].artist.name
  //   randomArr[1] = this.state.tracks[Math.floor(Math.random() * 5) + 3].artist.name
  //   randomArr[2] = this.state.tracks[Math.floor(Math.random() * 10) + 10].artist.name
  //   this.setState( { randomSet: randomArr })
  // }

  winFunction(e) {

    this.unPlayed = true
    console.log(e.target.innerText)
    const clickedAnswer = e.target.innerText
    if(clickedAnswer === this.trackName && this.unPlayed) {
      this.result = 'CORRECT'
      console.log(this.trackName)
      this.scoreCounter += 1
      // this.getRandomTrack()
      // this.getRandomAnswers()
      this.getAnswers()
      this.scoreCounter = this.scoreCounter
      this.unPlayed = false
    } else {
      console.log(this.trackName)
      this.scoreCounter += 0
      // this.getRandomTrack()
      // this.getRandomAnswers()
      this.getAnswers()
      this.result = 'WRONG'
      this.scoreCounter = this.scoreCounter
      this.unPlayed = false
    }



  }




  componentDidMount() {

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/radio/${this.categories.RnB}/tracks`)

      .then(res => this.setState( { tracks: res.data.data },   () => this.getAnswers(), () => this.randomAreaFunction()))
      .catch(err => console.log(err))
      // this.getRandomAnswers()
      // () => this.getRandomTrack(),


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

        <h1>{this.scoreCounter}</h1>

        <h2>{this.result}</h2>






      </main>





    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// import React from 'react'
// import ReactDOM from 'react-dom'
// import axios from 'axios'
// import './styles/style.scss'
// import Sound from 'react-sound'
//
//
// class App extends React.Component {
//   constructor() {
//     super()
//     this.state = { tracks: '', randomSet: [] }
//
//     this.winFunction = this.winFunction.bind(this)
//     this.trackName = ''
//     this.playingTrack = ''
//     this.result = ''
//     this.scoreCounter = 0
//     this.filteredTracks = []
//     this.unPlayed = false
//     this.categories = {
//       hipHop: '31021',
//       pop: '31061',
//       OldSkoolRnB: '30811',
//       RnB: '30881'
//     }
//
//
//
//
//   }
//
//
//   // getRandomTrack() {
//   //
//   //   const randomNum = Math.floor(Math.random() * 25)
//   //   this.trackName = this.state.tracks[randomNum].artist.name
//   //   // console.log(this.trackName)
//   //   this.filteredTracks = this.state.tracks.filter(track =>
//   //     track.artist.name !== this.trackName
//   //   )
//   //   // console.log(this.filteredTracks)
//   //   return this.state.tracks[randomNum].preview
//   // }
//
//
//
//   randomAreaFunction() {
//     const randAreaArr = ['1/1', '1/2', '2/1', '2/2']
//     const randArr = randAreaArr[Math.floor(Math.random() * 4)]
//     // console.log('random', randArr)
//     return randArr
//   }
//
//
//   componentDidUpdate() {
//     const randomNum = Math.floor(Math.random() * 25)
//     this.trackName = this.state.tracks[randomNum].artist.name
//     // console.log(this.trackName)
//     this.filteredTracks = this.state.tracks.filter(track =>
//       track.artist.name !== this.trackName
//     )
//     // console.log(this.filteredTracks)
//     this.playingTrack = this.state.tracks[randomNum].preview
//     this.getRandomAnswers()
//   }
//
//
//   getRandomAnswers(filteredTracks) {
//     filteredTracks = this.filteredTracks
//     const randomArr = []
//
//     randomArr[0] = filteredTracks[Math.floor(Math.random() * 10 )].artist.name
//
//     randomArr[1] = filteredTracks[Math.floor(Math.random() * 10) + 11].artist.name
//     randomArr[2] = filteredTracks[Math.floor(Math.random() * 5) + 19].artist.name
//
//     this.setState( { randomSet: randomArr })
//   }
//
//
//
//   // getRandomAnswers() {
//   //   const randomArr = []
//   //   randomArr[0] = this.state.tracks[Math.floor(Math.random() * 10)].artist.name
//   //   randomArr[1] = this.state.tracks[Math.floor(Math.random() * 5) + 3].artist.name
//   //   randomArr[2] = this.state.tracks[Math.floor(Math.random() * 10) + 10].artist.name
//   //   this.setState( { randomSet: randomArr })
//   // }
//
//   winFunction(e) {
//
//     this.unPlayed = true
//     console.log(e.target.className)
//
//     if(e.target.classList.contains('right') && this.unPlayed) {
//       this.result = 'CORRECT'
//       console.log(this.trackName)
//       this.scoreCounter += 1
//       this.componentDidUpdate()
//       // this.getRandomTrack()
//       // this.getRandomAnswers()
//       this.scoreCounter = this.scoreCounter
//       this.unPlayed = false
//     } else if (e.target.classList.contains('answer') && this.unPlayed) {
//       console.log(this.trackName)
//       this.scoreCounter += 0
//       // this.getRandomTrack()
//       this.componentDidUpdate()
//       // this.getRandomAnswers()
//       this.result = 'WRONG'
//       this.scoreCounter = this.scoreCounter
//       this.unPlayed = false
//     }
//
//
//
//   }
//
//
//
//
//   componentDidMount() {
//
//     axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/radio/${this.categories.RnB}/tracks`)
//
//       .then(res => this.setState( { tracks: res.data.data },   () => this.getRandomAnswers(), () => this.randomAreaFunction()))
//       .catch(err => console.log(err))
//     // this.getRandomAnswers()
//     // () => this.getRandomTrack(),
//
//
//   }
//
//
//
//   render() {
//
//     if (!this.state.tracks) return null
//
//     return (
//       <main>
//
//         <h1> Who dat? </h1>
//         <Sound
//           url={this.componentDidUpdate()}
//           playStatus={Sound.status.PAUSE}
//
//
//         />
//         <div className = "grid-container">
//           <button  onClick={this.winFunction} className="answer WrongOne">
//             <h3>{this.state.randomSet[0]}</h3>
//           </button>
//           <button  onClick={this.winFunction} className="right" style={{gridArea: this.randomAreaFunction() }}>
//             <h3>{this.trackName}</h3>
//           </button>
//           <button onClick={this.winFunction} className="answer WrongTwo">
//             <h3>{this.state.randomSet[1]}</h3>
//           </button>
//           <button  onClick={this.winFunction} className="answer WrongThree">
//             <h3>{this.state.randomSet[2]}</h3>
//           </button>
//         </div>
//
//         <h1>{this.scoreCounter}</h1>
//
//         <h2>{this.result}</h2>
//
//
//
//
//
//
//       </main>
//
//
//
//
//
//     )
//   }
// }
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )
