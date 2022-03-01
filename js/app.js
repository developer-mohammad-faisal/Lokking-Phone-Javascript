 const errorMsg = document.getElementById('error-msg1');

//  Search var
 const loadPhone = () => {
  errorMsg.innerText = ''
  const inputField = document.getElementById('input-field');
  const inputValue = inputField.value;
  if(inputField.value == ''){
    errorMsg.innerText = 'No Result Found'
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

// display Phone
const displayPhone = phones => {
    if (phones.length == 0) {
    }
 else{
   errorMsg.innerText = '';
  const cardContainer = document.getElementById('card-container');
  cardContainer.textContent = '';

  // slice
  const phoneSlice = phones.slice(0,20);
  phoneSlice.forEach(element => {
     const div = document.createElement('div');
     div.innerHTML = `
     <div class="col">
     <div class="card h-100">
       <img src="${element.image}" class="card-img-top" alt="">
      <div class="card-body shadow py-5">
         <h4 class="card-title">${element.phone_name}</h4>
         <h6 class="card-title">Brand: ${element.brand}</h6>
      <button onclick="showDetails('${element.slug}')" class="btn btn-outline-info" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" id="button-addon2">Explore</button>
       </div>
     </div>
   </div>
   `;
   cardContainer.appendChild(div);
  });
 };
};


// display show details
const showDetails = details => {
  const url = `https://openapi.programming-hero.com/api/phone/${details}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayDetails(data.data))
}

// show image
const displayDetails = details => {
  const phoneImage = document.getElementById('phone-img')
  phoneImage.innerHTML = `   
      <img src="${details.image}" alt="">
      <h5>${details.name}</h5>
  `;

 // show details information
  const tableShow = document.getElementById('table');
  tableShow.innerHTML = `      
  <tr>
    <th scope="row">Release Date</th>
    <td>${details.releaseDate ?details.releaseDate :'No Release Date Found'}</td>
  </tr>
  <tr>
    <th scope="row">Main Features:</th>
  </tr>
  <tr>
    <th scope="row">ChipSet</th>
    <td colspan="2">${details.mainFeatures.chipSet ?details.mainFeatures.chipSet :'No ChipSet Found'}</td>
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
