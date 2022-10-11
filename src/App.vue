<template>
    <!-- <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
</template>

<style lang="scss">
#app {
    font-family: Fredoka One, cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #7db7f1;
    background-color: #120f3d;
    background-size: contain, cover;
    width: 100%;
    min-height: 100vh;
}
nav {
    padding: 30px;

    a {
        margin: 20px;
        font-weight: bold;
        color: #2c3e50;
        &:hover {
            color: #42b983;
            border-bottom: 2px solid brown;
        }

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
