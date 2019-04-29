<template>
  <header id="header">
      <span class="avatar"><img src="../assets/user.png" alt="" /></span>
      <h1 >Abhinav Sanga</h1>
  </header>
</template>

<script>

export default {
  name: 'HeaderComponent',
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
  margin-top: -1.5em;
    text-align: center;
    padding: 0em 0 0em 0;
  }

    #header h1 {
      font-family: 'Comfortaa', cursive;
      margin: 2px 0 2px 0;
      color: rgba(255, 255, 255, 0.65);
    }

    #header .avatar {
      border-radius: 100%;
      display: inline-block;
      margin: 0 0 1em 0;
      padding: 0.3em;
      border: solid 1px rgba(255, 255, 255, 0.25);
      background-color: rgba(255, 255, 255, 0.075);
    }

      #header .avatar img {
        border-radius: 100%;
        display: block;
        width: 12.5em;
      }

    @media screen and (max-width: 1280px) {

      #header {
        padding: 0em 0 0em 0;
      }

    }

    .icon.style2 {
      -moz-transition: all 0.2s ease;
      -webkit-transition: all 0.2s ease;
      -ms-transition: all 0.2s ease;
      transition: all 0.2s ease;
      border-radius: 100%;
      display: inline-block;
      padding: 0.5em;
      border: solid 1px rgba(255, 255, 255, 0.25);
      background-color: rgba(255, 255, 255, 0.075);
    }

      .icon.style2:before {
        display: block;
        width: 1.25em;
        height: 1.25em;
        line-height: 1.25em;
        font-size: 1.35em;
      }

      .icon.style2:hover {
        background-color: rgba(255, 255, 255, 0.25);
      }

      @media screen and (max-width: 736px) {

        .icon.style2:before {
          font-size: 1em;
        }

      }

      .icon {
    text-decoration: none;
    border-bottom: none;
    position: relative;
  }

    .icon:before {
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-family: FontAwesome;
      font-style: normal;
      font-weight: normal;
      text-transform: none !important;
    }

    .icon > .label {
      display: none;
    }

</style>
