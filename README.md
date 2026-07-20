# 🍔 CraveGo - Interactive Food Ordering & Management Platform

Welcome to **CraveGo**, an enterprise-grade, multi-tier food delivery application engineered for performance, security, and exceptional user experience. CraveGo features a complete commercial food ordering flow matching industry standards, built with a robust Java Servlet backend and a highly interactive, glassmorphic frontend.

## 🌟 Standout & Unique Features

*   🤖 **AI Food Assistant Chatbot**: An embedded, intent-matching NLP engine to handle queries on delivery policies, live order tracking, promo codes, and restaurant details without external API overhead.
*   🎨 **Dynamic Multi-Theme Switching**: Real-time UI theme morphing using CSS root variables to switch between Burger (Amber/Gold), Pizza (Crimson/Basil), and Fanta (Neon Orange/Cyan) moods.
*   💎 **Bespoke Glassmorphism UI**: Built from scratch using Vanilla CSS3 for frosted glass effects, depth layering, and a lightweight footprint (zero reliance on heavy frameworks like Bootstrap).
*   🔒 **Secure Login & Route Guard**: Multi-tenant access control that protects sensitive pages (checkout, order history) with seamless return URL logic and JDBC PreparedStatement security against SQL Injection.
*   🔔 **Smart Toast Notifications**: A non-blocking UI notification system that intercepts native browser alerts, dynamically evaluating intent (Success, Error, Info) to display animated slide-in toasts.
*   📜 **User-Specific Order Isolation**: Strict data segregation ensuring users can only access their personal order history, alongside safe session teardowns on logout.
*   ✨ **GSAP Micro-Animations**: High-end GreenSock Animation Platform (GSAP) integrations for fluid interactions, hover effects, and immersive particle aesthetics.

## 🛠️ Technology Stack

**Frontend Layer**
*   **Markup**: HTML5
*   **Styling**: Vanilla CSS3 (Glassmorphism, CSS Variables)
*   **Logic**: JavaScript ES6+
*   **Animations**: GSAP, Particles.js

**Backend Layer**
*   **Language**: Java SE 17+
*   **Framework**: Java Servlets API
*   **Architecture**: MVC Pattern with DAO (Data Access Object) Layer
*   **Build Tool**: Apache Maven

**Database Layer**
*   **RDBMS**: MySQL 8.0+
*   **Connection**: JDBC Driver

## 🚀 Getting Started

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/SivashankarVP/CraveGo.git
    ```
2.  **Database Setup**: 
    Import `database.sql` into your MySQL server to configure the required schemas.
3.  **Backend Configuration**: 
    Update the database credentials within the `com.cravego.util.DBConnection` utility.
4.  **Build & Run**: 
    Build the project via Maven (`pom.xml`) and deploy the WAR file to your preferred Servlet Container (e.g., Apache Tomcat).

## 📜 License

This project is licensed under the MIT License
Developed with ❤️ by Sivashankar