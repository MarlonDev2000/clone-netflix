import { useState } from 'react'

import './style.css'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const MovieRow = ({ title, items }) => {


  const [scrollX, setScrollX] = useState(0)

  const handleLeftArrow = () => {
    let valueScroll = scrollX + Math.round(window.innerWidth / 2)
    if(valueScroll > 0) {
      valueScroll = 0
    }
    setScrollX(valueScroll)
  }

  const handleRightArrow = () => {
    let valueScroll = scrollX - Math.round(window.innerWidth / 2)
    let listScroll = items.results.length * 150
    if(window.innerWidth - listScroll > valueScroll) {
      valueScroll = (window.innerWidth - listScroll) - 60
    }
    setScrollX(valueScroll)
  }

  return (
    <div className='movieRow'>
      <h2>
        {title}
      </h2>
      <div className='movieRow--left' onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{fontSize: 50}}/>
      </div>
      <div className='movieRow--right' onClick={handleRightArrow}>
        <NavigateNextIcon style={{fontSize: 50}}/>
      </div>

      <div className='movieRow--listArea'>
        <div className='movieRow--list' style={{
          marginLeft: scrollX,
          width: items.results.length * 150,
        }}>
          {items.results.length > 0 && items.results.map((item, key)=>(
            <div className='movieRow--item' key={key}>
              <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title}/>
            </div>
          ))}
        </div>


      </div>
    </div>
  )
}