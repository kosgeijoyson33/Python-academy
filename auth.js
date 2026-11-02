/* =====================================================
   PYTHON ACADEMY
   AUTHENTICATION SYSTEM
===================================================== */

/*
   STEP 1:
   Replace these two values with your Supabase
   Project URL and Publishable Key.
*/

const SUPABASE_URL = "https://aqtstatgmpqcajniirix.supabase.co";

const SUPABASE_KEY = "sb_publishable_go-rsoZVXht0DEQ6ZXiauQ_dqag6mkl";


/* =====================================================
   CONNECT TO SUPABASE
===================================================== */

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =====================================================
   REGISTER USER
===================================================== */

async function registerUser(name, email, password) {

    const { data, error } = await supabaseClient.auth.signUp({

        email: email,

        password: password,

        options: {

            data: {
                full_name: name
            }

        }

    });

    if (error) {
        throw error;
    }

    return data;

}


/* =====================================================
   VERIFY EMAIL OTP
===================================================== */

async function verifyEmailOTP(email, otp) {

    const { data, error } = await supabaseClient.auth.verifyOtp({

        email: email,

        token: otp,

        type: "signup"

    });

    if (error) {
        throw error;
    }

    return data;

}


/* =====================================================
   RESEND OTP
===================================================== */

async function resendEmailOTP(email) {

    const { data, error } = await supabaseClient.auth.resend({

        type: "signup",

        email: email

    });

    if (error) {
        throw error;
    }

    return data;

}


/* =====================================================
   LOGIN USER
===================================================== */

async function loginUser(email, password) {

    const { data, error } = await supabaseClient.auth.signInWithPassword({

        email: email,

        password: password

    });

    if (error) {
        throw error;
    }

    return data;

}


/* =====================================================
   LOGOUT USER
===================================================== */

async function logoutUser() {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        throw error;
    }

}


/* =====================================================
   GET CURRENT USER
===================================================== */

async function getCurrentUser() {

    const { data, error } = await supabaseClient.auth.getUser();

    if (error) {
        return null;
    }

    return data.user;

}


/* =====================================================
   PROTECT DASHBOARD
===================================================== */

async function requireLogin() {

    const user = await getCurrentUser();

    if (!user) {

        window.location.href = "login.html";

        return null;

    }

    return user;

}


/* =====================================================
   DISPLAY AUTHENTICATION ERRORS
===================================================== */

function displayAuthError(error) {

    if (!error) {
        return "An unexpected error occurred.";
    }

    return error.message || "Authentication failed.";

}
