<template>
    <ReadCRUD :characters = "chars" :deleteChar ="deleteCharacter" ></ReadCRUD>
</template>

<script>
// @ is an alias to /src
import ReadCRUD from '@/components/ReadCRUD.vue'
import {public_key,ts,hash,populatemyCharacters,getmyCharacters,myCharacters,setmyCharacters} from '../marvel.js'
import axios from 'axios';

export default {
  name: 'ReadView',
   
  data() {
        return {
            chars: []
        };
    },
  components: {
    ReadCRUD
  },
  created:function(){
        this.listCharacters();
  },
  methods: {
        listCharacters() {
            if((JSON.parse(JSON.stringify(myCharacters))).length == 0){
                axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                    .then((result) => {
                        result.data.data.results.forEach(element => {
                            populatemyCharacters(element);
                        }); 
                        this.chars = getmyCharacters();
                    })
                    .catch((error) => {
                        console.log(error);
                    }); 
            }
            else{
                 this.chars = getmyCharacters();
            }
            
        },
        deleteCharacter(id){
            let option = confirm("Are you sure you want to delete this character?");
            if(option){
                this.chars = getmyCharacters().filter(char => char.id != id);
                setmyCharacters(this.chars);
            }    
        }
    },
}
</script>