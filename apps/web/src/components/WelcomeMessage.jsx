import React from 'react';
import { motion } from 'framer-motion';

const WelcomeMessage = () => {
	return (
		<motion.p
			className='text-sm text-white leading-5 w-full'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.8 }}
		>
			Welcome to my portfolio! I'm Prajal, a passionate software developer specializing in building web applications. Explore my projects and let's create something amazing together!
		</motion.p>
	);
};

export default WelcomeMessage;