<template>
  <div class="container post" v-on:contextmenu="handlere($event,post.id)">
    <div class="row editdiv">
      <div class="col-md-4 post-title">
        <h1>{{ post.title.toUpperCase() }}</h1>
        <p class="author"><span class="text-muted">{{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` }} </span></p>
      </div>
      <div class="col-md-8 col-md-offset-0 post-body">
        <highlightable
        @display="onDisplay"
        @highlight="onHighlight">
        <p id="`${post.id}`">{{ post.text }}</p>
      </highlightable>
    </div>
    <div class="edit"><i class="fa fa-pencil fa-lg" v-on:click="handlere($event,post.id)"></i><i class="fa fa-trash fa-lg" v-on:click="del($event,post.id)"></i></div>
  </div>
  <modal name="highlightedWords" :height="auto" :width="300" :scrollable="true">
    <div class="modalHeader">
      <h5>Highlights</h5>
    </div>
    <div class="modalContent">
      <ul v-for="word in highWords"
      v-bind:key="word">
      <li><button class="hwords" v-on:click="findWord(word.text)">{{'\"'+word.text+'\"'}}</button></li>
    </ul>
  </div>
  <div class="modalFooter">
    <button v-on:click="close" class="alt">Close</button>
  </div>
</modal>
<modal name="edittext" :height="300" :width="500" :scrollable="true">
  <div class="modalHeader">
    <h5>Update Post</h5>
  </div>
  <div class="umodalContent">
    <form class="form-style">
      <ul>
        <li>
          <input type="text"  v-model="etitle" class="field-style field-full align-none" placeholder="Title" />
        </li>
        <li>
          <textarea  v-model="etext" class="field-style" placeholder="Say Something.."></textarea>
        </li>
        <li>
          <input type="button" class="updButton" v-on:click="updatePost" value="Save" />
        </li>
      </ul>
    </form>
  </div>
</modal>
</div>
</template>

<script>

import HighlightComponent from './highlight';

export default {
  name: 'SinglePostComponent',

  components: {
    'highlightable': HighlightComponent
  }, 

  data(){
    return {
      etitle: this.post.title,
      etext: this.post.text
    }
  },

  computed: {
    post(){
      var index = this.$store.state.posts.length - this.$route.params.id;
      return this.$store.state.posts[index];
    },
    highWords(){
      return this.$store.state.highlighted;
    },
    date(){
      var d = new Date();
      return d;
    }
  },

  methods: {
    onDisplay () {
      this.$modal.show( 'highlightedWords' );
    },

    onHighlight (word) {
      var ids = [];
      var positions = [];
      var pos = {};
      var hword = {};
      var start = getSelection().getRangeAt(0).startOffset;
      var end = getSelection().getRangeAt(0).endOffset;
      if(this.$store.state.highlighted.length == 0){
        ids.push(this.post.id);
        hword['id'] = ids;
        pos['start'] = start;
        pos['end'] = end;
        positions.push(pos);
        hword['pos'] = positions;
        hword['text'] = word;
        this.$store.state.highlighted.push(hword);
      }else {
        for(let j=0;j<this.$store.state.highlighted.length;j++){
          if(this.$store.state.highlighted[j].text === word){
            // check if same id is present
            for(let h=0;h<this.$store.state.highlighted[j].id.length;h++){
              if(this.$store.state.highlighted[j].id[h] == this.post.id && this.$store.state.highlighted[j].pos[h].start == start && this.$store.state.highlighted[j].pos[h].end == end){
                break;
              } else {
                this.$store.state.highlighted[j].id.push(this.post.id);
                pos['start'] = start;
                pos['end'] = end;
                this.$store.state.highlighted[j].pos.push(pos);
              }
            }
          } else {
            ids.push[this.post.id];
            hword['id'] = ids;
            hword['text'] = word;
            pos['start'] = start;
            pos['end'] = end;
            positions.push(pos);
            hword['pos'] = positions;
            this.$store.state.highlighted.unshift(hword);
          }
        }
      }
    },

    close() {
      this.$modal.hide( 'highlightedWords' );
    },

    async del(e,id) {
      e.preventDefault();
      await this.$store.commit('deletePost', id)
      await this.$router.push({path:'/'});
    },

    async handlere(e){
      e.preventDefault();
      this.$modal.show( 'edittext' );
    },

    async updatePost() {
      const pl = {}
      pl['id'] = this.post.id;
      pl['title'] = this.etitle
      pl['text'] = this.etext
      await this.$store.commit('updatePost', pl)
      this.$modal.hide( 'edittext' );
    },

    async findWord(word){
      await this.$store.commit('getFoundPost',word)
      this.$modal.hide( 'highlightedWords' );
      this.$router.push({name: 'found', path:`/${word}`});
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container {
  margin-top: 2em;
  margin-right: auto;
  margin-left: auto;
  padding-right:30px;
  padding-left: 15px;
  padding-bottom: 1.75em;
  background-color: rgb(255,255,255,1);
}

@media(min-width:768px){
  .container {
   width:750px;
 }
}

@media(min-width:992px){
  .container {
   width:970px;
 }
}

@media(min-width:1200px){
  .container {
   width:1170px;
 }
}

.post-body {
  word-wrap:break-word;
  padding: 1em 1em 1em 1em;
  font-size: 16px;
  margin-top: 30px;
  text-align:left;
  font-family: 'Varela Round', sans-serif;
  background-color: #f1f1f1;
}

@media(min-width:992px){
  .post-title {
    text-align: center;
    padding-right: 30px;
  } 
}
.post-title{
  word-wrap:break-word;
}

@media(max-width:768px){
  .post-body {
    margin-left: 1em;
  } 
}

.post-body .author span {
  margin-left: 5px;
}

.author {
  font-family: 'Varela Round', sans-serif;
}

.post-title h1 {
  font-family: 'Merienda', cursive;
  font-weight: bold;
  margin-top: 30px;
}

@media(max-width:767px){
  .post-title h1 {
    margin-top: 20px;
    font-size: 32px;
    margin-bottom: 10px;
  }
}

div.container.post {
  margin-bottom: 0;
}

h1 {
  color: rgba(0, 0, 0, 0.65);
}



.modalHeader{
  background-color: #f1f1f1;
}

.modalHeader h5 {
  font-family: 'Varela Round', sans-serif;
  padding: 0.5em 0 0.25em 0;
  text-align:center;
}

div.modalContent {
  text-align:left;
  position: relative;
  max-height: 70%;
  overflow: auto;
  padding:1em 0 1em 0;
}

.modalContent ul {
  list-style:none;
}

.modalContent ul li {
  font-family: 'Varela Round', sans-serif;
  line-height: 1em;
  padding:0.1em 0.25em 0.1em 0.25em
}

.modalContent ul li a{
  text-decoration:none;
  color:black;
}

div.modalFooter {
  text-align:center;
}

.modalFooter button {
  position: absolute;
  bottom: 2%;
  left:39%;
}

.updButton input {
  position: absolute;
  bottom: 3%;
  left:50%;
}

.alt {
  background-color: #216288;
  border: 1px solid #17445E;
  display: inline-block;
  cursor: pointer;
  color: #FFFFFF;
  padding: 4px 10px;
  text-decoration: none;
  font-family: 'Comfortaa', cursive;
  font: 12px ;
  transition: box-shadow .1s;
}

.alt:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.3);
}

.hwords {
  background:none;
  background-color:none;
  border: none;
}

div.umodalContent {
  text-align:center;
  position: relative;
  overflow: auto;
  padding:1em 2em 1em 2em;
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

.editdiv:hover .edit {
  display: block;
}

.edit {
  padding-top: 2px; 
  padding-right: 7px;
  position: absolute;
  right: 0;
  top: 0;
  display: none;
}

.edit a {
  color: #000;
}

.editdiv{
  position: relative;
}

.fa-trash {
  padding-left: 0.4em;
}

</style>
