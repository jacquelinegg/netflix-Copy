const key = '76ba08a456df427aa1c014678c2d6c8a'

    const requests = {
        requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
        requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
        requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
        requestAnimation: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=animation&page=1&include_adult=false`,
        requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
      };
    
      export default requests
