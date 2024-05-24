import React, { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";

let API_key = "&api_key=0c3c30b0ce90774f905dc65f237ead61";
let bass_url = "https://api.themoviedb.org/3";
let url = bass_url+"/discover/movie?language=en-US&page=1&sort_by=popularity.desc"+API_key;

let arr = ["Popular","Theatre","Kids","Drama","Comedie","Best 2024","Best 2023","Best 2022"];
const Main=()=>{
    const [movieData,setData] = useState([]);
    const [url_set,setUrl] = useState(url);
    const [search,setsearch] = useState();

    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{setData(data.results);});},[url_set]
    )

    const getData=(movieType)=>{
        if(movieType == "Popular")
        {
            url = bass_url+"/discover/movie?language=en-US&sort_by=popularity.desc"+API_key;
        }
        if(movieType == "Theatre")
        {
            url = bass_url+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+API_key
        }
        if(movieType == "Kids"){
            url = bass_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key
        }
        if(movieType == "Best 2023")
        {
            url = bass_url+"/discover/movie?include_video=false&language=en-US&page=1&primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-12-31"+API_key
        }
        if(movieType == "Best 2022")
        {
            url = bass_url+"/discover/movie?include_video=false&language=en-US&page=1&primary_release_date.gte=2022-01-01&primary_release_date.lte=2022-12-31"+API_key
        }
        if(movieType == "Best 2024")
        {
            url = bass_url+"/discover/movie?include_video=false&language=en-US&page=1&primary_release_date.gte=2024-01-01&primary_release_date.lte=2024-12-31"+API_key
        }
        if(movieType == "Drama")
        {
            url = bass_url+"/discover/movie?with_genres=18&primary_release_year=2014"+API_key;
        }
        if(movieType == "Comedie")
        {
            url = bass_url+"/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc"+API_key;
        }
        setUrl(url);
    }
    const searchMovie=(evt)=>{
        if(evt.key == "Enter")
        {
            url = bass_url+"/search/movie?api_key=0c3c30b0ce90774f905dc65f237ead61&query="+search;
            setUrl(url);
            setsearch(" ");
        }
    }
    return(
        <>
            <div className="Header">
                <nav>
                    <ul>
                        {
                            arr.map((value) =>{
                                return(
                                    <li><a href="#" name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )})
                        }
                    </ul>
                </nav>
                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Enter The Movie Name" className="inputText" onChange={(e) => {setsearch(e.target.value)}} value={search} onKeyPress={searchMovie}></input>
                    </div>
                </form>
            </div>
            <div className="container">
                {
                    (movieData.length==0)?<p className="notfound">Not Found</p>: movieData.map((res,pos) =>{
                        return(
                            <Card info = {res} key = {pos}/>
                        )})
                }
            </div>
            <footer class="footer">
                <div class="footer-content">
                    <p>Project Created By Group-17</p>
                </div>
            </footer>
        </>
    )
}
export default Main;