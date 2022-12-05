const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokeimage = document.querySelector('.pokemon_img')
const pokeform = document.querySelector('.form')
const pokeinput = document.querySelector('.input_search')
const pokeprev = document.querySelector('.btn-prev')
const pokenext = document.querySelector('.btn-next')
let ppokemon = 1;






const fetchpokemon = async(pokemon)=>{
     
    const apiresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(apiresponse.status===200){
        const data = await apiresponse.json()
        return data;
    }
}  
const render =  async(pokemon)=>{

    pokemonNumber.innerHTML = '###'
    pokemonName.innerHTML = 'Loading'
    
    const data = await fetchpokemon(pokemon)

    if (data) {
        pokeimage.style.display = 'block' 
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokeimage.src= data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];// só vai ate 499
           ppokemon=data.id
    }else{
        pokeimage.style.display = 'none' 
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = '###'
    }
    if (data.id>=650) {
        pokeimage.src =data['sprites']['versions']['generation-viii']['icons']['front_default'];    
        //versao que vai até 800 e pouco mas é só png e não gif bonitinho
    }
}

pokeform.addEventListener('submit',(e)=>{
    e.preventDefault();
    render(pokeinput.value.toLowerCase());
    pokeinput.value = '';
})
pokeprev.addEventListener('click',()=>{
    if (ppokemon>1) {
        ppokemon-=1
        render(ppokemon)
        
    }
})
pokenext.addEventListener('click',()=>{
    ppokemon+=1
    render(ppokemon)
})
render(ppokemon);