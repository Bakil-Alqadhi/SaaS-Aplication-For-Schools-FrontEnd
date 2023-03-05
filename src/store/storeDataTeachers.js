import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";

export const storeDataTeachers = new createStore({
  router,
  state: {
    teachers: [],
    teacher: {},
    errors: {},
  },
  getters: {
    teachers: (state) => state.teachers,
    teacher: (state) => state.teacher,
    errors: (state) => state.errors,
  },
  mutations: {
    //set schools data
    setTeachers: (state, data) => {
      state.teachers = data;
    },

    //set one school
    setOneTeacher: (state, data) => {
      state.teacher = data;
    },

    //setting errors
    setErrors: (state, errors) => {
      state.errors = errors;
    },
  },
  actions: {
    //get Token
    getToken: async () => {
      await axios.get("/sanctum/csrf-cookie");
    },

    //login teacher
    handleTeacherLogin: async (context, payload) => {
      await context.dispatch("getToken"); //because I called it inside storeAuthUser in getUser from LoginView
      await axios
        .post("/teacher/login", {
          school: payload.school_id,
          email: payload.email,
          password: payload.password,
        })
        // .then(() => {
        //   router.push("/");
        // })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },

    //fetch all the schools
    fetchTeachers: async (context, db) => {
      await axios
        .get("api/schools/" + db + "/teachers")
        .then((response) => {
          context.commit("setTeachers", response.data.data);
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
    fetchOneTeacher: async (context, payload) => {
      await axios
        .get("api/schools/" + payload.school + "/teachers/" + payload.teacher)
        .then((response) => {
          console.log(response.data);
          context.commit("setOneTeacher", response.data);
        })
        .catch((error) => console.log(error));
    },

    //show details school
    // showSchool: async (context, id) => {
    //   await context.dispatch("getToken");
    //   //   await
    // },
  },
});
