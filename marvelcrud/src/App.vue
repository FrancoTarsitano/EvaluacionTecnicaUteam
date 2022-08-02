<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link"><router-link to="/read">Read</router-link></a> 
        </li>  
        <li class="nav-item">
          <a class="nav-link"><router-link to="/create">Create</router-link></a> 
        </li>  
      </ul> 
    </div>     
  </nav>
  <router-view/>
</template>


