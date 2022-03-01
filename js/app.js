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
        document.getElementById('error-msg1').innerText = '';
        errorMsg.innerText='try again later'
    }
 else{
  const cardContainer = document.getElementById('card-container');
  cardContainer.textContent = '';
  const phoneSlice = phones.slice(0,20);
  phoneSlice.forEach(element => {
     const div = document.createElement('div');
     div.innerHTML = `
     <div class="col">
     <div class="card  h-100">
       <img src="${element.image}" class="card-img-top" alt="...">
       <div class="card-body">
       <h4 class="card-title">Name: ${element.phone_name}</h4>
         <h5 class="card-title">Brand: ${element.brand}</h5>
         <button onclick="showDetails('${element.slug}')" class="btn btn-outline-info" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" id="button-addon2">Explore</button>
       </div>
     </div>
   </div>
   `;
   cardContainer.appendChild(div);
  });
 }
}


// display show details
const showDetails = details => {
  const url = `https://openapi.programming-hero.com/api/phone/${details}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayDetails(data.data))
}

const displayDetails = details => {
  const detailsSHow = document.getElementById('details');
  const tableShow = document.getElementById('table');
  tableShow.innerHTML = `

       <div class="text-center "> 
            <img class="d-block mx-auto" src="${details.image}" alt="">
       </div>

  <tr>
    <th scope="row">Release Date</th>
    <td>${details.releaseDate}</td>
  </tr>
  <tr>
    <th scope="row">Main Features:</th>
  </tr>
  <tr>
    <th scope="row">ChipSet</th>
    <td colspan="2">${details.mainFeatures.chipSet}</td>
  </tr>
  <tr>
    <th scope="row">Display</th>
    <td colspan="2">${details.mainFeatures.displaySize}</td>
  </tr>
  <tr>
    <th scope="row">Memory</th>
    <td colspan="2">${details.mainFeatures.memory}</td>
  </tr>
  <tr>
    <th scope="row">Sensor</th>
    <td colspan="2">${details.mainFeatures.sensors}</td>
  </tr>
  <tr>
    <th scope="row">Others:</th>
  </tr>
  <tr>
    <th scope="row">Bluetooth</th>
    <td colspan="2">${details.others.Bluetooth}</td>
</tr>
  <tr>
    <th scope="row">GPS</th>
    <td colspan="2">${details.others.GPS}</td>
</tr>
  <tr>
    <th scope="row">NFC</th>
    <td colspan="2">${details.others.NFC}</td>
</tr>
  <tr>
    <th scope="row">Radio</th>
    <td colspan="2">${details.others.Radio}</td>
</tr>
  <tr>
    <th scope="row">USB</th>
    <td colspan="2">${details.others.USB}</td>
</tr>
  <tr>
    <th scope="row">WLAN</th>
    <td colspan="2">${details.others.WLAN}</td>
</tr>
  `;
}
