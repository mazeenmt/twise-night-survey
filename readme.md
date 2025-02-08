# Nuit des Chercheurs - AI Sentiment & Satisfaction Dashboard  

## 📝 Description  
Ce projet vise à développer une solution d'intelligence artificielle capable de **collecter, analyser et afficher en temps réel l’évaluation des activités** de la Nuit des Chercheurs.  

L'application repose sur **Flask (backend)** et **React avec TypeScript et Tailwind CSS (frontend)**. Elle intègre un modèle NLP basé sur `cardiffnlp/twitter-roberta-base-sentiment-latest` pour analyser le **sentiment des participants** à partir de leurs retours.  

## 🚀 Objectif  
L'IA analyse des **questionnaires courts** (QR codes scannés à l'entrée/sortie des activités, formulaires numériques, feedback mobile) et fournit un tableau de bord interactif affichant :  
✅ **Taux de satisfaction général**  
✅ **Activités les plus appréciées**  
✅ **Sentiment global des participants** (positif, neutre, négatif)  
✅ **Recommandations d’amélioration** basées sur l’analyse des émotions  

L'objectif est de **fournir un aperçu instantané** de l'événement pour mieux comprendre l'expérience des participants et **ajuster les activités en temps réel**.  

---

## 🛠️ Technologies utilisées  
### **Frontend**  
- ⚛️ **React** avec **TypeScript**  
- 🎨 **Tailwind CSS** pour le style  
- 📊 **Recharts** pour la visualisation des données  

### **Backend**  
- 🐍 **Flask** (Python)  
- 🔥 **Flask-CORS** pour la gestion des requêtes cross-origin  
- 🧠 **Transformers** (`cardiffnlp/twitter-roberta-base-sentiment-latest`) pour l'analyse des sentiments  
- 📊 **Pandas & NumPy** pour la manipulation des données  

---

## 📸 Démo  
### **Vidéo de démonstration**  
[![Download the demo]](Nuit-des-Chercheurs-CPU-Team.mp4)  

---

## ⚙️ Installation et Exécution  
### **1️⃣ Backend (Flask API)**  
```bash
# Clonez le repo
git clone https://github.com/mazeenmt/twise-night-survey 
cd surveywebpage/back  

# Créez un environnement virtuel et activez-le
python -m venv venv  
source venv/bin/activate  # Sur Windows : venv\Scripts\activate   

