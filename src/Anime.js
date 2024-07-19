import React from 'react'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { FavoriteBorder, LabelOutlined } from '@material-ui/icons'

class AnimeItem extends React.Component {
    jumpTo(url) {
        window.location.href = url
    }
    render() {
        return (
            <Card style={{maxWidth: "250px", display: "inline-block", margin: "15px"}}>
                <CardActionArea onClick={() => this.jumpTo('/anime/' + this.props.anime.mal_id )}>
                    <CardMedia
                        style={{ height: "160px" }}
                        image={ this.props.anime.images.jpg.image_url }
                        title={ this.props.anime.title }
                    />
                    <CardContent style={{height: "250px", overflow: "hidden"}}>
                        <Typography gutterBottom variant="h5" component="h2">
                            { this.props.anime.title }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            { this.props.anime.synopsis }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        <LabelOutlined color="primary"/>
                        { this.props.anime.type }
                    </Button>
                    <Button size="small" color="primary">
                        <FavoriteBorder color="primary"/>
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

class Anime extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            animes: []
        }
    }

    componentDidMount() {
        let nowDate = new Date()
        let nowYear = nowDate.getFullYear()
        let nowMonth = nowDate.getMonth() + 1
        let season = 'spring'
        switch (nowMonth) {
            case 7:
            case 8:
            case 9:
                season = 'summer'
                break
            case 10:
            case 11:
            case 12:
                season = 'fall'
                break
            case 1:
            case 2:
            case 3:
                season = 'winter'
                break
            default:
                season = 'spring'
                break
        }
        fetch('https://api.jikan.moe/v4/seasons/' + nowYear + '/' + season + '?page=1')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({
                    animes: data.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <Container>
                {this.state.animes.map((anime, key) => {
                    return (
                        <AnimeItem key={key} anime={anime} />
                    )
                })}
            </Container>
        )
    }
}

export default Anime
