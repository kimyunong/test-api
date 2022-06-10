let news = []


const getNews = async() =>{  // 구버전 => async function getNews(){}

    let url = new URL (`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=business&page_size=5`);  // url 준비
    console.log(url);

    let header = new Headers ({'x-api-key':'R1heuvDct2FFyYoOGIVKQpEiiLP2bTtU_Ts6Nujq2jo'}) // 해더 준비

    let response = await fetch(url,{headers:header}); // 백엔드 서버에요청 -> ajax, axiox, fetch
    let data = await response.json()  // json은 서버통신에서 많이쓰는 데이터 타입
    console.log(data); // promise {<pending>} <= 아직 데이터가 도착하지 않음
    
    news = data.articles
    console.log(news);

    render();
}; 

getNews();



const openA = () =>{
    document.getElementById("mySide").style.width="250px";
  };

  const closeA = () =>{
    document.getElementById("mySide").style.width="0";
  };

  const searchBox = () =>{

    let inputArea = document.getElementById("input-area");
    if(inputArea.style.display === "inline"){
      inputArea.style.display = "none";      
    }else{
      inputArea.style.display = "inline";
    }
    
  };




const render = () =>{ 

    let resultHTML = '';

    // for(let i=0; i<news.length; i++){ 
        
    // resultHTML += 
    
    // `<div class="row news-box" id="news-List">
    
    //     <div class="col-lg-4">
    //         <img class="news-img-size" src="${news[i].media}"/>
    //     </div>
    
    //     <div class="col-lg-8">
    //         <h3>${news[i].title}</h3>
    //         <p>${news[i].summary}</p>
    //         <div>${news[i].published_date}</div>
    //     </div>
      
    // </div>`; 

    // };

    resultHTML = news.map((news) =>{

        return `<div class="row news-box" id="news-List">
                  <div class="col-lg-4">
                      <img class="news-img-size" src="${news.media}"/>
                  </div>
              
                  <div class="col-lg-8">
                      <h3>${news.title}</h3>
                      <p>${news.summary}</p>
                      <div>${news.published_date}</div>
                  </div>          
                </div>`
    }).join(''); // .map() 함수는 배열로 나타나기 때문에 끝에 .join('');를 삽입하여 스트링으로 변환해줘야 한다 
    
    document.getElementById("news-List").innerHTML = resultHTML;
    console.log(resultHTML);
}


