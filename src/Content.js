import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import StarsRoundedIcon from '@material-ui/icons/StarsRounded'
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';

class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anime: {
                aired: {}
            }
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id
        fetch('https://api.jikan.moe/v3/anime/' + id)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({
                    anime: data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <Container>
                <Typography variant="h4">
                    {this.state.anime.title}
                </Typography>
                <Typography variant="subtitle1" style={{marginBottom: "10px"}}>
                    {this.state.anime.title_japanese}
                    <Chip size="small" icon={<FavoriteRoundedIcon/>} variant="outlined" label={this.state.anime.favorites} color="primary" style={{marginLeft: "15px"}} />
                    <Chip size="small" icon={<StarsRoundedIcon/>} variant="outlined" label={this.state.anime.score} color="primary" />
                    <Chip size="small" icon={<EqualizerRoundedIcon/>} variant="outlined" label={this.state.anime.rank} color="primary" />
                </Typography>
                <Typography variant="subtitle2" style={{marginBottom: "20px"}}>
                    type: {this.state.anime.type} /
                    source: {this.state.anime.source} /
                    episodes: {this.state.anime.episodes} /
                    airing: {this.state.anime.status} /
                    aired_at: {this.state.anime.aired.from}
                </Typography>
                <Typography variant="body1">
                    <img src={this.state.anime.image_url} alt={this.state.anime.title} style={{float: "left", marginRight: "15px", marginBottom: "15px"}}/>
                    {this.state.anime.synopsis}
                </Typography>
                <div style={{clear: "both"}}></div>
            </Container>
        )
    }
}

export default Content
