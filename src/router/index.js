import { createRouter, createWebHistory } from "vue-router";
import { storeAuthUser } from "../store/storeAuthUser";
import { computed } from "vue";
import { mapActions } from "vuex";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/register-first-step",
      name: "Register",
      component: () => import("../views/Student/RegisterFirstStepView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/register-second-step",
      name: "RegisterStepTwo",
      component: () => import("../views/Student/RegisterSecondStepView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/school-register",
      name: "SchoolRegister",
      component: () => import("../views/Director/SchoolRegister.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/teacher-register",
      name: "TeacherRegister",
      component: () => import("../views/teachers/RegisterView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: () => import("../components/ForgetPassword.vue"),
    },
    {
      path: "/password-reset/:token",
      name: "ResetPassword",
      component: () => import("../components/ResetPassword.vue"),
    },
    {
      path: "/edit-school",
      name: "EditSchool",
      component: () => import("../components/director/EditSchool.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/schools",
      name: "SchoolsView",
      component: () => import("../views/SchoolsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/schools/:id/school-details",
      name: "SchoolDetailView",
      component: () => import("../views/SchoolDetailsView.vue"),
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/students",
      name: "StudentsView",
      component: () => import("../views/Student/StudentsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/students/:id/student-details",
      name: "StudentDetailView",
      component: () => import("../views/Student/StudentDetailsView.vue"),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/teachers",
      name: "TeachersView",
      component: () => import("../views/teachers/TeachersView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/teachers/:id/teacher-details",
      name: "TeacherDetailView",
      component: () => import("../views/teachers/TeacherDetailsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/waiting/:id/teacher-details",
      name: "WaitingTeacherDetailView",
      component: () => import("../views/Director/TeacherDetailsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/waiting/:id/student-details",
      name: "WaitingStudentDetailView",
      component: () => import("../views/Director/StudentDetailsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/waiting",
      name: "WaitingView",
      component: () => import("../views/WaitingView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/Test.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/Director/DashboardView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/grades",
      name: "IndexGrade",
      component: () => import("../views/Director/IndexGradesView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/grade/create",
      name: "CreateGrade",
      component: () => import("../views/Director/CreateGradeView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/teacher/dashboard",
      name: "TeacherDashboard",
      component: () => import("../views/teachers/DashboardView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "teacher",
      },
    },
    {
      path: "/student/dashboard",
      name: "StudentDashboard",
      component: () => import("../views/Student/DashboardView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "student",
      },
    },
    {
      path: "/student/parents",
      name: "ParentsDashboard",
      component: () => import("../views/Student/ParentsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "student",
      },
    },
    {
      path: "/error-component",
      name: "ErrorComponent",
      component: () => import("../views/ErrorComponent.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    // catch-all 404 route
    // { path: "*", component: NotFound },
  ],
});

router.beforeEach(
  (to, from, next) => {
    const authUser = localStorage.getItem("guard");
    if (to.meta.requiresAuth && !authUser) {
      next("/login");
    } else if (to.meta.requiresAuth && authUser) {
      if (to.meta.requiresRole && authUser !== to.meta.requiresRole) {
        next("/error-component");
      } else {
        next();
      }
    } else if (to.meta.requiresGuest && authUser) {
      router.go(-1);
      // next();
      // next("/home");
    } else if (to.meta.requiresGuest && !authUser) {
      next();
      // router.go(-1);
    }

    // if (to.meta.requiresGuest && authUser) {
    //   const requiresRole = to.matched.some((record) => record.meta.requiresRole);
    //   if (requiresRole && authUser.userType !== requiresRole) {
    //     next("/error-component");
    //   } else {
    //     next();
    //   }
    // return {
    //   name: "Home",
    // };
  }
  //   // const requiresRole = to.matched.some((record) => record.meta.requiresRole);
  //   // if (requiresRole && authUser.userType != requiresRole) {
  //   //   next("/error-component");
  //   // } else {
  //   //   next();
  //   // }

  //   return {
  //     name: 'Home'
  //   }
  // }
  // else{
  //   // else if (to.meta.requiresAuth && !authUser) {
  //     // return {
  //   //   name: "Login",
  //   // };
  //   next("/login");
  // }
  //  else {
  //   return {
  //     name: "Home",
  //   };
  // }
  // }
);
export default router;
