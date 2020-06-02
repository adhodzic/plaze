<template>
    <div class="container">
    <div class="row">
        <div class="col">
             <img style="height:400px; width:400px;"  :src="post_data.url" class="figure-img img-fluid rounded" alt="Post Image" />
             <star-rating id="star-rating"  :star-size="50" :read-only="true" :show-rating="false" :rating="post_data.score"></star-rating>
        </div>
        <div class="col-md col-sm">
            <p>{{post_data.description}}</p>
        </div>
        <div class="col">
            <label for="input-edit">Beach Type?</label>
            <input id="input-edit" type="text" disabled :value="post_data.beach_type" class="form-control is-valid">
            <label for="input-edit">Lifeguard?</label>
            <input id="input-edit" type="text" disabled :value="post_data.lf_tower" class="form-control is-valid">
            <label for="input-edit">Pets allowed?</label>
            <input id="input-edit" type="text" disabled :value="post_data.pets_allowed_answer" class="form-control is-valid">
            <label for="input-edit">Free?</label>
            <input id="input-edit" type="text" disabled :value="post_data.free_beach" class="form-control is-valid">
            <label for="input-edit">Beach Name :</label>
            <input id="input-edit" type="text" disabled :value="post_data.title" class="form-control is-valid">
        </div>
    </div>
    <br><br><br>
    
    <div class="row row-cols-4">
    <div class="col-md col-sm">
        <croppa v-model="store.imageData" :height="300" :width="330" :placeholder-font-size="18" :prevent-white-space="true"></croppa>
        <star-rating id="star-rating"  :star-size="50" :show-rating="false" @rating-selected="setRating"></star-rating>
    </div>
    <div class="col-ms col-sm">
        <label for="description-input">Edit your review here :</label>
        <textarea v-model="update_post.description" id="description-input" class="form-control is-valid" rows="3" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."></textarea>
        </div>
    <div class="col-md col-sm">
        <label for="beach-type">Beach Type</label>
        <select v-model="update_post.beach_type" id="beach-type" class="form-control is-valid">
            <option :key="beach_type" v-for="beach_type in store.beach_types">{{beach_type}}</option>
        </select>

        <label for="lifeguard-check">Lifeguard Tower ?</label>
        <select v-model="update_post.lf_tower" id="lifeguard-check" class="form-control is-valid">
            <option :key="lf_tower" v-for="lf_tower in store.lf_towers">{{lf_tower}}</option>
        </select>

        <label for="pets-check">Pets allowed ?</label>
        <select v-model="update_post.pets_allowed_answer" id="pets-check" class="form-control is-valid">
            <option :key="pets_allowed_answer" v-for="pets_allowed_answer in store.pets_allowed">{{pets_allowed_answer}}</option>
        </select>

        <label for="free-check">Free to access ?</label>
        <select v-model="update_post.free_beach" id="free-check" class="form-control is-valid">
            <option :key="free_beach" v-for="free_beach in store.free_beaches">{{free_beach}}</option>
        </select>

        <label for="beach-check">Beach Name :</label>
        <input v-model="update_post.title" id="beach-check" type="text" class="form-control is-valid" placeholder="Beach Name">
    </div>
  </div>
  <div style="margin-top:40px; margin-bottom:20px;" class="input">
      <form @submit.prevent="updatePost">
        <button style="margin-right:10px;" type="submit" class="btn btn-primary">Save</button>
        <button type="submit" class="btn btn-secondary">Cancel</button>
      </form>
      <form @submit.prevent="deletePost">
          <button style="margin-right:10px; margin-top:10px" type="submit" class="btn btn-danger">Delete Post</button>
      </form>
  </div>
    </div>
</template>

<script>
import store from '@/store.js';
import {Posts} from '@/services'
import StarRating from 'vue-star-rating'
export default {
    props:["id"],
    data(){
        return{
            store,
            post_data:'',
            update_post: {
                title: undefined,
                postedBy: undefined,
                description: undefined,
                beach_type: undefined,
                lf_tower: undefined,
                pets_allowed_answer: undefined,
                free_beach: undefined,
                url: undefined
            }
        }
    },
    async mounted(){
        this.post_data = await Posts.getOne(this.id);
        console.log(this.post_data);
    },
    methods:{
        setRating(rating){
          this.score=rating;
          console.log(this.score)
      },
        getImageBlob(){
          return new Promise((resolve,reject)=>{
              store.imageData.generateBlob(blobData =>{
                  if(blobData!=null){
                      resolve(blobData)
                  }else{
                      reject("Error with getting image!")
                  }
              })  
          })
      },
      async updatePost() {
            if(store.imageData.hasImage()){
                let blob = await this.getImageBlob()
                let imageName = "Defaultni user" + "/" + Date.now() + ".png";
                let result = await storage.ref(imageName).put(blob)
                this.update_post.url = await result.ref.getDownloadURL()
            }
            this.update_post.posted_at = Date.now()
            this.update_post.token = localStorage.getItem('token')
            await Posts.update_post(this.update_post, this.id)
            this.$router.push("/")
        },
    async deletePost(){
         await Posts.delete_post(this.id)
         this.$router.push("/")
    }
    },
    components: {
      StarRating
  }
}
</script>

<style lang="scss" scoped>
    .croppa-container{
        background-color:rgb(200, 224, 250);
        margin-right: 20px;
    }
    p{
        text-align: justify;
        font-family:Arial, Helvetica, sans-serif;
        font-size: 17px;
    }
       #description-input{
        height: 270px;
    }
        label{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 18px;
    }
    .container{
        margin-top: 40px;
    }
    #input-edit{
        margin-bottom: 15px;
    }
    @media (max-width: 768px) {
        button{
            margin-top: 20px;
            margin-bottom: 20px;
        }
    }
</style>