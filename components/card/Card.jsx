import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setRepos } from '../../reducers/reposReducer';
import { getCurrentRepo, getContributors } from '../actions/repos';
import './card.less'

const Card = () => {
    const navigate = useNavigate();
    const {username, reponame} = useParams()
    const [repo, setRepo] = useState({owner: {}})
    const [contributors, setContributors] = useState([])

    useEffect(() => {
        getCurrentRepo(username, reponame, setRepo)
        getContributors(username, reponame, setContributors)
    }, [])
    return (
        <div>
            <div className='card'>
                <div className='title'>
                    <h1>{repo.name}</h1>
                </div>
                <div className='main'>
                    <img src={repo.owner.avatar_url} alt=''/>
                    <div className='stars'>{repo.stargazers_count}</div>
                </div>
                {contributors.map((c, index) =>
                <div className='contributers'>{index+1}. {c.login}</div>
                )}
            </div>
            <div className='forbutton'>
                <button  onClick={() => navigate(-1)} className="back-btn">BACK</button>
            </div>
        </div>
    );
};

export default Card;