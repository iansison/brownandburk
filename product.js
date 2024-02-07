// Wrap your code in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
    // Get the current URL
    const currentURL = window.location.href;

    // Create a URL object to parse the URL
    const url = new URL(currentURL);

    // Get the value of the 'productID' parameter from the URL
    const productIDParam = url.searchParams.get('productID');

    // Ensure that productIDParam is a valid number
    const productID = parseInt(productIDParam, 10);
    const productName = document.querySelector('.product-title');
    const productGenericName = document.querySelector('.product-link');
    const productPrice = document.querySelector('.product-price h2');
    const productByQuantity = document.querySelector('.product-quantity p span');
    const productDesc = document.querySelector('.product-detail p');
    const productIndication = document.querySelector('.product-indication')

    console.log(productID); // Output: 3 (or the correct productID)

    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = [...imgs];
    let imgId = 1;
    console.log('working')
    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener('click', (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });
    
    
    function slideImage(){
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }
    
    window.addEventListener('resize', slideImage);

    const randomNum = (min,max) => Math.floor(min + Math.random()*50) ;
    console.log(randomNum(2,5))
    
    fetch('product.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const foundProduct = data.find(({ id }) => id === +productID);

            if (foundProduct) {
                // productName.style.fontSize = '2rem';
                document.querySelector('.product-rating span').textContent = `5(${(Math.random()*500+1).toFixed(0)})`
                productName.innerHTML = `<b>${foundProduct.product}</b>`;
                productGenericName.textContent = `${foundProduct.generic_name}`;
                productPrice.textContent = `Php ${foundProduct.product_price}.00`
                productByQuantity.textContent = `${foundProduct.product_information}`
                productDesc.textContent = foundProduct.productDesc;
                // if(foundProduct.productIndicationList.length === 0) {
                if (foundProduct.productIndicationList && foundProduct.productIndicationList.length === 0) {
                    console.log(foundProduct)
                    html = `
                    <li>Indication:
                        <ul class="indication-info">
                            ${foundProduct.productIndication}
                        </ul>
                    </li>
                    <li>
                        Formulation: <br>
                        <span>${foundProduct.productFormulation}
                        </span>
                    </li>   
                    <li>
                        Dosage & Administration: <br>
                        <span>${foundProduct.productDoseAdmin}
                        </span>
                    </li>       
                    <a href="./product-inserts/${foundProduct.productInsertLink}" title="button" class="button"download><strong>Download Product Inserts</strong></a>
                    `;
                    productIndication.insertAdjacentHTML('afterbegin',html);
                } else {
                    html = `
                    <li>Indication:
                        <ul class="indication-info"> ${foundProduct.productIndication}
                    
                    `;
                    foundProduct.productIndicationList.forEach((indication, index) => {
                        html+= `

                            <li class="indication-list">• ${indication}</li>

                        
                        `
                    })
                    html+=`
                    
                        </ul>
                    </li>    
                    <li>
                        Formulation: <br>
                        <span>${foundProduct.productFormulation}
                        </span>
                    </li>            
                    <li>
                        Dosage & Administration: <br>
                        <span>${foundProduct.productDoseAdmin}
                        </span>
                    </li>          
                    <a href="./product-inserts/${foundProduct.productInsertLink}" title="button" class="button"download><strong>Download Product Inserts</strong></a>

                    `

                    console.log(html)
                    productIndication.insertAdjacentHTML('afterbegin',html);

                }

            } else {
                console.error(`Product with ID ${productID} not found`);
                // Handle this case (e.g., display an error message or redirect)
            }
        });



























});
