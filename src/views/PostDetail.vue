<template>
  <div class="container">
        <p class="lead">{{post.title}}</p>
        <img :src="post.url" class="figure-img img-fluid rounded" alt="Post Image">
        <figcaption class="figure-caption">{{timeAgo}}.</figcaption>
        <div class="data">
          <div class="user">
            <p class="lead">Posted By: {{post.postedBy}}</p>
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
          </div>
        </div>
  </div>
</template>

<script>
import store from '@/store.js';
import Axios from 'axios';
 export default {
   props: ['id'],
   data(){
     return{
       store,
       post: null
     }
   },
  async mounted(){
    console.log(this.id)
    let postDetails = await Axios.get("http://localhost:5000/details", { headers: { title: this.id}})
    this.post = postDetails.data
    console.log(this.post);
   },
   methods:{
       
   },
   computed:{
     /*  timeAgo(){
      let a=Date(this.post.posted_at)
      let d=a.toString()
      return moment(d).fromNow();
    } */
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