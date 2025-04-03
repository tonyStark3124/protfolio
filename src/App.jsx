import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useAnimation } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import emailjs from 'emailjs-com';
import './App.css';

// תמונת פרופיל דמו (החלף בתמונה שלך)
import profileImage1 from './profile1.png';
import profileImage2 from './profile2.png';
import profileImage3 from './profile3.png';
let currntImg = 0;
const profileImages = [profileImage1, profileImage2, profileImage3];

function App() {
  const [projects, setProjects] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("he");
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(profileImages[currntImg])
  const form = useRef();
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();


  // פלטת צבעים מעודכנת
  const colors = {
    dark: {
      primary: '#4dc7ff',
      secondary: '#0a1a2f',
      accent: '#1a3a6e',
      text: '#e6f1ff',
      background: '#0a1a2f',
      card: '#112340',
      header: 'rgba(10, 26, 47, 0.9)'
    },
    light: {
      primary: '#2563eb',
      secondary: '#f8fafc',
      accent: '#e2e8f0',
      text: '#1f2937',
      background: '#ffffff',
      card: '#f8fafc',
      header: 'rgba(248, 250, 252, 0.9)'
    }
  };

  // פרויקטי דמו אם אין תשובה מ-GitHub
  const demoProjects = [
    {
      id: 1,
      name: language === "he" ? "אתר פורטפוליו" : "Portfolio Site",
      description: language === "he" ? "אתר תדמיתי עם אנימציות מתקדמות" : "Showcase site with advanced animations",
      html_url: "#"
    },
    {
      id: 2,
      name: language === "he" ? "אפליקציית מזג אוויר" : "Weather App",
      description: language === "he" ? "תחזית לפי מיקום עם ממשק משתמש ידידותי" : "Location-based forecast with friendly UI",
      html_url: "#"
    },
    {
      id: 3,
      name: language === "he" ? "פלטפורמת בלוגים" : "Blog Platform",
      description: language === "he" ? "מערכת ניהול תוכן לבלוגים" : "Content management system for blogs",
      html_url: "#"
    },
    {
      id: 4,
      name: language === "he" ? "סימולטור מסחר" : "Trading Simulator",
      description: language === "he" ? "סימולציית שוק מניות עם נתונים בזמן אמת" : "Stock market simulation with real-time data",
      html_url: "#"
    }
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    emailjs.sendForm('service_2pxzzvo', 'template_kd9wnu2', form.current, 'TBjhK7nzDzZYl9m9c')
      .then((result) => {
        console.log(result.text);
        alert(language === "he" ? "ההודעה נשלחה בהצלחה!" : "Message sent successfully!");
        setIsLoading(false);
      }, (error) => {
        console.log(error.text);
        alert(language === "he" ? "הייתה בעיה בשליחת ההודעה" : "There was an issue sending the message");
        setIsLoading(false);
      });
  };

  // אנימציית הקלדה לכותרת
  useEffect(() => {
    const title = language === "he" ? "הפורטפוליו שלי" : "My Portfolio";
    controls.start({
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    });
  }, [language, controls]);

  // טעינת פרויקטים
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("https://api.github.com/users/tonyStark3124/repos")
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          if(data.length > 0) {
            setProjects(data.slice(0, 4).map(project => ({
              id: project.id,
              name: project.name,
              description: project.description || (language === "he" ? "ללא תיאור" : "No description"),
              html_url: project.html_url
            })));
          } else {
            setProjects(demoProjects);
          }
        })
        .catch(() => setProjects(demoProjects))
        .finally(() => setIsLoading(false));
    }, 1500);

    return () => clearTimeout(timer);
  }, [language]);

  if (isLoading) {
    return (
      <div className="loader-container" style={{ 
        backgroundColor: colors.dark.background 
      }}>
        <Player
          autoplay
          loop
          src="https://assets1.lottiefiles.com/packages/lf20_usmfx6bp.json"
          style={{ width: '300px' }}
        />
      </div>
    );
  }

  const currentColors = colors[darkMode ? 'dark' : 'light'];

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"} 
         style={{
           '--primary': currentColors.primary,
           '--secondary': currentColors.secondary,
           '--accent': currentColors.accent,
           '--text': currentColors.text,
           '--background': currentColors.background,
           '--card': currentColors.card,
           '--header': currentColors.header,
           background: currentColors.secondary
         }}>

      {/* פס התקדמות גלילה */}
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      <header>
        {/* כפתור שפה בצד שמאל */}
        <motion.div 
          className="header-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => setLanguage(lang => lang === "he" ? "en" : "he")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="language-btn"
          >
            {language === "he" ? "English" : "עברית"}
          </motion.button>
        </motion.div>

        {/* תוכן מרכזי */}
        <div 
            className="header-center"
            onClick={()=>
              {
              currntImg = currntImg + 1 === profileImages.length ? 0 : currntImg + 1; 
              setProfileImage(profileImages[currntImg])
              }
            }
        >
          <motion.div 
            className="profile-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={profileImage} 
              alt={language === "he" ? "תמונת פרופיל" : "Profile"} 
              className="profile-image"
            />
          </motion.div>
          
          <motion.div className="header-text">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={controls}
              className="header-title"
            >
              {language !== "he" ? "My Portfolio" : "הפורטפוליו שלי"}
            </motion.h1>

            <motion.h4
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="header-subtitle"
            >
              {language === "he" ? "טוביה חפץ" : "Tuvia Hefets"}
            </motion.h4>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="header-subtitle"
            >
              {language === "he" ? "מפתח Full Stack" : "Full Stack Developer"}
            </motion.p>
          </motion.div>
        </div>
        
        {/* כפתור מצב בצד ימין */}
        <motion.div 
          className="header-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mode-btn"
          >
            {darkMode ? (language === "he" ? "מצב מואר" : "Light Mode") : (language === "he" ? "מצב כהה" : "Dark Mode")}
          </motion.button>
        </motion.div>
      </header>

      <main>
        {/* סקציית אודות */}
        <motion.section
          className="about-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
        <h2 className="section-title">{language === "he" ? "עליי" : "About Me"}</h2>
        <p className="section-content">
          {language === "he" 
            ? "היי, אני מפתח פול סטאק עם תשוקה לטכנולוגיה, דאטה ואבטחת מידע. התחלתי את דרכי כהנדסאי תוכנה והתפתחתי לעולם הדאטה אנליזה והפיתוח המלא (Full Stack). אני אוהב לקחת רעיונות ולהפוך אותם למוצרים חכמים ומאובטחים, עם דגש על ביצועים וחוויית משתמש. מתמחה ב-React, Node.js, SQL & NoSQL, ושואף תמיד ללמוד ולהתפתח."
            : "Hey, I'm a Full Stack developer passionate about technology, data, and cybersecurity. I started as a software engineer and evolved into data analytics and full-stack development. I love turning ideas into smart and secure products, with a focus on performance and user experience. Specializing in React, Node.js, SQL & NoSQL, and always eager to learn and grow."}
        </p>

        </motion.section>

        {/* סקציית פרויקטים */}
        <motion.section
          className="projects-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{language === "he" ? "הפרויקטים שלי" : "My Projects"}</h2>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <motion.a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                >
                  GitHub
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* סקציית צור קשר */}
        <motion.section
        className="contact-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">{language === "he" ? "צור קשר" : "Contact Me"}</h2>
        
        <form ref={form} className="contact-form" onSubmit={sendEmail}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input 
              type="text" 
              name="name" 
              placeholder={language === "he" ? "שם מלא" : "Full Name"} 
              required 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input 
              type="email" 
              name="email" 
              placeholder={language === "he" ? "אימייל" : "Email"} 
              required 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <textarea 
              name="message" 
              placeholder={language === "he" ? "הודעה" : "Message"} 
              required 
            />
          </motion.div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {language === "he" ? "שלח הודעה" : "Send Message"}
          </motion.button>
        </form>
      </motion.section>
      </main>

      <footer className="site-footer">
        <p>
          {language === "he" 
            ? "© 2023 כל הזכויות שמורות" 
            : "© 2023 All Rights Reserved"}
        </p>
      </footer>
    </div>
  );
}

export default App;