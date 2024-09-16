<template>
  <div class="page-container">
    <div class="login-container">
      <h2>Login</h2>
      <button @click="login('azure')" class="login-btn microsoft-btn">
        <img
          src="../assets/icons//microsoft.svg"
          alt="Microsoft Logo"
          class="login-icon"
        />
        Login with Microsoft
      </button>
      <button @click="login('github')" class="login-btn github-btn">
        <img
          src="../assets/icons/github.svg"
          alt="GitHub Logo"
          class="login-icon"
        />
        Login with GitHub
      </button>
      <button @click="login('linkedin')" class="login-btn linkedin-btn">
        <img
          src="../assets/icons/linkedin.svg"
          alt="LinkedIn Logo"
          class="login-icon"
        />
        Login with LinkedIn
      </button>
    </div>
  </div>
  <button @click="callback">Callback</button>
</template>

<script>
import { setCookie,getCookie } from "../cookie.js";

import "vue3-toastify/dist/index.css";
// import axios from "axios";

export default {
  authSource: "",
  name: "LoginView",
  methods: {
    async login() {
      // window.location.href= "https://gcfp5cdc5k.execute-api.us-east-2.amazonaws.com/dev/login?authSource="+source

      setCookie("userId", "T1", 7);

      this.$router.push({
        name: "ConverterView",
      });
    },
    callback() {
      this.$router.push({
        path: "/",
        query: {
          status: "fail",
          userId: getCookie("userId"),
          message: "Your Are Not Authorized. Please contach Psyncopate.com",
        },
      });
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
}

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  padding: 20px;
}

.login-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 900px;
}

.login-container h2 {
  margin-bottom: 20px;
}

.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 10px;
  margin: 10px auto;
  border: 1px solid transparent;
  border-radius: 7px;
  font-size: 16px;
  cursor: pointer;
  color: black;
  text-align: left;
}

.login-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.microsoft-btn {
  border-color: black;
  background-color: white;
}

.github-btn {
  background-color: white;
  border-color: #333;
}

.linkedin-btn {
  background-color: white;
  border-color: black;
}

.favicon {
  height: 30px;
  width: 30px;
}

.login-btn:hover {
  opacity: 0.9;
}
</style>