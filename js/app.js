 const loadPhone = () => {
  const inputField = document.getElementById('input-field');
  const inputValue = inputField.value;
  if(inputField.value == ''){
      const errorMsg = document.getElementById('error-msg1')
      document.getElementById("error-msg2").innerText = '';
      errorMsg.innerText = 'No Result Found!'
  }
  else {
    // Clear Data
    inputField.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhone(data.data));
  }
}

const displayPhone = phones => {
    if (phones.length == 0) {
        const errorMsg = document.getElementById("error-msg2");
        document.getElementById('error-msg1').innerText = ''
        errorMsg.innerText='try again later'
    }
 else{
  const cardContainer = document.getElementById('card-container');
  cardContainer.textContent = '';
  phones.forEach(element => {
     const div = document.createElement('div');
     div.innerHTML = `
     <div class="col">
     <div class="card h-100">
       <img src="${element.image}" class="card-img-top" alt="...">
       <div class="card-body">
       <h3 class="card-title">${element.brand}</h5>
         <h5 class="card-title">${element.phone_name}</h5>
       </div>
     </div>
   </div>
   `;
   cardContainer.appendChild(div);
  });
 }
}





  

