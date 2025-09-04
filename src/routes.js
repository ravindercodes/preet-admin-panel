export const Routes = {
    Default: {
        path: "/"
    },
    Login: {
        path: "/login"
    },
    Dashboard: {
        path: "/dashboard"
    },
    Profile: {
        path: "settings/profile"
    },
    // Admission Routes
    Admission: {
        path: "/admission",
        New: "/admission/new",
        List: "/admission/list",
        Approved: "/admission/approved",
        Pending: "/admission/pending",
        Detail: "/admission/:id",
        Verify: "/admission/verify-student"
    },
    // Registration Entries Routes
    RegistrationEntries: {
        path: "/registration-entries",
        Detail: "/registration-entries/:id"
    },
    // Contact Routes
    Contact: {
        path: "/contact",
        List: "/contact/list",
        Unread: "/contact/unread",
        Read: "/contact/read"
    },
    ForgotPassword: {
        path: "/forgot-password"
    },   
    CreatePassword: {
        path: "/create-password"
    },
    ResetPassword: {
        path: "/reset-password"
    },
}