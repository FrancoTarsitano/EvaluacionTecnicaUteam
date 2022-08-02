<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Add new character
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addNewCharacter">  
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

import {populatemyCharacters, getmyCharacters} from '../marvel.js'

export default {
    name: "CreateCRUD",
    data: function () {
        return {
            char: []
        }
    },
    methods: {
        addNewCharacter(){
            let newId = parseInt(getmyCharacters()[0].id);
            newId += 1;
            let charInfo = {id: newId, name: this.char.name, description: this.char.description };
            this.char = charInfo;
            populatemyCharacters(this.char);
            alert("Your new character has been created!");
            this.char = {name: "", description: ""};    
        }
    },
} 
</script>