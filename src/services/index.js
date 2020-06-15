import axios from 'axios'
import store from "@/store.js";

let Service = axios.create({
    baseURL: '',
    timeout:1000
})

let Posts = {

    async getUser(){
      await Service.get('/api/user', { headers: { token: localStorage.getItem('token')}})
      .then((res) => {
        console.log("user", res.data)
        localStorage.setItem('name', res.data.UserData.name)
        localStorage.setItem('UserId_localStorage', res.data.UserData.id)
      }).catch(error => {
        localStorage.clear()
        console.log("user",error)
        this.$router.push('/login');
      });
      return 
    },
   async update_post(data,id){
    await Service.patch(`/updatepost/${id}`, data).then(response => {
    }).catch(error => {
        console.log('error', error)
    })
    return

   },
  async new_post(data){
    await Service.post('/newpost', data).then(response => {
    }).catch(error => {
        console.log('error', error)
    })
    return
  },
  async getOne(id){
      let response = await Service.get(`/details/${id}`)
      let doc = response.data
      console.log(doc)
      return doc;
  }, 
/*    async getAll(searchTerm){
        let response = await Service.get(`/posts?_any=${searchTerm}`)
        let data = response.data                                      
        data = data.map(doc => {                                      
            return{
                id:doc._id,
                title:doc.title,
                url:doc.url,
                postedBy:doc.postedBy,
                score:parseInt(doc.score),
                description:doc.description,
                beach_type:doc.beach_type,
                lf_tower:doc.lf_tower,
                pets_allowed_answer:doc.pets_allowed_answer,
                free_beach:doc.free_beach,
                posted_at:doc.posted_at    
              }
          })
          console.log("Podaci sa backenda: ",data)
          return data
    }, */
    async new_comment(comment_text, id) {
        let data = {
          text: comment_text,
          id: id,
          token: localStorage.getItem("token")
        }
        return await Service.post("/newcomment", data)
     },
     async delete_comment(id){
       return await Service.post(`/delete_comment/${id}`)
     },
     async delete_post(id){
       return await Service.post(`/delete_post/${id}`)
     },
     async new_replay(replay_text, post_id, comment_id){
       let data = {
          text: replay_text,
          id: post_id,
          comment: comment_id,
          token: localStorage.getItem("token")
        }
        return await Service.post("/newcomment", data)
     },
     async get_post_comments(id){
        let comments = await Service.get(`/comments/${id}`)
        return comments
     }
}

export {Service,Posts}