import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function useDidMount(fn) {
    useEffect(fn, []);
}

export default function Content() {
    const { id } = useParams()
    const [anime, setAnime] = useState({})

    useDidMount(() => {
        console.log('mounted')
        fetch('https://api.jikan.moe/v3/anime/' + id)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setAnime(data)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <div>
            <h1>{anime.title}</h1>
            <p>{anime.synopsis}</p>
        </div>
    )
}
