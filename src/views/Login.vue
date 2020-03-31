<template>
    <div id="login">
        <div class="container">
        <div class="row">
            <div class="col"></div>
                <div id="Mid_col_background" class="col-md-5 col-sm">
                    <form @submit.prevent="login" autocomplete="off">
                        <div class="form-group">
                            <h2>Sign In</h2>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputEmail1"><strong>Email address</strong></label>
                          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" placeholder="Janedoe@gmail.com" aria-describedby="emailHelp" required>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1"><strong>Password</strong></label>
                          <input v-model="password" type="password" class="form-control" placeholder="**********" id="exampleInputPassword1" required>
                        </div>
                        <div class="flex-container">
                            <button type="submit" class="btnLogin btn btn-primary"><strong>Sign In</strong></button>
                            <button style="margin-left: 10px; margin-right: 30px;" @click="goRegister" class="btnSignup btn btn-danger"><strong>Sign up</strong></button>
                            <a id="for_pass" href="#"><strong>Forgot password?</strong></a>
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
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        goRegister(){
            this.$router.push('/register')
        },
        login(){
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
        }
    }
}
</script>

<style scoped>
    #login {
        background: url('https://i.pinimg.com/originals/1f/d8/ab/1fd8abbd733c5b26029b9427f7f82461.jpg');
        /*background: linear-gradient(0deg, rgba(222,216,187,1) 24%, rgba(73,207,233,1) 61%, rgba(65,131,187,1) 100%);*/
        height: 100vh;
    }
    ::placeholder {
        color: #f1dfc15b;
    }
    input {
        background-color: #6f6658;
        border: 0px;
        color: #eddabb;
    }
    input:focus {
        outline: none !important;
        background-color: #6f6658;
        border:2px solid #f9757f;
        box-shadow: 0 0 10px #eddabb;
        color: #eddabb;
    }
    .for_pass, button, h2, label {
        color: #2f4858;
    }
    .btnLogin {
        background-color: #49cfe9;
        border: 0px;
    }
    .btnSignup {
        background-color: #f6ae2d;
        color: #2f4858;
        border: 0px;
    }
    #Mid_col_background{
        background-color: #e7dfd3;
        margin-top: 155px;
        padding: 35px;
        border-radius: 10px;
        box-shadow: 0 1px 10px #2f4858;
    }
    .flex-container {
        display: flex;
        flex-wrap: wrap;
    }

    .flex-container > div {
        background-color: #f9757f;
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
            height: 600px;
        }
        #forgot_password{
            margin-top: 10px;
        }
    }
</style>