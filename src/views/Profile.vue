<template>
  <div class="profile">
    <div class="container">
      <div class="jumbotron">
        <div class="row">
          <div class="col">
            <p style="font-size:30px;" class="display-4">User Profile</p>
          </div>
          <div class="col">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="name@example.com" :value="email" disabled />
          </div>
          <div class="col">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" placeholder="JaneDoe" :value="username_current" disabled />
          </div>
        </div>
      </div>
      <p>
        <img id="icons" src="@/assets/gear.png" alt="User Settings"
          type="button"
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
         />
      </p>
      <div class="collapse" id="collapseExample">
        <div class="jumbotron">
        <div class="row">
          <div class="col-7">
           <p style="font-size:30px;" class="display-4">Update Profile Username</p>
          </div>
          <div class="col">
            <label for="username">Username</label>
            <input required v-model="username_new" type="text" class="form-control" id="username" placeholder="JaneDoe" />
          </div>
          <div class="col">
              <form @submit.prevent="update_username">
                <button type="submit" style="transform:translateY(30px);" class="btn btn-primary">Update</button>
              </form>
          </div>
        </div>
        <p style="margin-top:50px; font-size:30px;" class="display-4">Update Password</p>
        <div class="row">
            <div class="col">
                <label for="password">Password</label>
                <input required v-model="password_current" type="password" class="form-control" id="password" placeholder="********" />
            </div>
            <div class="col">
                <label for="password">New Password</label>
                <input required v-model="password_new" type="password" class="form-control" id="password" placeholder="********" />
            </div>
            <div class="col">
                <label for="password">Confirm New Password</label>
                <input required v-model="conf_password_new" type="password" class="form-control" id="password" placeholder="********" />
            </div>
          <div class="col">
            <form @submit.prevent="change_password">
              <button type="submit" style="transform:translateY(30px);" class="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
        <p style="color:red; margin-top:20px;" v-if="pass_check1">Incorrect Password or New Passwords are not Matched!</p>
        <div style="margin-top:50px;" class="row">
            <div class="col">
                <p style="font-size:30px;">Delete Account</p>
            </div>
            <div class="col">
                <label for="password">Password</label>
                <input required v-model="password_current2" type="password" class="form-control" id="password" placeholder="********" />
            </div>
            <div class="col">
              <form @submit.prevent="delete_account">
                <button type="submit" style="transform:translateY(30px); margin-bottom:50px;" class="btn btn-danger">Delete Account</button>
              </form>
            </div>
        </div>
         <p style="color:red;" v-if="pass_check2">Incorrect Password!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store.js';
import {Posts} from '@/services';
export default {
  data(){
    return{
      username_current:'',
      email:'',
      username_new:'',
      password_new:'',
      conf_password_new:'',
      password_current:'',
      password_current2:'',
      pass_check1:false,
      pass_check2:false
    }
  },
  mounted(){
    axios.get('/api/user', { headers: { token: localStorage.getItem('token')}})
    .then((res)=>{
      console.log("User data: ", res.data)
      this.username_current=res.data.UserData.name;
      this.email=res.data.UserData.email

    })
  },
  methods:{
    update_username(){
      axios.patch('/update_user',{headers:{token:localStorage.getItem('token'),username:this.username_new}})
      .then((res)=>{
        console.log("Response: ",res);
      })
      this.username_new='';
      this.$router.push('/');
    },
    change_password(){
      let check
      axios.patch('/get_password',{headers:{token:localStorage.getItem('token'),password:this.password_current}})
      .then((res)=>{
        console.log("Response: ",res);
        this.check =res.data.check
        if(this.check==true){
        if(this.password_new==this.conf_password_new){
          axios.patch('/update_password',{headers:{token:localStorage.getItem('token'),password:this.password_new}})
          .then((res)=>{
            console.log("Response: ",res);
          })
          this.$router.push('/login');
        }
        else{
          this.pass_check1=true;
        }
      }
      else{
        this.pass_check1=true;
        console.log("Incorrect Password!")
      }
      })
    },
    delete_account(){
      let check
      axios.patch('/get_password',{headers:{token:localStorage.getItem('token'),password:this.password_current2}})
      .then((res)=>{
        console.log("Response: ",res);
        this.check =res.data.check
        if(this.check==true){
          axios.post('/delete_account',{headers:{token:localStorage.getItem('token')}})
          .then((res)=>{
          console.log("Response: ",res);
        })
        this.$router.push('/login');
        }
        else{
          this.pass_check2=true;
          console.log("Incorrect Password!")
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-left: 80px;
  margin-right: 20px;
}
.jumbotron {
  transform: translate(60px, 20px);
  background-color: rgb(197, 216, 252);
}
#email {
  width: 200px;
  background-color: whitesmoke;
  border-style: solid;
  border-color: rgb(101, 150, 247);
}
#username {
  width: 200px;
  background-color: whitesmoke;
  border-style: solid;
  border-color: rgb(101, 150, 247);
}
#password {
  width: 200px;
  border-style: solid;
  border-color: rgb(101, 150, 247);
}
#icons{
    height: 40px;
    width: 40px;
    transform: translate(60px,10px);
    transition: 0.1s;
}
#icons:hover{
    height: 45px;
    width: 45px;
    cursor: pointer;
}
@media (max-width: 768px) {
  .jumbotron {
    transform: translate(-80px, 20px);
  }
  #email {
    margin-bottom: 20px;
  }
}
</style>