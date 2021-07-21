import { Article } from "../../types/article"

type Props = {
    articles: Article[]
}
const Recommended: React.FC<Props> = ({articles}) => {
    return (
        <div className="recommended-section">
        <div className="section-title">Recommended</div>
        <div className="section-items">
          <div className="card-list">
            {articles.length>0 && articles.slice(5).map((article,idx)=>{
              return <div key={idx} className="card">
              <img
                className="card-img-top"
                src={article.urlToImage!=null? article.urlToImage: 'https://images.puella-magi.net/thumb/2/27/No_Image_Wide.svg/800px-No_Image_Wide.svg.png?20110202071158'}
                alt="Card image cap"
              />
              <div className="card-body">
                <a href={article.url} target="_blank"><h6 className="card-link">{article.source.name}</h6></a>
                <h5 className="card-title">{article.title.substring(0,40)}...</h5>
                <p className="card-text">
                {article.description.substring(0,100)}...
                </p>
              </div>
            </div>
            })}
            
          </div>
        </div>
      </div>   
    )
}

export {Recommended}