let news = []


const getNews = async() =>{  // 구버전 => async function getNews(){}

    let url = new URL (`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=business&page_size=2`);  // url 준비
    console.log(url);

    let header = new Headers ({'x-api-key':'R1heuvDct2FFyYoOGIVKQpEiiLP2bTtU_Ts6Nujq2jo'}) // 해더 준비

    let response = await fetch(url,{headers:header}); // 백엔드 서버에요청 -> ajax, axiox, fetch
    let data = await response.json()  // json은 서버통신에서 많이쓰는 데이터 타입
    console.log(data); // promise {<pending>} <= 아직 데이터가 도착하지 않음
    
    news = data.articles
    console.log(news);
}; 

getNews();





