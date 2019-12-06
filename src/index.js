import React from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            animes: []
        };
    }
    componentDidMount() {
        fetch('https://api.jikan.moe/v3/season/2019/fall')
            .then((response) => {
                return response.json()
            })
            .then((animeList) => {
                this.setState({animes: animeList.anime})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div class="container">
            {this.state.animes.map((anime) => {
                return (
                    <div class="card">
                        <h1>{anime.title}({anime.type})</h1>
                        <img src={anime.image_url}/>
                        <p>{anime.synopsis}</p>
                    </div>
                    )
                })}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'))