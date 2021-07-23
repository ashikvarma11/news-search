import React from 'react'
import { useHistory } from 'react-router-dom'
import { Article } from '../../types/article'
import { Recommended } from '../Recommended/Recommended'
import { Trending } from '../Trending/Trending'
import { Header } from './Header/Header'

const API_KEY = '35f8c1e5309ee8254e08e54f7de30a47'
const defaultQuery = 'happy'
interface Props {
  interests: any[]
}
const Home: React.FC<Props> = ({ interests }) => {
  const history = useHistory()
  const [articles, setArticles] = React.useState<Article[]>([])
  const [heroArticles, setHeroArticles] = React.useState<Article[]>([])
  const [query, setQuery] = React.useState<string>(defaultQuery)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [categories, setCategories] = React.useState<any>(interests)
  const convertCategories = () => {
    let categoriesString = ''
    categories.filter((c: any) => {
      categoriesString += `,${c.name}`
    })
    return categoriesString
  }
  const queryURL = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&keywords=${query}&languages=en&categories=${convertCategories()}`

  const getCategories = () =>
    new Promise((returnInterest, returnError) => {
      if (localStorage.getItem('interests') === null) {
        history.push('/')
        returnError(404)
      } else {
        const currInterests = JSON.parse(localStorage.getItem('interests') || '')
        setCategories(interests)
        setTimeout(() => returnInterest(currInterests), 0)
      }
    })

  const fetchNews = () => {
    if (localStorage.getItem('articles') === null) {
      fetch(queryURL)
        .then((data) => data.json())
        .then((res: any) => {
          localStorage.setItem('articles', JSON.stringify(res.data))
          updateArticles(res.data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        })
    } else {
      const currArts = JSON.parse(localStorage.getItem('articles') || '')
      updateArticles(currArts)
      setIsLoading(false)
    }
  }

  const updateArticles = (response: Article[]) => {
    const mainArts = response.slice(5)
    setArticles(mainArts)
    const heroArts = response.slice(0, 5)
    setHeroArticles(heroArts)
  }
  const handleSearch = (event: any): void => {
    if (event.keyCode === 13) {
      // will be set to false once useEffect runs
      if (event.target.value.trim() === '') {
        setQuery('happy')
      } else {
        setQuery(event.target.value)
      }
    }
  }

  return (
    <>
      {isLoading && (
        <div className="loader-overlay">
          <span className="loader">
            <span className="loader-inner" />
          </span>
        </div>
      )}
      <Header handleSearch={handleSearch} />
      <Trending heroArticles={heroArticles} />
      <Recommended articles={articles} />
    </>
  )
}

Home.propTypes = {}

export { Home }
