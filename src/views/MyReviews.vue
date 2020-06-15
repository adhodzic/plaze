<template>
    <div class="my-reviews">
        <nav v-if="this.$route.name !== 'Login' && this.$route.name !== 'Register'" class="navbar">
            <h3>My Reviews</h3>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse-navbar" aria-expanded="false" aria-controls="multiCollapseExample2"><i class="fas fa-bars"></i></button>
            <form class="form-inline">
            <input v-model="store.searchTerm2" id="searchbar-desktop" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            </form>
        </nav>

    <div class="flex-container">
      <Post @click.native="details(post)" :key="post.id" :info="post" v-for="post in store.posts2"/>
    </div>
    </div>
</template>

<script>
import store from '@/store.js';
import Post from '@/components/Post.vue'
import axios from 'axios';
export default {
    components:{
        Post
    },
    data(){
        return{
            store,
        }
    },
    mounted(){
        this.fetchMyPosts()
    },
    methods:{
       async fetchMyPosts(){
            let term = store.searchTerm2;
            let res = await axios.get(`/my_posts/${localStorage.getItem('token')}/?title=${term}`);
            store.posts2 = res.data;
            console.log(store.posts2)
        },
        details(post){
        this.$router.push({path:`post/${post._id}`})
    }
    },
    watch:{
    "store.searchTerm2":_.debounce(function(val){
      this.fetchMyPosts(val)
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