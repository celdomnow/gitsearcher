import React, { useEffect , useState } from 'react';
import './main.less'
import {useDispatch , useSelector} from 'react-redux'
import Repo from './repo/Repo';
import {getRepos} from '../actions/repos'
import { setCurrentPage } from '../../reducers/reposReducer';
import { createPages } from '../../utils/pagesCreator';
import Header from './header/Header';
import search from '../../img/search.png';
import {Oval} from 'react-loader-spinner'
import { Navigate } from 'react-router-dom';

const Main = () => {
    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const perPage = useSelector(state => state.repos.perPage)
    const isFetchError = useSelector(state => state.repos.isFetchError)
    const [searchValue, setSearchValue] = useState('')
    const pagesCount = Math.ceil(totalCount/perPage)
    const pages = []
    createPages(pages, pagesCount, currentPage)

    useEffect(() => {
        dispatch(getRepos(searchValue , currentPage, perPage))
    }, [currentPage])

    function searchHadler() {
        dispatch(setCurrentPage(1))
        dispatch(getRepos(searchValue , currentPage, perPage))
    }

    return (
        <div>
            {
                isFetchError &&
                <div className='alert alert-dark' role='alert'>
                    Critical error!!! Reload the page
                </div>
            }
            <Header/>
            <div className='search'>
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type='text' placeholder='Input repo name' className='search-input'/>
                <button onClick={() => searchHadler()} className='search-btn'><img src={search}/></button>
            </div>
            {!isFetching ? 
                repos.map(repo=> 
                    <Repo repo={repo}>

                    </Repo>
                )
                :
                <div className='oval'>
                <Oval
                height={80}
                width={80}
                color="#5CE1E6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#5CE1E6"
                strokeWidth={2}
                strokeWidthSecondary={2}
                    
                /> 
                </div>
            }

            <div className='pages'>
                {pages.map((page, index) => 
                    <span 
                        key={index} 
                        className={currentPage == page ? "current-page": "page"}
                        onClick={() => dispatch(setCurrentPage(page))}
                        >
                            {page}
                    </span>)
                }
            </div>
        </div>
    );
};

export default Main;