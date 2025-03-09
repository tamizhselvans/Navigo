// import React from "react";
// import { useLanguage } from "../contexts/LanguageContext";
// import { Globe, Mail, Phone, MapPin } from "lucide-react";

// export default function Footer() {
//   const { language, translations } = useLanguage();
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Logo Section */}
//           <div className="space-y-4">
//             <div className="flex items-center">
//               <Globe className="h-8 w-8 text-indigo-400" />
//               <span className="ml-2 text-xl font-bold">Logo</span>
//             </div>
//             <p className="text-gray-400">
//               Creating amazing web experiences with modern technologies.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {["home", "about", "services", "contact"].map((item) => (
//                 <li key={item}>
//                   <a
//                     href={`#${item}`}
//                     className="text-gray-400 hover:text-white transition-colors duration-200"
//                   >
//                     {translations[language][item]}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li className="flex items-center">
//                 <MapPin className="h-5 w-5 mr-2" />
//                 <span>123 Web Street, Internet City</span>
//               </li>
//               <li className="flex items-center">
//                 <Phone className="h-5 w-5 mr-2" />
//                 <span>+1 234 567 890</span>
//               </li>
//               <li className="flex items-center">
//                 <Mail className="h-5 w-5 mr-2" />
//                 <span>contact@example.com</span>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
//             <form className="space-y-4">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-indigo-500"
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
//           <p>
//             © {currentYear} Your Company. {translations[language].rights}.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }
