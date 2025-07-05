import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Whatsapp = () => {
  const whatsappNumber = '923172358782'; // ← Your WhatsApp number without "+" (for Pakistan, starts with 92)

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
     className="fixed bottom-12 right-6 bg-black text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors duration-300"

    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default Whatsapp;
