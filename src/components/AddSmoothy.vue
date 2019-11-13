<template>
  <div>
    <div class="add-smoothy container">
      <h2 class="center-align indigo-text">
        Add New Smoothy Recipe
      </h2>
      <form @submit.prevent="addSmoothy">
        <div class="field title">
          <label for="title">Smoothy Title:</label>
          <input type="text" name="title" v-model="title">
        </div>
        <div v-for="(ing, index) in ingredients" :key="index" class="field">
          <label for="ingredient">Ingredient:</label>
          <input type="text" name="ingredient" v-model="ingredients[index]">
          <i class="material-icons delete" @click="deleteIngredient(ing)">delete</i>
        </div>
        <div class="field add-ingredient">
          <label for="add-ingredient">Add an ingredient 
            <!-- (hit [TAB] key to put this ingredient into the cup!) -->
            :</label>
          <!-- <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another"> -->
          <input type="text" name="add-ingredient" v-model="another" class="input">
          <button class="btn add-btn" @click.prevent="addIngredient">add</button>
        </div>
        <div class="field center-align">
          <p class="red-text" v-if="feedback">{{ feedback }}</p>
          <button class="btn pink">Add Smoothy</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
  name: 'AddSmoothy',
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null
    }
  },
  methods: {
    addSmoothy() {
      if (this.title) {
        this.feedback = null;
        // Create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
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
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a something to add a ingredient.'
      }
    },
    deleteIngredient(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  }
}
</script>

<style>
.add-smoothy {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;;
}
.add-smoothy h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothy .field {
  margin: 20px auto;
  position: relative;
}
.add-smoothy .delete {
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