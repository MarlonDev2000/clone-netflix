import { useEffect, useState } from 'react'
import { AllList } from './TmdbAPI'
import './App.css'


import { Header } from './components/Header'
import { MovieRow } from './components/MovieRow'
import { FeaturedMovie } from './components/FeaturedMovie'


const App = () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await AllList.getHomeList()
      setMovieList(list)

      // Pegando o Featured
      let originals = list.filter((item)=> item.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await AllList.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }

    loadAll()
  }, [])


  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className='page'>

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className='lists'>
        {movieList.map((item, index)=>(
          <MovieRow title={item.title} items={item.items} key={index} />
        ))}
      </section>

      <footer>
        Feito com <span role={'img'}>❤️</span> por Marlon Braga <br/>
        Direitos de imagem para Netflix <br/>
        Dados pegos do site Themoviedb.org
      </footer>


      {movieList.length <= 0 && 
        <div className='loading'>
          <img src={'https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif'} alt="Carregando..."/>
        </div>
      }
    </div>
  )
}

export default App;
