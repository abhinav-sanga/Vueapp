<template>
  <div class="container">
    <div class="postdiv post" >
      <div class="row editdiv">

        <div class="col-md-4 post-title">
          <h1>{{ post.title.toUpperCase() }}</h1>
          <p class="author"><span class="text-muted">{{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` }} </span></p>
        </div>

        <div class="col-md-8 col-md-offset-0 post-body">
          <p id="`${post.id}`" class="para">{{ post.text.slice(0,`${startH}`) }}<span class="markup" @mouseover="onHover()">{{ post.text.slice(`${startH}`,`${endH}`) }}</span>{{ post.text.slice(`${endH}`,post.text.length) }}</p>
        </div>

        <div class="edit"><i class="fa fa-pencil fa-lg" v-on:click="handlere($event,post.id)"></i><i class="fa fa-trash fa-lg" v-on:click="del($event,post.id)"></i></div>
      </div>

      <modal name="highlightedWords" :width="300" :scrollable="true">
        <div class="modalHeader">
          <h5>Highlights</h5>
        </div>
        <div class="modalContent">
          <ul v-for="word in highWords">
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
  <div id="highlight_menu" style="display:none;"> 

    <ul class="side-by-side">
      <li><span
        class="item"
        v-on:click="onDisplay()">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
        </svg>
      </span></li>
      <li><span
        class="item"
        v-on:click="onHighlight()">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="#000000" d="M18.5,1.15C17.97,1.15 17.46,1.34 17.07,1.73L11.26,7.55L16.91,13.2L22.73,7.39C23.5,6.61 23.5,5.35 22.73,4.56L19.89,1.73C19.5,1.34 19,1.15 18.5,1.15M10.3,8.5L4.34,14.46C3.56,15.24 3.56,16.5 4.36,17.31C3.14,18.54 1.9,19.77 0.67,21H6.33L7.19,20.14C7.97,20.9 9.22,20.89 10,20.12L15.95,14.16" />
        </svg>
      </span></li>
    </ul>

    <div class="caret">

    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'SinglePostComponent1', 

  data(){
    return {
      etitle: this.post.title,
      etext: this.post.text,
      startH: 0,
      endH: 0,
      selectedText: ''
    }
  },

  computed: {
    highlightableEl () {
      return this.$slots.default[0].elm
    },

    post(){
      var index = this.$store.getters.posts.length - this.$route.params.id;
      return this.$store.getters.posts[index];
    },
    highWords(){
      return this.$store.getters.highlighted;
    },
    date(){
      var d = new Date();
      return d;
    }
  },

  mounted () {
    console.log("mounted:",this.$store.state.high)
    window.addEventListener('mouseup', this.onMouseup)
  },

  beforeDestroy () {
    console.log('beforedestroy')
    this.$store.state.high = false
    window.removeEventListener('mouseup', this.onMouseup)
  },

  methods: {
    onMouseup () {
      var menu = jQuery("#highlight_menu");
      var s = document.getSelection()
      var r = s.getRangeAt(0);
      if (r && s.toString()) {
        if(!(/^[a-zA-Z0-9]+$/.test(s.toString()))){
          this.showTools = false
          alert('You can only highlight a word with no special charecters!')
          return
        }
        var p = r.getBoundingClientRect();
        this.selectedText = s.toString();
        if (p.left || p.top) {
          menu.css({
            left: (p.left + (p.width / 2)) - (menu.width() / 2),
            top: (p.top - menu.height() - 10),
            display: 'block',
            opacity: 0
          })
          .animate({
            opacity:1
          }, 300);
          
          setTimeout(function() {
            menu.addClass('highlight_menu_animate');
          }, 10);
          return;
        }
      }
      menu.animate({ opacity:0 }, function () {
        menu.hide().removeClass('highlight_menu_animate');
      });
      
    },

    onHighlight () {
      if (this.$store.state.high == true){
        this.$store.state.high = false;
        var myString = jQuery(".para").html();
        var element = jQuery.parseHTML(myString);
        jQuery("span.markup").each(function(index) {
          var text = jQuery(this).text();
          jQuery(this).replaceWith(text);
        });
        var newString = element.html();
        return;
      }
      else {
        this.$store.state.high = true;
        var word = this.selectedText;
        // var ids = [];
        var positions = [];
        var pos = {};
        var hword = {};
        var start = getSelection().getRangeAt(0).startOffset;
        var end = getSelection().getRangeAt(0).endOffset;
        this.startH = start;
        this.endH = end;
        
          hword['id'] = this.post.id;
          pos['start'] = start;
          pos['end'] = end;
          positions.push(pos);
          hword['pos'] = positions;
          hword['text'] = word;
          this.$store.state.highlighted.push(hword);
        
      }
      return;
    },

    onDisplay () {
      this.$modal.show( 'highlightedWords' );
    },

    close() {
      this.$modal.hide( 'highlightedWords' );
    },

    toolKit() {
      var menu = jQuery("#highlight_menu");
      var p = document.getSelection().getRangeAt(0).getBoundingClientRect();
      if (p.left || p.top) {
          menu.css({
            left: (p.left + (p.width / 2)) - (menu.width() / 2),
            top: (p.top - menu.height() - 10),
            display: 'block',
            opacity: 0
          })
          .animate({
            opacity:1
          }, 300);
          
          setTimeout(function() {
            menu.addClass('highlight_menu_animate');
          }, 10);
          return;
        }
    },

    onHover () {
      this.toolKit();
      menu.animate({ opacity:0 }, function () {
        menu.hide().removeClass('highlight_menu_animate');
      });
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

#highlight_menu {
  
  color: #fff;
  border-radius: 5px;
  background: rgba(0,0,0,.8);
  position: absolute;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.highlight_menu_animate {
  transition: top 75ms ease-out,left 75ms ease-out;
}

.side-by-side {
  width: 100%;
  padding:0;
  margin:10px 10px 10px 0;
  margin-top:14px;
}
.side-by-side li {
  display: inline;
  padding: 10px;
}

.caret {
  border-style: solid;
  border-width: 10px 10px 0px 10px;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-top-color: rgba(0,0,0,.8);
  border-right-color: transparent;
  width: 0px;
  height: 0px;
  display: block;
  position: absolute;
  top: 53px;
  left: 45%;
}

.item{
  color: #FFF;
  cursor: pointer;
}


.item path{
  fill: #FFF;
}

.item:hover path{
  fill: #1199ff;
}

.item:hover{
  color: #1199ff;
}

.item + .item{
  margin-left: 10px;
}

.postdiv {
  margin-top: 2em;
  margin-right: auto;
  margin-left: auto;
  padding-right:30px;
  padding-left: 15px;
  padding-bottom: 1.75em;
  background-color: rgb(255,255,255,1);
}

@media(min-width:768px){
  .postdiv {
   width:750px;
 }
}

@media(min-width:992px){
  .postdiv {
   width:970px;
 }
}

@media(min-width:1200px){
  .postdiv {
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

div.postdiv.post {
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

.markup {
  background-image: linear-gradient(to bottom,rgba(12,242,143,.2),rgba(12,242,143,.2));
}

.markup:hover {
 background-image: linear-gradient(to bottom,rgba(12,235,160,.9),rgba(12,235,160,.9))
}

</style>
