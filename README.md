# 📱 Contact Management System

<div align="center">

![Contact Management Banner](https://github.com/user-attachments/assets/30b7a7f5-e037-4283-ac65-cb80a433eeab)

**A powerful, modern contact management solution built with the MERN stack**

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Powered by Node.js](https://img.shields.io/badge/Powered%20by-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Database MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[🚀 Quick Start](#-quick-start) • [✨ Features](#-features) • [🛠️ Tech Stack](#%EF%B8%8F-technology-stack) • [📖 Documentation](#-api-documentation) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 Overview

Transform the way you manage your contacts with our comprehensive Contact Management System. Built with cutting-edge technologies and designed for scalability, this application provides an intuitive solution for organizing thousands of contacts with detailed address information.

> 💡 **Perfect for**: Personal use, small businesses, organizations, or anyone who needs robust contact management capabilities.

---

## ✨ Features

<details>
<summary>🎯 <strong>Comprehensive Contact Management</strong></summary>

- **Unlimited Storage**: Store and organize thousands of contacts without limitations
- **Rich Contact Profiles**: Capture detailed information including names, phone numbers, emails, and notes
- **Smart Search & Filter**: Find contacts instantly with powerful search capabilities
- **Bulk Operations**: Import, export, and manage contacts in batches

</details>

<details>
<summary>🏠 <strong>Advanced Address Handling</strong></summary>

- **Multiple Addresses**: Save home, work, and custom addresses for each contact
- **Complete Address Details**: Street, city, province/state, country, and postal code
- **Address Validation**: Ensure data accuracy with built-in validation
- **CRUD Operations**: Easy create, read, update, and delete functionality

</details>

<details>
<summary>🎨 <strong>Modern User Experience</strong></summary>

- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Seamlessly works on desktop, tablet, and mobile devices
- **Intuitive Interface**: Clean, modern UI that's easy to navigate
- **Fast Performance**: Optimized for speed and efficiency

</details>

---

## 🛠️ Technology Stack

<table>
<tr>
<td align="center" width="50%">

### 🎨 Frontend
- **⚛️ React.js** - Dynamic user interfaces
- **🛣️ React Router** - Client-side routing
- **🎭 Tailwind CSS** - Modern styling framework
- **📱 Responsive Design** - Mobile-first approach

</td>
<td align="center" width="50%">

### ⚙️ Backend
- **🟢 Node.js** - Server runtime environment
- **🚀 Express.js** - Web application framework
- **🗄️ MySQL** - Reliable database system
- **🔧 Prisma** - Modern database toolkit

</td>
</tr>
</table>

---

## 🚀 Quick Start

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?style=flat&logo=node.js) Node.js (version 14 or later)
- ![MySQL](https://img.shields.io/badge/MySQL-Server-4479A1?style=flat&logo=mysql) MySQL Server
- ![npm](https://img.shields.io/badge/npm-or%20yarn-CB3837?style=flat&logo=npm) Package manager (npm or yarn)

### ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/CONTACT-MANAGEMENT.git
   cd CONTACT-MANAGEMENT
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   cd backend
   npm install
   
   # Frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/contact_db"
   ```

4. **Database setup**
   ```bash
   # Run database migrations
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Launch the application**
   ```bash
   # Start backend server
   cd backend
   npm start
   
   # In a new terminal, start frontend
   cd frontend
   npm run dev
   ```

🎉 **You're all set!** The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

---

## 📁 Project Architecture

```
CONTACT-MANAGEMENT/
├── 🎨 frontend/                    # React Application
│   ├── 📄 public/                  # Static assets
│   ├── ⚛️ src/
│   │   ├── 🖼️ assets/              # Images & icons
│   │   ├── 🧩 components/          # Reusable components
│   │   ├── 📚 lib/                 # API utilities
│   │   ├── 🚀 main.jsx             # App entry point
│   │   └── 🎭 styles.css           # Global styles
│   └── 📦 package.json
│
├── ⚙️ backend/                     # Express Server
│   ├── 📖 docs/                    # API documentation
│   ├── 🔧 prisma/                  # Database schema
│   ├── 🏗️ src/
│   │   ├── 🛡️ application/         # Middlewares
│   │   ├── 🎮 controller/          # Route handlers
│   │   ├── ❌ error/               # Error handling
│   │   ├── 🔒 middleware/          # Custom middleware
│   │   ├── 🛣️ route/               # API routes
│   │   ├── 🔧 service/             # Business logic
│   │   ├── ✅ validation/          # Input validation
│   │   └── 🚀 main.js              # Server entry point
│   └── 🧪 test/                    # Test suites
└── 📚 README.md
```

---

## 📖 API Documentation

### 🔗 Base URL
```
[http://localhost:3000/api](https://github.com/ProgrammerZamanNow/belajar-nodejs-restful-api/blob/main/docs/address.md)
```



> 📋 **Full API documentation** is available in the `/backend/docs` directory.

---




## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork** the repository
2. **🌟 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **💾 Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **📤 Push** to the branch (`git push origin feature/amazing-feature`)
5. **🔄 Open** a Pull Request

### 📜 Code of Conduct
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## 🐛 Issues & Support

Encountered a bug or have a feature request?

- 🐛 **Bug Reports**: [Create an issue](https://github.com/yourusername/CONTACT-MANAGEMENT/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Request a feature](https://github.com/yourusername/CONTACT-MANAGEMENT/issues/new?template=feature_request.md)
- 💬 **General Questions**: [Start a discussion](https://github.com/yourusername/CONTACT-MANAGEMENT/discussions)

---

## 📈 Roadmap

- [ ] 🔐 User authentication system
- [ ] 📊 Contact analytics dashboard
- [ ] 📤 Import/Export functionality
- [ ] 🔄 Real-time synchronization
- [ ] 📱 Mobile app version
- [ ] 🌐 Multi-language support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community for the robust backend solution
- Tailwind CSS for the beautiful styling system
- All contributors who helped make this project better

---

<div align="center">

**⭐ Star this repo if you found it helpful!**


[🔝 Back to top](#-contact-management-system)

</div>
