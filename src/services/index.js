import axios from 'axios'

let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout:1000
})

let Posts = {
   async new_post(data){

    console.log("Spremam na backend:",data)

     let serverData={
         title:data.title,
         url:data.url,
         postedBy:data.postedBy,
         score:data.score,
         description:data.description,
         beach_type:data.beach_type,
         lf_tower:data.lf_tower,
         pets_allowed_answer:data.pets_allowed_answer,
         free_beach:data.free_beach,
         posted_at:data.posted_at
    }
    await Service.post('/posts',serverData)
    return
  }, 
  async getAll(searchTerm){
        let response = await Service.get(`/posts?title=${searchTerm}`)
        let data = response.data                                      
        data = data.map(doc => {                                      
            return{
                id:doc.id,
                title:doc.title,
                url:doc.url,
                postedBy:doc.postedBy,
                score:doc.score,
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
    }
}

export {Service,Posts}