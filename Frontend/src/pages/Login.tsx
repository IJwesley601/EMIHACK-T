import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

const Login: React.FC = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();
   const { login } = useAuth();

   const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      try {
         // Envoie au backend
         const response = await axios.post(
            "http://localhost:3000/api/auth/login",
            {
               email,
               password,
            }
         );

         console.log("login successfull", response.data);

         // Mets à jour le contexte d'authentification
         await login(email, password);

         // Redirection
         navigate("/");

         setEmail("");
         setPassword("");
      } catch (error) {
         console.log("Authentification error", error);
         setError("Email ou mot de passe incorrect");
      } finally {
         setIsLoading(false);
      }
   };

   const handleSignUpRedirect = () => {
      navigate("/signin");
   };

   return (
      <>
      <div className="bg-[url('../../public/backgroundLogin.jpg')] bg-cover bg-center w-full">
         <div className="min-h-screen from-indigo-50 to-white py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
               <div className="text-center mb-10">
                  <h2 className="text-3xl font-extrabold text-white">
                     Connectez-vous à votre compte
                  </h2>
                  <p className="mt-2 text-white sm:hidden">
                     Entrez vos identifiants pour accéder à votre espace
                  </p>
               </div>

               {error && (
                  <div className="mb-6 p-2 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
                     <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                     >
                        <path
                           fillRule="evenodd"
                           d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                           clipRule="evenodd"
                        />
                     </svg>
                     {error}
                  </div>
               )}

               <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-100">
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                           type="email"
                           id="email"
                           name="email"
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-red-500 transition-all duration-200 outline-none"
                           placeholder="Adresse email"
                        />
                     </div>

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
                           placeholder="Mot de passe"
                           required
                           autoComplete="current-password"
                           className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-red-500 transition-all duration-200 outline-none"
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

                     <div className="flex items-center justify-between">
                        <div className="flex items-center">
                           <input
                              id="remember_me"
                              name="remember"
                              type="checkbox"
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                           />
                           <label
                              htmlFor="remember_me"
                              className="ml-2 block text-sm text-gray-700"
                           >
                              Se souvenir de moi
                           </label>
                        </div>
                        <Link
                           to="/forgot-password"
                           className="text-sm text-orange-600 hover:text-orange-400 underline"
                        >
                           Mot de passe oublié?
                        </Link>
                     </div>

                     <div>
                        <button
                           type="submit"
                           disabled={isLoading}
                           className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md ${
                              isLoading ? "opacity-90" : ""
                           }`}
                        >
                           {isLoading ? (
                              <>
                                 <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                 >
                                    <circle
                                       className="opacity-25"
                                       cx="12"
                                       cy="12"
                                       r="10"
                                       stroke="currentColor"
                                       strokeWidth="4"
                                    ></circle>
                                    <path
                                       className="opacity-75"
                                       fill="currentColor"
                                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                 </svg>
                                 Connexion en cours...
                              </>
                           ) : (
                              <>
                                 <LogIn className="w-5 h-5 mr-2" />
                                 Se connecter
                              </>
                           )}
                        </button>
                     </div>
                  </form>

                  <div className="mt-6">
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                           <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                           <span className="px-2 bg-white text-gray-500">
                              Pas encore de compte?
                           </span>
                        </div>
                     </div>

                     <div className="mt-4">
                        <button
                           onClick={handleSignUpRedirect}
                           className="w-full flex justify-center py-2.5 px-4 rounded-lg text-blue-600 hover:text-blue-600 font-medium border border-gray-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200"
                        >
                           Créer un compte
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </>
   );
};

export default Login;
