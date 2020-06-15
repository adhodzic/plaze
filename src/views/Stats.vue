<template>
    <div class="stats">
        <div class="container">
            <div style="margin-left:50px;" class="row">
                <div class="col">
                    <apexchart width="400" type="donut" :options="options" :series="series"></apexchart>
                </div>
                <div class="col">
                    <apexchart width="400" type="bar" :options="options_2" :series="series_2"></apexchart>
                </div>
            </div>
            <div style="margin-left:50px;" class="row">
                <div class="col">
                    <apexchart width="400" type="bar" :options="options_3" :series="series_3"></apexchart>
                </div>
                <div class="col">
                    <apexchart width="400" type="bar" :options="options_4" :series="series_4"></apexchart>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import store from '@/store.js';
export default{
    data(){
        return{
              options: {
               legend:false,
               labels: ['Concrete', 'Sandy', 'Rocky'],
               fill: {
                   colors: ['rgb(74, 107, 240)','rgb(59, 75, 140)','rgb(132, 154, 245)']
                }
            },
            series: [store.num_concrete,store.num_sandy,store.num_rocky],
            // Novi chart
            options_2: {
               fill: {
                   colors: ['rgb(255, 102, 102)']
                },
                xaxis:{
                    categories:['Yes','No']
                }
            },
              series_2: [{
                name: 'Lifeguard',
                data: [store.lf_yes,store.lf_no]
            }],
            // Novi chart
               options_3: {
               fill: {
                   colors: ["rgb(189, 113, 58)"]
                },
                xaxis:{
                    categories:['Yes','No']
                }
            },
              series_3: [{
                name: 'Pets Allowed',
                data: [store.petsYes,store.petsNo]
            }],
            // Novi Chart
                   options_4: {
               fill: {
                   colors: ["rgb(177, 245, 132)"]
                },
                xaxis:{
                    categories:['Yes','No']
                }
            },
              series_4: [{
                name: 'Free',
                data: [store.free_yes,store.free_no]
            }],
        }
    },
    created(){
        
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    .container{
        margin-top:50px;
        margin-bottom: 50px;
        margin-left:80px;
        margin-right: 20px;
    }
    @media (max-width: 768px) {
        .row{
            transform: translateX(-150px);
            margin-left: 0px;
        }
    }
</style>