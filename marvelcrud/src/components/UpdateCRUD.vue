<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Edit Character
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="updateCharacter">  
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" name="name" v-model="char.name" id="name" class="form-control" aria-describedby="helpId">
                        <small id="helpId" class="form-text text-muted">Write the name of your new character</small>
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <input type="text" name="description" v-model="char.description" id="description" class="form-control" aria-describedby="helpId">
                        <small id="helpId" class="form-text text-muted">Write a brief description for your new character</small>
                    </div>
                    <div class="btn-group" role="group" aria-label="">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <router-link :to="{name:'read'}" class="btn btn-warning">Back</router-link>
                    </div>
                </form>  
            </div> 
        </div>
    </div>
</template>
<script>

import {getmyCharacters,setmyCharacters,populatemyCharacters} from '../marvel.js'
import { isProxy, toRaw } from 'vue';

export default {
    data: function () {
        return {
            char: []
        }
    },   
    created:function(){
        this.getCharByID();
    },
    methods:{
        getCharByID(){
            this.char = getmyCharacters().filter(character => character.id == this.$route.params.id);
            let rawChar = [];
            if(isProxy(this.char)){
                rawChar = toRaw(this.char);
            }
            this.char = {name: rawChar[0].name, description: rawChar[0].description};
        },
        updateCharacter(){
            let option = confirm("Are you sure you want to submit these changes?");
            if(option){
                let removedPreviousChar = getmyCharacters().filter(char => char.id != this.$route.params.id);
                setmyCharacters(removedPreviousChar); 
                this.char.id = this.$route.params.id;
                populatemyCharacters(this.char); 
                window.history.back();  
            }
        }
    } 
}
</script>