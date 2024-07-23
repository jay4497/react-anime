import React from 'react'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from "@material-ui/core/Grid"
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
            animes: [],
            page: 1,
            curPage: 1,
            nextPage: true,
            prePage: true,
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    prePage() {
        this.setState({
            page: this.state.curPage - 1,
        }, () => {
            this.fetchData()
        })
    }

    fetchData() {
        const nowDate = new Date()
        const nowYear = nowDate.getFullYear()
        const nowMonth = nowDate.getMonth() + 1
        let season = 'spring'
        const page = this.state.page
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
        fetch('https://api.jikan.moe/v4/seasons/' + nowYear + '/' + season + '?page=' + page)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let animes = data.data
                const pagination = data.pagination
                const hasNextPage = pagination.has_next_page
                const currentPage = pagination.current_page
                if (animes.length > 0) {
                    this.setState({
                        animes,
                        prePage: currentPage !== 1,
                        nextPage: hasNextPage,
                        curPage: currentPage,
                        page: hasNextPage? page + 1: page
                    })
                }
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
                <Grid container>
                    <Grid item md={6}>
                        <Button color={"primary"} disabled={!this.state.prePage} style={{display:"block", width: "100%"}} onClick={() => this.prePage()}>上一页</Button>
                    </Grid>
                    <Grid item md={6}>
                        <Button color="primary" disabled={!this.state.nextPage} style={{display:"block", width: "100%"}} onClick={() => this.fetchData()}>下一页</Button>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default Anime
