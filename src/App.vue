<template>
<div id="app">
    <div v-if="this.$route.name !== 'Login' && this.$route.name !== 'Register'" id="mySidenav" class="sidenav">
         <ul class="list-unstyled components">
                <br>
                <li>
                    <a href="#"><i id="sidebar-icon" class="fas fa-home"></i></a>
                </li>
                <li>
                    <a href="#"><i id="sidebar-icon" class="fas fa-plus-circle"></i></a>
                </li>
                <li>
                    <a href="#"><i id="sidebar-icon" class="fas fa-images"></i></a>
                </li>
                <li>
                    <a href="#"><i id="sidebar-icon" class="fas fa-chart-pie"></i></a>
                </li>
                <li>
                    <a href="#"><i id="sidebar-icon" class="fas fa-user-circle"></i></a>
                </li>
                <li>
                    <a @click="logout" class = "logout"><i id="sidebar-icon" class="fas fa-sign-out-alt"></i></a>
                </li>
            </ul>
    </div>

    <nav v-if="this.$route.name !== 'Login' && this.$route.name !== 'Register'" class="navbar">
        <h3>Enjoying Summer?</h3>
        <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        </form>
    </nav>

    <div class="content">
        <router-view/>
    </div>
    <div class="navbar-down">

    </div>
</div>
</template>

<script>
    export default {
        name: 'App',
        methods: {
            logout(){
                localStorage.clear()
                this.$router.push('/');
            },
        },
    }
</script>

<style lang="scss" scoped>

    .content{
        
    }
    .navbar{
        margin-left: 100px;
        margin-right: 80px;
        margin-top: 20px;
        margin-bottom: 40px;
        border-radius: 5px;
        height: 70px;
        background-color:rgb(130, 174, 245);

        h3{
            color: whitesmoke;
        }
    }

    .sidenav {
        height: 100%;
        width: 80px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color:rgb(130, 174, 245);
    }

    .sidenav a {
        margin-top: 40px;
        padding-left: 20px;
        font-size: 35px;
        color:whitesmoke;
        display: block;
        transition: font-size 0.3s;
    }

    .sidenav a:hover {
        color:rgb(31, 99, 209);
    }

    .sidenav .logout:hover {
        color:rgb(217, 27, 27);
    }
    @media (max-width: 768px) {
        .sidenav a{
            margin-top:10px;
            margin-bottom:30px;
        }

        .navbar{
            width: 250px;
            h3{
                display:none;
            }
        }

        .navbar-down{
        margin-top:100px;
        }
    }
</style>

