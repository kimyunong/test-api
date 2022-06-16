let news = [];
let url;
let page = 1;
let total_pages = 0;


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






  // 각 함수에서 필요한 url을 만든다 
  // api 호출 함수를 부른다

const getAPI = async() => {

  try{
        
        let header = new Headers ({'x-api-key':'BdvrUwAIdtFNvsVQNdBDUHaZuvrZBB3eYT2K7UluwnE'}) // 해더 준비
        url.searchParams.set('page',page); // url주소뒤에 &page를 더해준다
        console.log("너 위치는 어디니?",url)
        let response = await fetch(url,{headers:header}); // 백엔드 서버에요청 -> ajax, axiox, fetch
        let data = await response.json()  // json은 서버통신에서 많이쓰는 데이터 타입
        // console.log("데이터",data); // promise {<pending>} <= 아직 데이터가 도착하지 않음      
        if(response.status == 200){
          if(data.total_hits == 0){
            throw new Error("페이지를 찾을 수 없습니다.")
          }
              console.log("받은데이터는?",data);
              news = data.articles;
              total_pages = data.total_pages;
              page = data.page;
              render();
              pageNation();
        }else{
              throw new Error(data.message);
        }
  
  }catch(error){ 
    console.log("잡힌에러는",error.message)
    errorRender(error.message)

  } 

} 



const getNews = async() =>{  // 구버전 => async function getNews(){}

    url = new URL (`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=business&page_size=10`);  // url 준비
    console.log(url);

    getAPI();

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

    url = new URL (`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=${topic}&page_size=10`)
    console.log(url);

    getAPI();

  }  



  let getNewsByKeyword = async() => {
    
    let keyword = searchInput.value
    
    url = new URL (`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);

    getAPI();

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



const errorRender = (message) => {

  let resultHTML = '';

      resultHTML += 
    
    `<div class="row news-box" id="news-List">
    
        <div class="col-lg-4">
            <img class="news-img-size" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"/>
        </div>
    
        <div class="col-lg-8">
            <h3>ERROR</h3>
            <div class="alert alert-danger text-center" role="alert">${message}</div>
        </div>
      
    </div>`;

    document.getElementById("news-List").innerHTML = resultHTML;


}

// 페이지 네이션 제작순서 
// 1. total-page 
// 2. 현재 page
// 3. page group
// 4. last / first 찾아주기
// 5. 페이즈 프린트
// 6. total_page 3일경우 3개의 페이지만 피린트 하는법 lats, first
// 7. << >> 버튼 만들어 주기 ( 맨처음 , 맨끝)
// 8. 내가 그룹1 일때 << < 버튼이 없다
// 9. 내가 마지막 그룹일때 > >> 버튼이 없다

const pageNation = () => {

  let pageNationHTML=``;

  let pageGroup = Math.ceil(page/5);
  console.log("페이지 그룹",pageGroup);

  let last = pageGroup*5

  let first = last -4

  if(last > total_pages){
    last = total_pages;
  }



  if(`${page}`== 1){

    pageNationHTML =``;

  }else{
    pageNationHTML =`<li class="page-item">
                      <a class="page-link" href="#" aria-label="Previous" onclick="nextPage(${page*0+1})">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Previous" onclick="nextPage(${page-1})">
                        <span aria-hidden="true">&lt;</span>
                      </a>
                    </li>`;
  }

  for(let i=first; i<=last; i++){

    pageNationHTML +=`<li class="page-item ${page==i?"active" : ""} ">
                        <a class="page-link" href="#" onclick="nextPage(${i})">${i}</a>
                      </li>`;
  }


  if(last < total_pages){
        pageNationHTML +=`<li class="page-item">
                            <a class="page-link" href="#" aria-label="Next" onclick="nextPage(${page+1})">
                              <span aria-hidden="true">&gt;</span>
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next" onclick="nextPage(${total_pages})">
                              <span aria-hidden="true">&raquo;</span>
                            </a>`;
        pageNationHTML +=``;
  }
  document.querySelector(".pagination").innerHTML = pageNationHTML;
  
};

// 1. 이동하고 싶은 페이지 넘버를 알아야 한다
// 2. 이동하고 싶은 페이지 넘버를 가지고 api를 다시 호출한다
let nextPage = (pageNum) =>{

page = pageNum;
console.log("페이지 넘버 :",pageNum)
getAPI();

}

