<template>
    <div id="signup">
       <div class="container h-100">
        <div class="row">
            <div class="col"></div>
                <div id="Mid_col_background" class="col-md-5 col-sm">
                    <form @submit.prevent="signup">
                        <div class="form-group">
                            <h3 style="color: whitesmoke;">Register</h3>
                        </div>
                          <div class="form-group">
                            <label style="color: whitesmoke;" for="exampleInputUsername"><strong>Username</strong></label>
                            <input v-model="username" type="text" class="form-control" id="exampleInputUsername" placeholder="JaneDoe123" required>
                          </div>
                        <div class="form-group">
                        <label style="color: rgb(245, 245, 245);" for="exampleInputEmail1"><strong>Email address</strong></label>
                        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" placeholder="Janedoe@gmail.com" aria-describedby="emailHelp" required>
                        </div>
                        <div class="form-group">
                          <label style="color: whitesmoke;" for="exampleInputPassword1"><strong>Password</strong></label>
                          <input v-model="password" type="password" class="form-control" placeholder="**********" id="exampleInputPassword1" required>
                        </div>
                        <div class="form-group">
                            <label style="color: whitesmoke;" for="exampleInputPassword2"><strong>Confirm Password</strong></label>
                            <input v-model="passwordConf" type="password" class="form-control" placeholder="**********" id="exampleInputPassword2" required>
                        </div>
                        <div class="flex-container">
                            <button typre="submit" class="btn btn-primary"><strong>Sign up</strong></button>
                            <button @click="goSignin" style="margin-left: 10px; margin-right: 30px;" class="btn btn-danger"><strong>Sign in</strong></button>
                            <a id="forgot_password" style="color:whitesmoke;" href="#"><strong>Forgot password?</strong></a>
                            <label style="color: red;" for="exampleInputPassword1"><strong>{{this.error}}</strong></label>
                        </div>
                      </form>
                </div>
            <div class="col"></div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Sigunp',
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
        goSignin(){
            this.$router.push('/login');
        },
        signup() {
            if(this.password === this.passwordConf && this.password.length > 6){
                let newUser = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                axios.post('http://localhost:5000/signup', newUser)
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
                    this.error = 'Password does not match'
                    console.log(this.error);
                }
        }
    }
}
</script>
<style scoped>
    #signup {
        background: rgb(222,216,187);
        background: linear-gradient(0deg, rgba(222,216,187,1) 24%, rgba(73,207,233,1) 61%, rgba(65,131,187,1) 100%);
    }
    #Mid_col_background{
        background-color: rgb(67, 177, 230,0);
        margin-top: 50px;
        padding: 40px;
        border-radius: 10px;
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
            height: 350px;
            border-radius: 0px;
            height: 800px;
        }
        #forgot_password{
            margin-top: 10px;
        }
    }
</style>