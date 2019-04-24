<template>
  <div id="fp">
    <h5 id="search">Search results..</h5>
    <section v-for="fpost in foundPosts"
    v-bind:key="fpost.id">
    <article>
      <h3>{{ fpost.title.toUpperCase() }}</h3>
      <p>{{ fpost.text.slice(0,fpost.text.length/2)+' ...' }}</p>
      <ul class="actions">
        <li>
          <button v-on:click="clickMethod(fpost.id)" class="button alt">Read More</button>
        </li>
      </ul>
    </article>
  </section>
</div>
</template>

<script>

export default {
  name: 'FoundPostsComponent',
  computed: {
    foundPosts(){
      return this.$store.state.foundPosts;
    }
  },

  methods: {
    async clickMethod(id){
      this.$router.push({path:`/${id}` });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#fp:before {
      content: '';
      border-top: solid 1px rgba(255, 255, 255, 0.25);
      width: 10em;
      display: block;
      margin: 0.5em auto 1em auto;
    }

#search  {
  font-family: 'Varela Round', sans-serif;
  color: #FFFFFF;
  margin-bottom:2em;
}

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

</style>
