<template>
    <div>
        <body style="background-image: url('https://i.pinimg.com/originals/1f/d8/ab/1fd8abbd733c5b26029b9427f7f82461.jpg'); background-size: cover;">
    <div class="container">
        <div class="row">
            <div class="col"></div>
                <div id="Mid_col_background" class="col-md-5 col-sm">
                    <form @submit.prevent="signup">
                        <div class="form-group">
                            <h3 style="color: whitesmoke;">Register</h3>
                        </div>
                          <div class="form-group">
                            <label style="color: whitesmoke;" for="exampleInputEmail1"><strong>Username</strong></label>
                            <input v-model="username" type="text" class="form-control" id="exampleInputEmail1" placeholder="Janedoe" aria-describedby="emailHelp">
                          </div>
                        <div class="form-group">
                          <label style="color: rgb(245, 245, 245);" for="exampleInputEmail1"><strong>Email address</strong></label>
                          <input v-model="email"  type="email" class="form-control" placeholder="Janedoe@gmail.com" aria-describedby="emailHelp">
                        </div>
                        <div class="form-group">
                          <label style="color: whitesmoke;" for="exampleInputPassword1"><strong>Password</strong></label>
                          <input v-model="password" type="password" class="form-control" placeholder="**********" >
                        </div>
                        <div class="form-group">
                            <label style="color: whitesmoke;" for="exampleInputPassword1"><strong>Confirm Password</strong></label>
                            <input v-model="passwordConf" type="password" class="form-control" placeholder="**********">
                          </div>
                        <div class="flex-container">
                            <button type="submit" class="btn btn-primary"><strong>Register</strong></button>
                            <router-link to="/login"><button style="margin-left: 10px; margin-right: 30px;" type="submit" class="btn btn-danger"><strong>Login</strong></button></router-link>
                            <a id="forgot_password" style="color:whitesmoke;" href="#"><strong>Forgot password?</strong></a>
                            <label style="color: red;" for="exampleInputPassword1"><strong>{{this.error}}</strong></label>
                        </div>
                      </form>
                </div>
            <div class="col"></div>
        </div>
    </div>
</body>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Register',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            passwordConf: '',
            error: ''
        }
    },
    methods: {
        signup() {
            if(this.password === this.passwordConf && this.password.length > 6){
                let newUser = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                axios.post('http://localhost:5000/register', newUser)
                .then(res =>{
                    console.log(res);
                    this.error = '';
                    let user = {
                        email: this.email,
                        password: this.password
                    }
                    axios.post('http://localhost:5000/login', user)
                    .then(res =>{
                        if(res.status == 200) {
                            localStorage.setItem('token', res.data.token)
                            console.log(localStorage);
                            this.$router.push('/')
                        }
                    this.error = '';
                    }, err => {
                        console.log(err.response.data.error);
                        this.error = err.response.data.error;
                    })
                }, err => {
                    this.error = err.response.data.error
                })
                }else{
                    this.error = 'Password does not match or not longer than 6 characters!'
                    console.log(this.error);
                }
        }
    }
}
</script>

<style lang="scss" scoped>
    #Mid_col_background{
        margin-top: 50px;
        padding: 40px;
        border-radius: 10px;
        height: 900px;
    }
    .flex-container {
  display: flex;
  flex-wrap: wrap;
}

.flex-container > div {
  background-color: #f1f1f1;
  width: 100px;
  margin: 10px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
}
    @media only screen and (max-width: 600px) {
        #Mid_col_background{
            border-radius: 0px;
            height: 800px;
            margin-top: 100px;
        }
        #forgot_password{
            margin-top: 10px;
        }
    }
</style>