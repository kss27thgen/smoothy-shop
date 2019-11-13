<template>
  <div class="index container">
    <div class="card" v-for="smoothy in smoothies" :key="smoothy.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothy(smoothy.id)">delete</i>
        <h2 class="indego-text">{{ smoothy.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothy.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditSmoothy', params: { smoothy_slug: smoothy.slug }}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
export default {
  name: 'Index',
  data() {
    return {
      smoothies: []
    }
  },
  methods: {
    deleteSmoothy(id) {
      // Delete doc from firestore
      db.collection('smoothies').doc(id).delete()
      .then(() => {
        this.smoothies = this.smoothies.filter((smoothy) => {
        return smoothy.id != id;
      })
      })


      
    }
  },
  created() {
    // fetch data from firestore
    db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let smoothy = doc.data();
        smoothy.id = doc.id;
        this.smoothies.push(smoothy);
      })
    })
  }
}
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>

