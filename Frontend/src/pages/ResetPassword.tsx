import { Eye, EyeOff, Lock } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [showPassword2, setShowPassword2] = useState(false);
   const [password, setPassword] = useState("");
   const [password2, setPassword2] = useState("");
   const [error, setError] = useState("")
   const { token } = useParams();
   const navigate = useNavigate()

   const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
   };

   const togglePasswordVisibility2 = () => {
      setShowPassword2((prev) => !prev);
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
   
      if (password !== password2) {
         setError("Les mots de passe ne correspondent pas !");
         return;
      }
   
      try {
         const response = await fetch(`http://localhost:3000/api/auth/reset-password/${token}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
         });
   
         const data = await response.json();
   
         if (response.ok) {
            setError(""); 
            alert("Mot de passe réinitialisé avec succès !");
            setTimeout(() => {
               navigate("/login")
            })
         } else {
            setError(data.message || "Erreur inconnue.");
         }
      } catch (err) {
         setError("Une erreur est survenue.");
         console.error(err);
      }
   };
   

   return (
      <>
         <div className="w-full">
            <div className="px-8 min-h-screen from-indigo-50 to-white py-5 px-4 sm:px-6 lg:px-8">
               <div className="max-w-md mx-auto">
                  <div className="text-lg text-gray-800 py-2">
                     <p>Réinitialiser votre mot de passe</p>
                  </div>
                  <div className="py-2">
                     <p className="text-gray-800 text-sm">token : {token}</p>
                  </div>
                  <div className="bg-white py-8 px-6 shadow-sm rounded-xl border border-gray-100">
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                           </div>
                           <input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Nouveau mot de passe"
                              required
                              autoComplete="current-password"
                              className="block text-lg w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 duration-200 outline-none"
                           />
                           <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                              <button
                                 type="button"
                                 onClick={togglePasswordVisibility}
                                 className="text-gray-400 hover:text-gray-500 focus:outline-none"
                              >
                                 {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                 ) : (
                                    <Eye className="h-5 w-5" />
                                 )}
                              </button>
                           </div>
                        </div>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                           </div>
                           <input
                              id="password"
                              type={showPassword2 ? "text" : "password"}
                              name="password"
                              value={password2}
                              onChange={(e) => setPassword2(e.target.value)}
                              placeholder="Confirmer votre mot de passe"
                              required
                              autoComplete="current-password"
                              className="block text-lg w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 duration-200 outline-none"
                           />
                           <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                              <button
                                 type="button"
                                 onClick={togglePasswordVisibility2}
                                 className="text-gray-400 hover:text-gray-500 focus:outline-none"
                              >
                                 {showPassword2 ? (
                                    <EyeOff className="h-5 w-5" />
                                 ) : (
                                    <Eye className="h-5 w-5" />
                                 )}
                              </button>
                           </div>
                        </div>
                        <div className="sticky bottom-0 bg-white border-gray-200 flex justify-end">
                           <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white  rounded-lg transition-colors">
                              Réinitialiser
                           </button>
                        </div>
                     </form>
                     <div>
                        <p className="text-red-500 text-center mt-3 text-lg py-2">
                           {(error)}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ResetPassword;
