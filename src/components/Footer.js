import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <p>© {new Date().getFullYear()} PromptDB.</p>
      <p>Developed by <a href='https://jigarpatel.xyz'>Jigar Patel</a></p>
    </footer>
  );
};

export default Footer;
