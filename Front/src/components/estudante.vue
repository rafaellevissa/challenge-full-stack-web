<template>
  <v-container fluid class="box">
    <v-container fluid class="first-part">
      <h1>Cadastro de Estudante</h1>
      <form class="container-student" v-on:submit.prevent="submitForm">
        <v-text-field
          label="Nome"
          hide-details="auto"
          v-model="form.name"
        ></v-text-field>
        <v-text-field
          label="CPF"
          hide-details="auto"
          v-model="form.cpf"
        ></v-text-field>
        <v-text-field
          label="RA"
          hide-details="auto"
          v-model="form.RA"
        ></v-text-field>
        <v-text-field
          label="Email"
          hide-details="auto"
          v-model="form.email"
        ></v-text-field>
        <v-btn type="submit">Cadastar</v-btn>
      </form>
    </v-container>
    <v-container fluid class="second-part">
      <li v-for="user in users" :key="user.id">
        {{ user.id }}
      </li>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "estudante",
  data() {
    return {
      form: {
        name: "",
        cpf: "",
        RA: "",
        email: "",
      },
      api: "http://challengeofthings.com:83",
      users: [],
      headers: [
        {
          text: "Nome",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
    };
  },
  methods: {
    submitForm() {
      axios
        .post(this.api + "/student", this.form)
        .then((res) => {
          if (res.data.msg == "Successful registration a new student") {
            alert("Cadastro feito com sucesso!");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
  },
  mounted: function () {
    axios.get(this.api + "/students").then((res) => {
      this.users = res.data;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-student {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.v-text-field {
  width: 100%;
  height: 100%;
}
.v-btn {
  margin-top: 30px;
}
h1 {
  margin-top: 50px;
  margin-bottom: 50px;
}
.box {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
</style>
