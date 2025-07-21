import React, { useState } from "react";
import { UserPlus, Lock, Mail, User, EyeOff, Eye } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TermsModal from "./TermsModal";
const SignIn = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
   });
   const [showPassword, setShowPassword] = useState(false)
   const [showTerms , setShowTerms] = useState(false)
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(false);
   const navigate = useNavigate();
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
         // Appel à l'API d'inscription
         const response = await axios.post(
            "http://localhost:3000/api/users/ajouter",
            {
               nom: formData.name,
               email: formData.email,
               password: formData.password,
               role: "user",
            }
         );

         if (response.data.message) {
            setSuccess(true);
            setFormData({ name: "", email: "", password: "" });

            // Afficher le message de succès pendant 3 secondes puis rediriger
            setTimeout(() => {
               setSuccess(false);
               navigate("/login"); // Redirection vers la page de login
            }, 3000);
         }
      } catch (err) {
         setError(
            err.response?.data?.message ||
               "Une erreur est survenue lors de l'inscription"
         );
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <div className="bg-[url('../../public/backgroundLogin.jpg')] bg-cover bg-center h-screen w-full">
            <div className="flex justify-center items-center min-h-screen from-indigo-50 to-white py-5 px-4 sm:px-6 lg:px-8">
               <div className="max-w-md mx-auto">
                  <div className="text-center mb-10">
                     <h2 className="text-3xl font-extrabold text-white">
                        Rejoignez notre communauté
                     </h2>
                     <p className="mt-2 text-gray-300">
                        Créez votre compte en quelques secondes
                     </p>
                  </div>

                  {success && (
                     <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
                        <svg
                           className="w-5 h-5 mr-2"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                        >
                           <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                           />
                        </svg>
                        Compte créé avec succès! Vous pouvez maintenant vous
                        connecter.
                     </div>
                  )}

                  {error && (
                     <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
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
                              <User className="h-5 w-5 text-gray-400" />
                           </div>
                           <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-red-500 transition-all duration-200 outline-none"
                              placeholder="Nom complet"
                           />
                        </div>

                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                           </div>
                           <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-red-500 transition-all duration-200 outline-none"
                              placeholder="Adresse email"
                           />
                        </div>

                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                           </div>
                           <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              required
                              value={formData.password}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-red-500 transition-all duration-200 outline-none"
                              placeholder="Mot de passe"
                           />
                           <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                           >
                              {showPassword ? (
                                 <EyeOff className="h-5 w-5" />
                              ) : (
                                 <Eye className="h-5 w-5" />
                              )}
                           </button>
                        </div>

                        <div className="flex items-center justify-between">
                           <div className="flex items-center">
                              <input
                                 id="terms"
                                 name="terms"
                                 type="checkbox"
                                 required
                                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <label
                                 htmlFor="terms"
                                 className="ml-2 block text-sm text-gray-700"
                              >
                                 J'accepte les{" "}
                                 <span
                                    onClick={() => setShowTerms(true)}
                                    className="text-blue-400 hover:text-blue-600 underline"
                                 >
                                    conditions d'utilisation
                                 </span>
                              </label>
                           </div>
                        </div>

                        <div>
                           <button
                              type="submit"
                              disabled={isLoading}
                              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white bg-gradient-to-r from-red-600 to-orange-500 hover:from-orange-600 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-all duration-200 shadow-md ${
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
                                    Création en cours...
                                 </>
                              ) : (
                                 <>
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    S'inscrire maintenant
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
                                 Déjà membre?
                              </span>
                           </div>
                        </div>

                        <div className="mt-4">
                           <Link
                              to="/login"
                              className="w-full flex justify-center py-2.5 px-4 rounded-lg text-blue-500 hover:text-blue-600 font-medium border border-gray-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                           >
                              Se connecter à votre compte
                           </Link>
                        </div>

                        {/* condition d utilisation */}
                        { showTerms && <TermsModal onClose={() => setShowTerms(false)} />}

                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default SignIn;
