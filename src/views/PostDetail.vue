<template>
  <div class="container">
    <nav v-if="this.$route.name !== 'Login' && this.$route.name !== 'Register'" class="navbar">
      <h3>Enjoying Summer?</h3>
      <button
        class="btn btn-primary"
        type="button"
        data-toggle="collapse"
        data-target="#collapse-navbar"
        aria-expanded="false"
        aria-controls="multiCollapseExample2"
      >
        <i class="fas fa-bars"></i>
      </button>
    </nav>

    <div class="collapse multi-collapse" id="collapse-navbar">
      <div id="collapse-div" class="card card-body">
        <div style="margin-bottom:15px;" class="row">
          <div class="col">
            <router-link to="/">
              <a href="#">
                <i id="sidebar-icon" class="fas fa-home"></i>
              </a>
            </router-link>
          </div>
          <div class="col">
            <router-link to="/add">
              <a href="#">
                <i id="sidebar-icon" class="fas fa-plus-circle"></i>
              </a>
            </router-link>
          </div>
          <div class="col">
            <router-link to="/my-reviews">
              <a href="#">
                <i id="sidebar-icon" class="fas fa-images"></i>
              </a>
            </router-link>
          </div>
          <div class="col">
            <router-link to="/stats">
              <a href="#">
                <i id="sidebar-icon" class="fas fa-chart-pie"></i>
              </a>
            </router-link>
          </div>
          <div class="col">
            <router-link to="/login">
              <a href="#">
                <i id="sidebar-icon" class="fas fa-sign-out-alt"></i>
              </a>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <p class="lead">{{post.title}}</p>
    <img  :src="post.url" class="figure-img img-fluid rounded" alt="Post Image" />
    <figcaption style="margin-bottom:250px" class="figure-caption">{{timeAgo}}.</figcaption>
    <div class="data">
      <div class="user">
        <p class="lead">Posted By: {{post.postedBy}}</p>
      </div>
      <div class="description">
        <p>{{post.description}}</p>
      </div>
      <div class="other">
        <div class="b-type">
          <p>
            <img id="icons" src="@/assets/beach.png" alt="Beach Type" />
            Beach type: {{post.beach_type}}
          </p>
        </div>

        <div class="lifeguard">
          <p>
            <img id="icons" src="@/assets/cross.png" alt="Lifeguard" />
            Lifeguard on the beach: {{post.lf_tower}}
          </p>
        </div>

        <div class="pets">
          <p>
            <img id="icons" src="@/assets/animals.png" alt="Pets" />
            Pets allowed: {{post.pets_allowed_answer}}
          </p>
        </div>

        <div class="free">
          <p>
            <img id="icons" src="@/assets/money.png" alt="Free" />
            Free: {{post.free_beach}}
          </p>
        </div>
      </div>
    </div>

    <h3 id="comment-section-title">Comment Section</h3>

    <div class="container">
    <div class="comment-section">
      <div class="comment-box">
        <p><img id="profile-picture" src="@/assets/account.png" alt="Profile Picture"> <strong style="margin-right:15px">Jane Doe</strong><small>15.06.2020.</small></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing 
           elit, sed do eiusmod tempor incididunt ut labore et 
           Ut enim ad minim veniam, quis nostrud exercitation 
           laboris nisi ut aliquip ex aute iruredolor in repr
           ea commodo consequat. Duis dolore magna aliqua. 
           cillum dolore eu fugiat nulla pariatur. ullamco 
           Excepteur sint occaecat cupidatat non proident,
           mollit anim id est laborum.sunt in culpa qui</p>
      </div>

        <div class="comment-box">
        <p><img id="profile-picture" src="@/assets/account.png" alt="Profile Picture"> <strong style="margin-right:15px">Jane Doe</strong><small>15.06.2020.</small></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing 
           elit, sed do eiusmod tempor incididunt ut labore et 
           Ut enim ad minim veniam, quis nostrud exercitation 
           laboris nisi ut aliquip ex aute iruredolor in repr
           ea commodo consequat. Duis dolore magna aliqua. 
           cillum dolore eu fugiat nulla pariatur. ullamco 
           Excepteur sint occaecat cupidatat non proident,
           mollit anim id est laborum.sunt in culpa qui</p>
      </div>

        <div class="comment-box">
        <p><img id="profile-picture" src="@/assets/account.png" alt="Profile Picture"> <strong style="margin-right:15px">Jane Doe</strong><small>15.06.2020.</small></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing 
           elit, sed do eiusmod tempor incididunt ut labore et 
           Ut enim ad minim veniam, quis nostrud exercitation 
           laboris nisi ut aliquip ex aute iruredolor in repr
           ea commodo consequat. Duis dolore magna aliqua. 
           cillum dolore eu fugiat nulla pariatur. ullamco 
           Excepteur sint occaecat cupidatat non proident,
           mollit anim id est laborum.sunt in culpa qui</p>
      </div>
    </div>
    </div>

    <form id="comment-form">
          <input id="comment-input" class="form-control" type="text" placeholder="Your comment goes here!"/>
          <button id="comment-button" type="submit" class="btn btn-primary">Comment</button>
    </form>
  </div>
</template>

<script>
import store from "@/store.js";
import moment from "moment";
import { Posts } from "@/services";
export default {
  props: ["id"],
  data() {
    return {
      store,
      post: ""
    };
  },
  async mounted() {
    this.post = await Posts.getOne(this.id);
    console.log(this.post);
    /*      this.post=await this.getPostDetails(this.id,store.posts)
     console.log("Post data: ",this.post) */
  },
  methods: {
    /*      getPostDetails(key,polje){
       return new Promise((resolve,reject)=>{
         let data=null
         for(let i=0;i<polje.length;i++){
           if(polje[i].id === key){
             data=polje[i]
           }
         }
         if(data!=null){
           resolve(data)
         }
         else{
           reject("Došlo je do greške u dohvatu objave!")
         }
       })
      } */
  },
  computed: {
    timeAgo() {
      let a = new Date(this.post.posted_at).getTime();
      return moment(a).fromNow();
    }
  }
};
</script>

<style scoped lang="scss">
#comment-form{
  margin-top: 20px;
  transform: translate(0px,-480px);
  #comment-input {
  transform: translate(15px,0px);
  width: 400px;
  }
  #comment-button{
    transform: translate(470px,-45px);
    margin-top: 10px;
  } 
}
.comment-box {
  border-radius: 15px;
  background-color: rgb(227, 241, 255);
  .row {
    margin-top: 10px;
  }
  #postedBy {
    margin-left: 10px;
  }
  #date {
    margin-left: 10px;
  }
  #text {
    margin-right: 10px;
  }
  #profile-picture {
    height: 40px;
    width: 40px;
    margin-left: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
    margin-right: 10px;
  }
  p {
    margin-left: 10px;
    margin-right: 10px;
    text-align: justify;
    font-family:Arial, Helvetica, sans-serif;
    font-size: 17px;
  }
}
#comment-section-title {
  transform: translate(0px, -500px);
  margin-bottom: 30px;
}
.comment-section {
  width: 550px;
  height: 400px;
  transform: translate(0px, -500px);
  overflow: auto;
}
.container {
  margin-top: 20px;
  margin-bottom: 30px;
}
img {
  height: 350px;
  width: 550px;
  border-radius: 20px;
}
.data {
  width: 555px;
  transform: translate(600px, -630px);
  margin-top: 10px;
  .description {
    text-align: justify;
    p {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-size: 20px;
    }
  }
  .other {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    font-size: 20px;
  }
  #icons {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
}
.navbar {
  display: none;
  margin-left: 100px;
  margin-right: 80px;
  margin-top: 20px;
  margin-bottom: 40px;
  border-radius: 5px;
  height: 70px;
  background-color: rgb(130, 174, 245);
  h3 {
    color: whitesmoke;
    transition: font-size 0.5s;
  }
  h3:hover {
    font-size: 30px;
  }
  button {
    display: none;
  }
}
.navbar:hover {
  animation: swing 1s;
}
@media (max-width: 768px) {
  #comment-form{
  transform: translate(0px,-480px);
 #comment-input {
   transform: translate(10px,540px);
   width:300px;
  }
  #comment-button{
    transform:translate(10px,550px);
    margin-bottom: 100px;
  } 
}
  #comment-button{
    transform: translate(0px,800px);
  } 
  #comment-section-title{
    transform: translateY(100px);
  }
  #postedBy{
    display: none;
  }
  #date{
    display: none;
  }
  .comment-section{
    width: 320px;
    transform: translateY(100px);
    margin-top: 20px;
    margin-bottom: 50px;
  }
  img {
    width: auto;
    height: auto;
  }
  .data {
    transform: translate(0px, -200px);
    width: 100%;
  }
  .navbar {
    display: inline-flex;
    width: 320px;
    margin-left: 10px;
    h3 {
      display: none;
    }
    button {
      display: block;
    }
  }
  #collapse-div {
    background-color: rgb(130, 174, 245);
    margin-left: 15px;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  #sidebar-icon {
    height: 30px;
    width: 30px;
  }
}
</style>