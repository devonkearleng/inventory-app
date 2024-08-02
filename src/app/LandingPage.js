// "use client";

// import { useRouter } from "next/navigation";
// import { auth, provider, signInWithPopup } from "@/firebase";
// import { Box, Button, Typography } from "@mui/material";
// import { useEffect, useState } from "react";

// const LandingPage = () => {
//   const router = useRouter();
//   const [error, setError] = useState(null);

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       sessionStorage.setItem(
//         "user",
//         JSON.stringify({ name: user.displayName, uid: user.uid })
//       );
//       router.push("/dashboard");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem("user"));
//     if (user) {
//       router.push("/dashboard");
//     }
//   }, [router]);

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       height="100vh"
//       bgcolor="#f5f5f5"
//     >
//       <Typography variant="h4" mb={2}>
//         Sign In with Google
//       </Typography>
//       <Button variant="contained" onClick={handleGoogleSignIn}>
//         Sign In with Google
//       </Button>
//       {error && (
//         <Typography color="error" mt={2}>
//           {error}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default LandingPage;

"use client";

import { useRouter } from "next/navigation";
import { auth, provider, signInWithPopup } from "@/firebase";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      sessionStorage.setItem(
        "user",
        JSON.stringify({ name: user.displayName, uid: user.uid })
      );
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          width: "80%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" mb={2} color="#7c4dff">
          Inventory Tracker
        </Typography>
        <Typography variant="body1" mb={2}>
          Welcome to the Inventory Tracker app! Sign in with your Google account
          to manage your inventory effortlessly.
        </Typography>
        <Button variant="contained" onClick={handleGoogleSignIn} sx={{ mb: 2 }}>
          Sign In with Google
        </Button>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LandingPage;
