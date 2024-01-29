let creat = document.querySelector("#main");
let content = document.querySelector(".content");
let loader = document.querySelector(".loader");
let more = document.querySelector(".page");
content.style.display = "none";

function showLoder() {
  loader.style.display = "none";
  content.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:8000/api/product/", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      showLoder();
      json.forEach((el) => {
        creat.innerHTML += `
            <div id="${el.id}" class="col">
              <img src="${el.image}" alt="img" />
              <div class="tex">
                <h4>${el.name}</h4>
                <h4>${el.price}</h4>
              </div>
              <button id="${el.id}" class="btn">savatga</button>
            </div>
          `;
      });
      let allCol = document.querySelectorAll(".col");
      allCol.forEach((el) => {
        el.addEventListener("click", function () {
          content.style.display = "none";
          loader.style.display = "block";
          fetch(`http://127.0.0.1:8000/api/product/${el.id}/`, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              showLoder();
              creat.style.display = "none";
              more.innerHTML = `
             <button id="btninfo">←</button>
          <div class="colInfo">
            <div class="img">
              <img src="${data.image}" />
            </div>
            <div class="textInfo">
              <p>${data.name}</p>
              <p>${data.price}$</p>
              <p>NO COMMENTS</p>
              <button id="${data.id}" class="btn">savatga</button>
            </div>
          </div>     
             `;
              let back = document.getElementById("btninfo");
              back.addEventListener("click", function () {
                more.innerHTML = "";
                creat.style.display = "block";
                creat.style.display = "flex";
              });
            });
        });
      });
      let allBtn = document.querySelectorAll(".btn");
      if (allBtn.length) {
        allBtn.forEach((el) => {
          el.addEventListener("click", function () {
            console.log(el);
          });
        });
      }
    });
});
