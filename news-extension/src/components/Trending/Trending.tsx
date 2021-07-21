
import { Article } from "../../types/article"

type Props = {
    heroArticles: Article[]
}

const Trending:React.FC<Props> = ({heroArticles}) => {
    return (
        <div className="trending-section">
        <div className="section-title">Trending</div>
        <div className="trending-items">
          { heroArticles[0] && <div className="card trending-1">
            <img
              className="card-img-top"
              src={heroArticles[0].urlToImage || ''}
              alt="Card image cap"
            />
            <div className="card-body">
            <a href={heroArticles[0].url} target="_blank"><h6 className="card-link">{heroArticles[0].source.name}</h6></a>
              <h5 className="card-title">{heroArticles[0].title}</h5>
              <p className="card-text">
              {heroArticles[0].description}
              </p>
            </div>
          </div>
        }

          {heroArticles.length>0 && <div className="card-list">
            <div className="card-list__top">
            { heroArticles.slice(1,3).map((heroArticle,idx)=>{ 
              return <div key={idx} className="card">
                <img
                  className="card-img-top"
                  src= {heroArticle.urlToImage || ''}
                  alt="Card image cap"
                  // onError={addDefaultSrc}
                />
                <div className="card-body">
                <a href={heroArticle.url} target="_blank"><h6 className="card-link">{heroArticle.source.name}</h6></a>
                  <h5 className="card-title">
                  {heroArticle.title}
                  </h5>
                </div>
              </div>
            }) }
            </div>
            <div className="card-list__bottom">
              
            { heroArticles.slice(3,5).map((heroArticle,idx)=>{ 
              return <div key={idx} className="card">
                <img
                  className="card-img-top"
                  src={heroArticle.urlToImage || ''}
                  alt="Card image cap"
                />
                <div className="card-body">
                  
                <a href={heroArticle.url} target="_blank"><h6 className="card-link">{heroArticle.source.name}</h6></a>
                  <h5 className="card-title">
                   {heroArticle.title}
                  </h5>
                </div>
              </div>
            }) }
            </div>
          </div>
}
        </div>
      </div>
    )
}

export {Trending};