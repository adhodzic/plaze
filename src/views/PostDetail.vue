<template>
  <div class="container">
        <p class="lead">{{post.title}}</p>
        <img :src="post.url" class="figure-img img-fluid rounded" alt="Post Image">
        <figcaption class="figure-caption">{{timeAgo}}.</figcaption>
        <div class="data">
          <div class="user">
            <p class="lead">Posted By: {{post.postedBy.name}}</p>
          </div>
          <div class="description">
            <p>{{post.description}}</p>
          </div>
          <div class="other">
            <div class="b-type">
              <p>Beach type: {{post.beach_type}}</p>
            </div>

            <div class="lifeguard">
              <p>Lifeguard on the beach: {{post.lf_tower}}</p>
            </div>
            
            <div class="pets">
              <p>Pets allowed: {{post.pets_allowed_answer}}</p>
            </div>

            <div class="free">
              <p>Free: {{post.free_beach}}</p>
            </div>
            <div class="comment" :key="comment.id" v-for="comment in this.comments">
              <h1 v-if="!comment.parentId" @click="replay(comment._id)">{{comment.commentedBy["name"]}} {{comment.text}}</h1>
              <p :key="replay.id" v-for="replay in comment.replays" style="padding-left:5em">{{replay.commentedBy["name"]}}: {{replay.text}}</p>
            </div>
          </div>
        </div>
        <form @submit.prevent="newComment">
          <div class="form-group">
            <label style="color: whitesmoke;" for="comment"><strong>comment</strong></label>
            <input v-model="comment" type="text" class="form-control" id="comment" placeholder="Comment" aria-describedby="emailHelp" required>
          </div>
          <div class="flex-container">
              <button type="submit" class="btn btn-primary"><strong>Post</strong></button>
          </div>
        </form>
  </div>
</template>

<script>
import moment from 'moment';
import store from '@/store.js';
import Axios from 'axios';
 export default {
   props: ['id'],
   data(){
     return{
       store,
       post: null,
       comments: null,
       comment: ""
     }
   },
  async mounted(){
    console.log(this.id)
    let postDetails = await Axios.get("http://localhost:5000/details", { headers: { id: this.id}})
    this.post = postDetails.data
    let comment = await Axios.get("http://localhost:5000/comments", { headers: {id: this.id}})
    this.comments = comment.data;
    console.log(this.comments)

   },
   methods:{
       async newComment() {
          let data = {
            text: this.comment,
            id: this.id,
            token: localStorage.getItem("token")
          }
          let comment = await Axios.post("http://localhost:5000/newcomment", data)
       },

       replay(id){
         console.log(id)
       }
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
    .container{
      margin-top: 20px;
      margin-bottom: 30px;
    }
    img{
      height: 350px;
      width: 550px;
      border-radius: 20px;
    }
    .data{
      width:555px;
      transform: translate(600px,-390px);
      margin-top: 10px;
      .description{
        text-align: justify;
        p{
          font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 20px;
        }
      }
      .other{
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 20px;
      }
      #icons{
        height: 20px;
        width: 20px;
        margin-right: 10px;
      }
    }
    @media (max-width: 768px){
      img{
        width:auto;
        height: auto;
      }
      .data{
        transform: translate(0px,0px);
        width:100%;
      }
    }
</style>