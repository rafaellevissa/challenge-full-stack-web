<template>
  <v-main>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Student</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="user.name" label="Name"
                  >Teste</v-text-field
                >
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  disabled
                  v-model="user.cpf"
                  label="CPF"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  disabled
                  v-model="user.RA"
                  label="RA"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md8>
                <v-text-field v-model="user.email" label="Email"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" @click="onButtonClickUpdate(user)"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container class="first-part">
      <v-card rounded="30px">
        <h1>Student Registration</h1>
        <form class="container-student" v-on:submit.prevent="submitForm">
          <v-text-field
            required
            label="Name"
            hide-details="auto"
            v-model="form.name"
          ></v-text-field>
          <v-text-field
            required
            label="CPF"
            hide-details="auto"
            v-model="form.cpf"
          ></v-text-field>
          <v-text-field
            required
            label="RA"
            hide-details="auto"
            v-model="form.RA"
          ></v-text-field>
          <v-text-field
            required
            label="Email"
            hide-details="auto"
            v-model="form.email"
          ></v-text-field>
          <v-btn class="btnRegister" type="submit">Register</v-btn>
        </form>
      </v-card>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <v-data-table :headers="headers" :items="users" class="elevation-1">
        <template class="buttonDelete" v-slot:[`item.actions`]="{ item }">
          <v-icon @click="onButtonClickDelete(item.id)" large color="darken-2">
            mdi-delete
          </v-icon>
          <v-icon large @click="editStudent(item)"> mdi-tooltip-edit </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "student",
  data() {
    return {
      form: {
        name: null,
        cpf: null,
        RA: null,
        email: null,
      },
      api: "http://challengeofthings.com:83",
      requestSuccess: false,
      dialog: false,
      users: [],
      user: {},
      headers: [
        {
          text: "Nome",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "CPF", value: "RA" },
        { text: "RA", value: "cpf" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    submitForm() {
      axios
        .post(this.api + "/student", this.form)
        .then((res) => {
          if (res.data.msg) {
            this.form.name = null;
            this.form.cpf = null;
            this.form.RA = null;
            this.form.email = null;
            alert(res.data.msg);
            this.studentsGet();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    async onButtonClickDelete(id) {
      if (confirm("You are about to delete a student, are you sure?")) {
        await axios.delete(this.api + "/student/" + id).then((res) => {
          if (res.data.msg) {
            this.requestSuccess = true;
            alert(res.data.msg);
            this.studentsGet();
          }
        });
      }
    },
    async onButtonClickUpdate(student) {
      await axios
        .put(this.api + "/student/" + student.id, student)
        .then((res) => {
          if (res.data.msg) {
            this.dialog = false;
            alert(res.data.msg);
            this.studentsGet();
          }
        });
    },
    editStudent(student) {
      var { id, name, cpf, RA, email } = student;
      this.user = {
        id: id,
        name: name,
        cpf: cpf,
        RA: RA,
        email: email,
      };
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    studentsGet() {
      axios.get(this.api + "/students").then((res) => {
        this.users = res.data;
      });
    },
  },
  mounted() {
    this.studentsGet();
  },
};
</script>

<style scoped>
.container-student {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.v-text-field {
  width: 80%;
  height: 100%;
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
  display: flex;
  flex-direction: column;
  width: 50%;
}

.buttonDelete {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.btnRegister {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
