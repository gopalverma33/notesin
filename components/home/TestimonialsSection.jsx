// 'use client';
// import { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

// const TestimonialsSection = () => {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
  
//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       role: 'Software Engineer at Google',
//       image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?w=150&h=150&fit=crop&crop=face',
//       content: 'I got 3 interview calls within a week of using this resume builder. The ATS-friendly format really works!',
//       rating: 5,
//     },
//     {
//       name: 'Michael Chen',
//       role: 'Marketing Manager at Microsoft',
//       image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?w=150&h=150&fit=crop&crop=face',
//       content: 'The real-time preview feature saved me hours. I could see exactly how my resume looked while editing.',
//       rating: 5,
//     },
//     {
//       name: 'Emily Rodriguez',
//       role: 'Product Designer at Adobe',
//       image: 'https://images.pexels.com/photos/3762806/pexels-photo-3762806.jpeg?w=150&h=150&fit=crop&crop=face',
//       content: 'Professional templates and easy export options. Landed my dream job at Adobe using this tool!',
//       rating: 5,
//     },
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       handleNext();
//     }, 5000);
    
//     return () => clearInterval(timer);
//   }, [currentTestimonial]);

//   const handleNext = () => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//       setIsTransitioning(false);
//     }, 300);
//   };

//   const handlePrev = () => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//       setIsTransitioning(false);
//     }, 300);
//   };

//   const goToTestimonial = (index) => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       setCurrentTestimonial(index);
//       setIsTransitioning(false);
//     }, 300);
//   };

//   return (
//     <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
//       {/* Decorative elements */}
//       <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="text-center mb-16 animate-fade-in-up">
//           <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
//             Success Stories
//           </div>
          
//           <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
//             What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Users Say</span>
//           </h2>
          
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Join thousands of successful job seekers who trusted us with their career journey.
//           </p>
//         </div>

//         <div className="relative max-w-4xl mx-auto">
//           <div className={`bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 text-center shadow-xl border border-gray-100/50 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
//             {/* Quote icon */}
//             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
//               <Quote className="h-8 w-8 text-white" />
//             </div>

//             {/* Stars */}
//             <div className="flex justify-center space-x-1 mb-6">
//               {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
//                 <Star key={i} className="h-6 w-6 text-yellow-400 fill-current animate-pop-in" style={{ animationDelay: `${i * 100}ms` }} />
//               ))}
//             </div>

//             {/* Testimonial Content */}
//             <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-light">
//               "{testimonials[currentTestimonial].content}"
//             </blockquote>

//             {/* Author */}
//             <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
//               <img
//                 src={testimonials[currentTestimonial].image}
//                 alt={testimonials[currentTestimonial].name}
//                 className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
//               />
//               <div className="text-center md:text-left">
//                 <div className="font-inter font-semibold text-gray-900 text-lg">
//                   {testimonials[currentTestimonial].name}
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   {testimonials[currentTestimonial].role}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <button
//             onClick={handlePrev}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 group"
//             aria-label="Previous testimonial"
//           >
//             <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
//           </button>
          
//           <button
//             onClick={handleNext}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 group"
//             aria-label="Next testimonial"
//           >
//             <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
//           </button>

//           {/* Dots Indicator */}
//           <div className="flex justify-center space-x-3 mt-8">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToTestimonial(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === currentTestimonial 
//                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125' 
//                     : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Trust indicators */}
//         <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 text-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
//           {[
//             { value: '4.9/5', label: 'Average Rating' },
//             { value: '10K+', label: 'Happy Users' },
//             { value: '95%', label: 'Success Rate' }
//           ].map((stat, index) => (
//             <div key={index} className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100/50">
//               <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 {stat.value}
//               </div>
//               <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes fadeInUp {
//           0% { opacity: 0; transform: translateY(30px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes popIn {
//           0% { transform: scale(0.8); opacity: 0; }
//           100% { transform: scale(1); opacity: 1; }
//         }
//         .animate-fade-in-up {
//           opacity: 0;
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
//         .animate-pop-in {
//           animation: popIn 0.5s ease-out forwards;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default TestimonialsSection;