<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Characters
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>  
                        <tr v-for="character in characters" :key="character.id">
                            <td>{{character.id}}</td>
                            <td>{{character.name}}</td>
                            <td>{{character.description}}</td>
                            <td>
                               <div class="btn-group" role="group" aria-label="">
                                    <router-link :to="{name:'update',params:{id:character.id}}" class="btn btn-success">Edit</router-link>
                                    <button type="button" v-on:click= "deleteChar(character.id)" class="btn btn-danger">Delete</button>
                               </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ReadCRUD",
    props: { characters: Array, deleteChar: Function },
}
</script>