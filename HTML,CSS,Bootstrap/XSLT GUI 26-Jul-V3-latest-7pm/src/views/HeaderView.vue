<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <!-- Other nav items -->
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid">
    <div class="row ps-5 my-3">
      <div class="col-11">
        <AppLink strclass="navbar-brand" name="global-feed"></AppLink>
        <!-- <img src="../assets/images/quote-img.png" class="favicon me-2" />
        <h1>XSLT Converter</h1> -->
      </div>
      <div v-if="!hideProfileIcon" class="col d-flex justify-content-center">
        <div class="dropdown">
          <button
            class="nav-link dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            aria-expanded="false"
          ></button>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton"
          >
            <li class="logout-list">
              <a class="dropdown-item" href="#">
                <img
                  src="../assets/icons/user.svg"
                  alt="user logo"
                />
                {{ userName }}
              </a>
            </li>
            <!-- <li class="logout-list"><a class="dropdown-item" href="#">Another action</a></li> -->
            <li class="logout-list">
              <hr class="dropdown-divider" />
            </li>
            <li class="logout-list">
              <button
                @click="logout"
                class="dropdown-item text-danger"
                type="button"
              >
                <img
                  src="../assets/icons/logout.svg"
                  alt="Logout logo"
                  class="logout-icon"
                />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie, deleteCookie } from "@/cookie";
export default {
  name: "HeaderView",
  data() {
    return {
      userName: getCookie("userId"),
    };
  },
  computed: {
    hideProfileIcon() {
      return this.$route.meta.hideProfileIcon;
    },
  },
  methods: {
    logout() {
      this.$router.push({
        name: "LoginView",
      });
      deleteCookie("userId");
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  /* top: 100%; */
  right: 0;
  min-width: 10rem;
}

.dropdown:hover .dropdown-menu {
  display: block;
}
.container-fluid h1 {
  font-family: system-ui;
}
.logout-list {
  display: block;
}
.favicon {
  height: 6vh;
  width: 2vw;
  float: left;
}

/* .col-6 {
  margin: top 10px;
} */

.nav-link {
  background: url("../assets/icons/profile.svg") no-repeat center;
  background-size: cover;
  font-size: 12px;
  margin-left: 5px;
  height: 30px;
  width: 30px;
  /* Corrected 'widows' to 'width' */
  border: none;
}

.navbar-nav {
  margin-left: auto;
  /* This will align the nav items to the right */
}

nav {
  /* background-color: #cd7838; */
  padding: 1em;
  color: black;
  /* text-align: left; */
  position: fixed;
  border-radius: 0.25rem;
  position: relative;
  padding: 0.5rem 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline;
  margin-right: 1em;
}

a {
  color: #050505;
  text-decoration: none;
  font-weight: bold;
}
</style>