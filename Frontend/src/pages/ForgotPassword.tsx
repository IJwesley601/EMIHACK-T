import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const [message, setMessage] = useState("");
   const [etatButton, setEtatButton] = useState("Envoyer")
   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setEtatButton("Chargement...")
      try {
         const response = await axios.post(
            "http://localhost:3000/api/auth/forgot-password",
            { email }
         );
         setEtatButton("Envoyer")
         setMessage(response.data.message);
         setEmail("");
         setTimeout(() => {
            navigate("/login");
         }, 5000);
      } catch (error) {
         console.log("Erreur lors de l'envoie du mail", error);
         setMessage("Erreur lors de l'envoi, email non trouvé");
      }
   };

   return (
      <>
         <div className="w-full flex h-screen flex-col items-center justify-center p-4">
            {/* Container for login form */}
            <div className="max-h-auto mx-auto max-w-xl">
               {/* Login title and description */}
               <div className="mb-8 space-y-3">
                  <p className="text-xl font-semibold">Forgot password ?</p>
                  <p className="text-gray-500">
                     Enter your email, and we'll send a code to your inbox.{" "}
                  </p>
               </div>
               {/* Login form */}
               <form onSubmit={handleSubmit} className="w-full">
                  <div className="mb-10 space-y-3">
                     <div className="space-y-1">
                        <div className="space-y-2">
                           {/* Email label and input field */}
                           <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="email"
                           >
                              Email
                           </label>
                           <input
                              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-lg file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              id="email"
                              placeholder="mail@example.com"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                           />
                        </div>
                     </div>
                     {/* send button */}
                     <button
                        className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-800"
                        type="submit"
                     >
                        {etatButton}
                     </button>
                     {message && (
                        <p
                           className={`text-center py-2 text-medium ${
                              message.toLowerCase().includes("erreur")
                                 ? "text-red-600"
                                 : "text-green-600"
                           }`}
                        >
                           " {message} "
                        </p>
                     )}
                  </div>
               </form>
            </div>
         </div>
      </>
   );
};

export default ForgotPassword;
