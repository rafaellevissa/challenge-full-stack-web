<template>
  <v-main>
    <h1>Module Registration</h1>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit module</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field
                  v-model="module.name"
                  name="name"
                  label="New module name"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" @click="onButtonClickUpdate(module)"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container fluid>
      <form class="container-student" v-on:submit.prevent="submitForm">
        <v-text-field
          label="Name"
          hide-details="auto"
          required
          v-model="form.name"
        ></v-text-field>
        <v-btn class="btnRegister" type="submit">Register</v-btn>
      </form>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <v-data-table :headers="headers" :items="modules" class="elevation-1">
        <template class="buttonDelete" v-slot:[`item.actions`]="{ item }">
          <v-icon @click="onButtonClickDelete(item.id)" large>
            mdi-delete
          </v-icon>
          <v-icon large @click="editModule(item)"> mdi-tooltip-edit </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "module",
  data() {
    return {
      form: {
        name: "",
      },
      dialog: false,
      api: "http://challengeofthings.com:83",
      modules: [],
      module: {},
      item: {},
      headers: [
        {
          text: "Nome",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    submitForm() {
      axios
        .post(this.api + "/module", this.form)
        .then((res) => {
          if (res.data.msg) {
            alert(res.data.msg);
            this.form.name = null;
            this.modulesGet();
          }
        })
        .catch(() => {
          alert("FAIL!");
        })
        .finally(() => {});
    },
    async onButtonClickDelete(id) {
      if (confirm("You are about to delete a module, are you sure?")) {
        await axios.delete(this.api + "/module/" + id).then((res) => {
          if (res.data.msg) {
            alert(res.data.msg);
            this.modulesGet();
          }
        });
      }
    },
    async onButtonClickUpdate(module) {
      await axios.put(this.api + "/module/" + module.id, module).then((res) => {
        if (res.data.msg) {
          this.dialog = false;
          alert(res.data.msg);
          this.modulesGet();
        }
      });
    },
    editModule(module) {
      var { id, name } = module;
      this.module = {
        id: id,
        name: name,
      };
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    modulesGet() {
      axios.get(this.api + "/modules").then((res) => {
        this.modules = res.data;
      });
    },
  },
  mounted() {
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
