<template>
    <div class="add-review">

        <nav v-if="this.$route.name !== 'Login' && this.$route.name !== 'Register'" class="navbar">
        <h3>Enjoying Summer?</h3>
         <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse-navbar" aria-expanded="false" aria-controls="multiCollapseExample2"><i class="fas fa-bars"></i></button>
        </nav>

      <div class="collapse multi-collapse" id="collapse-navbar">
      <div id="collapse-div" class="card card-body">
                <div style="margin-bottom:15px;" class="row">
              <div class="col">
                  <router-link to="/"><a href="#"><i id="sidebar-icon" class="fas fa-home"></i></a></router-link>
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
      </div>
    </div>


    <div class="container">
        <form @submit.prevent="add_new_post">
    <div class="row">
    <div class="col-md col-sm">
        <croppa v-model="store.imageData" :height="300" :width="330" :placeholder-font-size="18" :prevent-white-space="true"></croppa>
    </div>
    <div class="col-md col-sm">
        <label for="description-input">Description :</label>
        <textarea v-model="newpost.description" id="description-input" required class="form-control is-valid" rows="3" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."></textarea>
    </div>
    <div class="col-md col-sm">
        <label for="description-input">Title :</label>
        <textarea v-model="newpost.title" id="title-input" required class="form-control is-valid" rows="3" placeholder="Title"></textarea>
    </div>
    <div class="col-md col-sm">
        <label for="beach-type">Beach Type</label>
        <select v-model="newpost.beach_type" id="beach-type" class="form-control is-valid" required>
            <option :key="beach_type" v-for="beach_type in store.beach_types">{{beach_type}}</option>
        </select>

        <label for="lifeguard-check">Lifeguard Tower ?</label>
        <select v-model="newpost.lf_tower" id="lifeguard-check" class="form-control is-valid" required>
            <option :key="lf_tower" v-for="lf_tower in store.lf_towers">{{lf_tower}}</option>
        </select>

        <label for="pets-check">Pets allowed ?</label>
        <select v-model="newpost.pets_allowed_answer" id="pets-check" class="form-control is-valid" required>
            <option :key="pets_allowed_answer" v-for="pets_allowed_answer in store.pets_allowed">{{pets_allowed_answer}}</option>
        </select>

        <label for="free-check">Free to access ?</label>
        <select v-model="newpost.free_beach" id="free-check" class="form-control is-valid" required>
            <option :key="free_beach" v-for="free_beach in store.free_beaches">{{free_beach}}</option>
        </select>
    </div>
  </div>
        <button id="add-review-btn" type="submit" class="btn btn-primary">Post beach</button>
        </form>
        </div>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import store from '@/store.js';
import {Posts} from '@/services';
import axios from 'axios';
export default {
    data(){
        return{
            store,
            newpost: {
                title: '',
                postedBy: '',
                description: '',
                beach_type: '',
                lf_tower: '',
                pets_allowed_answer: '',
                free_beach: '',
                blobData: null
            }
        }
    },
    mounted(){
    },
    components: {
      StarRating
  },
  methods:{
      setRating(rating){
          this.rating = rating
          store.score=this.rating
          console.log(store.score)
      },
      getImageBlob(){
          return new Promise((resolve,reject)=>{
              this.store.imageData.generateBlob(blobData =>{
                  if(blobData!=null){
                      resolve(blobData)
                  }else{
                      reject("Error with getting image!")
                  }
              })  
          })
      },

       async add_new_post() {
            try{
            this.newpost.blobData = await this.getImageBlob()
            let data = new FormData()
            for(const property in this.newpost){
                data.append(property, this.newpost[property])
            }
            data.append('token', localStorage.getItem('token'))
            for(var pair of data.entries()) {
                console.log(pair[0]+ ', '+ pair[1]); 
            }
            let config = {
            header : {
                'Content-Type' : 'multipart/form-data',
            }
            }
            axios.post('http://localhost:5000/newpost', data, config).then(response => {
            console.log('response', response)
            }).catch(error => {
            console.log('error', error)
            })
              this.$router.push({name:'Home'})
                    }catch(e){
                        console.log("Error!",e)
                    }
            }


        }
}
</script>

<style lang="scss" scoped>
    .container{
        margin-left:100px;
        margin-right: 20px;
    }
    .croppa-container{
        background-color:rgb(200, 224, 250);
        margin-right: 20px;
    }
    #description-input{
        height: 270px;
    }
    .form-control{
        margin-bottom:10px;
    }
    label{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 18px;
    }
    .add-review{
        margin-top: 80px;
    }
    .navbar{
      display: none;
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
#star-rating{
    margin-top: 30px;
}
#score-display{
    transform: translate(280px,-60px);
}
#input-title{
    width: 300px;
    margin-bottom: 20px;
}
    @media (max-width: 768px){
          .croppa-container{
            margin-right: 0px;
        }
        #free-check{
            margin-bottom: 90px;
        }
        label{
            margin-top: 10px;
        }
        .navbar{
           display:inline-flex;
           width: 320px;
           margin-left: 20px;
           h3{
               display:none;
           }
           button{
               display:block;
           }
       }
        #collapse-div{
        background-color: rgb(130, 174, 245);
        margin-left: 15px;
        margin-right: 20px;
        margin-bottom: 10px;
    }
     .container{
        margin-left:0px;
        margin-right: 20px;
    }
    #sidebar-icon{
        height: 30px;
        width: 30px;
    }
    #add-review-btn{
        margin-bottom: 20px;
    }
    #add-review-btn{
    transform: translate(0px,0px);
    }
    #score-display{
    transform: translate(0px,0px);
    margin-bottom: 10px;
    }
    }
</style>