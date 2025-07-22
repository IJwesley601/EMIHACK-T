import React from "react";
import { X } from "lucide-react";

interface TermsModalProps {
   onClose: () => void;
}

const TermsModal = ({ onClose }: TermsModalProps) => {
   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
         <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
               <h2 className="text-2xl font-bold text-gray-800">
                  Conditions d'utilisation
               </h2>
               <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
               >
                  <X className="h-6 w-6" />{" "}
               </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-gray-600">
               <section>
                  <h3 className="text-lg font-semibold mb-2">
                     1. Usage pédagogique
                  </h3>
                  <p className="mb-2 text-sm">
                     Notre plateforme est destinée exclusivement à des fins de
                     recherche et d'apprentissage pédagogique. Tout usage doit
                     contribuer au développement des connaissances et
                     compétences académiques.
                  </p>
               </section>

               <section>
                  <h3 className="text-lg font-semibold mb-2">
                     2. Interdictions
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                     <li>Contenu diffamatoire, injurieux ou discriminatoire</li>
                     <li>Fausses informations ou canulars (fake news)</li>
                     <li>Plagiat ou violation de droits d'auteur</li>
                     <li>Usage commercial non autorisé</li>
                     <li>
                        Toute activité illégale ou contraire à l'éthique
                        académique
                     </li>
                  </ul>
               </section>

               <section>
                  <h3 className="text-lg font-semibold mb-2">
                     3. Responsabilités
                  </h3>
                  <p className="text-sm">
                     Les utilisateurs sont responsables du contenu qu'ils
                     publient. Nous nous réservons le droit de supprimer tout
                     contenu inapproprié et de suspendre les comptes
                     contrevenants.
                  </p>
               </section>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-end">
               <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white  rounded-lg transition-colors"
               >
                  J'ai compris
               </button>
            </div>
         </div>
      </div>
   );
};

export default TermsModal;
