# 🇮🇳 Smart Bharat AI – AI-Powered Civic Services Platform

> **AI-Powered Civic Assistance and Complaint Generation Platform**

Smart Bharat AI is an AI-powered civic assistance platform designed to help Indian citizens understand government-related information and report civic issues more easily.

The platform combines an **AI chatbot** with **AI-powered image analysis** to simplify civic services, identify civic issues, and generate structured complaints.

---

## 🚀 Features

### 🤖 AI Assistant

The AI Assistant helps users understand government services and civic processes.

Users can:

* Ask questions about government services and civic procedures
* Communicate in **English, Hindi, and Marathi**
* Get information about required documents
* Understand application procedures
* Get fee and processing information when applicable
* Receive simple and easy-to-understand responses

---

### 📷 AI Complaint Generator

Users can upload an image of a civic issue and generate a structured complaint using AI.

The system can:

* Upload an image of a civic issue
* Identify the issue using AI image analysis
* Suggest the relevant government department
* Assign a priority level
* Generate a structured complaint
* Suggest an appropriate action

---

### 📋 Complaint History

Users can manage their previously generated complaints.

Features include:

* Save generated complaints locally
* View previously saved complaints
* Read complete complaint details
* Clear complaint history when required

---

### 📥 Complaint Actions

Users can:

* 📋 Copy complaint text
* 📥 Download complaints as text files
* 💾 Save complaints to history

---

## 🧠 AI Capabilities

Smart Bharat AI uses the **Google Gemini API** for several AI-powered functions:

* Natural Language Question Answering
* Image Understanding
* Civic Issue Identification
* Complaint Generation
* Department Classification
* Priority Classification

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS
* React Markdown

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### AI

* Google Gemini API

### Storage

* Browser LocalStorage

### Development Tools

* Git
* GitHub
* Visual Studio Code

---

## 🏗️ Project Architecture

```text id="9d3kq7"
                         Smart Bharat AI
                              │
              ┌───────────────┴───────────────┐
              │                               │
       React Frontend                   Express Backend
              │                               │
      ┌───────┼────────┐               ┌──────┴─────────┐
      │       │        │               │                │
   AI Chat  Complaint  History      /api/chat     /api/analyze-image
            Generator
              │                               │
              └───────────────┬───────────────┘
                              │
                              ↓
                     Google Gemini API
                              │
                    ┌─────────┴─────────┐
                    │                   │
              Text Generation      Image Analysis
```

---

## 🔄 How It Works

### AI Assistant

```text id="5x8m2p"
User Question
      ↓
React Frontend
      ↓
Express Backend
      ↓
Gemini API
      ↓
AI Response
      ↓
User
```

### AI Complaint Generator

```text id="7v4n1c"
Upload Civic Issue Image
          ↓
React Frontend
          ↓
Convert Image to Base64
          ↓
Express Backend
          ↓
Gemini Image Analysis
          ↓
Issue + Department + Priority
          ↓
Generated Complaint
          ↓
Copy / Download / Save
```

---

## 📂 Project Structure

```text id="2p8k6m"
02_Smart_Bharat_AI_Chatbot/
│
├── public/
│
├── server/
│   └── index.js
│
├── src/
│   ├── components/
│   │   ├── ChatBot.jsx
│   │   ├── ComplaintGenerator.jsx
│   │   ├── ComplaintHistory.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   └── Home.jsx
│   │
│   ├── services/
│   │   └── gemini.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash id="6m2r8v"
git clone https://github.com/rutujasargar-eng/smart-bharat.git
```

### 2. Open the Project

```bash id="3q7n5x"
cd smart-bharat
```

### 3. Install Frontend Dependencies

```bash id="8w1k4p"
npm install
```

### 4. Install Backend Dependencies

Navigate to the server directory:

```bash id="4z6p2m"
cd server
npm install
```

### 5. Configure Environment Variables

Create a `.env` file inside the `server` folder:

```env id="9x3k7q"
GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ **Never commit your API key to GitHub.**

Make sure the `.env` file is included in your `.gitignore`.

---

## ▶️ Running the Project

### Start the Backend

Open a terminal inside the `server` folder:

```bash id="1n5v8c"
node index.js
```

The backend will run on:

```text id="6q2m9x"
http://localhost:5000
```

### Start the Frontend

Open another terminal in the project root directory:

```bash id="4c7k2n"
npm run dev
```

The frontend will start using the **Vite development server**.

---

## 🔐 Security

The Gemini API key is securely stored on the backend using environment variables.

The application follows a backend-based API architecture:

```text id="8p3m6v"
React Frontend
      ↓
Express Backend
      ↓
Gemini API
```

This prevents the API key from being directly exposed in the frontend.

The `.env` file is excluded from Git using `.gitignore`.

> **Security Best Practice:** Never hard-code API keys in frontend or backend source code.

---

## 🎯 Project Objectives

The main objectives of Smart Bharat AI are to:

* Make civic information easier to understand
* Help citizens create structured complaints
* Use AI to identify civic issues from images
* Provide multilingual civic assistance
* Demonstrate practical applications of Generative AI
* Build an accessible AI-based civic technology platform

---

## 💡 Example Use Cases

Smart Bharat AI can assist with various civic issues, including:

* 🚧 Road and pothole problems
* 💡 Broken streetlights
* 🗑️ Garbage and waste issues
* 🚰 Water-related complaints
* 🌳 Public infrastructure problems
* 🏢 Other civic service issues

---

## 🔮 Future Improvements

Planned enhancements include:

* 👤 User Authentication
* 🏛️ Government Service Database Integration
* 📍 GPS-Based Location Detection
* 📊 Real-Time Complaint Tracking
* 📤 Direct Complaint Submission to Civic Authorities
* 💬 WhatsApp Integration
* 🌐 Support for More Indian Languages
* 🖥️ Admin Dashboard
* 📈 AI-Based Complaint Categorization and Analytics
* 🗄️ Database Integration

---

## 📌 Project Status

**Completed ✅**

The current version includes:

* Functional AI Assistant
* AI-powered civic image analysis
* AI-generated complaint creation
* Complaint history
* Complaint management features
* Multilingual assistance

---

## 👨‍💻 Developer

**Hrishikesh Sargar**

**B.Tech Artificial Intelligence**

---

## ⭐ Acknowledgement

Smart Bharat AI was built as an **AI and Generative AI project** to explore practical applications of Artificial Intelligence in **civic technology and citizen services**.

---

## 📄 License

This project is created for **educational and portfolio purposes**.
