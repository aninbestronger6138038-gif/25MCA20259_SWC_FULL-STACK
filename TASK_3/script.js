let products = [];

const container = document.getElementById("productContainer");

const search = document.getElementById("search");

const category = document.getElementById("category");

const sort = document.getElementById("sort");

const loading = document.getElementById("loading");

const empty = document.getElementById("empty");

const count =document.getElementById("count");


//API CALL

async function fetchProducts(){
     try{
        const response = await fetch ("https://fakestoreapi.com/products");

        products = await response.json();

        loading.style.display = "none";

        createCategories();

        displayProducts(products);
     }
     catch(error){
         console.log("ERROR");
     }
}


 function createCategories(){
    const categories = products.map(product => product.category);

    const uniqueCategories =[...new Set(categories)];

    uniqueCategories.forEach( (cat) => {
        category.innerHTML += `<option value="${cat}"> ${cat}</option>`
    });
}

//display products

function displayProducts(productList) {
          
    container.innerHTML = "";

    count.innerHTML = "Total Products : " + productList.length;

    if(productList.length == 0){
        empty.style.display ="block";
        return;
    }

    empty.style.display = "none";

    productList.map( (product) => {
        const { image, title,category,price} = product;
  

    container.innerHTML += ` <div class="card">
                                <img src="${image}">
                                <h3> ${title} </h3>
                                <p> Category : ${category}</p>
                                <h3> $${price} </h3>

                                <button> VIEW DETAILS </button>
                            `
});
}


//search +category + sort 

function  updateProducts(){
    let result = products;

    //search filter

    result = result.filter( (product) => product.title.toLowerCase().includes(search.value.toLowerCase()) );

    //category filter
    if(category.value !== "all"){
        result = result.filter( (product) => product.category == category.value);
    }

    //sorting 

    if(sort.value === "low"){
        result.sort(
            (a,b) => a.price - b.price
        );
    }

    if(sort.value === "high"){
        result.sort( 
            (a,b) => b.price - a.price
        );
    }

    displayProducts(result);
}


search.addEventListener("input" , updateProducts);

category.addEventListener("change" ,updateProducts);

sort.addEventListener("change", updateProducts);

fetchProducts();