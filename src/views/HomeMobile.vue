<template>
  <div class="rating_wrap__mobile">
    <h2 class="rating_text">評分</h2>
    <div class="rating_baseline"></div>
    <star-rating
      :increment="1"
      :max-rating="5"
      :show-rating=false
      v-model:rating="initialRate"
      inactive-color="#E5E5E5"
      active-color="#F6DC66"
      :star-size="starSize"
      @update:rating="setRating"
    >
    </star-rating>
  </div>
  <transition>
    <div class="thanks__mobile" v-show="isShow">
      <div class="thanks_title__mobile">評分已送出!</div>
      <div class="thanks_txt__mobile">
        感謝您撥冗留下您的評分<br />
        您的評分使我們變得更好<br />
        國泰醫院很榮幸為您服務<br />
      </div>
    </div>
  </transition>
</template>

<script>
import StarRating from 'vue-star-rating'
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  components: {
    StarRating,
  },

  setup() {
    const rating = ref(0)
    const initialRate = ref(0)
    const userID = ref('')
    const route = useRoute()
    const isShow = ref(false)
    const starSize =ref(window.innerWidth>=window.innerHeight?window.innerWidth*0.01*19:window.innerHeight*0.01*19)


    function setRating(parmValue) {
      console.log(route.params.userID)
        rating.value = parmValue;
        axios
          .post('https://hospitalstaffassessmentserver.azurewebsites.net:443/score', {
            score: rating.value,
            employee_ID: route.params.userID,//route.params.userID
            // Comment: '',
            // place_ID: place_ID.value,
        })
        .then((res) => {
          console.log(res);
          if(res.data=="NO"){
            initialRate.value = 0;
            rating.value = 0;
            alert("評分失敗");
          }else{
            isShow.value = !isShow.value;
            setTimeout(function () {
              isShow.value = false
              initialRate.value = 0
              rating.value = 0
            }, 3000)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return {
      rating,
      userID,
      setRating,
      isShow,
      initialRate,
      starSize,
    }
  },
  mounted() {
    const that = this
    window.onresize = function () {
      that.starSize=window.innerWidth>=window.innerHeight?window.innerWidth*0.01*19:window.innerHeight*0.01*19;
      //console.log(that.starSize);
      //console.log(that.$route);
    };
  },
}
</script>
<style type="text/css" src="@/assets/style.css"></style>
<!--<style type="text/css" src="@/assets/styleMobile.css"></style>-->
