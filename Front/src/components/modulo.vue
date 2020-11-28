<template>
  <div>
    <h1>Cadastro de Modulo</h1>
    <form class="container-student" v-on:submit.prevent="submitForm">
      <v-text-field
        label="Nome"
        hide-details="auto"
        v-model="form.name"
      ></v-text-field>
      <v-btn type="submit">Cadastar</v-btn>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "modulo",
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log(this.form);
      axios
        .post("http://challengeofthings.com:83/module", this.form)
        .then((res) => {
          if (res.data.msg == "Successful registration a new student") {
            alert("Cadastro feito com sucesso!");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          //Perform action in always
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-student {
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.v-text-field {
  width: 70%;
  height: 70%;
}
.v-btn {
  margin-top: 30px;
}
h1 {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
