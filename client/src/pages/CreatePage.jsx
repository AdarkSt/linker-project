import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"


export const CreatePage = () => {
    const {request} = useHttp()
    const history = useNavigate()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')

    const keyDownHandler = async (event) => {
        if(event.key === 'Enter') {
            try{
                const data = await request('/api/link/generate', 'POST', {from:link}, {Authorization: `Bearer ${auth.token}`})
                history(`/detail/${data.link._id}`, {replace: true})
            } catch (e) {

            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset=s2" style={{padding: '2rem'}}>
            <div className="input-field">
                <input
                    id="link" 
                    type="text" 
                    name="email" 
                    value={link}
                    onChange={event => setLink(event.target.value)}
                    onKeyDown={keyDownHandler}
                />
                <label htmlFor="email">Take link</label>
            </div>
            </div>
        </div>
    )
}