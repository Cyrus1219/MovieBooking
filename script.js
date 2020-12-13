const movie = document.getElementById('movie')
const total = document.getElementById('total')
const count = document.getElementById('count')
const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')

populateUI();

let ticketPrice = +movie.value
// console.log(ticketPrice);

function setMovieData(movieIndex,movieprice){
    localStorage.setItem('movieIndex',movieIndex)
    localStorage.setItem('moviePrice',movieprice)
    console.log(movieIndex);

}

function populateUI(){
    // get data from local storage :
    const movieSelectedIndex = localStorage.getItem('movieIndex')
    const priceOfMovie = localStorage.getItem('moviePrice')
    const movieArray = JSON.parse(localStorage.getItem('movieIndexArray'))

    if( movieArray != null && movieArray.length > 0){

        seats.forEach(function(seat,index){
            if(movieArray.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    if(movieSelectedIndex != null){
        movie.selectedIndex = movieSelectedIndex
    }

}

function updateValue(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    
    // console.log(seats);
    // console.log(selectedSeats);
    const indexSelected = [...selectedSeats].map(function(item){
        return [...seats].indexOf(item); 
    })

    // console.log(indexSelected);
    localStorage.setItem('movieIndexArray',JSON.stringify(indexSelected))

    const selecSeatCount = selectedSeats.length;

    count.innerText = selecSeatCount;
    total.innerText = ticketPrice * selecSeatCount

   

}

movie.addEventListener('change',e=>{
    ticketPrice = +e.target.value;
    // const movieIndex = e.target.
    // console.log(e.target.value);

    setMovieData(e.target.selectedIndex,e.target.value)
   

    updateValue()
})



container.addEventListener('click',(ev)=>{
    // console.log(ev.target);
    if(ev.target.classList.contains('seat') && !ev.target.classList.contains('occupied')){
        ev.target.classList.toggle('selected')

        updateValue();
    } 

})  

updateValue()












