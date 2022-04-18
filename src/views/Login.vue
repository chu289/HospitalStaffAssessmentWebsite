<template>
  <div class="home_wrap">
    <div class="login" @click.prevent="send">
      <p>登入</p>
    </div>
    <p class="employeeIDTitle">員編</p>
    <input class="employeeID" type="" v-model="username" />
    <p class="passwordTitle">密碼</p>
    <input class="password" type="password" v-model="password" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    

    function send() {
      console.log(Date.now());
      // if (username.value == "admin" && password.value == "0000") {
      //   router.push({ path: "/" });
      // } else {
      //   alert("帳號或密碼錯誤!");
      //   password.value = "";
      // }
      console.log(username.value);
      console.log(password.value)
      axios.
        post('https://hospitalstaffassessmentserver.azurewebsites.net:443/login', {
          ID:username.value,
          password:password.value

        })
      .then((res) => {
        console.log(res.data);
        if (res.data.loginFlag === 1) {
          console.log(res.data.employee_ID);
          router.push({name:"users",params:{userID:res.data.employee_ID,id:res.data.employee_ID}});
          // router.push({ path: '/users/' + res.data.employee_ID});
        } else if(res.data.loginFlag === 0){
          alert("帳號或密碼錯誤!");
          password.value = "";
        } else if(res.data.loginFlag === 2){
          
          alert("現在不是您的上班時間唷~");
          //  router.push({ path: "/users/" });
          router.push({name:"users",params:{userID:res.data.employee_ID,id:res.data.employee_ID}});
          // router.push({ path: '/users/' + res.data.employee_ID});
          
        }       
      })
    }

    return {
      username,
      password,
      send,
    };
  },
};
</script>

<style type="text/css" src="@/assets/style.css"></style>
