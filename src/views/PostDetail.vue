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
        <p class="lead">Posted By: {{post.postedBy.name}}</p>
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
      <div class="comment-box" v-if="comment.parentId == null" :key="comment.id" v-for="comment, i in this.comments" style="margin-bottom:20px; padding-bottom:20px;">
        <p><img id="profile-picture" src="@/assets/account.png" alt="Profile Picture"> <strong style="margin-right:15px">{{comment.commentedBy["name"]}}</strong><small>{{comment.posted_at}}</small></p>
        <p>{{comment.text}}</p>
        <div @click="$set(closedItems, i, !closedItems[i])" class="replay">
          <i class="fas fa-reply-all"></i>
        </div>
        <div v-if="id_localStorage==comment.commentedBy._id" @click="deleteComment(comment._id)">
          <i class="fas fa-trash-alt"></i>
        </div>
        <div v-if="closedItems[i]" style="padding-left:5em">
          <div :key="replay.id" v-for="replay in comment.replays">
            <p><b>{{replay.commentedBy["name"]}}:</b> {{replay.text}}</p>
            <div @click="deleteComment(replay._id)">
              <i v-if="id_localStorage==replay.commentedBy._id"  class="fas fa-trash-alt"></i>
            </div>
          </div>
          <div>
            <form @submit.prevent="NewReplay(comment._id)">
                <input style="margin-bottom:5px; margin-top:5px;" v-model="replay_text" id="comment-input" class="form-control" type="text" placeholder="Reply" required/>
                <button id="comment-button" type="submit" class="btn btn-primary">reply</button>
          </form>
          </div>
        </div>
      </div>
    </div>
    </div>

    <form id="comment-form" @submit.prevent="newComment()">
          <input v-model="comment_text" id="comment-input" class="form-control" type="text" placeholder="Your comment goes here!" required/>
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
  data(){
     return{
       store,
       post: null,
       comments: null,
       comment_text: "",
       replay_text: "",
       closedItems: [],
        id_localStorage:localStorage.getItem('UserId_localStorage')
     }
   },
  async mounted(){
    let postDetails = await Posts.getOne(this.id)
    this.post = postDetails
    let result = await Posts.get_post_comments(this.id)
    this.comments = result.data
    console.log("Podaci:",this.comments)
   },
   methods:{
       async newComment() {
          await Posts.new_comment(this.comment_text, this.id)
          let result = await Posts.get_post_comments(this.id)
          this.comments = result.data
          this.comment_text = "";
       },
       async deleteComment(id){
         await Posts.delete_comment(id)
         let result = await Posts.get_post_comments(this.id)
         this.comments = result.data
       },
       async NewReplay(id){    
          await Posts.new_replay(this.replay_text, this.id, id)
          let result = await Posts.get_post_comments(this.id)
          this.comments = result.data
          this.replay_text = "";
       },

       toggleCollapse(){
         this.isCollapsable = !this.isCollapsable;
       },
   },
   computed:{
      timeAgo(){
        let a = new Date(this.post.posted_at)
        let d = a.toString()
        console.log(a)
        return moment(d).fromNow();
    }
   }
  }
</script>

<style scoped lang="scss">
.replay{
  width: 20px;
  height: 20px;
  transform: translate(490px,-30px);
}
#comment-form{
  margin-top: 20px;
  transform: translate(0px,-480px);
  #comment-input {
  transform: translate(25px,-290px);
  width: 400px;
  }
  #comment-button{
    transform: translate(510px,-335px);
    margin-top: 10px;
  } 
}
.comment-box{
  height: 150px;
  width: 600px;
  border-radius: 15px;
  background-color: rgb(216, 216, 216);
  padding: 10px;
  overflow: auto;
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
  width: 650px;
  height: 600px;
  padding: 10px;
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