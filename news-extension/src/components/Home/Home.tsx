import React from 'react';
import {Article,News} from '../../types/article';
import { Recommended } from '../Recommended/Recommended';
import { Trending } from '../Trending/Trending';
import { Header } from './Header/Header';
const API_KEY = '<API_KEY_HERE>';
const defaultQuery = "happy";
const defaultSortBy = "popularity";
type Props = {

}
const Home: React.FC<Props> = () => {
    const [articles,setArticles] = React.useState<Article[]>([]);
    const [heroArticles,setHeroArticles] = React.useState<Article[]>([]);
    const [query,setQuery] = React.useState<string>(defaultQuery);
    const [isLoading,setIsLoading] = React.useState<boolean>(false);
    const queryURL = `https://newsapi.org/v2/everything?q=${query}&sortBy=${defaultSortBy}&apiKey=${API_KEY}&language=en`;
    React.useEffect(()=>{
      setIsLoading(true);
        fetch(queryURL).then(data=>{return data.json()})
        .then((res: any)=>{
          if(res.status === "ok") {
            localStorage.setItem('articles',JSON.stringify(res.articles))
            updateArticles(res.articles);
            setIsLoading(false);
          }
        }).catch(error=>{
          console.error(error);
          setIsLoading(false);
        });
    },[query]);

    const updateArticles = (response: Article[]) => {
      let mainArts = response.slice(5);
      setArticles(mainArts);
      let heroArts = response.slice(0,5);
      setHeroArticles(heroArts);
    }
    const handleSearch = (event: any) => {
      if(event.keyCode === 13) {
        // will be set to false once useEffect runs
        if(event.target.value.trim() === "") setQuery('happy')
        else setQuery(event.target.value); 
      }
    }    
    
return (
      <>
   {isLoading && <div className="loader-overlay">
      <span className="loader"><span className="loader-inner"></span></span>
    </div>} 
      <Header handleSearch={handleSearch}/>
      <Trending heroArticles={heroArticles}/>
      <Recommended articles={articles} />
      </>
    );
};

Home.propTypes = {};

export { Home };