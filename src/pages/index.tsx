import baymax from '../assets/sample/baymax.png'
import './index.less'

const lists = [{
  name: '大白',
  date: '2024-03',
  link: '/simple',
  poster: baymax
},{
  name: '大白',
  date: '2024-03',
  link: '/baymax',
  poster: baymax
}]

export default function HomePage() {
  
  return (
    <div className='container'>
      {
        lists.map(item => {
          const {name, date, link, poster} = item
          return <div className='item' onClick={()=>{location.href=link}}><img src={poster} />{name}</div>
        })
      }
    </div>
  );
}
