const pokemonName = document.querySelector('.pokenome');
const pokemonNumber = document.querySelector('.pokenumero');
const pokemonImg = document.querySelector('.pokeimg');
const form = document.querySelector('.form');
const input = document.querySelector('.inputsearch');
const buttonPrev = document.querySelector('.prev');
const buttonNext = document.querySelector('.next');
let pokeNumber=1;

const fetchPokemon = async (pokemon) => {
    // A "async" transforma a funçõe assincrona.
    
    const APIResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    // O "await" faz com que o esperem o "fetch", responder depois seguir com o codigo. Porem ele so funciona com funções assincronas. 
    if(APIResposta.status === 200){
        const dados = await APIResposta.json();
        // Essa const "dados" foi crida para pegar os dados do pokemon. O "json"está puxando os dados do pokemon da api, porem ele só funciona com as ASSINCRONAS por isso coloquei o "await" para dar o tempo necessario para recoler os dados e depois seguir com o codigo. 
        return dados;
    }
    
}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML='Loading...';
    pokemonNumber.innerHTML='';
    // Como a const embaixo é uma função assincrona, tem que colocar a função "renderPokemon" assincrona tambem.
    const dados = await fetchPokemon(pokemon);
    if(dados){
        pokemonImg.innerHTML='block';
        pokemonName.innerHTML = dados.name;
        pokemonNumber.innerHTML = dados.id;
        pokemonImg.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        // Esse "pokemonImg.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];" está trazendo o caminho da api onde estão guardadas as imagens dos pokemons.
        pokeNumber=dados.id;
    }else{
        pokemonImg.innerHTML='none';
        pokemonName.innerHTML = "Not found!";
        pokemonNumber.innerHTML = ":(";
    }
}

form.addEventListener('submit', (event)=>{

    event.preventDefault();

   renderPokemon(input.value.toLowerCase());
   // O "input.value" está trazendo os dados digitados no input do html. Já "toLowerCase()" ele faz com que qualquer caracter digitado seja lido como minusculo.
   input.value='';
// O "input.value='';" ele faz com que depois que digirem algo no input e apertarem enter o input ficara vazio.
});

buttonPrev.addEventListener('click', ()=>{
    if(pokeNumber>1){
        pokeNumber -=1;
        renderPokemon(pokeNumber);
    }
});

buttonNext.addEventListener('click', ()=>{
    pokeNumber +=1;
    renderPokemon(pokeNumber);
});

renderPokemon(pokeNumber);
