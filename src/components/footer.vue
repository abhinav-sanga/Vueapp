<template>
	<footer id="footer">
		<p>&copy; SenseHawk. All rights reserved.</p>
	</footer>
</template>

<script>

	export default {
		name: 'FooterComponent',
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#footer {
		text-align: center;
		padding: 4em 0 4em 0;
		position: relative;
	}

		#footer:before {
			content: '';
			border-top: solid 1px rgba(255, 255, 255, 0.25);
			width: 10em;
			display: block;
			margin: 0 auto 3em auto;
		}

		@media screen and (max-width: 1280px) {

			#footer {
				padding: 2em 0 2em 0;
			}

		}
	#footer p {
		font-family: 'Varela Round', sans-serif;
		color: #f1f1f1;
	}
</style>
