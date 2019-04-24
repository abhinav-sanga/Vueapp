<template>
  <div>
    <form class="form-style">
      <ul>
        <li>
          <input type="text"  v-model="title" class="field-style field-full align-none" placeholder="Title" />
        </li>
        <li>
          <textarea  v-model="text" class="field-style" placeholder="Say Something.."></textarea>
        </li>
        <li>
          <input type="button" v-on:click="createPost" value="Post" />
        </li>
      </ul>
    </form>

    <section v-for="post in posts"
    v-bind:key="post.id"
    v-on:contextmenu="handler($event,post.id)">
    <article>
      <h3>{{ post.title.toUpperCase() }}</h3>
      <p>{{ post.text.slice(0,post.text.length/2)+' ...' }}</p>
      <ul class="actions">
        <li>
          <button v-on:click="clickMethod(post.id)" class="button alt">Read More</button>
        </li>
      </ul>
    </article>
  </section>
</div>


</template>

<script>

export default {
  name: 'PostComponent',
  computed: {
    posts(){
      return this.$store.state.posts;
    }
  },

  methods: {
    async createPost (){
      const newPost = {};
      newPost['title'] = this.title;
      newPost['text'] = this.text;
      await this.$store.commit('insertPost',newPost)
      this.title = ''
      this.text = ''
      // box-shadow: 0 0 11px rgba(33,33,33,.9);
    },

    async handler(e,id) {
      e.preventDefault();
      await this.$store.commit('deletePost', id)
    },

    async clickMethod(id){
      this.$router.push({path:`/${id}` });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  display: -webkit-flex;
  display: flex;
  margin: 1em 1em 1em 1em;
}

@media(max-width:630px){
  section{
    margin: 1em 0.5em 1em 0.5em;
  }
}

article {
  transition: box-shadow .3s;
  -webkit-flex: 3;
  -ms-flex: 3;
  flex: 3;
  background-color: #f1f1f1;
  padding: 1em 2em 1em 2em;
  margin: 0 3em 0 3em;
  word-wrap: break-word;
}

article:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6);
}

article h3{
  font-family: 'Merienda', cursive;
  margin-bottom: 1em;
}

article p{
  font-family: 'Varela Round', sans-serif;
  text-align: left;
}

.alt {
  background-color: #216288;
  border: 1px solid #17445E;
  display: inline-block;
  cursor: pointer;
  color: #FFFFFF;
  padding: 8px 18px;
  text-decoration: none;
  font-family: 'Comfortaa', cursive;
  font: 12px ;
  transition: box-shadow .1s;
}

.alt:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.3);
}

.actions {
  list-style:none;
  text-decoration:none;
}

@media (max-width: 600px) {
  section {
    -webkit-flex-direction: column;
    flex-direction: column;
  }
}

.form-style{
  max-width: 650px;
  background: #FAFAFA;
  padding: 30px;
  margin: 50px auto;
  box-shadow: 1px 1px 25px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  border: 6px solid #305A72;
}
.form-style ul{
  padding:0;
  margin:0;
  list-style:none;
}
.form-style ul li{
  display: block;
  margin-bottom: 10px;
  min-height: 35px;
}
.form-style ul li  .field-style{
  box-sizing: border-box; 
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box; 
  padding: 8px;
  outline: none;
  border: 1px solid #B0CFE0;
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  -o-transition: all 0.30s ease-in-out;

}.form-style ul li  .field-style:focus{
  box-shadow: 0 0 5px #B0CFE0;
  border:1px solid #B0CFE0;
}
.form-style ul li .field-split{
  width: 49%;
}
.form-style ul li .field-full{
  width: 100%;
}
.form-style ul li input.align-left{
  float:left;
}
.form-style ul li input.align-right{
  float:right;
}
.form-style ul li textarea{
  width: 100%;
  height: 100px;
}
.form-style ul li input[type="button"], 
.form-style ul li input[type="submit"] {
  -moz-box-shadow: inset 0px 1px 0px 0px #3985B1;
  -webkit-box-shadow: inset 0px 1px 0px 0px #3985B1;
  box-shadow: inset 0px 1px 0px 0px #3985B1;
  background-color: #216288;
  border: 1px solid #17445E;
  display: inline-block;
  cursor: pointer;
  color: #FFFFFF;
  padding: 8px 18px;
  text-decoration: none;
  font: 12px Arial, Helvetica, sans-serif;
}
.form-style ul li input[type="button"]:hover, 
.form-style ul li input[type="submit"]:hover {
  background: linear-gradient(to bottom, #2D77A2 5%, #337DA8 100%);
  background-color: #28739E;
}
</style>
