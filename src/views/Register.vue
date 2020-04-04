<template>
    <div>
        <body style="background-image: url('https://i.pinimg.com/originals/1f/d8/ab/1fd8abbd733c5b26029b9427f7f82461.jpg'); background-size: cover;">
    <div class="container">
        <div class="row">
            <div class="col"></div>
                <div id="Mid_col_background" class="col-md-5 col-sm">
                    <form>
                        <div class="form-group">
                            <h3 style="color: whitesmoke;">Register</h3>
                        </div>
                        <div class="form-group">
                            <label style="color: whitesmoke;" for="exampleInputEmail1"><strong>First Name</strong></label>
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Jane" aria-describedby="emailHelp">
                          </div>
                          <div class="form-group">
                            <label style="color: whitesmoke;" for="exampleInputEmail1"><strong>Last Name</strong></label>
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Janedoe@gmail.com" aria-describedby="emailHelp">
                          </div>
                          <div class="form-group">
                            <label style="color: whitesmoke;" for="exampleInputEmail1"><strong>Username</strong></label>
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Janedoe@gmail.com" aria-describedby="emailHelp">
                          </div>
                          <div class="form-group">
                            <label style="color: whitesmoke;" for="exampleFormControlSelect1"><strong>Gender</strong></label>
                            <select style="width: 100px;" class="form-control" id="exampleFormControlSelect1">
                              <option>Male</option>
                              <option>Female</option>
                            </select>
                          </div>
                        <div class="form-group">
                          <label style="color: rgb(245, 245, 245);" for="exampleInputEmail1"><strong>Email address</strong></label>
                          <input type="email" class="form-control" placeholder="Janedoe@gmail.com" aria-describedby="emailHelp">
                        </div>
                        <div class="form-group">
                          <label style="color: whitesmoke;" for="exampleInputPassword1"><strong>Password</strong></label>
                          <input type="password" class="form-control" placeholder="**********" >
                        </div>
                        <div class="form-group">
                            <label style="color: whitesmoke;" for="exampleInputPassword1"><strong>Confirm Password</strong></label>
                            <input type="password" class="form-control" placeholder="**********">
                          </div>
                        <div class="flex-container">
                            <router-link to="/login"><button type="submit" class="btn btn-primary"><strong>Register</strong></button></router-link>
                            <router-link to="/login"><button style="margin-left: 10px; margin-right: 30px;" type="submit" class="btn btn-danger"><strong>Login</strong></button></router-link>
                            <a id="forgot_password" style="color:whitesmoke;" href="#"><strong>Forgot password?</strong></a>
                        </div>
                      </form>
                </div>
            <div class="col"></div>
        </div>
    </div>
</body>
    </div>
</template>

<style lang="scss" scoped>
    #Mid_col_background{
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