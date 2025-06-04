import React from 'react';

const Footer = () => (
  <footer className="w-full bg-white shadow-inner z-50 text-center py-4 px-8 mt-8">
    <span>
      © {new Date().getFullYear()} Image Enhancer. Built by
      <a href=""  rel="" className="ml-1 font-semibold hover:underline">@Asad Ali</a>
    </span>
  </footer>
);

export default Footer; 