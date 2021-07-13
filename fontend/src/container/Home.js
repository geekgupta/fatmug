import React , {useState , useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {Link} from "react-router-dom";

function Home()
{
    const [data, setdata] = useState( [] );
    const [top, settop] = useState( [] );
    let history = useHistory();
    
    useEffect(() => {
        const fetchdata = async () => {
          try {
            const res = await axios.get("http://127.0.0.1:8000/");
            const rated = await axios.get("http://127.0.0.1:8000/");
              setdata( res.data );
              settop(rated.data)
          } catch (err) {}
        };
        fetchdata();
    }, [] );

    const getArticle = () =>
    {
        let list = [];
        data.map(( articles ) => {
            return list.push(
                <div className="row">
                    <div className="card m-5 ">
                        <img className="card-img-top" src={articles.image} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{articles.Title}</h5>
                            <p className="card-text">{articles.description}</p>
                            <p className="card-text"><small className="text-muted">{articles.date_created}</small></p>
                            <p className="card-text"><small className="text-muted">{articles.user.name}</small></p>
                            <Link to = {`/article/${articles.slug}`}>click here</Link>
                        </div>
                    </div>
                </div>
                 
        )
        
        }
        )
        return list ;
    }

    const TopArticle = () =>
    {
        let list = [];
        top.map((top) => {
        return list.push( 
            <div class="media col mt-2  mb-5 ">
                    <div class="media-body " row = "2">
                    <h4 class="col">{top.Title}</h4>
                    <h6 limit ={4}>{top.description.substr( 0, 100 )}</h6>
                    <br/>
                    <p>{ top.date_created}</p>
                    </div>
                <img className="ml-3" style={{ width: "5em", height: "5em" }} src={top.image} alt="Generic placeholder image" />
                </div>
        )
        } )
        return list ; 
    }
        
    
    return (
        <div className="container row no-gutters ">
            <div class="col-12 col-sm-6 col-md-8 align-items-start">
            {getArticle()}
            </div>
            <ul class="col-md p-2 mt-4  ">
                <div className=" border-bottom border-top m-2">
                <h2>Top Articles</h2>
                </div>
                {TopArticle()}
                                    
            </ul>
        </div>
    )
}
export default Home; 