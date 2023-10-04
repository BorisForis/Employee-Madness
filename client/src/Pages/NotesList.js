import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const NotesList = () => {
    const {id} = useParams()
    const [comment, setComment] = useState(null)
    const [comments, setComments] = useState(null)

    async function handleClick() {
        return fetch(`/api/notes/${id}`, {
            mode: "cors",
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({comment}),
          }).then((res) => res.json())
            .then(data => console.log(comment))
    } 

    useEffect(() => {
        fetch(`http://localhost:8080/api/notes/${id}`, {
            mode: "cors",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then(data => setComments(data))
    }, [])

    return (
        <>  
            <div>Comment:</div>
            <textarea onInput={(e) => setComment(e.target.value)}/>
            <button onClick={handleClick}>Add comment</button>
            <div>Comments</div>
            {comments?.map(comment => <div>{comment}</div>)}
        </>
    )
}

export default NotesList