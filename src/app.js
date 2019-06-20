import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './styles/style.scss'
import Sound from 'react-sound'


class App extends React.Component {
  constructor() {
    super()
    this.state = { tracks: '', randomSet: [] }
    this.trackName = ''
    this.filteredTracks = []



  }


  getRandomTrack() {
    const randomNum = Math.floor(Math.random() * 21)
    this.trackName = this.state.tracks[randomNum].artist.name

    return this.state.tracks[randomNum].preview
  }

  // filterTracks() {
  //
  //   return this.filteredTracks = this.state.tracks.filter((track) => {
  //     track !== this.trackName){
  //       return track
  //     }
  //   })
  //
  // }


  getRandomAnswers() {
    const randomArr = []
    randomArr[0] = this.state.tracks[Math.floor(Math.random() * 10)].artist.name
    randomArr[1] = this.state.tracks[Math.floor(Math.random() * 5) + 3].artist.name
    randomArr[2] = this.state.tracks[Math.floor(Math.random() * 10) + 10].artist.name
    this.setState( { randomSet: randomArr })
  }



  componentDidMount() {

    axios.get('https://cors-anywhere.herokuapp.com/https://api.deezer.com/radio/31061/tracks')

      .then(res => this.setState( { tracks: res.data.data }, () => this.getRandomAnswers(), () => this.filterTracks()))
      .catch(err => console.log(err))
    // this.getRandomAnswers()


  }



  render() {

    if (!this.state.tracks) return null

    return (
      <main>

        <h1> Who dat? </h1>
        <Sound
          url={this.getRandomTrack()}
          playStatus={Sound.status.PLAYING}


        />

        <h3>{this.state.randomSet[0]}</h3>
        <h3>{this.trackName}</h3>
        <h3>{this.state.randomSet[1]}</h3>
        <h3>{this.state.randomSet[2]}</h3>

        <h2>{this.filteredTracks}</h2>





      </main>





    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
