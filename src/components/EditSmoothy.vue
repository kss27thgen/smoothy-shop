<template>
  <div class="edit-smoothy container" v-if="smoothy">
    <h2>Edit Smoothy: {{ this.smoothy.title }}</h2>
    <form @submit.prevent="editSmoothy">
        <div class="field title">
          <label for="title">Smoothy Title:</label>
          <input type="text" name="title" v-model="smoothy.title">
        </div>
        <div v-for="(ing, index) in smoothy.ingredients" :key="index" class="field">
          <label for="ingredient">Ingredient:</label>
          <input type="text" name="ingredient" v-model="smoothy.ingredients[index]">
          <i class="material-icons delete" @click="deleteIngredient(ing)">delete</i>
        </div>
        <div class="field add-ingredient">
          <label for="add-ingredient">Add an ingredient :</label>
          <input type="text" name="add-ingredient"  v-model="another" class="input">
          <button class="btn add-btn" @click="addIngredient">add</button>
        </div>
        <div class="field center-align">
          <p class="red-text" v-if="feedback">{{ feedback }}</p>
          <button class="btn pink">Update Smoothy</button>
        </div>
      </form>
  </div>
</template>


<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
  name: 'EditSmoothy',
  data() {
    return {
      smoothy: null,
      another: null,
      feedback: null
    }
  },
  methods: {
    editSmoothy() {
      if (this.smoothy.title) {
        this.feedback = null;
        // Create a slug
        this.smoothy.slug = slugify(this.smoothy.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').doc(this.smoothy.id).update({
          title: this.smoothy.title,
          ingredients: this.smoothy.ingredients,
          slug: this.smoothy.slug
        }).then(() => {
          this.$router.push({name: 'Index'})
        }).catch(err => {
          console.log(err);
        })
      } else {
        this.feedback = 'You must enter a smoothy title.';
      }
    },
    addIngredient() {
      if (this.another) {
        this.smoothy.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a something to add a ingredient.'
      }
    },
    deleteIngredient(ing) {
      this.smoothy.ingredients = this.smoothy.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  },
  created() {
    let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothy_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothy = doc.data();
        this.smoothy.id = doc.id;
      })
    })
  }
}
</script>

<style scoped>
.edit-smoothy {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;;
}
.edit-smoothy h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothy .field {
  margin: 20px auto;
  position: relative;
}
.edit-smoothy .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
.input {
  position: relative;
}
.add-btn {
  position: absolute;
  right: 0;
}
</style>