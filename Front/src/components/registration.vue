<template>
  <v-main>
    <h1>Registration</h1>

    <v-container fluid>
      <form class="container-student" v-on:submit.prevent="submitForm">
        <v-select
          :items="users"
          item-text="name"
          item-value="RA"
          label="Student"
          v-model="selectedUser"
        ></v-select>
        <v-select
          :items="modules"
          item-text="name"
          item-value="name"
          label="Module"
          v-model="selectedModule"
        ></v-select>
        <v-btn class="btnRegister" type="submit">Register</v-btn>
      </form>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="registrations"
        class="elevation-1"
      >
        <template class="buttonDelete" v-slot:[`item.actions`]="{ item }">
          <v-icon @click="onButtonClickDelete(item.id)" large>
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "registration",
  data() {
    return {
      api: "http://challengeofthings.com:83",
      registrations: [],
      modules: [],
      users: [],
      selectedUser: "",
      selectedModule: "",
      headers: [
        {
          text: "RA",
          align: "left",
          sortable: false,
          value: "student_RA",
        },
        { text: "Modulo", value: "module_name", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    submitForm() {
      console.log(this.selectedUser);
      console.log(this.selectedModule);
      axios
        .post(this.api + "/registration", {
          module_name: this.selectedModule,
          RA: this.selectedUser,
        })
        .then((res) => {
          if (res.data.msg) {
            alert(res.data.msg);
            this.registrationGet();
          }
        });
    },
    async onButtonClickDelete(id) {
      if (confirm("You are about to delete a registration, are you sure?")) {
        await axios.delete(this.api + "/registration/" + id).then((res) => {
          if (res.data.msg) {
            alert(res.data.msg);
            this.registrationGet();
          }
        });
      }
    },
    registrationGet() {
      axios.get(this.api + "/registration").then((res) => {
        this.registrations = res.data;
      });
    },
    modulesGet() {
      axios.get(this.api + "/modules").then((res) => {
        this.modules = res.data;
      });
    },
    usersGet() {
      axios.get(this.api + "/students").then((res) => {
        this.users = res.data;
      });
    },
  },
  mounted() {
    this.registrationGet();
    this.usersGet();
    this.modulesGet();
  },
};
</script>

<style scoped>
.container-student {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-items: center;
}
.v-text-field {
  width: 70%;
  height: 70%;
}
.btnRegister {
  margin-top: 30px;
}

h1 {
  margin-top: 50px;
  margin-bottom: 50px;
}
.box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.first-part {
  width: 50%;
}
.buttonDelete {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
