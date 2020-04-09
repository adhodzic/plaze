<template>
  <div class="home">
        <nav v-if="this.$route.name !== 'Login' && this.$route.name !== 'Register'" class="navbar">
        <h3>Enjoying Summer?</h3>
         <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse-navbar" aria-expanded="false" aria-controls="multiCollapseExample2"><i class="fas fa-bars"></i></button>
        <form class="form-inline">
        <input v-model="store.searchTerm" id="searchbar-desktop" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        </form>
        </nav>

      <div class="collapse multi-collapse" id="collapse-navbar">
      <div id="collapse-div" class="card card-body">
              <div style="margin-bottom:15px;" class="row">
              <div class="col">
                  <router-link to="/add"><a href="#"><i id="sidebar-icon" class="fas fa-plus-circle"></i></a></router-link>
              </div>
              <div class="col">
                  <router-link to="/my-reviews"><a href="#"><i id="sidebar-icon" class="fas fa-images"></i></a></router-link>
              </div>
                    <div class="col">
                  <router-link to="/stats"><a href="#"><i id="sidebar-icon" class="fas fa-chart-pie"></i></a></router-link>
              </div>
                    <div class="col">
                  <router-link to="/login"><a href="#"><i id="sidebar-icon" class="fas fa-sign-out-alt"></i></a></router-link>
              </div>
          </div>
        <form class="form-inline">
            <input v-model="store.searchTerm" id="searchbar-mobile" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        </form>
      </div>
    </div>
    <div class="flex-container">
      <Post :key="post.id" v-bind:info="post" v-for="post in store.posts"/>
    </div>
  </div>
</template>


<script>
import _ from 'lodash'
import store from '@/store.js';
import Post from '@/components/Post.vue'
import {Posts} from '@/services'
import axios from 'axios';
export default {
  name: 'Home',
  components:{
    Post
  },
  data(){
    return{
      store
    }
  },
   created(){
    if(localStorage.getItem('token') === null){
      this.$router.push('/login');
    }
  },
  mounted() {
    axios.get('http://localhost:5000/user', { headers: { token: localStorage.getItem('token')}})
    .then((res) => {
      localStorage.setItem('username', res.data.userData.name)
    })
    this.fetchPosts()
  },
  methods:{
    async fetchPosts() {
      let term = store.searchTerm
      store.posts = await Posts.getAll(term)
    }
  },
  computed:{
    /*     searchPosts () {
          return store.posts.filter(post => post.postedBy.toLowerCase().includes(store.searchTerm) || post.title.toLowerCase().includes(store.searchTerm))
     }  */  
     // Lokalna pretraga kao backup ako backend ne radi.
  },
  watch:{
    "store.searchTerm":_.debounce(function(val){
      this.fetchPosts(val)
    },500)
  }
}
</script>






<style lang="scss" scoped>
 .navbar{
      margin-left: 100px;
      margin-right: 80px;
      margin-top: 20px;
      margin-bottom: 40px;
      border-radius: 5px;
      height: 70px;
      background-color:rgb(130, 174, 245);
      h3{
          color: whitesmoke;
          transition: font-size 0.5s;
      }
      h3:hover{
          font-size:30px
      }
      button{
          display:none;
      }
  }
  .navbar:hover{
    animation: swing 1s;
}
   #searchbar-mobile{
      display:none;
  }
  @-webkit-keyframes swing
{
    15%
    {
        -webkit-transform: translateX(5px);
        transform: translateX(5px);
    }
    30%
    {
        -webkit-transform: translateX(-5px);
       transform: translateX(-5px);
    } 
    50%
    {
        -webkit-transform: translateX(3px);
        transform: translateX(3px);
    }
    65%
    {
        -webkit-transform: translateX(-3px);
        transform: translateX(-3px);
    }
    80%
    {
        -webkit-transform: translateX(2px);
        transform: translateX(2px);
    }
    100%
    {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
}
@keyframes swing
{
    15%
    {
        -webkit-transform: translateX(5px);
        transform: translateX(5px);
    }
    30%
    {
        -webkit-transform: translateX(-5px);
        transform: translateX(-5px);
    }
    50%
    {
        -webkit-transform: translateX(3px);
        transform: translateX(3px);
    }
    65%
    {
        -webkit-transform: translateX(-3px);
        transform: translateX(-3px);
    }
    80%
    {
        -webkit-transform: translateX(2px);
        transform: translateX(2px);
    }
    100%
    {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
}
  .flex-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: 100px;
}

.flex-container > div {
  background-color: #f1f1f1;
  width: 100px;
  margin-right: 25px;
  margin-bottom: 20px;
  text-align: center;
  line-height: 75px;
  font-size: 15px;
  transition: transform 0.5s;
}
.flex-container > div:hover{
  transform: translate(0px,-10px);
}
@media (max-width: 768px) {
            .navbar{
           width: 290px;
           margin-left: 40px;
           h3{
               display:none;
           }
           button{
               display:block;
           }
       }
        #collapse-div{
        background-color: rgb(130, 174, 245);
        margin-left: 40px;
        margin-right: 50px;
        margin-bottom: 10px;
    }
        #searchbar-desktop{
        display:none;
    }
     #searchbar-mobile{
        display:block;
    }
      .flex-container > div{
      
      }
      .flex-container{
        margin-left: 40px;
      }
       #sidebar-icon{
        height: 30px;
        width: 30px;
    }
}
</style>
