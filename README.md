# Google Calendar Clone

A full-stack Google Calendar clone built using the MERN stack.  
It supports event creation, editing, deleting, recurring events, conflict detection, drag interactions, and clean UI animations — closely replicating Google Calendar behavior.



## Features

### Core Calendar Features
- Create, edit, and delete events  
- Daily, weekly, and monthly calendar views  
- Recurring events support  
- Conflict detection (no overlapping events unless allowed)  
- Drag & drop events  
- Resize events to change duration  
- Color-tagged events  
- Smooth animations for interactions  

###  Account & Data
- User authentication (JWT)  
- Personal event storage  
- Secure API access  
- Fast MongoDB queries  

###  UI/UX
- Responsive design  
- Light animations  
- Intuitive event editor modal  
- Search bar for events  
- Filters for categories (work/personal/etc.)



##  Project Architecture

### **Frontend (React + Vite)**
- State management using Context API  
- API calls via Axios  
- Calendar rendering logic  
- Drag-and-drop integrated  
- React Icons for UI  
- Modular reusable components  

### **Backend (Node + Express)**
- RESTful API  
- MongoDB + Mongoose schema for events  
- Recurring event logic  
- Overlap conflict detection  
- Authentication using JWT  
- Secure environment variables  

### **Database (MongoDB)**
- User collection  
- Event collection  
- Recurring pattern schema  
- Indexes for faster querying  


##  Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Rajkumarvarshney/google-calendar.git
cd google-calendar
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 4. Environment variables
Create a `.env` file inside **backend**:

```
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
PORT=5001
EMAIL_USER=your_email
EMAIL_PASSWORD=your_password
```

### 5. Run backend
```bash
npm run dev
```

### 6. Run frontend
```bash
npm run dev
```


##  Business Logic Highlights

###  Recurring Events
- Daily, weekly, monthly repeats  
- Compute next occurrences  
- Stops after end date  
- Avoids duplicate instances  

###  Event Conflict Handling
- Checks if new event overlaps existing ones  
- If conflict: prompts user  
- If allowed: stores both  

###  Animations & Interactions
- Smooth event drag  
- Resize animation  
- Calendar transitions  
- Hover + click ripple effects  

---

# 🔮 Future Scope (ONLY the 3 you asked)

##  Smart Alert & Reminder Notifications**
Add intelligent notifications:
- Browser push alerts  
- Email reminders  
- Mobile push notifications  
- Daily agenda summaries  

Useful for reminding users of meetings, deadlines, or important events.


## Automated Birthday Messages (Auto Email/Wish System)**
Add a birthday automation engine:
- User stores friends’ birthdays  
- System auto-detects birthday at midnight  
- Sends automatic:
  - Email birthday wishes  
  - Optional WhatsApp message  
- Optional: yearly recurring birthday events  

Uses cron jobs like:
```js
cron.schedule("0 0 * * *", () => {
    // birthday automation here
});
```

## AI-Based Smart Event Suggestions**
Integrate AI using OpenAI API to:
- Suggest best time slots  
- Detect conflicts and provide alternatives  
- Auto-generate event descriptions  
- Suggest buffer/travel time for meetings  


 License
This project is for educational and learning use.



<img width="1413" height="795" alt="Screenshot 2025-12-03 at 6 25 39 PM" src="https://github.com/user-attachments/assets/dfa58b0d-9b55-4aba-9d31-94a9de8eb3a2" />
<img width="1440" height="804" alt="Screenshot 2025-12-03 at 6 25 13 PM" src="https://github.com/user-attachments/assets/eac23cad-fbb1-4748-af43-714521d63a60" />
