<template>
  <div class="home">
    <div class="flex-container">
      <button @click="logout" class="btn btn-info">Logout</button>
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some text.</p>
        <a href="#" class="btn btn-info">Go somewhere</a>
        </div>
      </div>

        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some text.</p>
        <a href="#" class="btn btn-info">Go somewhere</a>
        </div>
      </div>

        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some text.</p>
        <a href="#" class="btn btn-info">Go somewhere</a>
        </div>
      </div>

        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some text.</p>
        <a href="#" class="btn btn-info">Go somewhere</a>
        </div>
      </div>

        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some text.</p>
        <a href="#" class="btn btn-info">Go somewhere</a>
        </div>
      </div>

        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some text</p>
        <a href="#" class="btn btn-info">Go somewhere</a>
        </div>
      </div>

       <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some text</p>
        <a href="#" class="btn btn-info">Go somewhere</a>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  components: {
   
  },
  created(){
    if(localStorage.getItem('token') === null){
      this.$router.push('/login');
    }
  },
  mounted() {
    axios.get('http://localhost:5000/user', { headers: { token: localStorage.getItem('token')}})
    .then((res) => {
      localStorage.setItem('username', res.data.userData.name)
    })
  },

  methods: {
    logout(){
      localStorage.clear()
        this.$router.push('/login');
    },
    
  }
}
</script>

<style lang="scss" scoped>
  .flex-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: 100px;
}

.flex-container > div {
  background-color: #f1f1f1;
  width: 100px;
  margin-right: 30px;
  margin-bottom: 20px;
  text-align: center;
  line-height: 75px;
  font-size: 15px;
}
@media (max-width: 768px) {
  .flex-container > div{
   
  }
}
</style>
