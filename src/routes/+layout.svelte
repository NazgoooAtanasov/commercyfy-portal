<nav>
  <div class="logo"></div>
  <a href="/categories">Categories</a>
</nav>
<slot/>

<style>
nav {
  display: flex;
  border-bottom: 1px solid #3f3f3f;
  width: 100%;
}

nav * {
  padding: 20px;
}

.logo {
  height: 100%;
}
</style>
