let news = []

let searchInput = document.getElementById("search-input");
let menuButton = document.querySelectorAll(".top-menu button");

// for(let i=0; i<menuButton.length; i++){
//   menuButton[i].addEventListener("click",function(event){
//     getNewsByTopic(event);
//   });
// }

menuButton.forEach(menuButton => menuButton.addEventListener("click",(event)=> getNewsByTopic(event) ) );


let searchButton = document.getElementById("search-button");
console.log(searchButton)




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



  const getNewsByTopic = async(event) => {
    console.log(event.target.textContent);  //textContent -> 테그 안에있는 내용만 가져온다

    let topic = event.target.textContent.toLowerCase()  // toLowerCase() -> 텍스트를 소문자로 변환

    let url = new URL (`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=${topic}&page_size=5`)
    console.log(url);

    let header = new Headers ({'x-api-key':'R1heuvDct2FFyYoOGIVKQpEiiLP2bTtU_Ts6Nujq2jo'});

    let response = await fetch(url,{headers:header});
    let data = await response.json();
    console.log(data);

    news=data.articles
    render();
  }



  let getNewsByKeyword = async() => {
    
    let keyword = searchInput.value
    
    let url = new URL (`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
    let header = new Headers ({'x-api-key':'R1heuvDct2FFyYoOGIVKQpEiiLP2bTtU_Ts6Nujq2jo'});

    let response = await fetch(url,{headers:header});
    let data = await response.json();
    console.log(data);

    news=data.articles
    render();
    
  }
  
  searchButton.addEventListener("click",getNewsByKeyword); // * 함수가 선언 된 후에 함수를 사용해야 함 (코딩 순서) 


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


    resultHTML = news.map((n) =>{      // (news) -> 임이의 데어터.data 값 / 사용자 마음대로 지정 가능 
      

        return `<div class="row news-box" id="news-List">
                  <div class="col-lg-4">
                      <img class="news-img-size" src="${
                        n.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                      }"/>
                  </div>
              
                  <div class="col-lg-8">
                      <h3>${n.title}</h3>

                      <p>${
                        n.summary == null || n.summary == ""
                        ? "내용없음"
                        : n.summary.length > 200
                        ? n.summary.substring(0,200) + "..."
                        : n.summary
                      }</p>

                      <div>${n.rights || "no source"} * ${moment(n.published_date).fromNow()}</div>
                  </div>          
                </div>`


    }).join(''); // .map() 함수는 배열로 나타나기 때문에 끝에 .join('');를 삽입하여 스트링으로 변환해줘야 한다 
    
    document.getElementById("news-List").innerHTML = resultHTML;
    console.log(resultHTML);
}

