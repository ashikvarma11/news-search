import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Article, News } from "../../types/article";
import { Recommended } from "../Recommended/Recommended";
import { Trending } from "../Trending/Trending";
import { Header } from "./Header/Header";
const API_KEY = "35f8c1e5309ee8254e08e54f7de30a47";
const defaultQuery = "happy";
const defaultSortBy = "popularity";
type Props = {
  interests: any[];
};
const Home: React.FC<Props> = ({ interests }) => {
  let history = useHistory();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [heroArticles, setHeroArticles] = React.useState<Article[]>([]);
  const [query, setQuery] = React.useState<string>(defaultQuery);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<any>(interests);
  const convertCategories = () => {
    let categoriesString = "";
    categories.filter((c: any) => {
      categoriesString += `,${c.name}`;
    });
    return categoriesString;
  };
  const queryURL = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&keywords=${query}&languages=en&categories=${convertCategories()}`;

  const getCategories = () => {
    return new Promise((returnInterest, returnError) => {
      if (localStorage.getItem("interests") === null) {
        history.push("/");
        returnError(404);
      } else {
        let interests = JSON.parse(localStorage.getItem("interests") || "");
        setCategories(interests);
        setTimeout(() => returnInterest(interests), 0);
      }
    });
  };
  React.useEffect(() => {
    setIsLoading(true);
    getCategories().then((currCategories) => fetchNews());

    console.log(interests);
  }, [query]);

  const fetchNews = () => {
    if (localStorage.getItem("articles") === null) {
      fetch(queryURL)
        .then((data) => {
          return data.json();
        })
        .then((res: any) => {
          console.log(res);
          localStorage.setItem("articles", JSON.stringify(res.data));
          console.log(res.data);
          updateArticles(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    } else {
      let articles = JSON.parse(localStorage.getItem("articles") || "");
      console.log(articles);
      updateArticles(articles);
      setIsLoading(false);
    }
  };

  const updateArticles = (response: Article[]) => {
    let mainArts = response.slice(5);
    setArticles(mainArts);
    let heroArts = response.slice(0, 5);
    setHeroArticles(heroArts);
  };
  const handleSearch = (event: any) => {
    if (event.keyCode === 13) {
      // will be set to false once useEffect runs
      if (event.target.value.trim() === "") setQuery("happy");
      else setQuery(event.target.value);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="loader-overlay">
          <span className="loader">
            <span className="loader-inner"></span>
          </span>
        </div>
      )}
      <Header handleSearch={handleSearch} />
      <Trending heroArticles={heroArticles} />
      <Recommended articles={articles} />
    </>
  );
};

Home.propTypes = {};

export { Home };
