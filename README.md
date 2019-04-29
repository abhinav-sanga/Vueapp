##Installation:

1. Clone the repository and open terminal in the project root directory.

2. To install the app dependencies and packages, type `npm install` in cmd.

3. After the packages get installed, run `npm run serve` to start the application.

4. Now you can access the application at (http://localhost:8080/) in your browser.

-------------------------------------------

##Functionality:

1. All the blog posts which are stored in Vuex Store are displayed in the landing page.

2. To add a new post, you can fill the details in the homepage and click **Post**.

3. The newly added post gets displayed.

4. Inorder to view the blog post completely, click **Read More** button.

5. Open a post and hover on it, so that there are two options displayed to the top right corner of the div post. One to edit the post and the other to delete it. After deleting the post, the page is redirected to the landing page.

6. The changes are made in the vuex store.

7. To highlight a word from the post, open the post and select the word to be highlighted. A popover will be displayed when the mousebutton is released after selection.

8. On clicking the highlight option, the word selected will be stored in the list of highlighted words, which can be accessed by clicking the left icon in the popover.

9. The highlighted words are displayed in a modal. On clicking a particular highlighted word from the list, all the posts in which the word is highlighted will be displayed.