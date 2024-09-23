import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Home.module.css';
export default function Home() {


  let [trendingMovies, setTrendingMovies] = useState([]);//  // اي اشي بدك تعرضو عالصفحة لازم تستعمل يوز ستيت
 let [trendingTv,setTrendingtv]=useState([]);
 let [trendingPerson,setTrendingPerson]=useState([]);

  let prefix = 'https://image.tmdb.org/t/p/w500/';

  async function getTrendingItems(mediaType,callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=23802550642170b574f6da4f88ae5507`)
    callback(data.results)
  }
  useEffect(() => {
     getTrendingItems('movie',setTrendingMovies)
     getTrendingItems('tv',setTrendingtv)
     getTrendingItems('person',setTrendingPerson)

    
    }
    , []
  )
  return (
<>
    <div className='row'>
      <div className='col-md-4 d-flex align-items-center'>
      <div>
      <div className={`w-25 mb-4 ${styles.brdr}`}></div>

      <h2> Trending <br />   Movies <br /> To watch     </h2>
      <p> Most Watched Movies By Day </p>

      <div className={`w-100 ${styles.brdr}`}></div>
</div>
</div>
      {
        trendingMovies.map((movie, index) =>
          <div className='col-md-2 my-3' key={index}>
            <div className='item'>
              <img src={prefix + movie.poster_path} alt='' className='w-100' />
              <h3 className='h6 text-center mt-3'>{movie.title}</h3>
            </div>
          </div>
        )}

    </div>
   
    <div className='row'>
      <div className='col-md-4 d-flex align-items-center'>
      <div>
      <div className={`w-25 mb-4 ${styles.brdr}`}></div>

      <h2> Trending <br />   TV <br /> To watch     </h2>
      <p> Most Watched tv By Day </p>

      <div className={`w-100 ${styles.brdr}`}></div>
</div>
</div>
      {
        trendingTv.map((tv, index) =>
          <div className='col-md-2 my-3' key={index}>
            <div className='item'>
              <img src={prefix + tv.poster_path} alt='' className='w-100' />
              <h3 className='h6 text-center mt-3'>{tv.name}</h3>
            </div>
          </div>
        )}

    </div>

    <div className='row'>
      <div className='col-md-4 d-flex align-items-center'>
      <div>
      <div className={`w-25 mb-4 ${styles.brdr}`}></div>

      <h2> Trending <br />  Person <br /> To watch     </h2>
      <p> Most Watched People By Day </p>

      <div className={`w-100 ${styles.brdr}`}></div>
</div>
</div>
      {
        trendingPerson.map((Person, index) =>
          <div className='col-md-2 my-3' key={index}>
            <div className='item'>
              <img src={prefix + Person.profile_path} alt='' className='w-100' />
              <h3 className='h6 text-center mt-3'>{Person.name}</h3>
            </div>
          </div>
        )}

    </div>
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    </>
     )
}
